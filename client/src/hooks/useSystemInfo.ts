/**
 * React hook for system information.
 */
import { useState, useEffect } from "react";
import { SystemInfo } from "../types";
import { apiClient } from "../services/api";

export const useSystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        setLoading(true);
        const info = await apiClient.getSystemInfo();
        setSystemInfo(info);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch system info";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchSystemInfo();
  }, []);

  return { systemInfo, loading, error };
};
