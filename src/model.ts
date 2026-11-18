import modelData from './gb_model.json'
import statsData from './dataset_stats.json'
import evalData from './evaluation.json'
import sampleData from './dataset_sample.json'

interface TreeNode {
  f?: number
  t?: number
  l?: number
  r?: number
  v?: number
}

interface ModelData {
  features: string[]
  trees: TreeNode[][]
  init: number
  lr: number
}

const model = modelData as ModelData

function predictTree(tree: TreeNode[], features: number[]): number {
  let node = tree[0]
  while (node.f !== undefined) {
    if (features[node.f] <= node.t!) {
      node = tree[node.l!]
    } else {
      node = tree[node.r!]
    }
  }
  return node.v!
}

export interface PredictionResult {
  probability: number
  isFraud: boolean
  riskLevel: 'Low' | 'Moderate' | 'High'
  riskScore: number
  processingTimeMs: number
}

export function predict(input: Record<string, number>): PredictionResult {
  const start = performance.now()
  const features = model.features.map((f) => input[f] ?? 0)

  let logOdds = model.init
  for (const tree of model.trees) {
    logOdds += model.lr * predictTree(tree, features)
  }

  const probability = 1 / (1 + Math.exp(-logOdds))
  const isFraud = probability >= 0.5
  const riskScore = Math.round(probability * 100)

  let riskLevel: PredictionResult['riskLevel']
  if (probability < 0.35) riskLevel = 'Low'
  else if (probability < 0.5) riskLevel = 'Moderate'
  else riskLevel = 'High'

  const processingTimeMs = performance.now() - start
  return { probability, isFraud, riskLevel, riskScore, processingTimeMs }
}

export interface BatchPredictionRow {
  input: Record<string, string>
  probability: number
  isFraud: boolean
  riskLevel: string
}

export function predictBatch(rows: Record<string, string>[]): BatchPredictionRow[] {
  return rows.map((row) => {
    const input: Record<string, number> = {}
    for (const f of model.features) {
      const val = parseFloat(row[f])
      input[f] = isNaN(val) ? 0 : val
    }
    const res = predict(input)
    return {
      input: row,
      probability: res.probability,
      isFraud: res.isFraud,
      riskLevel: res.riskLevel,
    }
  })
}

export function getFeatureNames(): string[] {
  return model.features
}

export function getTreeCount(): number {
  return model.trees.length
}

export function getLearningRate(): number {
  return model.lr
}

export function getModelInfo() {
  return {
    type: 'Gradient Boosting Classifier',
    artifact: 'gb_model.json (exported from trained_model.pkl)',
    features: model.features,
    treeCount: model.trees.length,
    learningRate: model.lr,
    initScore: model.init,
  }
}

export function getDatasetStats() {
  return statsData
}

export function getEvaluation() {
  return evalData
}

export function getSampleRows() {
  return sampleData as Record<string, string>[]
}

// Feature importance: count how often each feature is used as a split
export function getFeatureImportance(): { feature: string; importance: number }[] {
  const counts = new Array(model.features.length).fill(0)
  let total = 0
  for (const tree of model.trees) {
    for (const node of tree) {
      if (node.f !== undefined) {
        counts[node.f]++
        total++
      }
    }
  }
  return model.features.map((f, i) => ({
    feature: f,
    importance: total > 0 ? counts[i] / total : 0,
  })).sort((a, b) => b.importance - a.importance)
}
