/**
 * Cost Estimate Component
 * Display inference cost breakdown
 */
import React, { useEffect } from "react";
import { useCostEstimate } from "../hooks/useCostEstimate";
import { formatCost, formatLatency } from "../utils/formatting";

interface CostEstimateProps {
  models: string[];
}

export const CostEstimate: React.FC<CostEstimateProps> = ({ models }) => {
  const { costs, loading, estimate } = useCostEstimate();

  useEffect(() => {
    if (models.length > 0) {
      estimate(models, 1, 256);
    }
  }, [models, estimate]);

  if (loading) {
    return <div className="text-center text-gray-500 dark:text-[#94a3b8]">Calculating costs...</div>;
  }

  if (!costs) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-[#e2e8f0]">💰 Cost Breakdown</h3>

      <div className="p-4 bg-blue-50 dark:bg-[#1f2a3d] rounded-lg border border-blue-200 dark:border-[#2a3a52] mb-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Recommendation:</strong> {costs.recommendation}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {costs.estimates.map((est) => (
          <div
            key={est.model}
            className="p-4 bg-white dark:bg-[#1a2332] rounded-lg border border-gray-200 dark:border-[#2a3a52]"
          >
            <div className="font-bold text-gray-800 dark:text-[#e2e8f0] mb-3">{est.model_name}</div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-[#94a3b8]">Avg Latency:</span>
                <span className="font-semibold">
                  {formatLatency(est.avg_inference_time_ms)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-[#94a3b8]">Cost/Inference:</span>
                <span className="font-semibold text-green-600">
                  {formatCost(est.cost_per_inference_dollars)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-[#94a3b8]">Energy:</span>
                <span className="font-semibold">{est.energy_kwh} kWh</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
