import LoginBox from "./LoginBox";

interface LoginProps{
    searchParams?:Record<"callbackUrl"|"error", string>
}

export default function Login(props:LoginProps) {
    
    return(
        <LoginBox error={props.searchParams?.error} callbackUrl={props.searchParams?.callbackUrl}/>
    );
}