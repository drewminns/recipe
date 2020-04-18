import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { IRecipe, IIngredients } from '../interfaces'
import { Loading } from '../Components'
import { normalizeRecipe } from '../utils'

const URI_BASE = 'https://www.themealdb.com/api/json/v1/1/'
const RECIPES_BY_ID = 'lookup.php?i='

type RecipeProps = {}

interface ParamTypes {
  recipeid: string
}

export const Recipe: React.FC<RecipeProps> = ({}: RecipeProps) => {
  const { recipeid } = useParams<ParamTypes>()
  const [recipe, setRecipe] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${URI_BASE}${RECIPES_BY_ID}${recipeid}`)
        const json = await res.json()
        setRecipe(json.meals)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setError(err)
      }
    }

    fetchData()
  }, [recipeid])

  if (isLoading) {
    return <Loading />
  }

  const normalizedData = normalizeRecipe(recipe[0])
  const {
    strMeal,
    strMealThumb,
    strCategory,
    strTags,
    strArea,
    strSource,
    strInstructions,
    ingredients,
  } = normalizedData as IRecipe

  const addLineBreaksToInstructions = strInstructions
    .split('\n')
    .map((text, index) => <p key={`${text}-${index}`}>{text}</p>)

  return (
    <div>
      <img src={strMealThumb} alt={strMeal} loading="lazy" />
      <h2>{strMeal}</h2>
      <p>{strCategory}</p>
      <p>{strArea}</p>
      {ingredients && (
        <div>
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((key: IIngredients, i: number) => (
              <li key={`${key}-${i}`}>
                {key.ingredient} - {key.measurement}
              </li>
            ))}
          </ul>
        </div>
      )}
      {strSource && (
        <p>
          <a href={strSource} rel="noopener">
            Original Source
          </a>
        </p>
      )}
      {strInstructions && addLineBreaksToInstructions}
      {strTags && (
        <p>
          {strTags.split(',').map((tag: string) => (
            <span key={tag}>{tag}</span>
          ))}
        </p>
      )}
    </div>
  )
}

Recipe.displayName = 'Recipe'
