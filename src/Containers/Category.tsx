import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom'

import { IMealByCategory } from '../interfaces'
import { Recipe } from './Recipe'
import { Loading, Card } from '../Components'

const URI_BASE = 'https://www.themealdb.com/api/json/v1/1/'
const RECIPES_BY_CATEGORY = 'filter.php?c='

type CategoryProps = {}

interface ParamTypes {
  categoryname: string
}

export const Category: React.FC<CategoryProps> = ({}: CategoryProps) => {
  const { categoryname } = useParams<ParamTypes>()
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { path, url } = useRouteMatch()

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${URI_BASE}${RECIPES_BY_CATEGORY}${categoryname}`)
        const json = await res.json()
        setRecipes(json.meals)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setError(err)
      }
    }

    fetchData()
  }, [categoryname])

  const categoryNamePretty = categoryname.charAt(0).toUpperCase() + categoryname.slice(1) || categoryname

  if (isLoading) {
    return <Loading />
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div>
        <h2>{categoryNamePretty}</h2>
        {recipes && (
          <ul>
            {recipes.map((meal: IMealByCategory) => (
              <li key={meal.idMeal}>
                <Card title={meal.strMeal} image={meal.strMealThumb} link={`${url}/${meal.idMeal}`} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a Recipe.</h3>
        </Route>
        <Route path={`${path}/:recipeid`}>
          <Recipe />
        </Route>
      </Switch>
    </div>
  )
}

Category.displayName = 'Category Recipes'
