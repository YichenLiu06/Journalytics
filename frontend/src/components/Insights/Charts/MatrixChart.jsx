
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
ChartJS.register(LinearScale, TimeScale, MatrixController, MatrixElement, Legend, Tooltip, Title)
ChartJS.defaults.color = "#FFFFFF"

function MatrixChart(){
    const {type, data, options} = config
    return (
        <div className='bg-zinc-700 rounded-xl p-2'>
            <Chart type={type} data={data} options={options} className='w-full'/>
        </div>  
        
    )
}

export default MatrixChart;