"use client"
import Highcharts, { Options } from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import BulletChart from 'highcharts/modules/bullet';

import {semanticColors} from "@nextui-org/theme";
import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";
import { Inter } from 'next/font/google'
import { useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] })
const fontStyle = inter.style;

interface BulletProps{
    temperature?:number;
    humidity?:number;
    windSpeed?:number;
}

export default function Bullet({temperature=0, humidity=0, windSpeed=0}:BulletProps){
    if(typeof Highcharts == 'object'){
        HighchartsMore(Highcharts);
        BulletChart(Highcharts);
    }


    let subTitle = 'Wind speed: ' + windSpeed + ' m/s';

    const bulletOptions:Options = {
        chart: {
            inverted:true,
            type: 'column',
            backgroundColor:'None',
            style:{
                fontFamily: fontStyle.fontFamily,
                fontSize:'14px'
            },
            height: "200"
        },
        title:{
            text:'Weather Information',

        },
        subtitle:{
            text:subTitle
        },
        accessibility:{
            enabled:false
        },
        credits:{
            enabled:false
        },
        xAxis:[{
            visible:false
        }],
        yAxis:[{ 
            title: {
                text: 'Temperature',
            },
            labels: {
                format: '{value}°C',
                style:{
                    color:semanticColors.light.success[500]
                }
            },
        }, { 
            title: {
                text: 'Humidity',
            },
            labels: {
                format: '{value} %',
                style:{
                    color:semanticColors.light.danger[500]
                }
            },
            min:0,
            max:100,
            opposite: true
        }],
        series: [
            {
                type:'column',
                name:'Humidity',
                data: [{
                    y: humidity,
                    custom:{
                        suffix:'%'
                    }
                }],
                yAxis:1
            },{
            type:'column',
            name:'Temperature',
            data: [{
                y: temperature,
                custom:{
                    suffix:'°C'
                }
            }],
            yAxis:0
        }],
        colors:[semanticColors.light.danger[500] ?? 'red', semanticColors.light.success[500] ?? 'green'],
        legend:{
            enabled:false
        },
        tooltip:{
            format:'{series.name}: {point.y} {point.custom.suffix}'
        }
    }

    const chartComponent = useRef<HighchartsReactRefObject>(null);
    useEffect(()=>{
        if(chartComponent.current){
            const chart = chartComponent.current.chart;
            const humidPoint = chart.series[0].points[0];
            humidPoint.update(humidity)

            const tempPoint = chart.series[1].points[0];
            tempPoint.update(temperature)
            let subTitle = 'Wind speed: ' + windSpeed + ' m/s';
            chart.subtitle.update({text:subTitle})
        }
    },[humidity, temperature, windSpeed])

    return(
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={bulletOptions}
                ref={chartComponent}
            />
        </div>
    );
}