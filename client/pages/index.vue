<template lang="pug">
  v-flex(class="section" wrap)
    // Today
    v-flex(
      tag="section"
      class="today section-item"
      md4
      xs11
      wrap
    )
      v-card(class="today-card pa-3")
        // Season
        v-flex(
          class="today-title text-xs-center"
          py-3
          wrap
        )
          span(class="display-2")
            | {{ season.locale }}

          span(class="mx-2")
            | &middot;

          span(class="title")
            |{{ season.word }}

        // Date
        v-layout(class="today-date" wrap)
          // Day
          v-flex(class="day display-4" xs6)
            | {{ date.dayOfMonth }}

          // Weekday
          v-flex(class="month-weekday" xs6 wrap)
            span(class="weekday display-1")
              | {{ $d(date.now, 'weekday', this.$i18n.locale) }}

            span(class="month title")
              | {{ $d(date.now, 'date', this.$i18n.locale) }}

        // Poem
        v-flex(
          class="today-poem"
          py-3
          wrap
        )
          | {{ season.poem }}

    // Articles
    v-flex(
      tag="section"
      class="section-item"
      md6
      xs11
      wrap
    )
      v-card(
        color="transparent"
        flat
      )
        // Title
        v-card-title(class="section-item-title")
          v-flex(tag="span")
            v-icon(
              class="mb-1"
              color="primary"
              size="30"
              left
            )
              | fas fa-feather-alt
            | {{ $t('article.list') }}

        article-list(:init-data="articles" :init-count="totalCount")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { AxiosError } from 'axios';

@Component({
  components: {
    ArticleList: () => import('@/components/article/List.vue'),
  },

  // Hooks
  async asyncData({ $axios }) {
    // Fetch articles
    const { articles, totalCount } = await $axios.$get('/articles', {
      params: { page: 1, limit: process.env.PAGE_LIMIT },
    });
    return { articles, totalCount };
  },

  async fetch({ store, error }) {
    // Fetch issues
    await store.dispatch('issue/fetch').catch((e: AxiosError) => {
      const statusCode = e.response ? e.response.status : 500;
      error({ statusCode: statusCode, message: e.message });
    });
  },

  // Transition animation
  transition: {
    enterActiveClass: 'animated slideInLeft',
    leaveActiveClass: 'animated slideOutRight',
  },
})
export default class IndexPage extends Vue {
  // Computed

  /**
   * Date object
   */
  get date(): object {
    const now = new Date();
    return {
      now: now,
      dayOfMonth: now.getDate(),
    };
  }

  /**
   * Season
   */
  get season(): Record<string, string> {
    const month = new Date().getMonth() + 1;

    // Spring
    if (month >= 3 && month <= 5) {
      return {
        word: 'Spring',
        locale: this.$i18n.t('season.spring').toString(),
        poem: '《春夜喜雨》- 好雨知時節，當春乃発生。',
      };
    }

    // Summer
    if (month >= 6 && month <= 8) {
      return {
        word: 'Summer',
        locale: this.$i18n.t('season.summer').toString(),
        poem: '《小池》- 小荷才露尖尖角，早有蜻蜓立上頭。',
      };
    }

    // Autumn
    if (month >= 9 && month <= 11) {
      return {
        word: 'Autumn',
        locale: this.$i18n.t('season.autumn').toString(),
        poem: '《水調歌頭》- 但願人長久，千里共嬋娟。',
      };
    }

    // Winter
    return {
      word: 'Winter',
      locale: this.$i18n.t('season.winter').toString(),
      poem: '《江雪》- 孤舟蓑笠翁，独釣寒江雪。',
    };
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.section
  margin 48px auto 24px auto
  &-item
    margin 0 auto 40px auto
    &:last-child
      margin-bottom 0
    &-title
      font-size 34px
      font-weight 700
      text-align center
      padding 20px

  // Today card
  .today
    &-card
      box-shadow 0 1px 6px rgba(0, 0, 0, .12), 0 1px 4px rgba(0, 0, 0, .24)
    &-title
      color var(--v-secondary-darken2)
      &::before, &::after
        content ''
        vertical-align middle
        display inline-block
        width 14%
        margin  0 4% 4% 4%
        border 1px solid var(--v-secondary-darken2)
    &-date
      .day
        color var(--v-accent-base)
        font-weight 500
        text-align right
        padding-right 20px
      .month-weekday
        text-align left
        padding-left 20px
        .weekday, .month
          display block
          margin 16px 0
    &-poem
      color var(--v-secondary-darken2)
      text-align center
      font-style italic
</style>
