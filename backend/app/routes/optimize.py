"""
API routes for prompt optimization.
"""
from fastapi import APIRouter
from pydantic import BaseModel

from app.metrics.optimizer import PromptOptimizer
from app.utils.logger import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/api/optimize", tags=["optimization"])


class OptimizeRequest(BaseModel):
    """Optimization request schema."""

    prompt: str
    model: str = None  # Optional: model-specific optimization


@router.post("/")
async def optimize_prompt(request: OptimizeRequest):
    """
    Suggest prompt optimizations.

    Args:
        request: Optimization request with prompt

    Returns:
        List of optimization suggestions
    """
    suggestions = PromptOptimizer.suggest_optimizations(request.prompt)

    return {
        "original_prompt": request.prompt,
        "suggestions": suggestions,
        "techniques": PromptOptimizer.get_all_techniques(),
    }


@router.get("/techniques")
async def get_optimization_techniques():
    """Get all available optimization techniques."""
    return {"techniques": PromptOptimizer.get_all_techniques()}
