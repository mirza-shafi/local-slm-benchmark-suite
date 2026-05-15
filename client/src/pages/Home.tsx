/**
 * Home Page
 * Landing page with introduction
 */
import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            🚀 Local SLM Benchmark Suite
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Run production-ready benchmarks of Small Language Models on your local hardware.
            <br />
            No cloud calls. Full privacy. Real performance metrics.
          </p>
          <Link
            to="/benchmark"
            className="inline-block px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            Start Benchmarking
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">Full Privacy</h3>
            <p className="text-gray-600 dark:text-gray-400">
              All models run locally on your machine. No data sent to external servers.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">Real Metrics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Measure actual latency, throughput, memory usage, and quality on your hardware.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">Cost Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Understand the quality-vs-speed-vs-cost tradeoffs for each model.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">Side-by-Side Comparison</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Compare model outputs, metrics, and quality scores in one unified view.
            </p>
          </div>
        </div>

        {/* Supported Models */}
        <div className="mb-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg border border-purple-200 dark:border-purple-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">📦 Supported Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">⚡ TinyLlama-1.1B</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Fastest, minimal memory</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">⚙️ Phi-2</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Balanced speed & quality</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">🎯 Mistral-7B</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Best quality reasoning</p>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="p-6 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">🚀 Getting Started</h2>
          <ol className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>1. Select Models:</strong> Choose which models to compare (TinyLlama,
              Phi-2, Mistral-7B)
            </li>
            <li>
              <strong>2. Enter Prompt:</strong> Type your prompt or use an example
            </li>
            <li>
              <strong>3. Run Benchmark:</strong> Click "Run Benchmark" to compare
            </li>
            <li>
              <strong>4. Analyze Results:</strong> View side-by-side outputs, metrics, and
              quality scores
            </li>
            <li>
              <strong>5. Optimize:</strong> Get suggestions to improve your prompts
            </li>
          </ol>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">Built with FastAPI + React + PyTorch</p>
          <p className="text-sm">Free, open-source, industry-grade code</p>
        </div>
      </div>
    </div>
  );
};
