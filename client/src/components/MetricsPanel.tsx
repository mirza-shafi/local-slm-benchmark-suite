/**
 * Metrics Panel Component
 * Display performance metrics for each model
 */
import React from "react";
import { BenchmarkResult } from "../types";
import {
  formatLatency,
  formatMemory,
  formatThroughput,
  formatScore,
} from "../utils/formatting";
import { getMetricColor } from "../utils/metrics";

interface MetricsPanelProps {
  results: BenchmarkResult[];
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ results }) => {
  const metrics = [
    { label: "Latency", key: "inference_time_ms", format: formatLatency },
    { label: "TTFT", key: "time_to_first_token_ms", format: formatLatency },
    { label: "Throughput", key: "throughput_tokens_per_sec", format: formatThroughput },
    { label: "Memory", key: "memory_used_mb", format: formatMemory },
    { label: "Tokens", key: "tokens_generated", format: (v) => `${v}` },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">📊 Performance Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.map((result) => (
          <div
            key={result.model}
            className="p-4 bg-white rounded-lg border border-gray-200"
          >
            <div className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
              {result.model.toUpperCase()}
            </div>

            <div className="space-y-2">
              {metrics.map((metric) => {
                const value = (result.metrics as any)[metric.key];
                if (value === undefined) return null;

                return (
                  <div
                    key={metric.key}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-600">{metric.label}:</span>
                    <span
                      className={`font-semibold ${getMetricColor(
                        metric.key,
                        value
                      )}`}
                    >
                      {metric.format(value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
