"use client"
import Highcharts, { Options } from 'highcharts/highstock';
import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";
import { Inter } from 'next/font/google'
import { useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] })
const fontStyle = inter.style;

interface LineChartProps{
    data1:number[][];
    data2:number[][];
}

export default function LineChart({data1, data2}:LineChartProps){
    
    const chartComponent = useRef<HighchartsReactRefObject>(null);
    useEffect(()=>{
        if(chartComponent.current){
            const chart = chartComponent.current.chart;
            const series1 = chart.series[0]
            const series2 = chart.series[1]


            console.log(data1)
            if(data1[data1.length-1] && data2[data2.length-1]){
                series1.addPoint([data1[data1.length-1][0], data1[data1.length-1][1]], true, true);
                series2.addPoint([data2[data2.length-1][0], data2[data2.length-1][1]], true, true);
            }
        }
    },[data1, data2])

    const lineChartOptions: Options = {
        chart: {
            backgroundColor:'none',
            type: 'spline',
            height:600,
            style:{
                fontFamily: fontStyle.fontFamily
            },
            className:''
        },
        time: {
          useUTC: false
        },
        title: {
            text: 'Time series of measurements',
        },
        subtitle:{
            text:'Last 24 hours'
        },
        accessibility:{
            enabled:false
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxPadding: 0.1,
            range: 3 * 3600 * 1000 // three hours
        },
    
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [
                {
                    value: 0,
                    width: 1,
                    color: '#808080'
                }
            ]
        },
        rangeSelector:{
            enabled:false
        },
        tooltip: {
          headerFormat: '<b>{point.x:%a, %d-%b-%Y %H:%M:%S}</b><br/>',
          pointFormat: '<b>{series.name}: </b>{point.y:.2f}'
        },
      
        legend: {
          enabled: true
        },
      
        series: [{
            name: 'Inhalable',
            data: data1,
            type: 'spline',
            lineWidth: 2,
            tooltip: {
                valueDecimals: 2
            }
        },{
            name: 'Respirable',
            data: data2,
            type: 'spline',
            lineWidth: 2,
            tooltip: {
                valueDecimals: 2
            }
        }]
      }


    return(
        <div className='min-h-[500px]'>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={lineChartOptions}
                ref={chartComponent}
            />
        </div>
    );

}