function draw_chart() {
  $.get("https://www.edsm.net/api-system-v1/factions?systemName=Karka&showHistory=1", function(data) {

    let options={
      chart: {
      renderTo: 'container',
      type: 'line',
    },
      xAxis:{
      type: 'datetime',
    },
      yAxis: {
      title: { text: 'test'},
    },
      series: data.factions.map(faction => {
        let dataArray = Object.keys(faction.influenceHistory).map(Number).slice(0, 8)
        return {
          name: faction.name,
          data: dataArray,
        }
      })
    }

    var chart = new Highcharts.Chart(options);
    console.log(options);
    })
}

$(document).ready(function() {
  draw_chart()
})
