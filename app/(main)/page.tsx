"use client"
import { Card, CardBody } from "@nextui-org/react";
import LineChart from "../components/LineChart";
import Gauge from "../components/Gauge";
import {semanticColors} from "@nextui-org/theme";
import Bullet from "../components/Bullet";
import { useEffect, useState } from "react";

export default function Home() {

  const [inFra, setInFra] = useState<number>(100);
  const [brFra, setBrFra] = useState<number>(200);
  const [qdFra, setQdFra] = useState<number>(150);
  const [weather, setWeather] = useState<number[]>([10,-15,2]);
  const [chartData1, setChartData1] = useState<number[][]>([]);
  const [chartData2, setChartData2] = useState<number[][]>([]);
  const [chartData3, setChartData3] = useState<number[][]>([]);

  useEffect(()=>{
    console.log('Ran first time')
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate()-1);
    const offsetDate = new Date(yesterday);
    offsetDate.setHours(0)
    offsetDate.setMinutes(0)
    offsetDate.setSeconds(0)
    offsetDate.setMilliseconds(0)

    const data1:number[][] = []
    const data2:number[][] = []
    const data3:number[][] = []
    for (var d = new Date(yesterday); d <= now; d.setMinutes(d.getMinutes() + 1)) {
        let time = (d.getTime() - offsetDate.getTime())/3000000;
        data1.push([d.getTime(), 1500 + 50 * Math.random()])
        data2.push([d.getTime(), 1000 + 50 * Math.random()])
        data3.push([d.getTime(), 100 + 10 * Math.random()])
    }
    setChartData1(data1)
    setChartData2(data2)
    setChartData3(data3)

    setInterval(()=>{
      console.log('Repeating every time')
      setInFra(a=>(a+10)%1000)
      setBrFra(a=>(a+15)%1000)
      setQdFra(a=>(a+20)%1000)
      setWeather(a=>[(a[0] + Math.round(Math.random()*100)/40)%100, (a[1] + Math.round(Math.random()*100)/40)%50, Math.round(Math.random()*1000)/100])

      var d = new Date();
      let time = (d.getTime() - offsetDate.getTime())/3000000;
      data1.pop();
      data2.pop();
      data3.pop();
      data1.push([d.getTime(), 100 * Math.sin(Math.PI*time)])
      data2.push([d.getTime(), 100 * Math.sin(Math.PI/4 + Math.PI*time)])
      data3.push([d.getTime(), 100 * Math.sin(Math.PI/2 + Math.PI*time)])
      setChartData1(data1)
      setChartData2(data2)
      setChartData3(data3)

    },6000);
  },[]);

  return (
    <main className="container p-2 grow flex flex-col gap-2 text-justify">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Card>
          <CardBody>
            <Bullet humidity={weather[0]} temperature={weather[1]} windSpeed={weather[2]}/>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
          <Gauge label="Inhalable Fraction" value={inFra} color={semanticColors.light.success[500]}/>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Gauge label="Respirable Fraction" value={brFra} color={semanticColors.light.warning[500]}/>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Gauge label="Quartz Dust" value={qdFra} color={semanticColors.light.danger[500]}/>
          </CardBody>
        </Card>
      </div>
        <Card>
          <CardBody>
            <LineChart data1={chartData1} data2={chartData2} data3={chartData3}/>
          </CardBody>
        </Card>
    </main>
  )
}
