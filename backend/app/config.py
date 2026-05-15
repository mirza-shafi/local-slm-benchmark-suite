"""
Configuration settings for the benchmark suite backend.
"""
import os
from typing import List
from pathlib import Path

# Model Configuration
MODELS = {
    "tinyllama": {
        "name": "TinyLlama-1.1B",
        "model_id": "TinyLlama/TinyLlama-1.1b-chat-v1.0",
        "size_mb": 600,
        "max_tokens": 2048,
        "description": "Fastest, lowest memory footprint",
    },
    "phi-2": {
        "name": "Phi-2",
        "model_id": "microsoft/phi-2",
        "size_mb": 5500,
        "max_tokens": 2048,
        "description": "Balanced speed and quality",
    },
    "mistral-7b": {
        "name": "Mistral-7B",
        "model_id": "mistralai/Mistral-7B-Instruct-v0.1",
        "size_mb": 28000,
        "max_tokens": 4096,
        "description": "Best quality, slower inference",
    },
}

# Paths
CACHE_DIR = Path.home() / ".cache" / "slm-benchmark"
MODEL_CACHE_DIR = CACHE_DIR / "models"
RESULTS_DIR = CACHE_DIR / "results"

# Create directories if they don't exist
CACHE_DIR.mkdir(parents=True, exist_ok=True)
MODEL_CACHE_DIR.mkdir(parents=True, exist_ok=True)
RESULTS_DIR.mkdir(parents=True, exist_ok=True)

# Inference settings
DEFAULT_MAX_TOKENS = 256
DEFAULT_TEMPERATURE = 0.7
DEFAULT_TOP_P = 0.95
INFERENCE_TIMEOUT = 300  # 5 minutes

# Logging
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FILE = CACHE_DIR / "benchmark.log"

# Device detection
DEVICE = "cpu"  # Will be auto-detected to "mps" on M1 Mac with PyTorch
try:
    import torch
    if torch.backends.mps.is_available() and torch.backends.mps.is_built():
        DEVICE = "mps"
except Exception:
    pass

# Cost estimation (local M1 assumed)
COST_PER_HOUR = 0  # Free on local hardware
ENERGY_CONSUMPTION_WATTS = 20  # Average for M1 inference

# API Settings
API_TITLE = "Local SLM Benchmark Suite API"
API_VERSION = "1.0.0"
API_DESCRIPTION = "Run local SLM benchmarks with privacy, latency, and cost analysis"
CORS_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]
