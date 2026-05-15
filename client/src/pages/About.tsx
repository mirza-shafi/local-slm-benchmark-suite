/**
 * About Page
 * Project information and documentation
 */
import React from "react";

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About This Project</h1>

      <div className="space-y-8 text-gray-700">
        {/* Project Overview */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Project Overview</h2>
          <p>
            The Local SLM Benchmark Suite is a production-grade tool for benchmarking Small
            Language Models entirely on your local hardware. It addresses three critical
            constraints:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <strong>Privacy:</strong> All models run locally; no data leaves your machine
            </li>
            <li>
              <strong>Latency:</strong> Measure real inference time on your actual hardware
            </li>
            <li>
              <strong>Cost:</strong> Understand the quality-vs-speed tradeoffs without paying
              for API calls
            </li>
          </ul>
        </section>

        {/* Technology Stack */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-blue-600 mb-2">Backend</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>FastAPI (modern, async Python framework)</li>
                <li>Transformers (HuggingFace model loading)</li>
                <li>PyTorch (inference engine, M1-optimized)</li>
                <li>NLTK (quality metrics)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-blue-600 mb-2">Frontend</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>React (UI framework)</li>
                <li>TypeScript (type safety)</li>
                <li>Tailwind CSS (styling)</li>
                <li>Axios (API communication)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Key Features</h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <strong className="text-blue-900">Side-by-Side Comparison:</strong> View model
              outputs and metrics in one unified view
            </div>
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <strong className="text-blue-900">Performance Metrics:</strong> Track latency,
              throughput, memory usage, tokens/sec
            </div>
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <strong className="text-blue-900">Quality Evaluation:</strong> BLEU scores and
              semantic similarity analysis
            </div>
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <strong className="text-blue-900">Prompt Optimization:</strong> Get AI suggestions
              to improve your prompts
            </div>
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <strong className="text-blue-900">Cost Analysis:</strong> Estimate inference cost
              and energy consumption
            </div>
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <strong className="text-blue-900">Results History:</strong> Save and retrieve past
              benchmarks
            </div>
          </div>
        </section>

        {/* Metrics Explained */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Metrics Explained</h2>
          <div className="space-y-3 text-sm">
            <div>
              <strong className="text-gray-800">Latency (ms):</strong> Time from prompt
              submission to complete response. Lower is better.
            </div>
            <div>
              <strong className="text-gray-800">TTFT (ms):</strong> Time to First Token. How
              long before you see the first output. Lower feels more responsive.
            </div>
            <div>
              <strong className="text-gray-800">Throughput (tok/s):</strong> Tokens generated
              per second. Higher means faster processing.
            </div>
            <div>
              <strong className="text-gray-800">Memory (MB):</strong> Peak RAM used during
              inference. Lower means less powerful hardware needed.
            </div>
            <div>
              <strong className="text-gray-800">Quality (BLEU/Similarity):</strong> Measures
              output correctness. Higher is better.
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Design Philosophy</h2>
          <div className="space-y-3">
            <p>
              <strong>Industry-Grade Code Quality:</strong> Type-safe (TypeScript + Python
              hints), comprehensive error handling, structured logging, configuration management
            </p>
            <p>
              <strong>Clear Constraints:</strong> Privacy, latency, and cost concerns are
              explicit and visible, not hidden
            </p>
            <p>
              <strong>Reproducible Results:</strong> Same prompt always produces similar
              metrics. Hardware differences are visible.
            </p>
            <p>
              <strong>User Empowering:</strong> Show real numbers, not marketing claims. Let
              users make informed decisions.
            </p>
          </div>
        </section>

        {/* Local vs Cloud */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Why Local Matters</h2>
          <table className="w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border border-gray-300 text-left">Aspect</th>
                <th className="p-2 border border-gray-300 text-left">Local</th>
                <th className="p-2 border border-gray-300 text-left">Cloud API</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="p-2 border border-gray-300 font-bold">Privacy</td>
                <td className="p-2 border border-gray-300">✅ Full</td>
                <td className="p-2 border border-gray-300">❌ No</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-2 border border-gray-300 font-bold">Cost</td>
                <td className="p-2 border border-gray-300">✅ Free</td>
                <td className="p-2 border border-gray-300">❌ $$$</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-2 border border-gray-300 font-bold">Real Latency</td>
                <td className="p-2 border border-gray-300">✅ Yes</td>
                <td className="p-2 border border-gray-300">❌ Network added</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-2 border border-gray-300 font-bold">No Limits</td>
                <td className="p-2 border border-gray-300">✅ Unlimited</td>
                <td className="p-2 border border-gray-300">❌ Rate limited</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* System Requirements */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">System Requirements</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>M1/M2 Mac:</strong> Recommended (Metal acceleration). 8GB RAM minimum
            </li>
            <li>
              <strong>Intel Mac/Linux:</strong> Works but slower. 16GB RAM recommended
            </li>
            <li>
              <strong>Storage:</strong> 40GB free space (for all 3 models + cache)
            </li>
            <li>
              <strong>Internet:</strong> Only for initial model downloads from HuggingFace
            </li>
          </ul>
        </section>

        {/* Contributing */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Open Source</h2>
          <p>
            This project is built entirely with free, open-source libraries and is designed to
            be production-ready and industry-grade. Contributions welcome!
          </p>
        </section>
      </div>
    </div>
  );
};
