# MillOps CNC Hub

MillOps CNC Hub is a modern, mobile-friendly CNC milling web app built with React + TypeScript + Vite.

It provides:
- Practical CNC calculators (spindle speed, feed rate, MRR, metric conversion)
- Advanced process planner (chip thinning, cycle time, spindle HP/torque/load)
- Interactive visualizations (feed curve, engagement meter, spindle load meter)
- A structured CNC skill roadmap for milling operators and programmers
- Tooling and shop workflow references
- Searchable G/M code explorer
- Material cutting-speed reference data
- Dark mode with persisted theme selection

## Tech Stack

- React 19
- TypeScript
- Vite 8
- ESLint

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production Build

```bash
npm run lint
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/
    CalculatorPanel.tsx
    ThemeToggle.tsx
  data/
    content.ts
  utils/
    cncMath.ts
  App.tsx
  main.tsx
  index.css
```
