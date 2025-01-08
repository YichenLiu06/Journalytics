
import { color } from 'chart.js/helpers';
import 'chartjs-adapter-date-fns';
import { _adapters } from 'chart.js';

function isoDayOfWeek(dt) {
    let wd = dt.getDay(); // 0..6, from sunday
    wd = (wd + 6) % 7 + 1; // 1..7 from monday
    return '' + wd; // string so it gets parsed
  }

const scales = {
    y: {
      type: 'time',
      left: 'left',
      offset: true,
      time: {
        unit: 'week',
        round: 'week',
        isoWeekday: 1,
        displayFormats: {
          week: 'I'
        }
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        padding: 1,
        display: false
      },
      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0,
      },
      title: {
        display: true,
        font: {size: 15, weigth: 'bold'},
        text: ({chart}) => chart.scales.x._adapter.format(Date.now(), 'MMM, yyyy'),
        padding: 10
      },
    },
    x: {
      type: 'time',
      position: 'top',
      offset: true,
      time: {
        unit: 'day',
        parser: 'i',
        isoWeekday: 1,
        displayFormats: {
          day: 'iiiiii'
        }
      },
      reverse: false,
      ticks: {
        source: 'data',
        padding: 0,
        maxRotation: 0,
      },
      grid: {
        display: false,
        drawBorder: false,
      }
    }
  };

function generateData() {
    const adapter = new _adapters._date();
    const data = [];
    let dt = adapter.startOf(new Date(), 'month');
    const end = adapter.endOf(dt, 'month');
    while (dt <= end) {
      const iso = adapter.format(dt, 'yyyy-MM-dd');
      data.push({
        x: isoDayOfWeek(dt),
        y: iso,
        d: iso,
        v: Math.random() * 50
      });
      dt = new Date(dt.setDate(dt.getDate() + 1));
    }
    return data;
  }
const data = {
    datasets: [{
      data: generateData(),
      backgroundColor({raw}) {
        const alpha = (10 + raw.v) / 60;
        return color('#a855f7').alpha(alpha).rgbString();
      },
      borderColor({raw}) {
        const alpha = (10 + raw.v) / 60;
        return color('#a855f7').alpha(alpha).darken(0.3).rgbString();
      },
      borderWidth: 1,
      hoverBackgroundColor: 'yellow',
      hoverBorderColor: 'yellowgreen',
      width: ({chart}) => (chart.chartArea || {}).width / chart.scales.x.ticks.length - 3,
      height: ({chart}) =>(chart.chartArea || {}).height / chart.scales.y.ticks.length - 3
    }]
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Word Count",
        font :{
            size: 20
        },
        padding: {
        bottom: 5,
        top: 0,}
      },
      legend: false,
      tooltip: {
        displayColors: false,
        callbacks: {
          title() {
            return '';
          },
          label(context) {
            const v = context.dataset.data[context.dataIndex];
            return ['d: ' + v.d, 'v: ' + v.v.toFixed(2)];
          }
        }
      },
    },
    scales: scales,
    layout: {
      padding: {
        top: 10,
      }
    }
  };

  export const config = {
    type: 'matrix',
    data: data,
    options: options
  };