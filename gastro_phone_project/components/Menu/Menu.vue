<template>
  <div id="menu" class="wrapper">
    <div
      :id="category.categoryName"
      class="category-section"
      v-for="category in speisekarte.categories"
      :key="category.categoryName"
    >
      <h1>{{ category.categoryName }}</h1>
      <MenuItemCard
        v-for="item in category.items"
        :key="item.name"
        :itemData="item"
        @openMenuItemExpanded="openMenuItemExpanded(item)"
      />
    </div>
    <transition name="Modal" mode="out-in">
      <MenuItemExpanded
        v-if="showMenuItemExpanded"
        :itemData="itemData"
        @closeMenuItemExpanded="closeMenuItemExpanded"
      />
    </transition>
    <div class="order-badge-spacer" v-if="showOrderBadge"></div>
  </div>
</template>

<script>
import MenuItemCard from '@/components/Menu/MenuItemCard'
import MenuItemExpanded from '@/components/Menu/MenuItemExpanded/MenuItemExpanded'

export default {
  components: {
    MenuItemCard,
    MenuItemExpanded,
  },
  data() {
    return {
      showMenuItemExpanded: false,
      itemData: {},
    }
  },
  methods: {
    openMenuItemExpanded(item) {
      const menu = document.querySelector('#menu')
      menu.style.top = `-${window.scrollY}px`
      menu.style.position = 'fixed'
      menu.style.overflow = 'hidden'
      this.itemData = item
      this.showMenuItemExpanded = true
      document.querySelector('#navbar').classList.add('hide')
      try {
        document.querySelector('#badge').classList.add('hide')
      } catch (err) {}
    },
    closeMenuItemExpanded() {
      const menu = document.querySelector('#menu')
      const scrollY = menu.style.top
      menu.style.position = ''
      menu.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)

      this.showMenuItemExpanded = false
      document.querySelector('#navbar').classList.remove('hide')
      try {
        document.querySelector('#badge').classList.remove('hide')
      } catch (err) {}
    },
  },
  computed: {
    speisekarte() {
      return this.$store.getters.speisekarte
    },
    showOrderBadge() {
      if (this.$store.getters.orderList.length > 0) {
        return true
      } else {
        return false
      }
    },
  },
  mounted() {
    // make navbar scroll automatically in relation with where page current position is scrolled to
    let navLinks = []
    let navbar = document.querySelector('#navbar')

    window.addEventListener('scroll', (event) => {
      if (navLinks.length == 0) {
        navLinks = document.querySelectorAll('a')
      }
      let fromTop = window.scrollY + 64 + 26

      navLinks.forEach((link, idx, array) => {
        let section = document.querySelector(link.hash)

        if (
          section.offsetTop + 26 <= fromTop &&
          section.offsetTop + 26 + section.offsetHeight > fromTop
        ) {
          link.classList.add('active')
          // scroll inside navbar so that active element is scrolled to utmost left position
          navbar.scrollLeft += link.getBoundingClientRect().x - 16
        } else {
          link.classList.remove('active')
        }

        // when bottom is reached mark the last nav item as active and remove active from previous one
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          if (idx === array.length - 1) {
            link.classList.add('active')
            array[idx - 1].classList.remove('active')
          }
        }
      })
    })

    // trigger scroll event so that a link is set active immediatly
    setTimeout(() => {
      window.scrollTo(window.scrollX, window.scrollY - 1)
      window.scrollTo(window.scrollX, window.scrollY + 1)
    }, 600)
  },
}
</script>

<style scoped>
.wrapper {
  padding-bottom: 14px;
}

.category-section {
  padding-top: 26px;
}

.category-section:first-of-type {
  padding-top: 14px;
}

h1 {
  margin-left: 31px;
  margin-bottom: 14px;
  font-size: 28px;
}

.order-badge-spacer {
  height: 70px;
  width: 100%;
}
</style>