export default {
  setData(state, categories) {
    state.speisekarte.categories = categories
  },
  addItem(state, item) {
    state.orderList.push(item)
  },
  clearOrderList(state) {
    state.orderList = []
  },
  deleteOrderItem(state, orderItemIdx) {
    state.orderList.splice(orderItemIdx, 1)
  },
  updateQuantity(state, payload) {
    state.orderList[payload.orderItemIdx].quantity = payload.updatedQuantity
    // in order to update the total component, array has to change (in vue3 this problem should not occur)
    state.orderList = [...state.orderList]
    // console.log(state.orderList)
  },
  updateNote(state, payload) {
    state.orderList[payload.orderItemIdx].note = payload.updatedNote
  },
  updateTotal(state, payload) {
    state.orderList[payload.orderItemIdx].total = payload.updatedTotal
  },
}
