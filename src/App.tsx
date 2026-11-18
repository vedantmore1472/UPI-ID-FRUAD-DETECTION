import { useState } from 'react'
import { SECTIONS, type SectionId } from './sections'
import { Overview } from './sections/Overview'
import { TransactionAnalysis } from './sections/TransactionAnalysis'
import { ModelPerformance } from './sections/ModelPerformance'
import { DatasetExplorer } from './sections/DatasetExplorer'
import { Shield, CircleDot } from 'lucide-react'

export default function App() {
  const [active, setActive] = useState<SectionId>('overview')

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight">FraudSentry</span>
              <span className="text-[0.65rem] text-text-muted">Fraud Detection Platform</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CircleDot className="w-3 h-3 text-success animate-pulse" />
            <span className="text-xs font-medium text-success">Model Active</span>
          </div>
        </div>

        {/* Tab navigation */}
        <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-2">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {SECTIONS.map((s) => {
              const Icon = s.icon
              return (
                <button
                  key={s.id}
                  className={`tab-button ${active === s.id ? 'active' : ''}`}
                  onClick={() => setActive(s.id)}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              )
            })}
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6">
        {active === 'overview' && <Overview />}
        {active === 'analysis' && <TransactionAnalysis />}
        {active === 'performance' && <ModelPerformance />}
        {active === 'explorer' && <DatasetExplorer />}
        {active === 'analytics' && <div className="card p-12 text-center text-text-secondary text-sm">Fraud Analytics section — coming in the next build pass.</div>}
        {active === 'batch' && <div className="card p-12 text-center text-text-secondary text-sm">Batch Prediction section — coming in the next build pass.</div>}
        {active === 'model' && <div className="card p-12 text-center text-text-secondary text-sm">Model Information section — coming in the next build pass.</div>}
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Shield className="w-3 h-3" />
            <span>FraudSentry — Gradient Boosting Model · 46,065 training samples · Browser-based inference</span>
          </div>
          <div className="text-xs text-text-muted">Predictions stored in Supabase</div>
        </div>
      </footer>
    </div>
  )
}
