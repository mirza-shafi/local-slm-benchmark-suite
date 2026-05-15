/**
 * Prompt Optimizer Component
 * Suggest prompt improvements
 */
import React, { useState } from "react";
import { apiClient } from "../services/api";
import { OptimizationSuggestion } from "../types";

interface PromptOptimizerProps {
  prompt: string;
  onApply: (optimizedPrompt: string) => void;
}

export const PromptOptimizer: React.FC<PromptOptimizerProps> = ({ prompt, onApply }) => {
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleOptimize = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      const response = await apiClient.optimizePrompt(prompt);
      setSuggestions(response.suggestions);
      setExpanded(true);
    } catch (err) {
      console.error("Optimization failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={handleOptimize}
        disabled={loading || !prompt.trim()}
        className="px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold text-sm"
      >
        {loading ? "🔄 Analyzing..." : "💡 Get Optimization Suggestions"}
      </button>

      {expanded && suggestions.length > 0 && (
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900 rounded-lg border border-amber-200 dark:border-amber-700">
          <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-3">Suggestions to improve your prompt:</h4>

          <div className="space-y-3">
            {suggestions.map((suggestion, idx) => (
              <div key={idx} className="p-3 bg-white dark:bg-gray-800 rounded border border-amber-100 dark:border-amber-700">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold text-amber-800 dark:text-amber-300">{suggestion.technique}:</span>{" "}
                  {suggestion.suggestion}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                  Expected: {suggestion.expected_improvement}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
