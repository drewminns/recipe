import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { CategoriesList } from './Containers/CategoriesList'
import { Category } from './Containers/Category'
import { Loading } from './Components'

const URI_BASE = 'https://www.themealdb.com/api/json/v1/1/'
const CATEGORIES = 'categories.php'

export const App: React.FC<{}> = () => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${URI_BASE}${CATEGORIES}`)
        const json = await res.json()
        setCategories(json.categories)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setError(err)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Router>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </header>
      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {categories && <CategoriesList categories={categories} />}
        <Switch>
          <Route strict path="/categories/:categoryname">
            <Category />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

App.displayName = 'App'
