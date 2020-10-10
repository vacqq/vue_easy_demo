<template>
  <div class="hello">
    <chart ref="chart1" :options="option" :auto-resize="true"></chart>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      option: {},
    }
  },
  mounted () {
    this.option = {
      xAxis: {
        type: 'category',
        width: '1000px',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)'
        }
      }]
    }
  }
}
</script>
