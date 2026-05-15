/**
 * API client for backend communication.
 */
import axios, { AxiosInstance } from "axios";
import {
  BenchmarkResponse,
  ModelInfo,
  SystemInfo,
  OptimizeResponse,
  CostResponse,
  HistoryItem,
} from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

class APIClient {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 600000, // 10 minutes for long inference times
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Benchmark endpoints
  async runBenchmark(
    prompt: string,
    models: string[],
    maxTokens: number = 256,
    temperature: number = 0.7,
    topP: number = 0.95
  ): Promise<BenchmarkResponse> {
    const response = await this.client.post<BenchmarkResponse>("/benchmark/", {
      prompt,
      models,
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
    });
    return response.data;
  }

  async getResults(limit: number = 50, offset: number = 0): Promise<HistoryItem[]> {
    const response = await this.client.get("/benchmark/results", {
      params: { limit, offset },
    });
    return response.data.results;
  }

  async getResult(id: string): Promise<BenchmarkResponse> {
    const response = await this.client.get<BenchmarkResponse>(`/benchmark/results/${id}`);
    return response.data;
  }

  async deleteResult(id: string): Promise<void> {
    await this.client.delete(`/benchmark/results/${id}`);
  }

  // Model endpoints
  async getModels(): Promise<ModelInfo[]> {
    const response = await this.client.get("/models/");
    return response.data.models;
  }

  async getModel(id: string): Promise<ModelInfo> {
    const response = await this.client.get(`/models/${id}`);
    return response.data;
  }

  async clearModelCache(id: string): Promise<void> {
    await this.client.post(`/models/clear-cache/${id}`);
  }

  // System endpoints
  async getSystemInfo(): Promise<SystemInfo> {
    const response = await this.client.get<SystemInfo>("/system/");
    return response.data;
  }

  // Optimization endpoints
  async optimizePrompt(prompt: string, model?: string): Promise<OptimizeResponse> {
    const response = await this.client.post<OptimizeResponse>("/optimize/", {
      prompt,
      model,
    });
    return response.data;
  }

  // Cost endpoints
  async estimateCost(
    models: string[],
    numPrompts: number = 1,
    avgTokensPerInference: number = 256
  ): Promise<CostResponse> {
    const response = await this.client.post<CostResponse>("/cost/", {
      models,
      num_prompts: numPrompts,
      avg_tokens_per_inference: avgTokensPerInference,
    });
    return response.data;
  }
}

export const apiClient = new APIClient();
