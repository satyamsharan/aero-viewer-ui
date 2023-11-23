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

  useEffect(()=>{
    console.log('Ran first time')
    setInterval(()=>{
      console.log('Repeating every time')
      setInFra(a=>(a+10)%1000)
      setBrFra(a=>(a+15)%1000)
      setQdFra(a=>(a+20)%1000)
      setWeather(a=>[(a[0] + Math.round(Math.random()*100)/40)%100, (a[1] + Math.round(Math.random()*100)/40)%50, Math.round(Math.random()*1000)/100])
    },5000);
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
            <Gauge label="Breathable Fraction" value={brFra} color={semanticColors.light.warning[500]}/>
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
            <LineChart />
          </CardBody>
        </Card>
    </main>
  )
}
