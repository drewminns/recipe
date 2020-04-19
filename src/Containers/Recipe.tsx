import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'

import { IRecipe, IIngredients } from '../interfaces'
import { Loading, Error } from '../Components'
import { normalizeRecipe } from '../utils'
import { theme } from '../GlobalStyles'

const URI_BASE = 'https://www.themealdb.com/api/json/v1/1/'
const RECIPES_BY_ID = 'lookup.php?i='

type RecipeProps = {}

interface ParamTypes {
  recipeid: string
  categoryname: string
}

export const Recipe: React.FC<RecipeProps> = ({}: RecipeProps) => {
  const { recipeid, categoryname } = useParams<ParamTypes>()
  const [recipe, setRecipe] = useState([])
  const [error, setError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean | undefined>(true)

  const backButton = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${URI_BASE}${RECIPES_BY_ID}${recipeid}`)
        const json = await res.json()
        setRecipe(json.meals)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setError(true)
      }
    }

    fetchData()
  }, [recipeid])

  if (isLoading) {
    return <Loading />
  }

  if (error || !recipe[0]) {
    return <Error message={`Recipe: ${recipeid}`} />
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
    <RecipeWrapper>
      <RecipeBackLink>
        <Link ref={backButton} to={`/${categoryname}`}>
          Back To {categoryname}
        </Link>
      </RecipeBackLink>
      <RecipeCategory>
        {strCategory} {strArea && `- ${strArea}`}
      </RecipeCategory>
      <RecipeTitle>{strMeal}</RecipeTitle>
      <RecipeDetails>
        <RecipeImage src={strMealThumb} alt={strMeal} />
        {ingredients && (
          <RecipeIngredients>
            <RecipeIngredientsListTitle>Ingredients</RecipeIngredientsListTitle>
            <RecipeIngredientsList>
              {ingredients.map((key: IIngredients, i: number) => (
                <RecipeIngredientsListItem key={`${key}-${i}`}>
                  {key.ingredient} - {key.measurement}
                </RecipeIngredientsListItem>
              ))}
            </RecipeIngredientsList>
          </RecipeIngredients>
        )}
      </RecipeDetails>
      {strSource && (
        <p>
          <RecipeSource href={strSource} rel="noopener">
            Original Source
          </RecipeSource>
        </p>
      )}
      {strInstructions && addLineBreaksToInstructions}
      {strTags && (
        <RecipeTags>
          <p>Tags:</p>
          <RecipeTagsP>
            {strTags.split(',').map((tag: string, i: number) => (
              <>
                {i > 0 && ','}
                <span key={tag}>{tag}</span>
              </>
            ))}
          </RecipeTagsP>
        </RecipeTags>
      )}
    </RecipeWrapper>
  )
}

Recipe.displayName = 'Recipe'

const RecipeWrapper = styled.article`
  padding: 3rem 2rem 2rem;
  background-color: ${theme.color.white};
  overflow-y: scroll;
  box-shadow: inset 0 0 20px 1px rgba(0, 0, 0, 0.1);
`

const RecipeDetails = styled.div`
  display: flex;
  align-items: flex-start;
`

const RecipeIngredients = styled.div`
  min-width: 300px;
  background-color: ${theme.color.light};
  padding: 1rem 2.5rem;
  margin-left: 2rem;
  flex: 1;
`

const RecipeBackLink = styled.p`
  text-transform: capitalize;

  a {
    color: ${theme.color.indigo};
  }
`

const RecipeIngredientsList = styled.ul`
  list-style-position: inside;
`

const RecipeIngredientsListTitle = styled.h2`
  font-family: ${theme.font.sans};
  font-size: ${theme.font.sizes.lg};
`

const RecipeIngredientsListItem = styled.li`
  margin-bottom: 1rem;
`

const RecipeImage = styled.img`
  max-width: 400px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`

const RecipeTitle = styled.h2`
  font-size: 3.2rem;
  font-family: ${theme.font.sans};
  margin: 0 0 2rem;
`

const RecipeCategory = styled.p`
  font-weight: ${theme.font.bold};
  margin: 0;
  color: ${theme.color.gray};
`

const RecipeTags = styled.div`
  display: flex;
`

const RecipeSource = styled.a`
  color: ${theme.color.indigo};
  font-family: ${theme.font.sans};
  font-weight: ${theme.font.bold};

  &:focus,
  &:hover {
    text-decoration: none;
  }
`

const RecipeTagsP = styled.p`
  font-family: ${theme.font.sans};
  font-weight: ${theme.font.bold};
  margin-right: 0.5rem;

  span {
    display: inline-block;
    margin-left: 0.5ch;
  }
`
