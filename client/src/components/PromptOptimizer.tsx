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
        className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold text-sm"
      >
        {loading ? "🔄 Analyzing..." : "💡 Get Optimization Suggestions"}
      </button>

      {expanded && suggestions.length > 0 && (
        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h4 className="font-bold text-amber-900 mb-3">Suggestions to improve your prompt:</h4>

          <div className="space-y-3">
            {suggestions.map((suggestion, idx) => (
              <div key={idx} className="p-3 bg-white rounded border border-amber-100">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold text-amber-800">{suggestion.technique}:</span>{" "}
                  {suggestion.suggestion}
                </p>
                <p className="text-xs text-gray-600 italic">
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
