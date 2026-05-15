/**
 * System Info Component
 * Display hardware information
 */
import React, { useEffect } from "react";
import { useSystemInfo } from "../hooks/useSystemInfo";

export const SystemInfo: React.FC = () => {
  const { systemInfo, loading, error } = useSystemInfo();

  if (loading) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Loading system info...</div>;
  }

  if (error || !systemInfo) {
    return <div className="text-center text-red-500 dark:text-red-400">Failed to load system info</div>;
  }

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">🖥️ System Information</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-600 dark:text-gray-400">OS</p>
          <p className="font-semibold text-gray-800 dark:text-gray-100">{systemInfo.os}</p>
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-400">Device</p>
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            {systemInfo.device === "mps" ? "🍎 M1/Metal" : "CPU"}
          </p>
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-400">CPU Cores</p>
          <p className="font-semibold text-gray-800 dark:text-gray-100">{systemInfo.cpu.cores}</p>
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-400">RAM Available</p>
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            {systemInfo.memory.available_gb.toFixed(2)}GB
          </p>
        </div>

        {systemInfo.gpu.available && (
          <>
            <div className="col-span-2">
              <p className="text-gray-600 dark:text-gray-400">GPU</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{systemInfo.gpu.name}</p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400">GPU Memory</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{systemInfo.gpu.memory_gb}GB</p>
            </div>
          </>
        )}

        <div>
          <p className="text-gray-600 dark:text-gray-400">Model Cache</p>
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            {systemInfo.cache.size_mb.toFixed(0)}MB
          </p>
        </div>
      </div>
    </div>
  );
};
