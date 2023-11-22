"use client"
import { Button, Chip, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { FormEvent, useRef } from "react";

interface LoginBoxProps{
    className?:string;
    callbackUrl?:string;
    error?:string;
}

export default function LoginBox(props:LoginBoxProps) {
    const username = useRef<string>("");
    const password = useRef<string>("");

    function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        const loginData = {
            username:username.current, 
            password:password.current,
            redirect:true,
            callbackUrl:props.callbackUrl ?? "/"
        }
        signIn("credentials", loginData)
        console.log(loginData);
    }
    return(
        <>
            <div className="text-center">
                {props.error && <Chip color="danger" variant="bordered">Review login details and try again</Chip>}
            </div>
            <form onSubmit={onSubmit} className="flex flex-col p-6 gap-4">
                <Input
                    name="email"
                    required
                    type="text"
                    label="Username:"
                    variant="bordered"
                    defaultValue=""
                    className="w-full"
                    placeholder="Enter your email"
                    onChange={(e)=>{username.current = e.target.value}}
                />
                <Input
                    name="password"
                    required
                    type="password"
                    label="Password:"
                    variant="bordered"
                    defaultValue=""
                    className="w-full"
                    placeholder="Enter your password"
                    onChange={(e)=>{password.current = e.target.value}}
                />

                <Button type="submit" variant="flat">
                    Login
                </Button>
            </form>
        </>
    );
}