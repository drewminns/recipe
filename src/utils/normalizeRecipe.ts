import { IMealById, IIngredients, IRecipe } from '../interfaces'

const removeEmpty = (obj: any): {} => {
  return Object.keys(obj)
    .filter(key => obj[key] !== null && obj[key] !== '' && obj[key] !== ' ') // Remove undef. and null and empty strings.
    .reduce(
      (acc, curr) =>
        typeof obj[curr] === 'object'
          ? { ...acc, [curr]: removeEmpty(obj[curr]) } // Recurse.
          : { ...acc, [curr]: obj[curr] }, // Copy value.
      {},
    )
}

const filterPropertiesByRegex = (obj: any, pattern: any): {} => {
  return Object.entries(obj)
    .filter(item => pattern.test(item))
    .reduce(
      (acc: {}, curr) => ({
        ...acc,
        [curr[0]]: obj[curr[0]],
      }),
      {},
    )
}

const mergeIngredients = (instructions: any): IIngredients[] => {
  const ingredients = []
  let i = 0
  while (i <= Object.keys(instructions).length) {
    i++

    if (!instructions[`strIngredient${i}`]) {
      break
    }

    ingredients.push({
      ingredient: instructions[`strIngredient${i}`],
      measurement: instructions[`strMeasure${i}`],
    })
  }

  return ingredients
}

export const normalizeRecipe = (data: IMealById) => {
  const recipe = removeEmpty(data)
  const rest = filterPropertiesByRegex(recipe, /^(?!str(Ingredient|Measure))/)
  const ingredientsList = filterPropertiesByRegex(recipe, /str(Ingredient|Measure)/)

  const ingredients: IIngredients[] = mergeIngredients(ingredientsList)

  return {
    ...rest,
    ingredients,
  }
}
