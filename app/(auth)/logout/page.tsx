"use client"
import { Button} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter()
    const {data:session} = useSession();
    let logoutElement=<></>
    if (session && session.user){
        logoutElement=
        <div className="flex flex-col gap-2">  
            <div className="text-center p-2">
                <p>Logged in user</p>
                <p className="font-bold">{session.user.email}</p>
            </div>
            <Button onClick={()=>signOut()} variant="flat" color="danger">
                Logout
            </Button>
            <Button onClick={router.back} variant="flat">
                Cancel
            </Button>
        </div>
    }else{
        logoutElement=
        <Button onClick={()=>router.push("/")} variant="flat">
            Return to login page
        </Button>
    }
    return(
        logoutElement
    );

}