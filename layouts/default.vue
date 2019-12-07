<style lang="scss">
</style>

<template>
  <div id="app">
    <LayoutSidebar class="LayoutSidebar" />
    <LayoutHeader class="LayoutHeader" />
    <LayoutView>
      <LayoutMain class="LayoutMain">
        <nuxt />
      </LayoutMain>
      <LayoutFooter />
    </LayoutView>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: {}
    }
  },
  mounted() {
    if (process.browser) {
    }
  },
  methods: {}
}
</script>
