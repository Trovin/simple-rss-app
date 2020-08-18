<template>
  <graph-pie
    class="fade-in"
    :width="400"
    :height="400"
    :padding-top="30"
    :padding-right="100"
    :padding-bottom="100"
    :padding-left="100"
    :values="values"
    :names="names"
    :data-format="dataFormat"
    :shape="'donut'"
    :show-total-value="true">
    <legends :names="names"></legends>
    <tooltip :names="names"></tooltip>
  </graph-pie>
</template>

<script>
export default {
  name: 'Chart',
  components: {},
  props: ['values', 'names'],
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {
    dataFormat(a, b) {
      if(b) return b + '%';
      return a;
    }
  }
}
</script>
