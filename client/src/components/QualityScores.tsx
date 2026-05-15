/**
 * Quality Scores Component
 * Display quality metrics (BLEU, similarity)
 */
import React from "react";
import { QualityScore } from "../types";
import { formatScore } from "../utils/formatting";
import { getMetricColor } from "../utils/metrics";

interface QualityScoresProps {
  scores: { [model: string]: QualityScore };
  results: any[];
}

export const QualityScores: React.FC<QualityScoresProps> = ({ scores, results }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">⭐ Quality Evaluation</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(scores).map(([model, score]) => (
          <div
            key={model}
            className="p-4 bg-white rounded-lg border border-gray-200"
          >
            <div className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
              {model.toUpperCase()}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">BLEU Score:</span>
                <span
                  className={`font-semibold ${getMetricColor(
                    "bleu_score",
                    score.bleu_score
                  )}`}
                >
                  {formatScore(score.bleu_score)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Similarity:</span>
                <span
                  className={`font-semibold ${getMetricColor(
                    "similarity_score",
                    score.similarity_score
                  )}`}
                >
                  {formatScore(score.similarity_score)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200">
                <span className="text-gray-600 font-semibold">Combined:</span>
                <span
                  className={`font-bold text-lg ${getMetricColor(
                    "combined_score",
                    score.combined_score
                  )}`}
                >
                  {formatScore(score.combined_score)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
