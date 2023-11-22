import { getServerSession } from 'next-auth';
import prisma from './prisma';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';


export async function updatePassword(password:string){
    const session = await getServerSession(options)
    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }
    const email = session.user?.email;

    const updateUser = await prisma.user.update({
        where: {
            email: email?email:'',
        },
        data: {
            password: password,
        },
    })

    if(updateUser){
        return true;
    }else{
        return false;
    }
}

export async function checkPassword(password:string){
    const session = await getServerSession(options)
    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }
    const email = session.user?.email;

    const user = await prisma.user.findUnique({
        where: {
            email: email?email:'',
            password: password
        }
    });

    if(user){
        return true;
    }else{
        return false;
    }
}