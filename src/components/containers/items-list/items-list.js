import loader from '../../elements/loader/index.vue'

export default {
  name: 'itemsList',
  components: {
    loader
  },
  props: [],
  data () {
    return {}
  },
  computed: {
    items: function() {
      return this.$store.state.itemsList;
    },
    isLoading: function() {
      return this.$store.state.loading;
    },
    selectedItem: function() {
      return this.$store.state.selectedFeedItem;
    },
    activeCategory: function() {
      return this.$store.state.selectedFeedCategory;
    }
  },
  mounted () {},
  methods: {
    selectItem(item) {
      this.$store.commit('setSelectedItem', item);
    }
  }
}


