"""
Quality metrics calculation (BLEU, semantic similarity).
"""
from typing import Dict, List, Optional
import numpy as np
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction
from nltk.tokenize import word_tokenize
import nltk

from app.utils.logger import get_logger

logger = get_logger(__name__)

# Download required NLTK data
try:
    nltk.data.find("tokenizers/punkt")
except LookupError:
    nltk.download("punkt", quiet=True)


class QualityMetrics:
    """Calculate quality-related metrics."""

    @staticmethod
    def calculate_bleu(candidate: str, references: List[str], max_n: int = 2) -> float:
        """
        Calculate BLEU score.

        Args:
            candidate: Generated text
            references: List of reference texts
            max_n: Maximum n-gram size

        Returns:
            BLEU score (0-1)
        """
        try:
            candidate_tokens = word_tokenize(candidate.lower())
            reference_tokens = [word_tokenize(ref.lower()) for ref in references]

            bleu = sentence_bleu(
                reference_tokens,
                candidate_tokens,
                weights=tuple([1.0 / max_n] * max_n),
                smoothing_function=SmoothingFunction().method1,
            )

            return round(bleu, 4)
        except Exception as e:
            logger.warning(f"BLEU calculation failed: {str(e)}")
            return 0.0

    @staticmethod
    def calculate_semantic_similarity(text1: str, text2: str) -> float:
        """
        Calculate semantic similarity using simple word overlap.

        Args:
            text1: First text
            text2: Second text

        Returns:
            Similarity score (0-1)
        """
        try:
            words1 = set(word_tokenize(text1.lower()))
            words2 = set(word_tokenize(text2.lower()))

            if not words1 or not words2:
                return 0.0

            intersection = len(words1 & words2)
            union = len(words1 | words2)

            return round(intersection / union, 4) if union > 0 else 0.0
        except Exception as e:
            logger.warning(f"Similarity calculation failed: {str(e)}")
            return 0.0

    @staticmethod
    def evaluate_outputs(
        outputs: Dict[str, str], reference: Optional[str] = None
    ) -> Dict:
        """
        Evaluate quality of multiple model outputs.

        Args:
            outputs: Dict of {model_key: output_text}
            reference: Reference text for BLEU (if None, use first model as reference)

        Returns:
            Quality scores dict
        """
        if not outputs:
            return {}

        if reference is None:
            reference = list(outputs.values())[0]

        scores = {}
        for model, output in outputs.items():
            bleu = QualityMetrics.calculate_bleu(output, [reference])
            similarity = QualityMetrics.calculate_semantic_similarity(output, reference)

            scores[model] = {
                "bleu_score": bleu,
                "similarity_score": similarity,
                "combined_score": round((bleu + similarity) / 2, 4),
            }

        return scores

    @staticmethod
    def get_quality_ranking(scores: Dict) -> List[Dict]:
        """
        Rank models by combined quality score.

        Args:
            scores: Quality scores dict from evaluate_outputs

        Returns:
            Sorted list of (model, score) tuples
        """
        rankings = [
            {"model": model, "score": data["combined_score"]}
            for model, data in scores.items()
        ]

        rankings.sort(key=lambda x: x["score"], reverse=True)
        return rankings
