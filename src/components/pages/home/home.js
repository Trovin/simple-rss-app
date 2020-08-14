import post from '../../containers/post/index.vue'
import feeds from '../../containers/feeds/index.vue'
import itemsList from '../../containers/items-list/index.vue'
import statistic from '../../containers/statistic/index.vue'
import addFeedForm from '../../containers/add-feed-form/index.vue'
import headerSection from '../../containers/base-layers/header/index.vue'

export default {
  name: 'home',
  components: {
    post,
    feeds,
    itemsList,
    statistic,
    addFeedForm,
    headerSection,
  },
  data () {
    return {}
  },
  mounted () {
    this.$store.dispatch('initFeeds');
  },
  methods: {}
}
