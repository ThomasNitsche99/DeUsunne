"use client"



import {signIn, signOut} from "next-auth/react"


export  function SignInButton(){
    return (
        <div>
            <button onClick={()=> signIn()}>Sign in</button>
        </div>
    )
}


export  function SignOutButton(){
    return (
        <div>
            <button onClick={()=> signOut()}>Sign out</button>
        </div>
    )
}