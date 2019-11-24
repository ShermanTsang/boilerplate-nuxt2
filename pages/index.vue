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
    const { data: timeline, meta } = await $axios.$get('/api/common/timeline', {
      params: {
        pageSize: 10,
        page: query.page
      }
    })
    return {
      data: {
        timeline
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    async requestTimeline() {
      const requestPage = this.status.currentPage + 1
      const { data: timeline, meta } = await this.$axios.$get('/api/common/timeline', {
        params: {
          pageSize: 10,
          page: requestPage
        }
      })
      this.data.timeline = this.data.timeline.concat(timeline)
      this.meta = meta
      this.status.currentPage++
    }
  }
}
</script>
