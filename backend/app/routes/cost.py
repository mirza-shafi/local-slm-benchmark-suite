"""
API routes for cost estimation.
"""
from typing import List

from fastapi import APIRouter
from pydantic import BaseModel

from app.config import MODELS, COST_PER_HOUR, ENERGY_CONSUMPTION_WATTS
from app.utils.logger import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/api/cost", tags=["cost"])


class CostEstimateRequest(BaseModel):
    """Cost estimation request schema."""

    models: List[str]
    num_prompts: int = 1
    avg_tokens_per_inference: int = 256
    avg_inference_time_ms: int = None  # If provided, use it; otherwise estimate


@router.post("/")
async def estimate_cost(request: CostEstimateRequest):
    """
    Estimate inference cost for models.

    Args:
        request: Models to estimate and benchmark parameters

    Returns:
        Cost breakdown per model
    """
    estimates = []

    # Rough estimates (in ms) per model on local M1
    MODEL_ESTIMATES = {
        "tinyllama": 150,
        "phi-2": 800,
        "mistral-7b": 3000,
    }

    for model in request.models:
        if model not in MODELS:
            continue

        # Estimate inference time
        inference_time_ms = request.avg_inference_time_ms or MODEL_ESTIMATES.get(
            model, 1000
        )

        total_inference_time_sec = (request.num_prompts * inference_time_ms) / 1000
        total_inference_time_hours = total_inference_time_sec / 3600

        # Cost calculation
        cost_dollars = total_inference_time_hours * COST_PER_HOUR
        cost_per_inference = cost_dollars / request.num_prompts if request.num_prompts > 0 else 0

        # Energy calculation
        energy_kwh = (total_inference_time_sec / 3600) * (
            ENERGY_CONSUMPTION_WATTS / 1000
        )

        estimates.append(
            {
                "model": model,
                "model_name": MODELS[model]["name"],
                "avg_inference_time_ms": inference_time_ms,
                "total_inference_time_sec": round(total_inference_time_sec, 2),
                "estimated_cost_dollars": round(cost_dollars, 4),
                "cost_per_inference_dollars": round(cost_per_inference, 6),
                "energy_kwh": round(energy_kwh, 4),
            }
        )

    # Find best value (fastest)
    fastest = min(estimates, key=lambda x: x["avg_inference_time_ms"])

    # Find best quality (typically mistral-7b)
    best_quality = next(
        (e for e in estimates if e["model"] == "mistral-7b"),
        estimates[-1] if estimates else None,
    )

    return {
        "estimates": estimates,
        "fastest_model": fastest["model"],
        "best_quality_model": best_quality["model"] if best_quality else None,
        "recommendation": f"Use {fastest['model_name']} for latency-sensitive tasks, {best_quality['model_name'] if best_quality else 'check estimates'} for quality-critical tasks. Local M1 deployment: no cost.",
    }
