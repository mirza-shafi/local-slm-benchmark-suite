# Setup Guide - Local SLM Benchmark Suite

Complete step-by-step setup instructions for macOS (M1/M2).

## Prerequisites

Verify you have:
- **macOS 12+** (Monterey or newer)
- **M1/M2 chip** (Intel works but slower)
- **Python 3.10+**: `python3 --version`
- **Node.js 18+**: `node --version`
- **40GB free disk space** (for all 3 models)
- **8GB+ RAM** (16GB recommended)

## Installation Steps

### Step 1: Clone/Download Project

```bash
cd ~/sproject/local-slm-benchmark-suite
```

(Or clone from GitHub if not already there)

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt
```

This downloads:
- PyTorch (with M1 Metal support)
- Transformers (HuggingFace library)
- FastAPI & Uvicorn (backend framework)
- NLTK & other utilities

**First install may take 5-10 minutes.**

### Step 3: Client Setup

```bash
# In new terminal, navigate to client
cd client

# Install Node dependencies
npm install

# Verify Tailwind & build tools
npm list tailwindcss postcss autoprefixer
```

This downloads:
- React 18
- TypeScript
- Tailwind CSS
- Axios (HTTP client)
- React Router

**First npm install may take 5 minutes.**

### Step 4: Run Backend Server

```bash
# From backend directory, with venv activated
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

**Leave this running.** Backend is ready at `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

### Step 5: Run Frontend Server

```bash
# In new terminal, from client directory
npm start
```

You should see:
```
Compiled successfully!
Local:            http://localhost:3000
```

**Frontend is ready at `http://localhost:3000`**

Browser will automatically open. If not, go to http://localhost:3000

### Step 6: First Benchmark Run

1. **On first visit**, you'll see the home page
2. **Click "Start Benchmarking"** or navigate to `/benchmark`
3. **Select models**: Choose at least 1 (recommend TinyLlama first)
4. **Enter a prompt**: E.g., "Explain quantum computing in 100 words"
5. **Click "Run Benchmark"**

**First run will:**
- Download the selected model(s) from HuggingFace (~5-30 minutes depending on model size)
- Save to `~/.cache/huggingface/`
- Run inference
- Display results

Subsequent runs are instant (models cached).

## Troubleshooting Setup

### Python Installation Issues

```bash
# Check Python version
python3 --version

# If not 3.10+, install via Homebrew
brew install python@3.11

# Create venv with explicit python
python3.11 -m venv venv
```

### Node Installation Issues

```bash
# Check Node version
node --version

# If not 18+, update via Homebrew or nvm
brew install node@18

# Or use nvm
nvm install 18
nvm use 18
```

### Pip Installation Issues

```bash
# Inside venv, upgrade pip
pip install --upgrade pip setuptools wheel

# Try again
pip install -r requirements.txt

# If still stuck, clear cache
pip install --no-cache-dir -r requirements.txt
```

### npm Installation Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Port Already in Use

If ports 8000 or 3000 are in use:

```bash
# Find process using port 8000
lsof -i :8000
# Kill it: kill -9 <PID>

# Or use different ports
python -m uvicorn app.main:app --port 8001
npm start -- --port 3001
```

Then update `REACT_APP_API_URL=http://localhost:8001/api`

### Models Not Downloading

```bash
# Check cache directory
ls -la ~/.cache/huggingface/

# Check disk space
df -h ~

# If full, delete cache and try again
rm -rf ~/.cache/huggingface/
```

Ensure **40GB free disk space**.

### Out of Memory During Model Load

```bash
# Check available memory
vm_stat

# Close other applications
# Or reduce model size (use TinyLlama first)
```

## Development Workflow

### Backend Development

1. Backend has `--reload` enabled
2. Change Python files → auto-reload
3. Check logs for errors
4. API docs at `http://localhost:8000/docs`

```bash
# Optional: Run tests
pytest app/

# Optional: Check type hints
mypy app/
```

### Frontend Development

1. Frontend has hot reload enabled
2. Change React/TypeScript files → auto-update in browser
3. Check browser console for errors
4. Open DevTools: `Cmd+Option+I`

```bash
# Optional: Check types
npm run tsc

# Optional: Run tests
npm test
```

### Environment Variables

Backend `.env`:
```bash
cp backend/.env.example backend/.env
# Edit backend/.env if needed
```

Frontend environment:
```bash
# In client/.env or during npm start
REACT_APP_API_URL=http://localhost:8000/api
```

## Stopping Servers

```bash
# Backend: Press Ctrl+C in terminal
^C

# Frontend: Press Ctrl+C in terminal
^C
```

## Performance Tuning (M1 Mac)

### Enable Metal Performance

PyTorch automatically detects M1 and uses Metal. Verify:

```python
import torch
print(torch.backends.mps.is_available())  # Should be True
print(torch.backends.mps.is_built())      # Should be True
```

### Monitor Performance

```bash
# Real-time CPU/Memory
top -o %CPU -o %MEM

# Or Activity Monitor
open -a "Activity Monitor"
```

## Production Deployment

For deployment to servers (Render, AWS, etc.):

```bash
# Build frontend
cd client
npm run build
# Creates optimized build in build/

# Backend via gunicorn
pip install gunicorn
gunicorn -w 1 -k uvicorn.workers.UvicornWorker app.main:app
```

## Next: Run Your First Benchmark

After successful setup:

1. Go to http://localhost:3000
2. Click "Benchmark"
3. Select "TinyLlama" (fastest, good for first test)
4. Enter prompt: "What is machine learning?"
5. Click "Run Benchmark"
6. Wait for results (~10-20 seconds first run)
7. Explore outputs, metrics, cost breakdown

## Getting Help

- **API Errors?** Check backend logs in terminal
- **UI Issues?** Check browser console (DevTools)
- **Model Download Stuck?** Check network connection
- **Out of Memory?** Close other apps, use smaller models first
- **Other issues?** Check README.md for more info

## Full Directory Structure After Setup

```
local-slm-benchmark-suite/
├── backend/
│   ├── venv/                    # ← Created by setup
│   ├── app/
│   ├── requirements.txt
│   └── .env                     # ← Copy from .env.example
├── client/
│   ├── node_modules/            # ← Created by npm install
│   ├── src/
│   ├── package.json
│   └── .env                     # ← Create with REACT_APP_API_URL
├── README.md
├── plan.md
└── SETUP.md                     # ← This file
```

And models cache:
```
~/.cache/huggingface/
~/.cache/slm-benchmark/
```

---

You're ready to benchmark! 🚀
