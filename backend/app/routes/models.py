"""
API routes for model information.
"""
from fastapi import APIRouter

from app.config import MODELS
from app.models.loader import ModelLoader
from app.utils.logger import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/api/models", tags=["models"])


@router.get("/")
async def list_models():
    """
    Get list of available models.

    Returns:
        List of model metadata
    """
    models = []
    for model_key in MODELS:
        info = ModelLoader.get_model_info(model_key)
        models.append(info)

    return {"models": models, "count": len(models)}


@router.get("/{model_id}")
async def get_model(model_id: str):
    """
    Get information about a specific model.

    Args:
        model_id: Model identifier

    Returns:
        Model metadata
    """
    return ModelLoader.get_model_info(model_id)


@router.post("/clear-cache/{model_id}")
async def clear_model_cache(model_id: str):
    """
    Clear a model from cache to free memory.

    Args:
        model_id: Model identifier

    Returns:
        Success message
    """
    ModelLoader.clear_cache(model_id)
    return {"message": f"Cache cleared for {model_id}"}


@router.post("/clear-cache-all")
async def clear_all_cache():
    """Clear all models from cache."""
    ModelLoader.clear_cache()
    return {"message": "All caches cleared"}
