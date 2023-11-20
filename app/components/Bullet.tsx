"use client"
import Highcharts, { Options } from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import BulletChart from 'highcharts/modules/bullet';

import HighchartsReact from "highcharts-react-official";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const fontStyle = inter.style;


export default function Bullet(){
    if(typeof Highcharts == 'object'){
        HighchartsMore(Highcharts);
        BulletChart(Highcharts);
    }

    const bulletOptions:Options = {
        chart: {
            inverted: true,

            type: 'bullet',
            backgroundColor:'None',
            style:{
                fontFamily: fontStyle.fontFamily,
                fontSize:'12px'
            },
            height: "200"
        },
        title:{
            text:'Weather Information',

        },
        accessibility:{
            enabled:false
        },
        credits:{
            enabled:false
        },
        yAxis: {
            plotBands: [{
                from: 0,
                to: 150,
                color: '#666'
            }, {
                from: 150,
                to: 225,
                color: '#999'
            }, {
                from: 225,
                to: 300,
                color: '#bbb'
            }]
        },
        series: [{
            type:'bullet',
            data: [{
                y: 105,
                target: 100
            }]
        }],
        tooltip: {
            pointFormat: '<b>{point.y}</b> (with target at {point.target})'
        }
    }
    return(
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={bulletOptions}
            />
        </div>
    );
}