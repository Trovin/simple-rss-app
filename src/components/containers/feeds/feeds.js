export default {
  name: 'feeds',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {
    titles: function() {
      return this.$store.state.titlesList;
    },
    selectedCategory: function() {
      return this.$store.state.selectedFeedCategory;
    }
  },
  mounted () {

  },
  methods: {
    selectCategory (category) {
      this.$store.commit('setActiveCategory', category);
    }
  }
}


