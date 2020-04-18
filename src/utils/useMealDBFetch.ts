import { useEffect, useState } from 'react'

import { ICategory, IMealById } from '../interfaces/mealDBResponse'

type useFetchType = { response: IMealDBResponse | null; error: {}; isLoading: boolean }

interface IMealDBResponse {
  categories?: ICategory[]
  meals?: IMealById[]
}

export const useMealDBFetch = (endpoint: string, query = ''): useFetchType => {
  const URI_BASE = 'https://www.themealdb.com/api/json/v1/1/'

  const [response, setResponse] = useState<IMealDBResponse | null>(null)
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      try {
        const res = await fetch(`${URI_BASE}/${endpoint}${query}`)
        const json = await res.json()
        setResponse(json)
        setIsLoading(false)
      } catch (err) {
        setError(err)
      }
    }

    fetchData()
  }, [endpoint])

  return { response, error, isLoading }
}
