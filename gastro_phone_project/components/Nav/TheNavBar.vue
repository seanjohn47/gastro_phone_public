<template>
  <div id="navbar">
    <a
      v-for="category in categorieNames"
      :key="category"
      :href="'#' + category"
      >{{ category }}</a
    >
  </div>
</template>

<script>
export default {
  computed: {
    categorieNames() {
      return this.$store.getters.categories
    },
  },
}
</script>


<style scoped>
#navbar {
  display: flex;
  scroll-behavior: smooth;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  height: 64px;
  width: 100%;
  background-color: rgb(255, 245, 248);
  overflow: scroll;
  position: sticky;
  top: 0%;
  z-index: 1;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  scroll-behavior: smooth;
}

/* Hide scrollbar for Chrome, Safari and Opera */
#navbar::-webkit-scrollbar {
  display: none;
}

a {
  list-style: none;
  font-size: 20px;
  font-weight: 400;
  padding: 7px 16px;
  margin-right: 30px;
  color: var(--main-text-blue);
}

a:first-child {
  margin-left: 0px;
}

a:last-child {
  margin-right: 0px;
}

.active {
  color: #fff;
  background-color: var(--primary-burgundy);
  border-radius: 30px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.25);
}

.hide {
  visibility: hidden;
}
</style>
