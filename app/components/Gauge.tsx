"use client"
import Highcharts, { Options } from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';

import HighchartsReact from "highcharts-react-official";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const fontStyle = inter.style;

interface GaugeProps{
    label:string;
    value?:number;
    maxValue?:number;
    color?:string;
}
export default function Gauge({label, value=500, maxValue=1000, color}:GaugeProps){
    if(typeof Highcharts == 'object'){
        HighchartsMore(Highcharts);
        SolidGauge(Highcharts);
    }
    

    const gaugeOptions:Options = {
        chart: {
            type: "solidgauge",
            backgroundColor:'None',
            style:{
                fontFamily: fontStyle.fontFamily,
                fontSize:'12px'
            },
            height: "200"
        },
        title: {
            text: label,
        },
        accessibility:{
            enabled:false
        },
        credits:{
            enabled:false
        },
        tooltip: {
            enabled:false
        },
    
        pane: {
            center: ['50%', '80%'],
            size:'140%',
            startAngle: -90,
            endAngle: 90,
            background: [
                {
                    shape:'arc',
                // Track for Move
                outerRadius: "100%",
                innerRadius: "80%",
                borderWidth: 0
                }
        ]
        },
    
        yAxis: {
        min: 0,
        max: maxValue,
        lineWidth: 0
        },
    
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    format:'{point.y} μg/m3',
                    borderWidth:0
                },
                linecap: "round",
                stickyTracking: false,
                rounded: false
            },
        },
    
        series: [
        {
            name: label,
            type: "solidgauge",
            data: [
            {
                color,
                radius: "100%",
                innerRadius: "80%",
                y: value
            }
            ]
        }
        ]
    };
    console.log(color?.toString())
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={gaugeOptions}
            />
        </div>
    );
}