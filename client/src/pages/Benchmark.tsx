/**
 * Benchmark Page
 * Main benchmark interface
 */
import React, { useState } from "react";
import { BenchmarkResponse } from "../types";
import { useBenchmark } from "../hooks/useBenchmark";
import { PromptInput } from "../components/PromptInput";
import { GlobalAnalytics } from "../components/GlobalAnalytics";
import { OutputComparison } from "../components/OutputComparison";
import { MetricsPanel } from "../components/MetricsPanel";
import { QualityScores } from "../components/QualityScores";
import { CostEstimate } from "../components/CostEstimate";
import { SystemInfo } from "../components/SystemInfo";
import { PromptOptimizer } from "../components/PromptOptimizer";
import { History } from "../components/History";
import { apiClient } from "../services/api";

export const BenchmarkPage: React.FC = () => {
  const { loading, error, result, run } = useBenchmark();
  const [prompt, setPrompt] = useState("");
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleBenchmark = async (newPrompt: string, models: string[]) => {
    setPrompt(newPrompt);
    setSelectedModels(models);
    await run(newPrompt, models);
  };

  const handleLoadFromHistory = async (id: string) => {
    try {
      const loaded = await apiClient.getResult(id);
      // Just display it
      // You would need to update the result state in useBenchmark
      window.location.hash = `#result-${id}`;
    } catch (err) {
      console.error("Failed to load result:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">🚀 SLM Benchmark Suite</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Compare Small Language Models on your local hardware. Measure privacy, latency,
          quality, and cost.
        </p>
      </div>

      <SystemInfo />

      <PromptInput onSubmit={handleBenchmark} loading={loading} />

      {error && (
        <div className="mb-8 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-800">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {result && (
        <>
          <GlobalAnalytics result={result} />

          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm">
              <strong>Prompt:</strong> {result.prompt}
            </p>
          </div>

          <PromptOptimizer prompt={prompt} onApply={(p) => handleBenchmark(p, selectedModels)} />

          <OutputComparison results={result.results} />

          <MetricsPanel results={result.results} />

          {Object.keys(result.quality_scores).length > 0 && (
            <QualityScores scores={result.quality_scores} results={result.results} />
          )}

          <CostEstimate models={selectedModels} />
        </>
      )}

      <History onLoad={handleLoadFromHistory} />
    </div>
  );
};
