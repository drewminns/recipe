import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import { GlobalStyle } from './GlobalStyles'
import { CategoriesList } from './Containers/CategoriesList'
import { Category } from './Containers/Category'
import { Loading } from './Components'
import { theme } from './GlobalStyles'

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
    <>
      <GlobalStyle />
      <Router>
        <LayoutStyles>
          {categories && <CategoriesList categories={categories} />}
          <Switch>
            <Route exact path="/">
              <CategoryEmpty>
                <CategoryEmptyText>Select a Category</CategoryEmptyText>
              </CategoryEmpty>
            </Route>
            <Route path="/:categoryname">
              <Category />
            </Route>
          </Switch>
        </LayoutStyles>
      </Router>
    </>
  )
}

const LayoutStyles = styled.main`
  display: grid;
  grid-template-columns: 1fr 5fr;
  height: 100vh;
  overflow: hidden;
`

const CategoryEmpty = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CategoryEmptyText = styled.p`
  color: ${theme.color.gray};
  font-family: ${theme.font.sans};
  font-weight: ${theme.font.bold};
  text-transform: uppercase;
`

App.displayName = 'App'
