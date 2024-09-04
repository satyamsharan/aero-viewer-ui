"use client";

import Highcharts, { Options } from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import BulletChart from 'highcharts/modules/bullet';

import { semanticColors } from "@nextui-org/theme";
import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";
import { Inter } from 'next/font/google';
import { useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });
const fontStyle = inter.style;

interface BulletProps {
    temperature?: number;
    humidity?: number;
    windSpeed?: number;
    darkMode: boolean; 
}

export default function Bullet({ temperature = 0, humidity = 0, windSpeed = 0, darkMode }: BulletProps) {
    if (typeof Highcharts == 'object') {
        HighchartsMore(Highcharts);
        BulletChart(Highcharts);
    }

    let subTitle = 'Wind speed: ' + windSpeed + ' m/s';

    const colors = darkMode
        ? { tempColor: semanticColors.dark.success[500] ?? 'green', humidColor: semanticColors.dark.danger[500] ?? 'red' }
        : { tempColor: semanticColors.light.success[500] ?? 'green', humidColor: semanticColors.light.danger[500] ?? 'red' };

    const bulletOptions: Options = {
        chart: {
            inverted: true,
            type: 'column',
            backgroundColor: darkMode ? '#1f1f1f' : 'None',
            style: {
                fontFamily: fontStyle.fontFamily,
                fontSize: '14px',
            },
            height: "200",
        },
        title: {
            text: 'Weather Information',
            style: {
                color: darkMode ? '#FFFFFF' : '#000000',
            }
        },
        subtitle: {
            text: subTitle,
            style: {
                color: darkMode ? '#AAAAAA' : '#666666',
            }
        },
        accessibility: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        xAxis: [{
            visible: false,
        }],
        yAxis: [{
            title: {
                text: 'Temperature',
                style: {
                    color: colors.tempColor,
                },
            },
            labels: {
                format: '{value}°C',
                style: {
                    color: colors.tempColor,
                },
            },
        }, {
            title: {
                text: 'Humidity',
                style: {
                    color: colors.humidColor,
                },
            },
            labels: {
                format: '{value} %',
                style: {
                    color: colors.humidColor,
                },
            },
            min: 0,
            max: 100,
            opposite: true,
        }],
        series: [
            {
                type: 'column',
                name: 'Humidity',
                data: [{
                    y: humidity,
                    custom: {
                        suffix: '%',
                    },
                }],
                yAxis: 1,
            }, {
                type: 'column',
                name: 'Temperature',
                data: [{
                    y: temperature,
                    custom: {
                        suffix: '°C',
                    },
                }],
                yAxis: 0,
            }
        ],
        colors: [colors.humidColor, colors.tempColor],
        legend: {
            enabled: false,
        },
        tooltip: {
            format: '{series.name}: {point.y} {point.custom.suffix}',
        },
    };

    const chartComponent = useRef<HighchartsReactRefObject>(null);
    useEffect(() => {
        if (chartComponent.current) {
            const chart = chartComponent.current.chart;
            const humidPoint = chart.series[0].points[0];
            humidPoint.update(humidity);

            const tempPoint = chart.series[1].points[0];
            tempPoint.update(temperature);
            let subTitle = 'Wind speed: ' + windSpeed + ' m/s';
            chart.subtitle.update({ text: subTitle });
        }
    }, [humidity, temperature, windSpeed]);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={bulletOptions}
                ref={chartComponent}
            />
        </div>
    );
}
