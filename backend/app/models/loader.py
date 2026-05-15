"""
Model loading utilities for HuggingFace Transformers models.
"""
import logging
from typing import Dict, Optional, Tuple
from pathlib import Path

import torch
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    TextGenerationPipeline,
)

from app.config import MODELS, MODEL_CACHE_DIR, DEVICE
from app.utils.logger import get_logger

logger = get_logger(__name__)


class ModelLoader:
    """Loads and manages LLM models from HuggingFace."""

    _cache: Dict[str, Tuple[object, object]] = {}  # (model, tokenizer) cache

    @staticmethod
    def load_model(model_key: str) -> Tuple[object, object]:
        """
        Load a model and tokenizer.

        Args:
            model_key: Key from MODELS config (e.g., "tinyllama")

        Returns:
            Tuple of (model, tokenizer)

        Raises:
            ValueError: If model_key not found
            RuntimeError: If model download/loading fails
        """
        if model_key not in MODELS:
            raise ValueError(f"Unknown model: {model_key}. Available: {list(MODELS.keys())}")

        # Check cache
        if model_key in ModelLoader._cache:
            logger.info(f"Loading {model_key} from cache")
            return ModelLoader._cache[model_key]

        config = MODELS[model_key]
        model_id = config["model_id"]

        logger.info(f"Loading {config['name']} from HuggingFace...")

        try:
            # Load tokenizer
            tokenizer = AutoTokenizer.from_pretrained(
                model_id,
                cache_dir=str(MODEL_CACHE_DIR),
                trust_remote_code=True,
            )

            # Load model
            model = AutoModelForCausalLM.from_pretrained(
                model_id,
                cache_dir=str(MODEL_CACHE_DIR),
                device_map=DEVICE,
                torch_dtype=torch.float16 if DEVICE == "mps" else torch.float32,
                trust_remote_code=True,
                low_cpu_mem_usage=True,
            )

            model.eval()

            # Cache it
            ModelLoader._cache[model_key] = (model, tokenizer)

            logger.info(f"✓ {config['name']} loaded successfully")
            return model, tokenizer

        except Exception as e:
            logger.error(f"Failed to load {model_key}: {str(e)}")
            raise RuntimeError(f"Model loading failed for {model_key}: {str(e)}")

    @staticmethod
    def get_model_info(model_key: str) -> Dict:
        """Get metadata about a model."""
        if model_key not in MODELS:
            raise ValueError(f"Unknown model: {model_key}")

        config = MODELS[model_key]
        is_loaded = model_key in ModelLoader._cache

        return {
            "id": model_key,
            "name": config["name"],
            "description": config["description"],
            "size_mb": config["size_mb"],
            "max_tokens": config["max_tokens"],
            "status": "loaded" if is_loaded else "not-loaded",
            "hardware_compatible": ["cpu", "mps"] if DEVICE == "mps" else ["cpu"],
        }

    @staticmethod
    def clear_cache(model_key: Optional[str] = None) -> None:
        """Clear model cache to free memory."""
        if model_key:
            if model_key in ModelLoader._cache:
                del ModelLoader._cache[model_key]
                logger.info(f"Cleared cache for {model_key}")
        else:
            ModelLoader._cache.clear()
            logger.info("Cleared all model caches")
