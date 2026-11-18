import { Shield, Activity, BarChart3, Database, TrendingUp, Upload, Info, LayoutDashboard } from 'lucide-react'

export type SectionId = 'overview' | 'analysis' | 'performance' | 'explorer' | 'analytics' | 'batch' | 'model'

export const SECTIONS: { id: SectionId; label: string; icon: typeof Shield }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'analysis', label: 'Transaction Analysis', icon: Activity },
  { id: 'performance', label: 'Model Performance', icon: BarChart3 },
  { id: 'explorer', label: 'Dataset Explorer', icon: Database },
  { id: 'analytics', label: 'Fraud Analytics', icon: TrendingUp },
  { id: 'batch', label: 'Batch Prediction', icon: Upload },
  { id: 'model', label: 'Model Information', icon: Info },
]

export { Shield }
