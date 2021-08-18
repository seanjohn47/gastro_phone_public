export default {
  speisekarte(state) {
    return state.speisekarte
  },
  categories(state, getters) {
    const categoryNames = []
    const categories = getters.speisekarte.categories
    for (let category of categories) {
      categoryNames.push(category.categoryName)
    }
    return categoryNames
  },
  orderList(state) {
    return state.orderList
  }
}
