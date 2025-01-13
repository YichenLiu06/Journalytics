
import {
    Chart as ChartJS,
    LinearScale,
    Legend,
    Tooltip,
    TimeScale,
    Title
  } from 'chart.js';
import { config } from './matrixHelper';
import { Chart } from "react-chartjs-2"
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { useEffect } from 'react';
import { color } from 'chart.js/helpers';
ChartJS.register(LinearScale, TimeScale, MatrixController, MatrixElement, Legend, Tooltip, Title)
ChartJS.defaults.color = "#FFFFFF"

function MatrixChart({ rawData }){

    const data = {
        datasets: [{
          data: rawData,
          backgroundColor({raw}) {
            const alpha = (raw.v) / 500;
            return color('#a855f7').alpha(alpha).rgbString();
          },
          borderColor({raw}) {
            const alpha = (raw.v) / 500;
            return color('#a855f7').alpha(alpha).darken(0.3).rgbString();
          },
          borderWidth: 1,
          hoverBackgroundColor: 'yellow',
          hoverBorderColor: 'yellowgreen',
          width: ({chart}) => (chart.chartArea || {}).width / chart.scales.x.ticks.length - 3,
          height: ({chart}) =>(chart.chartArea || {}).height / chart.scales.y.ticks.length - 3
        }]
      };
    
    const {type, options} = config
    return (
        <div className='bg-zinc-700 rounded-xl p-2 drop-shadow-lg'>
            <Chart type={type} data={data} options={options} className='w-full'/>
        </div>  
        
    )
}

export default MatrixChart;