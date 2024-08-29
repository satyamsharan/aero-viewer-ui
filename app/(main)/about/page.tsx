import { Card, CardBody, Divider } from "@nextui-org/react";
import Image from "next/image";

export default function About(){
    return (
        <div className="container grow flex flex-col items-center justify-start ">
            <div className="pt-10">
                <Card className="max-w-xl">
                    <CardBody>
                        <div className="flex flex-col items-center gap-8 p-4">
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <Image
                                    alt="AFRY"
                                    className=""
                                    src="/tunnel.jpg"
                                    width={270}
                                    height={180}
                                    />

                                <div className="text-sm text-justify">
                                    <p>
                                        Aero Viewer is an initiative from AFRY to help and assist Trafikverket with remote monitoring of working conditions in the Stockholm Bypass Tunnel project. For more details feel free to contact:
                                    </p>
                                    <p className="pt-2 font-bold">Zanna Zielfeldt</p>
                                    <a href="mailto:zanna.zielfeldt@afry.com" style={{ color: 'blue', textDecoration: 'underline' }}>zanna.zielfeldt@afry.com</a>
                                </div>
                            </div>

                            <Divider />
                            <Image
                                alt="AFRY"
                                className=""
                                src="/AFRY-full-logo.svg"
                                width={300}
                                height={100}
                                />
                            <div>Engineered by AFRY</div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}