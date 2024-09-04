"use client";
import Highcharts, { Options } from 'highcharts/highstock';
import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";
import { Inter } from 'next/font/google';
import { useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });
const fontStyle = inter.style;

interface LineChartProps {
    data1: number[][];
    data2: number[][];
    darkMode: boolean;
}

export default function LineChart({ data1, data2, darkMode }: LineChartProps) {
    const chartComponent = useRef<HighchartsReactRefObject>(null);

    useEffect(() => {
        if (chartComponent.current) {
            const chart = chartComponent.current.chart;
            const series1 = chart.series[0];
            const series2 = chart.series[1];

            if (data1[data1.length - 1] && data2[data2.length - 1]) {
                series1.addPoint([data1[data1.length - 1][0], data1[data1.length - 1][1]], true, true);
                series2.addPoint([data2[data2.length - 1][0], data2[data2.length - 1][1]], true, true);
            }
        }
    }, [data1, data2]);

    const textColor = darkMode ? '#FFFFFF' : '#000000';
    const gridLineColor = darkMode ? '#444444' : '#e6e6e6';
    const backgroundColor = darkMode ? '#1f1f1f' : 'None';
    const plotLineColor = darkMode ? '#FFFFFF' : '#808080';

    const lineChartOptions: Options = {
        chart: {
            backgroundColor: backgroundColor,
            type: 'spline',
            height: 600,
            style: {
                fontFamily: fontStyle.fontFamily,
            },
            className: '',
        },
        time: {
            useUTC: false,
        },
        title: {
            text: 'Time series of measurements',
            style: {
                color: textColor,
            },
        },
        subtitle: {
            text: 'Last 24 hours',
            style: {
                color: textColor,
            },
        },
        accessibility: {
            enabled: false,
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxPadding: 0.1,
            range: 3 * 3600 * 1000, // three hours
            labels: {
                style: {
                    color: textColor,
                },
            },
            lineColor: gridLineColor,
        },
        yAxis: {
            title: {
                text: 'Value',
                style: {
                    color: textColor,
                },
            },
            labels: {
                style: {
                    color: textColor,
                },
            },
            gridLineColor: gridLineColor,
            plotLines: [
                {
                    value: 0,
                    width: 1,
                    color: plotLineColor,
                },
            ],
        },
        rangeSelector: {
            enabled: false,
        },
        tooltip: {
            headerFormat: '<b>{point.x:%a, %d-%b-%Y %H:%M:%S}</b><br/>',
            pointFormat: '<b>{series.name}: </b>{point.y:.2f}',
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: textColor,
            },
        },
         navigator: {
            xAxis: {
                labels: {
                    style: {
                        color: textColor,
                    },
                },
            },
        },
        series: [
            {
                name: 'Inhalable',
                data: data1,
                type: 'spline',
                lineWidth: 2,
                tooltip: {
                    valueDecimals: 2,
                },
            },
            {
                name: 'Respirable',
                data: data2,
                type: 'spline',
                lineWidth: 2,
                tooltip: {
                    valueDecimals: 2,
                },
            },
        ],
    };

    return (
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
