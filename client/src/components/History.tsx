/**
 * History Component
 * Display and manage benchmark history
 */
import React, { useState, useEffect } from "react";
import { HistoryItem } from "../types";
import { apiClient } from "../services/api";
import { formatDate, truncateText } from "../utils/formatting";

interface HistoryProps {
  onLoad: (id: string) => void;
}

export const History: React.FC<HistoryProps> = ({ onLoad }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const results = await apiClient.getResults(10);
      setHistory(results);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.deleteResult(id);
      setHistory(history.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Failed to delete result:", err);
    }
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800">📜 Benchmark History</h3>

      {loading ? (
        <p className="text-gray-500">Loading history...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-500">No benchmarks yet</p>
      ) : (
        <div className="space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">{formatDate(item.timestamp)}</p>
                <p className="text-sm text-gray-800 truncate">
                  {truncateText(item.prompt, 60)}
                </p>
                <p className="text-xs text-gray-500">{item.model_count} models</p>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onLoad(item.id)}
                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                >
                  Load
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
