import { checkPassword, updatePassword } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface UserProps{
    email:string;
    password:string;
    newPassword:string;
}
export async function POST(request: NextRequest) {
    const requestPayload:UserProps = await request.json()
    console.log(requestPayload.email)
    console.log(requestPayload.password)
    console.log(requestPayload.newPassword)

    if(await checkPassword(requestPayload.password)){
        if(await updatePassword(requestPayload.newPassword)){
            return NextResponse.json({status:'success'})
        }
    }else{
        return NextResponse.json({status:'mismatch'})
    }
    return NextResponse.json({status:'error'})
}