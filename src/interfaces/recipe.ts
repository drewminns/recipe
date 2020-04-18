export interface IIngredients {
  ingredient: string
  measurement: string
}

export interface IRecipe {
  strMeal: string
  strMealThumb: string
  strCategory: string
  strTags: string
  strArea: string
  strSource: string
  strInstructions: string
  strYoutube: string
  idMeal: string
  ingredients: IIngredients[]
}
