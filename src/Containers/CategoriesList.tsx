import React from 'react'
import { Link } from 'react-router-dom'

import { ICategory } from '../interfaces'
import { Card } from '../Components'

type CategoriesListProps = {
  categories: ICategory[]
}

export const CategoriesList: React.FC<CategoriesListProps> = ({ categories }: CategoriesListProps) => {
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category: ICategory) => (
          <li key={category.idCategory}>
            <Card
              title={category.strCategory}
              image={category.strCategoryThumb}
              link={`/categories/${category.strCategory.toLowerCase()}`}
              copy={category.strCategoryDescription}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

CategoriesList.displayName = 'Categories List'
