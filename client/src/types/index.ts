/**
 * TypeScript type definitions for the benchmark suite.
 */

export interface BenchmarkResult {
  model: string;
  output: string;
  metrics: {
    inference_time_ms: number;
    time_to_first_token_ms: number;
    throughput_tokens_per_sec: number;
    memory_used_mb: number;
    tokens_generated: number;
    tokens_per_second: number;
  };
  error?: string;
}

export interface QualityScore {
  bleu_score: number;
  similarity_score: number;
  combined_score: number;
}

export interface BenchmarkResponse {
  benchmark_id: string;
  timestamp: string;
  prompt: string;
  results: BenchmarkResult[];
  quality_scores: {
    [model: string]: QualityScore;
  };
  rankings: {
    by_latency: Array<{ model: string; value: number }>;
    by_quality: Array<{ model: string; score: number }>;
  };
}

export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  size_mb: number;
  max_tokens: number;
  status: "loaded" | "not-loaded" | "downloading";
  hardware_compatible: string[];
}

export interface SystemInfo {
  os: string;
  arch: string;
  device: string;
  cpu: {
    cores: number;
    frequency_ghz: number;
  };
  memory: {
    total_gb: number;
    available_gb: number;
    used_gb: number;
    percent: number;
  };
  gpu: {
    available: boolean;
    name: string | null;
    memory_gb: number;
  };
  cache: {
    size_mb: number;
    path: string;
  };
}

export interface OptimizationSuggestion {
  technique: string;
  suggestion: string;
  expected_improvement: string;
}

export interface OptimizeResponse {
  original_prompt: string;
  suggestions: OptimizationSuggestion[];
  techniques: Array<{
    name: string;
    description: string;
    example: string;
    optimized: string;
    technique: string;
  }>;
}

export interface CostEstimate {
  model: string;
  model_name: string;
  avg_inference_time_ms: number;
  total_inference_time_sec: number;
  estimated_cost_dollars: number;
  cost_per_inference_dollars: number;
  energy_kwh: number;
}

export interface CostResponse {
  estimates: CostEstimate[];
  fastest_model: string;
  best_quality_model: string;
  recommendation: string;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  prompt: string;
  model_count: number;
}
