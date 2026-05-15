"""
Cache management utilities.
"""
import json
import time
from pathlib import Path
from typing import Dict, Optional, Any

from app.config import RESULTS_DIR
from app.utils.logger import get_logger

logger = get_logger(__name__)


class CacheManager:
    """Manage result caching and history."""

    @staticmethod
    def save_result(benchmark_id: str, result: Dict) -> bool:
        """
        Save a benchmark result to cache.

        Args:
            benchmark_id: Unique benchmark ID
            result: Result dictionary

        Returns:
            Success status
        """
        try:
            result_file = RESULTS_DIR / f"{benchmark_id}.json"

            with open(result_file, "w") as f:
                json.dump(result, f, indent=2, default=str)

            logger.info(f"Result saved: {benchmark_id}")
            return True
        except Exception as e:
            logger.error(f"Failed to save result: {str(e)}")
            return False

    @staticmethod
    def load_result(benchmark_id: str) -> Optional[Dict]:
        """
        Load a cached result.

        Args:
            benchmark_id: Unique benchmark ID

        Returns:
            Result dictionary or None if not found
        """
        try:
            result_file = RESULTS_DIR / f"{benchmark_id}.json"

            if not result_file.exists():
                return None

            with open(result_file, "r") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Failed to load result: {str(e)}")
            return None

    @staticmethod
    def list_results(limit: int = 50, offset: int = 0) -> list:
        """
        List all cached results.

        Args:
            limit: Maximum results to return
            offset: Pagination offset

        Returns:
            List of (id, metadata) tuples
        """
        try:
            result_files = sorted(
                RESULTS_DIR.glob("*.json"),
                key=lambda x: x.stat().st_mtime,
                reverse=True,
            )

            results = []
            for result_file in result_files[offset : offset + limit]:
                try:
                    with open(result_file, "r") as f:
                        data = json.load(f)
                        results.append(
                            {
                                "id": result_file.stem,
                                "timestamp": data.get("timestamp"),
                                "prompt": data.get("prompt", "")[:100],
                                "model_count": len(data.get("results", [])),
                            }
                        )
                except Exception:
                    pass

            return results
        except Exception as e:
            logger.error(f"Failed to list results: {str(e)}")
            return []

    @staticmethod
    def delete_result(benchmark_id: str) -> bool:
        """
        Delete a cached result.

        Args:
            benchmark_id: Unique benchmark ID

        Returns:
            Success status
        """
        try:
            result_file = RESULTS_DIR / f"{benchmark_id}.json"

            if result_file.exists():
                result_file.unlink()
                logger.info(f"Result deleted: {benchmark_id}")
                return True

            return False
        except Exception as e:
            logger.error(f"Failed to delete result: {str(e)}")
            return False
