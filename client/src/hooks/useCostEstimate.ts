/**
 * React hook for cost estimation.
 */
import { useState, useCallback } from "react";
import { CostResponse } from "../types";
import { apiClient } from "../services/api";

export const useCostEstimate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [costs, setCosts] = useState<CostResponse | null>(null);

  const estimate = useCallback(
    async (
      models: string[],
      numPrompts: number = 1,
      avgTokensPerInference: number = 256
    ) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.estimateCost(
          models,
          numPrompts,
          avgTokensPerInference
        );
        setCosts(response);
        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Cost estimation failed";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, costs, estimate };
};
