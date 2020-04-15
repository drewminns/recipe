import React, { useEffect, useState } from 'react'

import { useMealDBFetch } from './utils/useMealDBFetch'
import { ICategories } from './interfaces/mealDBResponse'

const CATEGORIES = 'categories.php'
const RECIPES_BY_CATEGORY = 'filter.php?c='
const RECIPES_BY_ID = 'lookup.php?i='

export const App: React.FC<{}> = () => {
  const categoriesResponse = useMealDBFetch(CATEGORIES)

  if (categoriesResponse.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <ul>
        {categoriesResponse.response?.categories?.map((category: ICategories) => (
          <li key={category.idCategory}>
            <img src={category.strCategoryThumb} alt={`${category.strCategory}`} />
            <p>{category.strCategory}</p>
            <p>{category.strCategoryDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

App.displayName = 'App'
