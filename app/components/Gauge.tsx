"use client";
import Highcharts, { Options } from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';

import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";
import { Inter } from 'next/font/google';
import { useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });
const fontStyle = inter.style;
const colors = ['#17c964', '#f5a524', '#f31260'];

interface GaugeProps {
    label: string;
    value?: number;
    stops: any;
    maxValue: number;
    darkMode: boolean;
}

export default function Gauge({ label, value = 500, maxValue, stops, darkMode }: GaugeProps) {
    const mappedStops = stops.map((stop: any, index: any) => [stop, colors[index]]);
    
    if (typeof Highcharts === 'object') {
        HighchartsMore(Highcharts);
        SolidGauge(Highcharts);
    }

    const chartComponent = useRef<HighchartsReactRefObject>(null);

    useEffect(() => {
        if (chartComponent.current) {
            const chart = chartComponent.current.chart;
            const point = chart.series[0].points[0];
            point.update(value);
        }
    }, [value]);

    const backgroundColor = darkMode ? '#1f1f1f' : 'None';
    const textColor = darkMode ? '#FFFFFF' : '#000000';

    const gaugeOptions: Options = {
        chart: {
            type: "solidgauge",
            backgroundColor: backgroundColor,
            style: {
                fontFamily: fontStyle.fontFamily,
                fontSize: '14px',
            },
            height: "200",
        },
        title: {
            text: label,
            style: {
                color: textColor,
            },
        },
        accessibility: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        tooltip: {
            enabled: false,
        },
        pane: {
            center: ['50%', '80%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: [
                {
                    shape: 'arc',
                    outerRadius: "100%",
                    innerRadius: "80%",
                    borderWidth: 0,
                    backgroundColor: darkMode ? '#333' : '#eee',
                }
            ],
        },
        yAxis: {
            labels: {
                distance: "16px",
                style: {
                    color: textColor,
                },
            },
            min: 0,
            max: maxValue,
            lineWidth: 0,
            stops: mappedStops,
            tickAmount: 6,
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y} μg/m3',
                    borderWidth: 0,
                    style: {
                        fontSize: '12px',
                        color: textColor,
                    },
                },
                linecap: "round",
                stickyTracking: false,
                rounded: false,
            },
        },
        series: [
            {
                name: label,
                type: "solidgauge",
                data: [
                    {
                        radius: "100%",
                        innerRadius: "80%",
                        y: value,
                    }
                ],
            }
        ]
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={gaugeOptions}
                ref={chartComponent}
            />
        </div>
    );
}