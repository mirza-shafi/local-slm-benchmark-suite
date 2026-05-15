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

---

## 🚀 How to Run This Project (Step-by-Step)

### **STEP 1: Check Prerequisites**

Open Terminal and verify you have everything:

```bash
# Check Python version (need 3.10+)
python3 --version

# Check Node.js version (need 18+)
node --version
npm --version

# Check available disk space (need ~40GB)
df -h ~

# Check available RAM
vm_stat | grep "Pages free"
```

**Requirements:**
- ✅ Python 3.10 or higher
- ✅ Node.js 18 or higher  
- ✅ 40GB free disk space (for models)
- ✅ 8GB RAM minimum (16GB+ recommended)
- ✅ M1/M2 Mac recommended (Intel works but slower)

**Don't have Python 3.10+?** Install via Homebrew:
```bash
brew install python@3.11
```

**Don't have Node 18+?** Install via Homebrew:
```bash
brew install node@18
```

---

### **STEP 2: Navigate to Project**

```bash
cd ~/sproject/local-slm-benchmark-suite
```

List files to confirm you're in right place:
```bash
ls -la
# You should see: backend/, client/, README.md, plan.md, SETUP.md
```

---

### **STEP 3: Install Backend (Python)**

#### **3a. Create Virtual Environment**

```bash
cd backend
python3 -m venv venv
```

This creates a virtual environment in `backend/venv/` to isolate Python packages.

#### **3b. Activate Virtual Environment**

```bash
source venv/bin/activate
```

You should see `(venv)` prefix in your terminal:
```
(venv) user@macbook backend %
```

#### **3c. Upgrade pip**

```bash
pip install --upgrade pip setuptools wheel
```

#### **3d. Install Python Dependencies**

```bash
pip install -r requirements.txt
```

This installs all required packages:
- PyTorch (with M1 Metal support for fast inference)
- Transformers (HuggingFace library)
- FastAPI (web framework)
- Uvicorn (ASGI server)
- NLTK (NLP utilities)
- And more...

**This may take 5-10 minutes.** ☕

#### **Verify Backend Installation**

```bash
python -c "import torch; print(f'PyTorch {torch.__version__}'); print(f'M1 Metal available: {torch.backends.mps.is_available()}')"
```

Should output something like:
```
PyTorch 2.1.0
M1 Metal available: True  # (or False on Intel - still works)
```

---

### **STEP 4: Install Frontend (Node.js)**

#### **4a. Navigate to Client**

Open **new terminal** (keep backend terminal open):
```bash
cd ~/sproject/local-slm-benchmark-suite/client
```

#### **4b. Install Dependencies**

```bash
npm install
```

This installs:
- React 18 (UI framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- React Router (navigation)
- Axios (API client)
- And more...

**This may take 5 minutes.** ☕

#### **Verify Frontend Installation**

```bash
npm list react react-dom
```

Should show React 18 versions.

---

### **STEP 5: Run Backend Server**

Go back to **first terminal** (backend):

```bash
cd backend
source venv/bin/activate  # If not already activated
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

✅ **Backend is running!** Keep this terminal open.

**Test it works:**
Open new terminal and run:
```bash
curl http://localhost:8000/health
```

Should return a success message.

**View API Docs:**
Go to http://localhost:8000/docs in your browser (interactive API documentation)

---

### **STEP 6: Run Frontend Server**

In **second terminal** (client):

```bash
cd ~/sproject/local-slm-benchmark-suite/client
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view frontend in the browser.

Local:            http://localhost:3000
```

Browser will automatically open http://localhost:3000 (or open manually if not).

✅ **Frontend is running!** Keep this terminal open.

---

### **STEP 7: You're Ready! 🎉**

Both servers running:
- ✅ **Backend:** http://localhost:8000 (API running)
- ✅ **Frontend:** http://localhost:3000 (Website open)
- ✅ **API Docs:** http://localhost:8000/docs (Interactive documentation)

### **STEP 8: Run Your First Benchmark**

1. In browser at http://localhost:3000, you'll see the home page
2. Click **"Start Benchmarking"** or go to http://localhost:3000/benchmark
3. Enter a test prompt: 
   ```
   What is quantum computing? Explain in 100 words.
   ```
4. Select **"TinyLlama"** (fastest for first test)
5. Click **"Run Benchmark"** button
6. **Wait 1-5 minutes** (first run downloads the model)

**First run:**
- Downloads TinyLlama model (~600MB) from HuggingFace
- Saves to `~/.cache/huggingface/`
- Runs inference
- Shows results with latency, memory, quality scores

**Second run:**
- Uses cached model
- Instant results (no download)

---

## 📊 What You'll See

The UI shows:
- **Global Analytics** (top): Fastest, Best Quality, Most Efficient models
- **Side-by-Side Outputs** (center): Model responses compared
- **Performance Metrics** (left): Latency, throughput, memory for each model
- **Quality Scores** (center-bottom): BLEU score, semantic similarity
- **Cost Breakdown** (right): Energy and resource costs
- **System Info** (top-right): Your hardware details (M1 Metal, RAM, etc.)

---

## ⚠️ Troubleshooting

### **Backend won't start**

```bash
# Check if port 8000 is in use
lsof -i :8000

# Kill the process if needed
kill -9 <PID>

# Try different port
python -m uvicorn app.main:app --port 8001
```

### **Frontend won't start**

```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill the process if needed
kill -9 <PID>

# Try different port
PORT=3001 npm start
```

### **Python packages not installing**

```bash
# Clear pip cache and try again
pip install --no-cache-dir -r requirements.txt

# Or use conda (if installed)
conda env create -f environment.yml
```

### **npm packages not installing**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### **Models not downloading**

```bash
# Check disk space
df -h ~

# Check internet connection
ping huggingface.co

# Check cache directory
ls -la ~/.cache/huggingface/

# If stuck, clear cache
rm -rf ~/.cache/huggingface/
# And try again
```

### **Out of memory error**

```bash
# Close other applications
# Or use smaller model first (TinyLlama)
# Check available memory
vm_stat
```

---

## 🛑 Stopping Servers

When done, press `Ctrl+C` in each terminal:

```bash
# In backend terminal
Ctrl+C

# In frontend terminal  
Ctrl+C
```

---

## 📋 Summary: Running the Project

**Every time you want to use the project:**

**Terminal 1 - Backend:**
```bash
cd ~/sproject/local-slm-benchmark-suite/backend
source venv/bin/activate
python -m uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd ~/sproject/local-slm-benchmark-suite/client
npm start
```

**Then:**
- Open http://localhost:3000 in browser
- Go to Benchmark page
- Enter prompt, select models, run!

---

## 📚 Quick Start (TL;DR)

```bash
# Setup (one time)
cd ~/sproject/local-slm-benchmark-suite
cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt
cd ../client && npm install

# Run (every time)
# Terminal 1:
cd backend && source venv/bin/activate && python -m uvicorn app.main:app --reload

# Terminal 2:
cd client && npm start

# Open browser: http://localhost:3000
```

---

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
