/**
 * Prompt Input Component
 * Input prompt and model selection
 */
import React, { useState, useEffect } from "react";
import { ModelInfo } from "../types";
import { apiClient } from "../services/api";

interface PromptInputProps {
  onSubmit: (prompt: string, models: string[]) => void;
  loading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, loading }) => {
  const [prompt, setPrompt] = useState("");
  const [selectedModels, setSelectedModels] = useState<string[]>(["tinyllama", "phi-2"]);
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [loadingModels, setLoadingModels] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const modelList = await apiClient.getModels();
        setModels(modelList);
      } catch (err) {
        console.error("Failed to fetch models:", err);
      } finally {
        setLoadingModels(false);
      }
    };

    fetchModels();
  }, []);

  const handleModelToggle = (modelId: string) => {
    setSelectedModels((prev) =>
      prev.includes(modelId)
        ? prev.filter((m) => m !== modelId)
        : [...prev, modelId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && selectedModels.length > 0) {
      onSubmit(prompt, selectedModels);
    }
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🔍 Benchmark Setup</h2>

      <form onSubmit={handleSubmit}>
        {/* Prompt Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Enter your prompt:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., Explain quantum computing in 100 words..."
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Tip: More specific prompts lead to better comparisons
          </p>
        </div>

        {/* Model Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-700">
            Select models to compare:
          </label>
          {loadingModels ? (
            <p className="text-gray-500">Loading models...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {models.map((model) => (
                <label
                  key={model.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedModels.includes(model.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedModels.includes(model.id)}
                    onChange={() => handleModelToggle(model.id)}
                    disabled={loading}
                    className="mr-2"
                  />
                  <div className="inline-block">
                    <div className="font-semibold text-gray-800">{model.name}</div>
                    <div className="text-xs text-gray-600">{model.description}</div>
                    <div className="text-xs text-gray-500 mt-1">{model.size_mb}MB</div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !prompt.trim() || selectedModels.length === 0}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "⏳ Running Benchmark..." : "▶️ Run Benchmark"}
        </button>
      </form>
    </div>
  );
};
