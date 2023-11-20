"use client"
import { Card, CardBody } from "@nextui-org/react";
import LineChart from "./components/LineChart";
import TimeChart from "./components/TimeChart";

export default function Home() {
  return (
    <main className="container p-2 grow flex flex-col text-justify">
        <Card>
          <CardBody>
            <LineChart />
          </CardBody>
        </Card>
    </main>
  )
}
