/**
 * Metrics calculation utilities.
 */

export const getMetricColor = (
  metric: string,
  value: number,
  isRanking: boolean = false
): string => {
  // For rankings: lower rank = better (green)
  // For metrics: context-dependent
  if (isRanking) {
    if (value === 1) return "text-green-600";
    if (value === 2) return "text-blue-600";
    if (value === 3) return "text-orange-600";
    return "text-gray-600";
  }

  // Latency (lower is better)
  if (metric.includes("latency") || metric.includes("time")) {
    if (value < 200) return "text-green-600";
    if (value < 1000) return "text-blue-600";
    if (value < 3000) return "text-orange-600";
    return "text-red-600";
  }

  // Throughput (higher is better)
  if (metric.includes("throughput") || metric.includes("tokens_per_sec")) {
    if (value > 20) return "text-green-600";
    if (value > 10) return "text-blue-600";
    if (value > 2) return "text-orange-600";
    return "text-red-600";
  }

  // Quality scores (higher is better)
  if (metric.includes("quality") || metric.includes("bleu") || metric.includes("similarity")) {
    if (value > 0.8) return "text-green-600";
    if (value > 0.6) return "text-blue-600";
    if (value > 0.4) return "text-orange-600";
    return "text-red-600";
  }

  // Memory (lower is better)
  if (metric.includes("memory")) {
    if (value < 2048) return "text-green-600";
    if (value < 5120) return "text-blue-600";
    if (value < 10240) return "text-orange-600";
    return "text-red-600";
  }

  return "text-gray-600";
};

export const getPerformanceGrade = (latency: number): string => {
  if (latency < 200) return "A+ (Excellent)";
  if (latency < 500) return "A (Very Good)";
  if (latency < 1000) return "B (Good)";
  if (latency < 2000) return "C (Fair)";
  if (latency < 5000) return "D (Slow)";
  return "F (Very Slow)";
};
