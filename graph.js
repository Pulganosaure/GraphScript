const nbrvalue = 5


function get_BGSdata_from_API()
{
    $.get("https://www.edsm.net/api-system-v1/factions?systemName=Karka&showHistory=1", {})
    .done(function(data)
    {
        series = []
        for(var i = 0; i <= Object.keys(data).length; i++) 
        {
           influences_Data = data['factions'][i]['influenceHistory']
           influences = []


           for(var j in influences_Data)
           {
            influences.push(Number((influences_Data [j] * 100).toFixed()))
           }
            influences = influences.slice(influences.length - nbrvalue)
            var faction_data = new Object()
            faction_data.name = data['factions'][i]['name']
            faction_data.data = influences
            series.push(faction_data)
        }
        console.log(series)
        return series
    })
    .fail(function() {
        console.log('erreur')
    })
}

function draw_graph()
{

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

        series: get_BGSdata_from_API(),

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
    console.log(Highcharts.chart)
}







$(document).ready(function()
{
    draw_graph()
})