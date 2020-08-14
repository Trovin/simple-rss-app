export default {
  name: 'singlePost',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {
    postItem: function() {
      return this.$store.state.selectedFeedItem;
    },
  },
  mounted () {},
  methods: {}
}


