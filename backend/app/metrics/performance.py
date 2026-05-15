"""
Performance metrics calculation.
"""
import time
from typing import Dict, List
import numpy as np

from app.utils.logger import get_logger

logger = get_logger(__name__)


class PerformanceMetrics:
    """Calculate performance-related metrics."""

    @staticmethod
    def aggregate_metrics(results: List[Dict]) -> Dict:
        """
        Aggregate metrics across multiple model results.

        Args:
            results: List of inference results with metrics

        Returns:
            Aggregated statistics
        """
        metrics_by_model = {}

        for result in results:
            model = result["model"]
            if model not in metrics_by_model:
                metrics_by_model[model] = {
                    "inference_times": [],
                    "throughputs": [],
                    "memories": [],
                }

            if "metrics" in result and result["metrics"]:
                metrics_by_model[model]["inference_times"].append(
                    result["metrics"].get("inference_time_ms", 0)
                )
                metrics_by_model[model]["throughputs"].append(
                    result["metrics"].get("throughput_tokens_per_sec", 0)
                )
                metrics_by_model[model]["memories"].append(
                    result["metrics"].get("memory_used_mb", 0)
                )

        # Compute statistics
        aggregated = {}
        for model, data in metrics_by_model.items():
            if data["inference_times"]:
                aggregated[model] = {
                    "avg_latency_ms": round(np.mean(data["inference_times"]), 2),
                    "min_latency_ms": round(np.min(data["inference_times"]), 2),
                    "max_latency_ms": round(np.max(data["inference_times"]), 2),
                    "avg_throughput_tokens_per_sec": round(
                        np.mean(data["throughputs"]), 2
                    ),
                    "avg_memory_mb": round(np.mean(data["memories"]), 2),
                    "run_count": len(data["inference_times"]),
                }

        return aggregated

    @staticmethod
    def get_ranking(results: List[Dict], metric: str) -> List[Dict]:
        """
        Rank models by a specific metric.

        Args:
            results: List of inference results
            metric: Metric to rank by (e.g., "inference_time_ms", "throughput_tokens_per_sec")

        Returns:
            Sorted list of (model, value) tuples
        """
        rankings = []

        for result in results:
            model = result["model"]
            if "metrics" in result and metric in result["metrics"]:
                rankings.append(
                    {
                        "model": model,
                        "value": result["metrics"][metric],
                    }
                )

        # Sort: lower is better for latency, higher is better for throughput
        reverse = "throughput" in metric or "tokens_per_sec" in metric
        rankings.sort(key=lambda x: x["value"], reverse=reverse)

        return rankings
