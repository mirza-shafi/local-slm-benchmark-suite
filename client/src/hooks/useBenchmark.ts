/**
 * React hooks for benchmark operations.
 */
import { useState, useCallback } from "react";
import { BenchmarkResponse } from "../types";
import { apiClient } from "../services/api";

export const useBenchmark = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BenchmarkResponse | null>(null);

  const run = useCallback(
    async (
      prompt: string,
      models: string[],
      maxTokens?: number,
      temperature?: number,
      topP?: number
    ) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.runBenchmark(
          prompt,
          models,
          maxTokens,
          temperature,
          topP
        );
        setResult(response);
        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Benchmark failed";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, result, run };
};
