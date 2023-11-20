"use client"
import { Card, CardBody } from "@nextui-org/react";
import LineChart from "./components/LineChart";
import Gauge from "./components/Gauge";
import {semanticColors} from "@nextui-org/theme";
import Bullet from "./components/Bullet";

export default function Home() {
  return (
    <main className="container p-2 grow flex flex-col gap-2 text-justify">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Card>
          <CardBody>
            <Bullet />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
          <Gauge label="Inhalable Fraction" value={50} color={semanticColors.light.success[500]}/>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Gauge label="Breathable Fraction" value={234} color={semanticColors.light.warning[500]}/>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Gauge label="Quartz Dust" value={0} color={semanticColors.light.danger[500]}/>
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
