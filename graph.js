function get_BGSdata_from_API() {
    $.get("https://www.edsm.net/api-system-v1/factions?systemName=Karka&showHistory=1", {})
    .done(function(data) {

      let state = data.factions.map(faction => {
        let dataArray = Object.keys(faction.influenceHistory).map(Number).slice(0, 8)
        return {
          name: faction.name,
          data: dataArray,
        }
      })
      console.log(JSON.stringify(state));
      return state
})
  .fail(function() {
      console.log('erreur')
  })
}

let dataIn = () => {
  return get_BGSdata_from_API()
}

function draw_graph() {
    Highcharts.chart('container', {
        title: {
            text: 'Influence du système'
        },
        subtitle: {
            text: 'system'
        },
        yAxis: {
            title: {
                text: 'Influence'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },
        series: dataIn(),
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                    }
                }
            }]
        }

    }
    )
}

$(document).ready(function() {
  draw_graph()
})
