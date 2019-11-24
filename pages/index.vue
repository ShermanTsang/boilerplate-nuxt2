<style lang="scss">
</style>

<template>
  <layout-container>
  </layout-container>
</template>

<script>
export default {
  layout: 'default',
  head() {
    return {
      title: 'index',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', 'index') }
      ]
    }
  },
  data() {
    return {
      status: {
        currentPage: 1
      }
    }
  },
  async asyncData({ $axios, query }) {
    const { data: timeline, meta } = await $axios.$get('/api/url', {
      params: {
        pageSize: 10,
        page: query.page
      }
    })
    return {
      data: {
        list
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
