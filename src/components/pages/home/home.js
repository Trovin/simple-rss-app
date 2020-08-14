import feeds from '../../containers/feeds/index.vue'
import feedForm from '../../containers/feed-form/index.vue'
import itemsList from '../../containers/items-list/index.vue'
import statistic from '../../containers/statistic/index.vue'
import singlePost from '../../containers/single-post/index.vue'
import headerSection from '../../base-layers/header/index.vue'

export default {
  name: 'home',
  components: {
    feeds,
    feedForm,
    itemsList,
    statistic,
    singlePost,
    headerSection
  },
  data () {
    return {}
  },
  mounted () {
    this.$store.dispatch('initFeeds');
  },
  methods: {}
}
