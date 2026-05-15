# Local SLM Benchmark Suite

A production-grade benchmarking application for Small Language Models running entirely on your local hardware. Compare TinyLlama, Phi-2, and Mistral-7B with full privacy, real latency metrics, and quality-vs-speed analysis.

## 🎯 Core Features

✅ **Full Privacy** - Models run locally, no data sent anywhere  
✅ **Real Metrics** - Measure actual latency, throughput, memory on your hardware  
✅ **Quality Analysis** - BLEU scores and semantic similarity comparison  
✅ **Prompt Optimization** - AI-powered suggestions to improve outputs  
✅ **Cost Breakdown** - Understand inference costs and energy consumption  
✅ **Side-by-Side UI** - Compare outputs and metrics in one unified view  
✅ **Results History** - Save and retrieve past benchmarks

## 🚀 Quick Start

### Prerequisites

- **M1/M2 Mac** (recommended) or Intel Mac/Linux
- **Python 3.10+**
- **Node.js 18+**
- **8GB RAM minimum** (16GB+ recommended)
- **40GB disk space** (for all 3 models)

### Installation & Setup

```bash
# Clone repository
git clone <repo-url>
cd local-slm-benchmark-suite

# Backend Setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Client Setup (in new terminal)
cd client
npm install
```

### Running the Application

**Terminal 1 - Backend (FastAPI)**
```bash
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend (React)**
```bash
cd client
npm start
```

Then open http://localhost:3000 in your browser.

## 📊 Performance Expectations (M1 Mac)

| Model | Size | Latency | Memory | Quality |
|-------|------|---------|--------|---------|
| **TinyLlama-1.1B** | 600MB | ~150ms | ~2GB | Good |
| **Phi-2** | 2.7GB (quantized) | ~800ms | ~5GB | Very Good |
| **Mistral-7B** | 4GB (quantized) | ~2-3s | ~8GB | Excellent |

*Times are approximate, hardware-dependent*

## 📁 Project Structure

```
local-slm-benchmark-suite/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── main.py            # FastAPI app entry
│   │   ├── config.py          # Settings
│   │   ├── models/            # Model loading & inference
│   │   ├── metrics/           # Performance & quality metrics
│   │   ├── routes/            # API endpoints
│   │   └── utils/             # Logger, cache
│   ├── requirements.txt
│   └── README.md
│
├── client/                     # React TypeScript frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Route pages
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API client
│   │   ├── types/             # TypeScript definitions
│   │   ├── utils/             # Utilities
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── plan.md                     # Detailed project plan
├── README.md                   # This file
└── .gitignore
```

## 🔌 API Endpoints

### Benchmarking
- `POST /api/benchmark/` - Run benchmark on models
- `GET /api/benchmark/results` - List history
- `GET /api/benchmark/results/{id}` - Get specific result
- `DELETE /api/benchmark/results/{id}` - Delete result

### Models
- `GET /api/models/` - List available models
- `GET /api/models/{id}` - Get model info

### System
- `GET /api/system/` - Get hardware info

### Optimization
- `POST /api/optimize/` - Get prompt suggestions
- `GET /api/optimize/techniques` - List techniques

### Cost
- `POST /api/cost/` - Estimate inference cost

Full API docs available at http://localhost:8000/docs (Swagger UI)

## 🎯 How It Works

1. **Model Loading**: Lazy-loads models from HuggingFace on first use
2. **Inference**: Runs prompt through all selected models
3. **Metrics Collection**: Tracks latency, throughput, memory, tokens/sec
4. **Quality Evaluation**: Computes BLEU score and semantic similarity
5. **Results Caching**: Saves results locally for history
6. **UI Visualization**: Displays side-by-side comparison with analytics

## 🔒 Privacy & Security

- **No External Calls**: All models run locally
- **No Telemetry**: No data collection or tracking
- **Local Storage**: Results saved in `~/.cache/slm-benchmark/`
- **Data Ownership**: You control all data

## 📈 Understanding the Metrics

- **Latency (ms)**: Time to complete response. Lower = faster.
- **TTFT (ms)**: Time to First Token. How responsive it feels.
- **Throughput (tok/s)**: Tokens per second. Higher = faster processing.
- **Memory (MB)**: Peak RAM used. Lower = less hardware needed.
- **Quality (BLEU)**: Output correctness (0-1 scale). Higher = better.
- **Cost**: Energy & resource cost breakdown.

## 💻 Development Notes

### Backend
- **FastAPI**: Modern async framework
- **PyTorch**: Inference engine with M1 Metal support
- **Transformers**: HuggingFace model loading
- **Type Safety**: Full pydantic models for requests/responses

### Frontend
- **React 18**: UI framework
- **TypeScript**: Strict type checking
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side navigation

### Code Quality
- Type hints everywhere (Python + TypeScript)
- Comprehensive error handling
- Structured logging
- Config management
- Unit-testable design

## 🤖 Supported Models

### TinyLlama-1.1B
- **Size**: 600MB
- **Speed**: ⚡⚡⚡ Fastest
- **Quality**: ⭐⭐ Basic
- **Best for**: Latency-critical, hardware-constrained

### Phi-2
- **Size**: 2.7GB (quantized)
- **Speed**: ⚡⚡ Fast
- **Quality**: ⭐⭐⭐ Good
- **Best for**: Balanced use cases

### Mistral-7B
- **Size**: 4GB (quantized)
- **Speed**: ⚡ Slower
- **Quality**: ⭐⭐⭐⭐⭐ Excellent
- **Best for**: Quality-critical tasks

## 🚨 Troubleshooting

### Models Not Downloading
- Check internet connection (first run downloads models)
- Ensure enough disk space (40GB)
- Check `~/.cache/slm-benchmark/models/` directory

### Out of Memory
- Close other applications
- Use smaller models first (TinyLlama)
- Reduce batch size
- Increase swap space

### Slow Inference
- M1/M2 should be fast (~150ms-3s)
- Intel Mac slower without GPU
- Check system load: `top` or Activity Monitor
- Disable other apps

### Connection Refused (API)
- Ensure backend running on port 8000
- Check firewall settings
- Verify `REACT_APP_API_URL` env variable

## 📚 Resources

- [Plan.md](./plan.md) - Detailed project plan & architecture
- [Backend README](./backend/README.md) - Backend documentation
- [Client README](./client/README.md) - Frontend documentation
- [FastAPI Docs](http://localhost:8000/docs) - Interactive API documentation

## 📝 License

This project is built with free, open-source libraries and is intended for portfolio/CV demonstration.

## 🎓 Learning Resources

This project demonstrates:
- Full-stack application development (FastAPI + React)
- ML model integration and performance optimization
- Type-safe code (TypeScript + Python)
- REST API design
- React hooks and component patterns
- Tailwind CSS for responsive design
- Production-ready code practices

## 🚀 Next Steps

1. Run `npm install` in `/client` to install dependencies
2. Run backend server: `python -m uvicorn app.main:app --reload`
3. Run frontend: `npm start` in `/client`
4. Open http://localhost:3000
5. Enter a prompt and select models to compare

---

**Built with FastAPI + React + PyTorch**  
**Production-grade code quality for your portfolio**
