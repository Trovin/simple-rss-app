export default {
  name: 'chart',
  components: {},
  props: ['values', 'names'],
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {
    dataFormat: function(a, b) {
      if(b) return b + "%";
      return a;
    }
  }
}
