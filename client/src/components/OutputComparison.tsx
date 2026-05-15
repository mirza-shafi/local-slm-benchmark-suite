/**
 * Output Comparison Component
 * Side-by-side comparison of model outputs
 */
import React from "react";
import { BenchmarkResult } from "../types";
import { truncateText } from "../utils/formatting";

interface OutputComparisonProps {
  results: BenchmarkResult[];
}

export const OutputComparison: React.FC<OutputComparisonProps> = ({ results }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-[#e2e8f0]">📝 Model Outputs</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.map((result) => (
          <div
            key={result.model}
            className="p-4 bg-white dark:bg-[#1a2332] rounded-lg border border-gray-200 dark:border-[#2a3a52] hover:shadow-lg transition"
          >
            <div className="font-bold text-gray-800 dark:text-[#e2e8f0] mb-3 pb-2 border-b border-gray-200 dark:border-[#2a3a52]">
              {result.model.toUpperCase()}
            </div>

            {result.error ? (
              <div className="p-3 bg-red-50 dark:bg-red-900 rounded text-red-700 dark:text-red-300 text-sm">
                ❌ {result.error}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-[#0f1419] p-3 rounded text-sm text-gray-700 dark:text-[#94a3b8] max-h-64 overflow-y-auto font-mono whitespace-pre-wrap break-words">
                {result.output}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
