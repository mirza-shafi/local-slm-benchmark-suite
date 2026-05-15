"""
API routes for system information.
"""
import platform
import psutil

import torch
from fastapi import APIRouter

from app.config import DEVICE, MODEL_CACHE_DIR
from app.utils.logger import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/api/system", tags=["system"])


@router.get("/")
async def get_system_info():
    """
    Get system and hardware information.

    Returns:
        System specs including CPU, RAM, GPU info
    """
    # CPU info
    cpu_count = psutil.cpu_count(logical=False)
    cpu_freq = psutil.cpu_freq()

    # Memory info
    memory = psutil.virtual_memory()

    # GPU info
    gpu_available = False
    gpu_name = None
    gpu_memory_gb = 0

    if DEVICE == "mps":
        gpu_available = True
        gpu_name = "Apple Metal Performance Shaders (M1/M2)"
        try:
            if torch.backends.mps.is_available():
                gpu_memory_gb = torch.cuda.get_device_properties(0).total_memory / 1e9
        except Exception:
            gpu_memory_gb = 16  # Estimate for M1/M2

    elif torch.cuda.is_available():
        gpu_available = True
        gpu_name = torch.cuda.get_device_name(0)
        gpu_memory_gb = torch.cuda.get_device_properties(0).total_memory / 1e9

    # Model cache info
    cache_size_mb = 0
    try:
        for item in MODEL_CACHE_DIR.rglob("*"):
            if item.is_file():
                cache_size_mb += item.stat().st_size / 1024 / 1024
    except Exception:
        pass

    return {
        "os": platform.system(),
        "arch": platform.machine(),
        "device": DEVICE,
        "cpu": {
            "cores": cpu_count,
            "frequency_ghz": cpu_freq.current / 1000 if cpu_freq else 0,
        },
        "memory": {
            "total_gb": round(memory.total / 1e9, 2),
            "available_gb": round(memory.available / 1e9, 2),
            "used_gb": round(memory.used / 1e9, 2),
            "percent": memory.percent,
        },
        "gpu": {
            "available": gpu_available,
            "name": gpu_name,
            "memory_gb": round(gpu_memory_gb, 2),
        },
        "cache": {
            "size_mb": round(cache_size_mb, 2),
            "path": str(MODEL_CACHE_DIR),
        },
    }
