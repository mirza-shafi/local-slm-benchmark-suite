"""
Prompt optimization suggestions.
"""
import logging
from typing import Dict, List

from app.utils.logger import get_logger

logger = get_logger(__name__)


class PromptOptimizer:
    """Generate prompt optimization suggestions."""

    OPTIMIZATION_TECHNIQUES = [
        {
            "name": "Specificity",
            "description": "Add specific details and constraints",
            "example": "Explain quantum computing.",
            "optimized": "Explain quantum computing, covering key principles, applications, and limitations. Keep it to 200 words.",
            "technique": "Add scope, constraints, and detail level",
        },
        {
            "name": "Structure",
            "description": "Request structured output",
            "example": "What is machine learning?",
            "optimized": "Explain machine learning by: 1) Definition, 2) Key types (supervised, unsupervised, reinforcement), 3) Real-world examples.",
            "technique": "Use numbered lists or bullet points",
        },
        {
            "name": "Role-Based",
            "description": "Set a specific role/persona",
            "example": "Explain blockchain.",
            "optimized": "You are a blockchain expert. Explain blockchain technology in simple terms for beginners.",
            "technique": "Establish expert context",
        },
        {
            "name": "Examples",
            "description": "Ask for concrete examples",
            "example": "What are APIs?",
            "optimized": "Explain APIs with 2-3 concrete examples of how they're used in real applications.",
            "technique": "Request examples to improve clarity",
        },
        {
            "name": "Output Format",
            "description": "Specify desired output format",
            "example": "Compare Python and JavaScript.",
            "optimized": "Compare Python vs JavaScript in a table format with columns: Use Cases, Performance, Learning Curve, Community.",
            "technique": "Specify format (table, list, JSON, etc.)",
        },
    ]

    @staticmethod
    def suggest_optimizations(prompt: str) -> List[Dict]:
        """
        Suggest prompt optimizations.

        Args:
            prompt: Original prompt

        Returns:
            List of optimization suggestions
        """
        suggestions = []

        # Check for low specificity
        if len(prompt.split()) < 10:
            suggestions.append(
                {
                    "technique": PromptOptimizer.OPTIMIZATION_TECHNIQUES[0]["technique"],
                    "suggestion": f"Consider adding more specificity. Example: '{prompt} Include key points, definitions, and examples.'",
                    "expected_improvement": "More detailed and focused outputs",
                }
            )

        # Check for structure
        if "?" not in prompt and ":" not in prompt:
            suggestions.append(
                {
                    "technique": PromptOptimizer.OPTIMIZATION_TECHNIQUES[1]["technique"],
                    "suggestion": f"Add structure. Example: '{prompt}. Please structure your answer as: 1) Overview, 2) Details, 3) Examples.'",
                    "expected_improvement": "Better organized responses",
                }
            )

        # Check for role-based framing
        if "expert" not in prompt.lower() and "role" not in prompt.lower():
            suggestions.append(
                {
                    "technique": PromptOptimizer.OPTIMIZATION_TECHNIQUES[2]["technique"],
                    "suggestion": f"Add context: 'You are a subject matter expert. {prompt}'",
                    "expected_improvement": "More authoritative and accurate responses",
                }
            )

        # Suggest examples
        if "example" not in prompt.lower():
            suggestions.append(
                {
                    "technique": PromptOptimizer.OPTIMIZATION_TECHNIQUES[3]["technique"],
                    "suggestion": f"Request examples: '{prompt} Provide 2-3 concrete examples.'",
                    "expected_improvement": "Clearer explanations with practical examples",
                }
            )

        # Generic always-useful optimization
        suggestions.append(
            {
                "technique": "Clarity & Conciseness",
                "suggestion": f"Clarify length expectations: '{prompt}. Answer in 1-2 paragraphs.'",
                "expected_improvement": "More concise and focused responses",
            }
        )

        return suggestions[:3]  # Return top 3 suggestions

    @staticmethod
    def get_all_techniques() -> List[Dict]:
        """Get all available optimization techniques."""
        return PromptOptimizer.OPTIMIZATION_TECHNIQUES
