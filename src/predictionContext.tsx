import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { PredictionResult } from './model'
import { supabase } from './supabase'

export interface HistoryEntry {
  id: number
  timestamp: string
  input: Record<string, number>
  result: PredictionResult
}

interface PredictionContextType {
  history: HistoryEntry[]
  addPrediction: (input: Record<string, number>, result: PredictionResult) => void
  loading: boolean
}

export const PredictionContext = createContext<PredictionContextType>({
  history: [],
  addPrediction: () => {},
  loading: true,
})

export const usePredictionHistory = () => useContext(PredictionContext)

export function PredictionProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('predictions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20)

        if (error) throw error

        if (data) {
          const entries: HistoryEntry[] = data.map((row) => ({
            id: row.id,
            timestamp: new Date(row.created_at).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            input: {
              Transaction_Amount: parseFloat(row.transaction_amount),
              Time_of_Transaction: row.time_of_transaction,
              Previous_Fraudulent_Transactions: row.previous_fraudulent_transactions,
              Account_Age: row.account_age,
              Number_of_Transactions_Last_24H: row.number_of_transactions_last_24h,
            },
            result: {
              probability: parseFloat(row.probability),
              isFraud: row.is_fraud,
              riskLevel: row.risk_level,
              riskScore: row.risk_score,
              processingTimeMs: parseFloat(row.processing_time_ms),
            },
          }))
          setHistory(entries)
        }
      } catch (err) {
        console.error('Failed to load prediction history:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const addPrediction = useCallback(async (input: Record<string, number>, result: PredictionResult) => {
    const entry: HistoryEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      input,
      result,
    }
    setHistory((prev) => [entry, ...prev].slice(0, 20))

    try {
      const { error } = await supabase.from('predictions').insert({
        transaction_amount: input.Transaction_Amount,
        time_of_transaction: input.Time_of_Transaction,
        previous_fraudulent_transactions: input.Previous_Fraudulent_Transactions,
        account_age: input.Account_Age,
        number_of_transactions_last_24h: input.Number_of_Transactions_Last_24H,
        probability: result.probability,
        is_fraud: result.isFraud,
        risk_level: result.riskLevel,
        risk_score: result.riskScore,
        processing_time_ms: result.processingTimeMs,
      })
      if (error) console.error('Failed to save prediction:', error)
    } catch (err) {
      console.error('Failed to save prediction:', err)
    }
  }, [])

  return (
    <PredictionContext.Provider value={{ history, addPrediction, loading }}>
      {children}
    </PredictionContext.Provider>
  )
}
