import React from 'react'
import styled from 'styled-components'

import { ICategory } from '../interfaces'
import { Card, Title } from '../Components'

type CategoriesListProps = {
  categories: ICategory[]
}

export const CategoriesList: React.FC<CategoriesListProps> = ({ categories }: CategoriesListProps) => {
  return (
    <CategoryListLayout>
      <Title title="Categories" />
      <CategoryListWrapper>
        <CategoryListUL>
          {categories.map((category: ICategory) => (
            <li key={category.idCategory}>
              <Card
                title={category.strCategory}
                image={category.strCategoryThumb}
                link={`/${category.strCategory.toLowerCase()}`}
              />
            </li>
          ))}
        </CategoryListUL>
      </CategoryListWrapper>
    </CategoryListLayout>
  )
}

const CategoryListLayout = styled.div`
  height: calc(100vh - 85px);
`

const CategoryListUL = styled.ul`
  list-style: none;
`

const CategoryListWrapper = styled.div`
  padding: 1.6rem;
  height: 100%;
  overflow-y: scroll;
`

CategoriesList.displayName = 'Categories List'
