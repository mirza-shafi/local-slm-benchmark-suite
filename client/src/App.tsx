/**
 * Main App Component
 */
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { BenchmarkPage } from "./pages/Benchmark";
import { AboutPage } from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
              🚀 SLM Benchmark
            </Link>

            <div className="flex gap-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 font-semibold transition"
              >
                Home
              </Link>
              <Link
                to="/benchmark"
                className="text-gray-600 hover:text-blue-600 font-semibold transition"
              >
                Benchmark
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600 font-semibold transition"
              >
                About
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <main className="min-h-[calc(100vh-80px)]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/benchmark" element={<BenchmarkPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-8 mt-12 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="mb-2">Local SLM Benchmark Suite v1.0</p>
            <p className="text-sm text-gray-400">
              Production-grade benchmarking for Small Language Models. Privacy-first. Free.
              Open-source.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
