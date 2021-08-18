import axios from 'axios'

export default {
  setData(vuexContext) {
    // console.log('Init vuex store with data from DB (firebase)');
    return axios
      .get(process.env.firebaseBaseURL + 'speisekarte.json')
      .then((res) => {
        let rootKey = ''
        for (const key in res.data) {
          rootKey = key
        }
        let categories = []
        categories = res.data[rootKey].categories
        vuexContext.commit('setData', categories)
      })
      .catch((e) => console.log(e))
  },
  addItem(vuexContext, item) {
    vuexContext.commit('addItem', item)
  },
  clearOrderList(vuexContext) {
    vuexContext.commit('clearOrderList')
  },
  deleteOrderItem(vuexContext, orderItemId) {
    const orderList = vuexContext.getters.orderList
    for(let i = 0; orderList.length > i; i++) {
      if (orderList[i].id === orderItemId) {
        vuexContext.commit('deleteOrderItem', i)
      }
    }
  },
  updateQuantity(vuexContext, payload) {
    const orderList = vuexContext.getters.orderList
    for(let i = 0; orderList.length > i; i++) {
      if (orderList[i].id === payload.orderItemId) {
        payload.orderItemIdx = i
        vuexContext.commit('updateQuantity', payload)
      }
    }
  },
  updateNote(vuexContext, payload) {
    const orderList = vuexContext.getters.orderList
    for(let i = 0; orderList.length > i; i++) {
      if (orderList[i].id === payload.orderItemId) {
        payload.orderItemIdx = i
        vuexContext.commit('updateNote', payload)
      }
    }
  },
  updateTotal(vuexContext, payload) {
    const orderList = vuexContext.getters.orderList
    for(let i = 0; orderList.length > i; i++) {
      if (orderList[i].id === payload.orderItemId) {
        payload.orderItemIdx = i
        vuexContext.commit('updateTotal', payload)
      }
    }
  },
}