# Backend README

## Local SLM Benchmark Suite - Backend

FastAPI-based backend for benchmarking Small Language Models (SLMs).

### Features

- **Model Loading**: Load TinyLlama, Phi-2, Mistral-7B from HuggingFace
- **Inference Pipeline**: Run inference with performance tracking
- **Metrics**: Latency, throughput, memory usage, quality scores
- **Optimization**: Suggest prompt improvements
- **Cost Estimation**: Estimate inference cost and energy usage
- **Results Caching**: Save and retrieve benchmark history

### Quick Start

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Server will be available at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### API Endpoints

#### Benchmarking
- `POST /api/benchmark/` - Run benchmark on models
- `GET /api/benchmark/results` - List benchmark history
- `GET /api/benchmark/results/{id}` - Get specific result
- `DELETE /api/benchmark/results/{id}` - Delete result

#### Models
- `GET /api/models/` - List available models
- `GET /api/models/{id}` - Get model info
- `POST /api/models/clear-cache/{id}` - Clear model from cache

#### System
- `GET /api/system/` - Get system information (CPU, RAM, GPU)

#### Optimization
- `POST /api/optimize/` - Get prompt optimization suggestions
- `GET /api/optimize/techniques` - List optimization techniques

#### Cost
- `POST /api/cost/` - Estimate inference cost

### Configuration

Copy `.env.example` to `.env` and customize settings.

### M1 Mac Optimization

Backend auto-detects M1 Metal support:
- PyTorch Metal Performance Shaders for acceleration
- No additional configuration needed
- Typical performance: TinyLlama ~150ms, Phi-2 ~800ms, Mistral-7B ~3s

### Directory Structure

```
app/
├── main.py           # FastAPI app
├── config.py         # Settings
├── models/           # Model loading & inference
├── metrics/          # Performance & quality metrics
├── routes/           # API endpoints
└── utils/            # Logging, caching
```

### Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 400: Invalid request
- 404: Not found
- 500: Server error

Detailed error messages in response body.

### Logging

Logs written to `~/.cache/slm-benchmark/benchmark.log`
Set `LOG_LEVEL` env var to DEBUG for verbose output.

### Performance Tips

1. **First run**: Models download on first use (~5-30 min depending on model size)
2. **Subsequent runs**: Models cached locally, instant load
3. **Memory**: Keep only needed models loaded (use `/api/models/clear-cache`)
4. **M1 Performance**: Metal acceleration ~2-5x faster than CPU-only

---

Built with FastAPI, Transformers, PyTorch
