import { Button, Divider, Input } from "@nextui-org/react";
import Image from "next/image";
import {  PiCheckFat, PiEraser, PiFingerprint, PiLock, PiPassword } from "react-icons/pi";

export default function Profile(){
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
                        defaultValue="satyam.sharan@afry.com"
                        className="w-full"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-xs">Change password?</div>
                    <Input
                            required
                            type="password"
                            label="Enter Your Old Password:"
                            variant="bordered"
                            defaultValue=""
                            className="w-full"
                        />
                    <Input
                        required
                        type="password"
                        label="Enter New Password:"
                        variant="bordered"
                        defaultValue=""
                        className="w-full"
                    />
                    <Input
                        required
                        type="password"
                        label="Repeat New Password:"
                        variant="bordered"
                        defaultValue=""
                        className="w-full"
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button color="default"><PiEraser/> Clear</Button>
                    <Button color="primary"><PiCheckFat />Change Password</Button>
                </div>
            </div>
        </div>
    );
}