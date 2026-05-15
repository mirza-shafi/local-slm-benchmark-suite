/**
 * Global Analytics Header Component
 * Shows top-level metrics: fastest model, best quality, most efficient
 */
import React from "react";
import { BenchmarkResponse } from "../types";
import { formatLatency, formatScore, getRankIcon } from "../utils/formatting";

interface GlobalAnalyticsProps {
  result: BenchmarkResponse | null;
}

export const GlobalAnalytics: React.FC<GlobalAnalyticsProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg border border-blue-200 dark:border-blue-700">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>Run a benchmark to see analytics</p>
        </div>
      </div>
    );
  }

  const fastestModel =
    result.rankings.by_latency.length > 0
      ? result.rankings.by_latency[0].model
      : null;
  const bestQualityModel =
    result.rankings.by_quality.length > 0
      ? result.rankings.by_quality[0].model
      : null;

  const fastestResult = result.results.find((r) => r.model === fastestModel);
  const bestQualityResult = result.results.find((r) => r.model === bestQualityModel);

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Fastest */}
      {fastestResult && (
        <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700 hover:shadow-lg transition">
          <div className="text-green-700 dark:text-green-300 font-bold text-sm mb-2">⚡ Fastest</div>
          <div className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {result.results.find((r) => r.model === fastestModel)?.model.toUpperCase()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formatLatency(fastestResult.metrics.inference_time_ms)}
          </div>
        </div>
      )}

      {/* Best Quality */}
      {bestQualityResult && bestQualityModel && result.quality_scores[bestQualityModel] && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-lg transition">
          <div className="text-blue-700 dark:text-blue-300 font-bold text-sm mb-2">🎯 Best Quality</div>
          <div className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {bestQualityModel.toUpperCase()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formatScore(result.quality_scores[bestQualityModel].combined_score)}
          </div>
        </div>
      )}

      {/* Most Efficient */}
      {result.results.length > 0 && (
        <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg border border-purple-200 dark:border-purple-700 hover:shadow-lg transition">
          <div className="text-purple-700 dark:text-purple-300 font-bold text-sm mb-2">⚙️ Most Efficient</div>
          <div className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {result.results.reduce((best, curr) =>
              curr.metrics.throughput_tokens_per_sec >
              (best?.metrics.throughput_tokens_per_sec || 0)
                ? curr
                : best
            )?.model.toUpperCase()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formatLatency(
              result.results.reduce((best, curr) =>
                curr.metrics.throughput_tokens_per_sec >
                (best?.metrics.throughput_tokens_per_sec || 0)
                  ? curr
                  : best
              )?.metrics.inference_time_ms || 0
            )}
          </div>
        </div>
      )}
    </div>
  );
};
