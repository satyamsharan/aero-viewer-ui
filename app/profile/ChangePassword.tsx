"use client"

import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useMemo, useState, useEffect, useRef, MutableRefObject } from "react";
import { PiCheckFat, PiEraser } from "react-icons/pi";
import Alert from "../components/Alert";

interface ChangePasswordProps {
    email:string;
}

export default function ChangePassword({email}:ChangePasswordProps){
    const [password, setPassword]= useState<string|null>(null);
    const [newPassword, setNewPassword]= useState<string|null>(null);
    const [repeatPassword, setRepeatPassword]= useState<string|null>(null);

    const passwordTouched:MutableRefObject<Boolean> = useRef(false);
    const newPasswordTouched:MutableRefObject<Boolean> =  useRef(false);
    const repeatPasswordTouched:MutableRefObject<Boolean> =  useRef(false);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [message, setMessage]= useState<string[]>(["error", ""]);

    const isPasswordValid = useMemo(()=>{
        if(passwordTouched.current){
            if(password){
                if(password===''){
                    return true;
                }
            }else{
                return true;
            }
        }else{
            if(password!==null){
                passwordTouched.current = true;
            }
        }
        return false;
    }, [password])

    const isNewPasswordValid = useMemo(()=>{
        if(newPasswordTouched.current){
            if(newPassword){
                if(newPassword===''){
                    return true;
                }else if(newPassword.length<5){
                    return true;
                }
            }
        }else{
            if(newPassword!==null){
                newPasswordTouched.current = true;
            }
        }
        return false;
    }, [newPassword])

    const isRepeatPasswordValid = useMemo(()=>{
        if(repeatPasswordTouched.current){
            if(repeatPassword){
                if(repeatPassword===''){
                    return true;
                }else if(repeatPassword != newPassword){
                    return true;
                }
            }else{
                return true;
            }
        }else{
            if(repeatPassword!==null){
                repeatPasswordTouched.current = true;
            }
        }
        return false;
    }, [repeatPassword])

    function clearPassword(){
        passwordTouched.current =false
        setPassword(null)

        newPasswordTouched.current =false
        setNewPassword(null)

        repeatPasswordTouched.current =false
        setRepeatPassword(null)
    }
    function validate(){
        if(!password || password==""){
            return "Please enter your current password."
        }else if(!newPassword || newPassword.length<5){
            return "The new password must be at least 5 characters."
        }else if(newPassword == password){
            return "The new password must be different than the current one."
        }else if(newPassword !== repeatPassword){
            return "The passwords did not match.";
        }
        return null;
    }
    function updateMyPassword(){
        let error = validate();
        if(error){
            setMessage(["error", "Invalid Input", error])
            onOpen();
        }else{
            try {
                fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, newPassword }),
                })
                .then((response) => response.json())
                .then((data) => {
                    if(data["status"]=="success"){
                        setMessage(["success", "Success", "Your password has been changed. You can logout and try logging in with the new password"])
                        onOpen();
                    }else if(data["status"]=="mismatch"){
                        setMessage(["error", "Error", "The current password what you entered did not match with our records."])
                        onOpen();
                    }else{
                        setMessage(["error", "Error", "Something went wrong, please try again later."])
                        onOpen();
                    }
                    console.log(data)
                });
            } catch (err) {
                console.error('Error:', err);
                setMessage(["error", "Error:", String(err)])
                onOpen();
            }
        }
        
    }

    return (
        <>
        <div className="flex flex-col gap-1">
                    <div className="text-xs">Change password?</div>
                    <Input
                        required
                        type="password"
                        label="Enter Your Current Password:"
                        variant="bordered"
                        defaultValue=""
                        className="w-full"
                        isInvalid={isPasswordValid}
                        color={isPasswordValid ? "danger" : "default"}
                        value={password?password:''}
                        onValueChange={setPassword}
                        />
                    <Input
                        required
                        type="password"
                        label="Enter New Password:"
                        variant="bordered"
                        defaultValue=""
                        className="w-full"
                        description="At least 5 characters"
                        isInvalid={isNewPasswordValid}
                        color={isNewPasswordValid ? "danger" : "default"}
                        value={newPassword?newPassword:''}
                        onValueChange={setNewPassword}
                    />
                    <Input
                        required
                        type="password"
                        label="Repeat New Password:"
                        variant="bordered"
                        defaultValue=""
                        className="w-full"
                        isInvalid={isRepeatPasswordValid}
                        color={isRepeatPasswordValid ? "danger" : "default"}
                        value={repeatPassword?repeatPassword:''}
                        onValueChange={setRepeatPassword}
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button color="default" onClick={clearPassword}><PiEraser/>Clear</Button>
                    <Button color="primary" onClick={updateMyPassword}><PiCheckFat />Change Password</Button>
                </div>
                <Alert content={message} isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
}