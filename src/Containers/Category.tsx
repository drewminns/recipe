import React, { useEffect, useState } from 'react'
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import { IMealByCategory } from '../interfaces'
import { Recipe } from './Recipe'
import { Loading, Card, Title } from '../Components'
import { theme } from '../GlobalStyles'

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
    <CategoryLayout>
      <CategoryWrapper>
        <Title title={categoryNamePretty} />
        {recipes && (
          <MealList>
            <ul>
              {recipes.map((meal: IMealByCategory) => (
                <ListStyles key={meal.idMeal}>
                  <Card title={meal.strMeal} image={meal.strMealThumb} link={`${url}/${meal.idMeal}`} />
                </ListStyles>
              ))}
            </ul>
          </MealList>
        )}
      </CategoryWrapper>
      <Switch>
        <Route exact path={path}>
          <RecipeEmpty>
            <RecipeEmptyText>Select a Recipe</RecipeEmptyText>
          </RecipeEmpty>
        </Route>
        <Route path={`${path}/:recipeid`}>
          <Recipe />
        </Route>
      </Switch>
    </CategoryLayout>
  )
}

Category.displayName = 'Category Recipes'

const CategoryLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  overflow-y: hidden;
`

const CategoryWrapper = styled.div`
  height: calc(100vh - 85px);
`

const MealList = styled.div`
  overflow-y: scroll;
  height: 100%;
  padding: 1rem;
`

const ListStyles = styled.li`
  list-style: none;
`

const RecipeEmpty = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RecipeEmptyText = styled.p`
  color: ${theme.color.gray};
  font-family: ${theme.font.sans};
  text-transform: uppercase;
`
