# Client README

## Local SLM Benchmark Suite - Frontend

React + TypeScript frontend for the SLM benchmarking application.

### Features

- **Side-by-Side Comparison**: View model outputs and metrics in a unified interface
- **Global Analytics Header**: Quick view of fastest, best quality, and most efficient models
- **Real-Time Metrics**: Latency, throughput, memory usage, quality scores
- **Prompt Optimization**: Get AI suggestions to improve your prompts
- **Cost Analysis**: View inference cost breakdown per model
- **System Information**: Display hardware capabilities and cache status
- **Results History**: Save and retrieve past benchmarks

### Tech Stack

- React 18 (UI framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- React Router (navigation)
- Axios (API client)
- Recharts (charts & visualization)

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Server runs on `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Creates optimized build in `build/` directory.

### Project Structure

```
src/
├── components/         # React components
│   ├── GlobalAnalytics.tsx
│   ├── PromptInput.tsx
│   ├── OutputComparison.tsx
│   ├── MetricsPanel.tsx
│   ├── QualityScores.tsx
│   ├── CostEstimate.tsx
│   ├── PromptOptimizer.tsx
│   ├── SystemInfo.tsx
│   └── History.tsx
├── pages/             # Route pages
│   ├── Home.tsx
│   ├── Benchmark.tsx
│   └── About.tsx
├── hooks/             # Custom React hooks
│   ├── useBenchmark.ts
│   ├── useSystemInfo.ts
│   └── useCostEstimate.ts
├── services/          # API client
│   └── api.ts
├── types/             # TypeScript definitions
│   └── index.ts
├── utils/             # Utilities
│   ├── formatting.ts
│   └── metrics.ts
├── styles/            # Global styles
│   └── globals.css
├── App.tsx            # Main app component
└── index.tsx          # React entry point
```

### Environment Variables

Create `.env` file in project root:

```
REACT_APP_API_URL=http://localhost:8000/api
```

Default connects to local backend.

### Type Safety

- All API responses are typed via `src/types/index.ts`
- Component props are TypeScript-strict
- API calls use typed hooks for runtime safety

### Styling

Using Tailwind CSS for utility-first styling:

- Mobile-first responsive design
- Dark mode ready
- Accessibility-focused

### Performance Optimization

- Code splitting via React Router
- Lazy loading of components
- Memoized hooks to prevent unnecessary re-renders
- Efficient state management

### Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Requires JavaScript enabled

---

Built with React + TypeScript + Tailwind CSS
