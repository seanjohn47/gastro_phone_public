<template>
  <div class="top-lvl__container">
    <TheNavBar />
    <Menu />
    <transition name="OrderBadge" mode="out-in">
      <OrderBadge
        v-if="showOrderBadge"
        @openOrderOverview="openOrderOverview"
      />
    </transition>
    <transition name="Modal" mode="out-in">
      <OrderOverview
        v-if="showOrderOverview"
        @closeOrderOverview="closeOrderOverview"
      />
    </transition>
    <transition name="Welcome-Modal" mode="out-in">
      <Welcome
        v-if="showWelcome"
      />
    </transition>
  </div>
</template>

<script>
import Menu from '@/components/Menu/Menu'
import TheNavBar from '@/components/Nav/TheNavBar'
import OrderBadge from '@/components/OrderBadge/OrderBadge'
import OrderOverview from '@/components/OrderOverview/OrderOverview'
import Welcome from '@/components/Welcome/Welcome'

export default {
  components: {
    TheNavBar,
    Menu,
    OrderBadge,
    OrderOverview,
    Welcome,
  },
  data() {
    return {
      showOrderOverview: false,
      showWelcome: true,
    }
  },
  created() {
    this.$store.dispatch('setData')
  },
  mounted() {
    // TODO: set timer which sets showWelcome to false after a few seconds
    setTimeout(() => {
      this.showWelcome = false
    }, 3000)
  },
  computed: {
    showOrderBadge() {
      if (this.$store.getters.orderList.length > 0) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    openOrderOverview() {
      const menu = document.querySelector('#menu')
      menu.style.top = `-${window.scrollY}px`
      menu.style.position = 'fixed'
      menu.style.overflow = 'hidden'
      this.showOrderOverview = true
      document.querySelector('#navbar').classList.add('hide')
      try {
        document.querySelector('#badge').classList.add('hide')
      } catch (err) {}
    },
    closeOrderOverview() {
      const menu = document.querySelector('#menu')
      const scrollY = menu.style.top
      menu.style.position = ''
      menu.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
      this.showOrderOverview = false
      document.querySelector('#navbar').classList.remove('hide')
      try {
        document.querySelector('#badge').classList.remove('hide')
      } catch (err) {}
    },
  },
}
</script>
