import React, { useEffect } from 'react'

export const Message = () => {

    useEffect(() => {
        console.log("Message mounted")

        return () => {
            console.log("Message unmounted")
        }
    }, [])

    return (
        <div><span className=''
        </div>
    )
}