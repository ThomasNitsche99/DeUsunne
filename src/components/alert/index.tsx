type AlertProps = {
    children : React.ReactNode;
}

export function Alert({children}: AlertProps){
    return(
        <div className="rounded text-red-600 my-2">
            {children}
        </div>
    )
}
