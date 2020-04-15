export interface IMealByCategory {
  strMeal: string
  strMealThumb: string
  idMeal: string
}

export interface IMealById extends IMealByCategory {
  strDrinkAlternate: string
  strArea: string
  strCategory: string
  strTags: string
  strYoutube: string
  strSource: string | null
  dateModified: Date | null
}

export interface ICategories {
  idCategory: number
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}
