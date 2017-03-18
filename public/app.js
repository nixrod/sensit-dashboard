$.get( "http://localhost/data", function( data ) {
  var temperature_values = [];
  var humidity_values = [];
  var battery_values = [];
  var labels = [];

  data.forEach(function(item) {
    labels.push(item.timestamp);
    temperature_values.push(item.temperature);
    humidity_values.push(item.humidity);
    battery_values.push(item.battery);
  });

  Highcharts.chart('climate_chart', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Sensit climate sensor'
    },
    xAxis: [{
        categories: labels,
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        title: {
            text: 'Humidity',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        labels: {
            format: '{value}%',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: true

    }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
            text: 'Temperature',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}°C',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }

    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
        name: 'Temperature',
        type: 'spline',
        yAxis: 1,
        data: temperature_values,
        tooltip: {
            valueSuffix: '°C'
        }

    }, {
        name: 'Humidity',
        type: 'spline',
        data: humidity_values,
        tooltip: {
            valueSuffix: '%'
        }
    }],
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      }
    }
});


  Highcharts.chart('battery_chart', {
      title: {
          text: 'Battery Status'
      },
      xAxis: {
          categories: labels
      },
      yAxis: {
          title: {
              text: 'Volt'
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },
      series: [{
          name: 'Battery',
          data: battery_values
      }]
  });

});
