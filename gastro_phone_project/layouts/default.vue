<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
}

:root {
  --primary-burgundy: #730022;
  --main-text-blue: #020033;
  --descr-text-grey: #333;
  --details-text-lightGrey: #595959;
  --item-bg-white: #fafafa;
  --main-bg-white: #fffff7;
}

a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

h1 {
  font-weight: 900;
  font-size: 24px;
  color: var(--primary-burgundy);
}

h2 {
  font-weight: 700;
  font-size: 21px;
}

html {
  font-family: 'Lato', sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  background-color: var(--main-bg-white);
  scroll-padding-top: calc(57px);
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
html::-webkit-scrollbar {
  display: none;
}
</style>
