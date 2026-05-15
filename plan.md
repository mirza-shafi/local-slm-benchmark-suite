# Local SLM Benchmark Suite - Project Plan

## Executive Summary
A production-grade benchmarking application to compare Small Language Models (SLMs) running entirely offline. The project demonstrates understanding of real-world constraints: privacy, latency, cost, and quality-vs-speed tradeoffs. Built with FastAPI (backend) + React/TypeScript (client) using only free resources.

---

## 1. Project Vision & Goals

### Core Value Proposition
- **Run models locally** → Full privacy (no data sent anywhere)
- **Benchmark inference performance** → Measure actual speed, memory, and quality on your hardware
- **Compare 3 models side-by-side** → See tradeoffs in a single interface
- **Understand constraints** → Show latency, throughput, token/sec, memory usage, output quality

### Real-World Constraints Addressed
| Constraint | How We Address It | MVP Implementation |
|---|---|---|
| **Privacy** | Models run locally; no external API calls | All models run on user's machine |
| **Latency** | Measure real inference time per model | Track time for each inference request |
| **Cost** | Free models, free tools, free hosting | Use Hugging Face models, open-source stack |
| **Hardware** | Support different CPU/GPU scenarios | Detect GPU, provide CPU fallback |

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                React Client (TSX)                    │
│  - Model selection                                   │
│  - Prompt input & configuration                      │
│  - Results visualization (latency, quality)          │
│  - Comparison charts & metrics                       │
└──────────────────┬──────────────────────────────────┘
                   │ HTTP/WebSocket
┌──────────────────▼──────────────────────────────────┐
│              FastAPI Backend                         │
│  - Model loading (HF models)                         │
│  - Inference execution                              │
│  - Performance metrics collection                    │
│  - Quality evaluation (BLEU, similarity)            │
└─────────────────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│         Local Model Runtime (Transformers)          │
│  - Model 1: TinyLlama-1.1B (fastest, basic)        │
│  - Model 2: Phi-2 (balanced, 2.7B)                 │
│  - Model 3: Mistral-7B (best quality)              │
└─────────────────────────────────────────────────────┘
```

---

## 3. Tech Stack & Rationale

### Backend: FastAPI
- **Why**: Modern, fast, built-in async support, automatic API docs (Swagger)
- **Key Libraries**:
  - `transformers` (HF) - Model loading & inference
  - `torch` / `onnxruntime` - Inference engine (CPU/GPU support)
  - `pydantic` - Request validation & type safety
  - `psutil` - System resource monitoring (CPU, RAM)

### Client: React + TypeScript (TSX)
- **Why**: Type-safe, component-based, real-time updates via WebSocket
- **Key Libraries**:
  - `axios` - HTTP client for API calls
  - `recharts` - Performance metrics visualization
  - `react-router` - Navigation
  - `tailwindcss` - Styling (free, utility-first)

### Models (All Free via Hugging Face)
1. **TinyLlama-1.1B** (600MB)
   - Fastest inference on M1 (even CPU is tolerable)
   - Lowest memory footprint (works everywhere)
   - Good for latency-critical demos
   
2. **Phi-2** (5.5GB, or quantized ~2.7GB)
   - Balanced: speed + quality on M1 Metal
   - Microsoft's efficient model
   - Quantized version runs well on Render CPU
   - Good reference point
   
3. **Mistral-7B** (28GB, or quantized ~4GB)
   - Best quality but **slow on Render CPU** (expect 5-15 sec per inference)
   - Shows extreme quality-vs-speed tradeoff
   - On M1: ~1-2 sec per inference with Metal acceleration

**M1 Local Dev**: Expect ~100-500ms for TinyLlama, ~500ms-2s for Phi-2, ~1-3s for Mistral-7B quantized  
**Render Backend**: CPU-only, expect 10-100x slower. Pre-quantized models recommended.

### Quantization Strategy (M1 Mac + Render CPU)
- Use `bitsandbytes` (with ONNX Runtime) for 8-bit quantization
- M1 support: PyTorch Metal Performance Shaders for local inference
- Reduces model size by ~75% with minimal quality loss
- **Render backend**: CPU-only, so we'll use aggressive quantization (4-bit or 8-bit)
- Models run reasonably on M1 locally; on Render use pre-quantized versions

---

## 4. MVP Feature Set

### Phase 1 (Core - Week 1)
- [x] Model loading & inference pipeline
- [x] Single prompt benchmark (measure time to first token, total inference time)
- [x] Compare 3 models on same prompt
- [x] Display metrics: latency, throughput, memory used
- [x] Basic UI: input prompt, select models, run benchmark

### Phase 2 (Quality & Analytics - Week 2)
- [x] Save & display full model outputs (side-by-side comparison)
- [x] BLEU score calculation & semantic similarity (quality metrics)
- [x] Global analytics header: aggregate stats, model rankings
- [x] Charts: latency comparison, quality scores, throughput trends

### Phase 3 (Advanced Features - Week 3)
- [x] **Prompt Optimization**: Suggest improved prompts for better outputs
- [x] **Cost Estimation**: Estimate inference cost (compute time + energy on Render)
- [x] Batch benchmarking (run multiple prompts)
- [x] Results history & export (JSON, CSV)
- [x] Hardware info display (M1 Metal support, Render specs)

---

## 5. Directory Structure (MVP)

```
local-slm-benchmark-suite/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI app entry
│   │   ├── config.py               # Configuration (model names, paths)
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── loader.py           # Model loading logic
│   │   │   └── inference.py        # Inference runner
│   │   ├── metrics/
│   │   │   ├── __init__.py
│   │   │   ├── performance.py      # Latency, throughput, memory
│   │   │   ├── quality.py          # BLEU, similarity scores
│   │   │   └── optimizer.py        # Prompt optimization suggestions
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── benchmark.py        # /api/benchmark endpoint
│   │   │   ├── models.py           # /api/models endpoint
│   │   │   ├── system.py           # /api/system endpoint
│   │   │   ├── optimize.py         # /api/optimize endpoint
│   │   │   └── cost.py             # /api/cost endpoint
│   │   └── utils/
│   │       ├── __init__.py
│   │       ├── logger.py           # Logging setup
│   │       └── cache.py            # Model cache management
│   ├── requirements.txt
│   ├── .env.example
│   ├── Dockerfile                  # For Render deployment
│   └── README.md
│
├── client/
│   ├── src/
│   │   ├── index.tsx               # React entry point
│   │   ├── App.tsx                 # Main app component
│   │   ├── components/
│   │   │   ├── GlobalAnalytics.tsx # Header: rankings, avg metrics
│   │   │   ├── PromptInput.tsx     # Prompt + model selection
│   │   │   ├── OutputComparison.tsx # Side-by-side model outputs
│   │   │   ├── MetricsPanel.tsx    # Latency, throughput, memory
│   │   │   ├── QualityScores.tsx   # BLEU, similarity visualization
│   │   │   ├── CostEstimate.tsx    # Inference cost breakdown
│   │   │   ├── PromptOptimizer.tsx # Suggestion engine UI
│   │   │   ├── SystemInfo.tsx      # M1 Metal info, Render info
│   │   │   └── History.tsx         # Results history & export
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Benchmark.tsx
│   │   │   └── About.tsx
│   │   ├── hooks/
│   │   │   ├── useBenchmark.ts     # API call hook
│   │   │   ├── useSystemInfo.ts    # System metrics hook
│   │   │   └── useCostEstimate.ts  # Cost calculation hook
│   │   ├── services/
│   │   │   └── api.ts              # API client
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript types
│   │   ├── styles/
│   │   │   └── globals.css         # Tailwind imports
│   │   └── utils/
│   │       ├── formatting.ts       # Display formatting
│   │       └── metrics.ts          # Metric calculations
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── README.md
│
├── plan.md                         # Project plan
├── README.md                       # Project overview
├── .gitignore
├── docker-compose.yml             # Local + Render simulation
└── DEPLOYMENT.md                  # Render deployment guide
```

---

## 5.5. UI Layout: Side-by-Side Comparison with Global Analytics

### Global Analytics Header (Top)
```
┌─────────────────────────────────────────────────────────────────────┐
│ 📊 Global Analytics Dashboard                                       │
│ ┌─────────────────┬──────────────────┬──────────────────────────┐  │
│ │ Fastest Model   │ Best Quality     │ Most Efficient           │  │
│ │ TinyLlama       │ Mistral-7B       │ Phi-2                    │  │
│ │ 120ms avg       │ 0.89 BLEU        │ 0.42ms/token             │  │
│ └─────────────────┴──────────────────┴──────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Main Content: Side-by-Side Comparison
```
┌─────────────────────────────────────────────────────────────────────┐
│ Prompt Input & Controls                                             │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ [Textarea: Enter your prompt...                            ]  │ │
│ │                                                              │ │
│ │ [Select Models: ☐ TinyLlama  ☐ Phi-2  ☐ Mistral-7B]      │ │
│ │ [Run Benchmark]  [Load from History]                       │ │
│ └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  Model 1: TinyLlama        │  Model 2: Phi-2          │  Model 3: Mistral-7B
│  Output:                   │  Output:                 │  Output:
│  ┌──────────────────────┐  │  ┌──────────────────────┐  │  ┌──────────────────────┐
│  │ Quantum computing is │  │  │ Quantum computing is │  │  │ Quantum computing is │
│  │ a field where...     │  │  │ a branch of computer │  │  │ a computational      │
│  │ (truncated)          │  │  │ science that explores│  │  │ paradigm that        │
│  │                      │  │  │ (truncated)          │  │  │ leverages quantum    │
│  └──────────────────────┘  │  └──────────────────────┘  │  │ (truncated)          │
│  Metrics:                  │  Metrics:                │  └──────────────────────┘
│  • Latency: 120ms          │  • Latency: 450ms       │  Metrics:
│  • TTFT: 45ms              │  • TTFT: 120ms          │  • Latency: 2.1s
│  • Throughput: 21 tok/s    │  • Throughput: 15 tok/s │  • TTFT: 380ms
│  • Quality: 0.72 BLEU      │  • Quality: 0.84 BLEU   │  • Throughput: 12 tok/s
│  • Memory: 2GB             │  • Memory: 5GB          │  • Quality: 0.89 BLEU
│  • Cost: $0.0001           │  • Cost: $0.0003        │  • Memory: 8GB
│                            │                         │  • Cost: $0.001
│
│ [💡 Optimize Prompt]  [📊 Export Results]  [🔄 Run Again]
└─────────────────────────────────────────────────────────────────────┘

Prompt Optimization Panel (Optional)
┌─────────────────────────────────────────────────────────────────────┐
│ 💡 Suggested Improvements                                           │
│ • Add specificity: "Explain quantum computing with examples"      │
│ • Structure: "Define, explain applications, discuss limitations"  │
│ • Expected gain: ~+0.15 BLEU score                                │
│ [Apply Suggestion]                                                  │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Features of This Layout
1. **Global Analytics Header**: Immediate view of rankings (fastest, best quality, most efficient)
2. **Side-by-Side Outputs**: Compare model responses directly without scrolling
3. **Unified Metrics Panel**: Same metrics for each model, easy comparison
4. **Cost Visibility**: Show inference cost per model (important for Render deployment)
5. **Prompt Optimization**: Suggest better prompts inline
6. **Responsive Design**: On mobile, stack vertically; on desktop, 3-column layout

---

## 6. API Endpoints (Backend)

### 1. **POST /api/benchmark**
Run inference on selected models with a given prompt.

```json
Request:
{
  "prompt": "Explain quantum computing in 100 words",
  "models": ["tinyllama", "phi-2", "mistral-7b"],
  "max_tokens": 256,
  "temperature": 0.7
}

Response:
{
  "benchmark_id": "uuid-123",
  "timestamp": "2026-05-16T10:00:00Z",
  "results": [
    {
      "model": "tinyllama",
      "output": "Quantum computers use...",
      "metrics": {
        "inference_time_ms": 1250,
        "time_to_first_token_ms": 45,
        "throughput_tokens_per_sec": 20.5,
        "memory_used_mb": 2048,
        "quality_score": 0.65
      }
    },
    ...
  ]
}
```

### 2. **GET /api/models**
List available models and their status (loaded, downloading, not-installed).

```json
Response:
{
  "models": [
    {
      "id": "tinyllama",
      "name": "TinyLlama-1.1B",
      "size_mb": 600,
      "status": "loaded",
      "hardware_compatible": ["cpu", "gpu"]
    },
    ...
  ]
}
```

### 3. **GET /api/system**
Get hardware info (CPU cores, RAM, GPU availability).

```json
Response:
{
  "cpu_count": 8,
  "cpu_model": "Intel Core i7",
  "ram_total_gb": 16,
  "ram_available_gb": 8,
  "gpu_available": true,
  "gpu_name": "NVIDIA RTX 3060",
  "gpu_memory_gb": 12
}
```

### 4. **GET /api/results/:id**
Fetch a specific benchmark result by ID.

### 5. **GET /api/results**
List all historical benchmarks with pagination.

### 6. **POST /api/optimize**
Suggest improved prompts for better outputs.

```json
Request:
{
  "prompt": "What is AI?",
  "model": "phi-2"
}

Response:
{
  "original_prompt": "What is AI?",
  "suggestions": [
    {
      "optimized_prompt": "Explain Artificial Intelligence, covering its definition, key techniques (ML, DL, NLP), real-world applications, and current limitations. Be detailed but concise.",
      "expected_improvement": "More structured, specific output with better coverage",
      "technique": "Prompt engineering: specificity + structure"
    },
    ...
  ]
}
```

### 7. **POST /api/cost**
Estimate inference cost (compute time + energy on Render).

```json
Request:
{
  "models": ["tinyllama", "phi-2", "mistral-7b"],
  "num_prompts": 100,
  "avg_tokens_per_inference": 256
}

Response:
{
  "estimates": [
    {
      "model": "tinyllama",
      "total_inference_time_sec": 150,
      "estimated_render_cost_dollars": 0.05,
      "cost_per_inference": 0.0005,
      "energy_kwh": 0.015
    },
    ...
  ],
  "cheapest_model": "tinyllama",
  "best_quality_model": "mistral-7b",
  "recommendation": "Use tinyllama for latency-sensitive, mistral-7b for quality-critical"
}
```

---

## 7. Code Quality & Industry Standards

### Backend
- **Type Hints**: Every function annotated with `pydantic` models for request/response
- **Error Handling**: Custom exceptions, proper HTTP status codes, detailed error messages
- **Logging**: Structured logging (model loading, inference time, errors)
- **Testing**: Unit tests for metrics, mock model inference
- **Documentation**: Docstrings (Google style) for all public functions
- **Config Management**: Environment variables for model paths, batch sizes, timeouts

### Client
- **TypeScript Strict Mode**: Catch type errors at compile time
- **Component Structure**: Functional components with hooks, single responsibility
- **State Management**: React Context for global state (if needed), local state otherwise
- **API Contract**: `types/index.ts` defines all backend response types
- **Error Handling**: Try-catch, error boundaries, user-friendly messages
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

### Both
- **Linting**: ESLint (backend: pylint, mypy)
- **Formatting**: Prettier/Black for consistent code style
- **Git**: Meaningful commit messages, .gitignore excludes models & caches
- **Documentation**: README files, inline comments for complex logic

---

## 8. Benchmarking Methodology

### Metrics Collected

| Metric | Definition | Why It Matters |
|--------|-----------|---|
| **Latency** | Time from prompt submit to full response | User experience (how long to wait) |
| **Throughput** | Tokens generated per second | Raw speed (processing power) |
| **Time to First Token (TTFT)** | Time to start receiving output | Perceived responsiveness |
| **Memory Used** | Peak RAM during inference | Hardware requirements |
| **Quality Score** | BLEU score + semantic similarity | Output correctness |

### Quality Evaluation
- **BLEU Score**: Standard NLP metric (0-1 scale, higher is better)
- **Semantic Similarity**: Embed both model output and reference; compute cosine similarity
- **Manual Review**: UI allows side-by-side comparison for subjective assessment

### Fairness in Comparison
- Same prompt to all 3 models
- Same hardware constraints (CPU/GPU)
- Same sampling parameters (temperature, top-p)
- Measure multiple runs, report average + std dev

---

## 9. Privacy & Security

- **No External Calls**: All models run locally; no telemetry
- **Data Retention**: User can delete benchmark history anytime
- **No Authentication**: Single-user tool (for CV demo)
- **Model Caching**: Downloaded models stored in `~/.cache/huggingface` (standard location)

---

## 10. Deployment & Running

### Local Development (M1 Mac)

```bash
# Backend (uses M1 Metal acceleration for PyTorch)
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Client (separate terminal)
cd client
npm install
npm start
```

**Expected Performance on M1 Mac:**
- TinyLlama: ~100-200ms per inference
- Phi-2 (quantized): ~500ms-1s per inference
- Mistral-7B (4-bit quantized): ~2-5s per inference

### Render Deployment (Backend)

1. **Create Render account**: https://render.com (free tier available)
2. **Connect GitHub repo** to Render
3. **Deploy settings**:
   - Runtime: Python 3.11
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn -w 1 -k uvicorn.workers.UvicornWorker app.main:app`
   - Environment variables:
     ```
     QUANTIZATION_BITS=4
     MODEL_CACHE_DIR=/tmp/models
     RENDER_DEPLOYMENT=true
     ```

**Expected Performance on Render (Free Tier CPU):**
- TinyLlama: ~2-5s per inference
- Phi-2 (4-bit quantized): ~5-15s per inference
- Mistral-7B: 20-60s per inference (may timeout on Render free tier)

**Note**: On Render free tier, only TinyLlama and Phi-2 (4-bit) are practical. Mistral-7B requires paid tier.

### Client Deployment (Vercel/Netlify)

```bash
# Build for production
cd client
npm run build

# Deploy to Vercel (free tier)
npm install -g vercel
vercel
```

Set environment variable in Vercel:
```
REACT_APP_API_URL=https://your-render-backend.onrender.com
```

---

## 11. Single-Machine Production (Optional)

For a single machine setup:
```bash
docker-compose up -d
```

This will run:
- Backend on `http://localhost:8000`
- Client on `http://localhost:3000`
- Pre-downloads quantized models

---

## 12. Free Resources Used

| Resource | Purpose | Cost |
|---|---|---|
| **Hugging Face** | Model hosting/download | Free |
| **PyTorch / Transformers** | ML libraries | Free, open-source |
| **FastAPI** | Backend framework | Free, open-source |
| **React** | Frontend framework | Free, open-source |
| **Tailwind CSS** | Styling | Free |
| **Render** | Backend hosting | Free tier (400 hours/month) |
| **Vercel** | Frontend hosting | Free tier |
| **GitHub** | Version control | Free tier |
| **M1 Mac + Render CPU** | Compute | Your machine + Render free |

---

## 12. Success Criteria (CV-Ready)

✅ **Code Quality**
- No hardcoded values (use config)
- Proper error handling & logging
- Type-safe (TypeScript + Python type hints)
- Clear, documented API

✅ **Functionality**
- 3 models compare correctly
- Metrics accurately measured
- Quality evaluated consistently
- UI intuitive and responsive

✅ **Understanding**
- README explains design tradeoffs
- Code comments justify architectural decisions
- Metrics chosen for real-world relevance
- Privacy/latency/cost constraints visible in UI

✅ **Production Readiness**
- Handles edge cases (OOM, slow inference)
- Graceful degradation (CPU fallback if GPU OOM)
- Results exportable for analysis
- Reproducible (same prompt → similar results)

---

## 13. Development Timeline

| Phase | Duration | Deliverables |
|---|---|---|
| **1. Setup & Core** | Days 1-3 | FastAPI skeleton, model loading, basic benchmark |
| **2. Quality & Viz** | Days 4-6 | Quality metrics, React UI, comparison charts |
| **3. Polish & Docs** | Days 7-9 | Error handling, README, export, hardware info |
| **4. Testing & Deploy** | Days 10-11 | Unit tests, Docker setup, final polish |

---

## 14. Known Limitations & Tradeoffs

1. **Model Size**: Mistral-7B requires 28GB (or 4GB quantized). CPU inference very slow. GPU recommended.
2. **BLEU Score**: Imperfect quality metric. Consider adding reference-based evaluation.
3. **No GPU Requirement**: Works on CPU, but inference is slow. GPU strongly recommended for demo impact.
4. **Single User**: No auth/multi-user. Easy to add later if needed.
5. **Batch Benchmarking**: MVP supports sequential. Parallelization (future improvement).

---

## 15. Updated Plan Summary for M1 Mac + Render Deployment

✅ **Setup Finalized**
- **Local Dev**: M1 Mac with PyTorch Metal acceleration
- **Backend Deployed**: Render (free tier, CPU-only)
- **Frontend Deployed**: Vercel (free tier)
- **UI Layout**: Side-by-side comparison with global analytics header

✅ **Additional Features Included**
- **Prompt Optimization**: Suggest better prompts (higher BLEU scores)
- **Cost Estimation**: Show inference cost breakdown per model
- **M1 Optimization**: Detect Metal acceleration, show performance stats
- **Render Awareness**: Use aggressive quantization for CPU deployment

⚠️ **Limitations on Render Free Tier**
- TinyLlama & Phi-2 (4-bit): Practical for demo
- Mistral-7B: May timeout (30s limit) or require paid tier upgrade
- Solution: Show "Best Quality" only on M1 local; on Render, focus on TinyLlama + Phi-2

---

## 16. Questions Before Deployment

1. ✅ **GPU?** → M1 Mac Metal, Render CPU-only (understood)
2. ✅ **Additional features?** → Prompt optimization + cost estimation (added)
3. ✅ **UI layout?** → Side-by-side with global analytics header (ready)
4. **Model cutoff for Render?** → Should we disable Mistral-7B on Render to avoid timeouts, or try it with 8-bit quantization?
5. **Cost estimation method?** → Use Render pricing ($0.25/hour for free tier assumed cost), or custom formula?
