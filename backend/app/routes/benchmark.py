"""
API routes for benchmarking.
"""
import uuid
from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.config import MODELS
from app.models.inference import InferenceRunner
from app.metrics.performance import PerformanceMetrics
from app.metrics.quality import QualityMetrics
from app.utils.cache import CacheManager
from app.utils.logger import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/api/benchmark", tags=["benchmark"])


class BenchmarkRequest(BaseModel):
    """Benchmark request schema."""

    prompt: str
    models: List[str]
    max_tokens: int = 256
    temperature: float = 0.7
    top_p: float = 0.95


class BenchmarkResponse(BaseModel):
    """Benchmark response schema."""

    benchmark_id: str
    timestamp: str
    prompt: str
    results: list
    quality_scores: dict
    rankings: dict


@router.post("/", response_model=BenchmarkResponse)
async def run_benchmark(request: BenchmarkRequest):
    """
    Run benchmark on selected models.

    Returns:
        Benchmark results with metrics and quality scores
    """
    # Validate models
    invalid_models = [m for m in request.models if m not in MODELS]
    if invalid_models:
        raise HTTPException(
            status_code=400, detail=f"Invalid models: {invalid_models}"
        )

    # Run inference
    benchmark_id = str(uuid.uuid4())
    results = []
    outputs = {}

    logger.info(f"Starting benchmark {benchmark_id} with models: {request.models}")

    for model in request.models:
        logger.info(f"Running inference for {model}...")
        result = InferenceRunner.run_inference(
            model,
            request.prompt,
            request.max_tokens,
            request.temperature,
            request.top_p,
        )
        results.append(result)
        outputs[model] = result["output"]

    # Calculate quality scores
    quality_scores = QualityMetrics.evaluate_outputs(outputs)

    # Create rankings
    performance_ranking = PerformanceMetrics.get_ranking(
        results, "inference_time_ms"
    )
    quality_ranking = QualityMetrics.get_quality_ranking(quality_scores)

    response = {
        "benchmark_id": benchmark_id,
        "timestamp": datetime.now().isoformat(),
        "prompt": request.prompt,
        "results": results,
        "quality_scores": quality_scores,
        "rankings": {
            "by_latency": performance_ranking,
            "by_quality": quality_ranking,
        },
    }

    # Save to cache
    CacheManager.save_result(benchmark_id, response)

    logger.info(f"Benchmark {benchmark_id} completed successfully")

    return response


@router.get("/results")
async def get_results(limit: int = 50, offset: int = 0):
    """Get historical benchmark results."""
    results = CacheManager.list_results(limit, offset)
    return {"results": results, "count": len(results)}


@router.get("/results/{benchmark_id}")
async def get_result(benchmark_id: str):
    """Get a specific benchmark result."""
    result = CacheManager.load_result(benchmark_id)

    if not result:
        raise HTTPException(status_code=404, detail="Result not found")

    return result


@router.delete("/results/{benchmark_id}")
async def delete_result(benchmark_id: str):
    """Delete a benchmark result."""
    success = CacheManager.delete_result(benchmark_id)

    if not success:
        raise HTTPException(status_code=404, detail="Result not found")

    return {"message": "Result deleted"}
