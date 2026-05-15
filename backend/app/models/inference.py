"""
Inference runner for LLM models with performance metrics.
"""
import time
import logging
from typing import Dict, Optional, Tuple
import psutil

import torch

from app.config import DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE, DEFAULT_TOP_P
from app.models.loader import ModelLoader
from app.utils.logger import get_logger

logger = get_logger(__name__)


class InferenceRunner:
    """Runs inference with performance tracking."""

    @staticmethod
    def run_inference(
        model_key: str,
        prompt: str,
        max_tokens: int = DEFAULT_MAX_TOKENS,
        temperature: float = DEFAULT_TEMPERATURE,
        top_p: float = DEFAULT_TOP_P,
    ) -> Dict:
        """
        Run inference and collect metrics.

        Args:
            model_key: Model identifier
            prompt: Input prompt
            max_tokens: Maximum tokens to generate
            temperature: Sampling temperature
            top_p: Nucleus sampling parameter

        Returns:
            Dict with output and metrics
        """
        try:
            # Load model
            model, tokenizer = ModelLoader.load_model(model_key)

            # Get process for memory tracking
            process = psutil.Process()
            mem_before = process.memory_info().rss / 1024 / 1024  # MB

            # Tokenize input
            inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
            input_token_count = inputs["input_ids"].shape[1]

            # Measure inference time
            start_time = time.time()
            time_to_first_token = None

            with torch.no_grad():
                # Generate with tracking
                outputs = model.generate(
                    **inputs,
                    max_new_tokens=max_tokens,
                    temperature=temperature,
                    top_p=top_p,
                    do_sample=True,
                    pad_token_id=tokenizer.eos_token_id,
                )

            inference_time = time.time() - start_time

            # Decode output
            output_text = tokenizer.decode(
                outputs[0][input_token_count:],
                skip_special_tokens=True,
            )

            output_token_count = outputs.shape[1] - input_token_count

            # Memory after
            mem_after = process.memory_info().rss / 1024 / 1024
            peak_memory = max(mem_before, mem_after)

            # Calculate metrics
            throughput = output_token_count / max(inference_time, 0.001)  # tokens/sec

            return {
                "model": model_key,
                "output": output_text,
                "metrics": {
                    "inference_time_ms": round(inference_time * 1000, 2),
                    "time_to_first_token_ms": round(
                        (time_to_first_token or inference_time) * 1000, 2
                    ),
                    "throughput_tokens_per_sec": round(throughput, 2),
                    "memory_used_mb": round(peak_memory, 2),
                    "tokens_generated": output_token_count,
                    "tokens_per_second": round(output_token_count / inference_time, 2),
                },
            }

        except Exception as e:
            logger.error(f"Inference failed for {model_key}: {str(e)}")
            return {
                "model": model_key,
                "output": f"Error: {str(e)}",
                "metrics": {},
                "error": str(e),
            }

    @staticmethod
    def batch_inference(
        model_key: str,
        prompts: list,
        max_tokens: int = DEFAULT_MAX_TOKENS,
        temperature: float = DEFAULT_TEMPERATURE,
        top_p: float = DEFAULT_TOP_P,
    ) -> list:
        """
        Run inference on multiple prompts.

        Args:
            model_key: Model identifier
            prompts: List of prompts
            max_tokens: Maximum tokens per prompt
            temperature: Sampling temperature
            top_p: Nucleus sampling parameter

        Returns:
            List of results
        """
        results = []
        for i, prompt in enumerate(prompts):
            logger.info(f"Batch inference {i+1}/{len(prompts)}")
            result = InferenceRunner.run_inference(
                model_key, prompt, max_tokens, temperature, top_p
            )
            results.append(result)

        return results
