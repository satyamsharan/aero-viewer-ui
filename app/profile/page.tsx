import { Divider, Input } from "@nextui-org/react";
import { getServerSession } from "next-auth/next"
import { options } from "../api/auth/[...nextauth]/options"

import {  PiFingerprint, PiLock, PiPassword } from "react-icons/pi";
import { redirect } from 'next/navigation';
import ChangePassword from "./ChangePassword";

export default async function Profile(){
    const session = await getServerSession(options)
    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }
    const email:string = session?.user?.email?session.user.email:'';

    return (
        <div className="container grow flex flex-col md:flex-row items-center md:items-start justify-start md:justify-around pt-4 md:pt-20">
            
            <div className="w-80 h-80 rounded-full flex flex-col items-center justify-center bg-default ">
                <PiLock size={100}/>
                <div className="flex">
                    <PiFingerprint size={50}/>
                    <PiPassword size={50}/>
                </div>
            </div>
            <div className="md:h-80 w-0">
            <Divider orientation="vertical"/>
            </div>
            <div className="flex flex-col w-full p-10 md:p-0 md:w-80 min-h-80 gap-6">
                <div>
                    <Input
                        isReadOnly
                        type="email"
                        label="Your Email:"
                        variant="underlined"
                        defaultValue={email}
                        className="w-full"
                    />
                </div>
                <ChangePassword email={email}/>
            </div>
        </div>
    );
}