import React from "react";
import { useEffect } from "react";
re


export default function RoomPage() {

    useEffect(() =>  {
        const location = useLocation();
        const pass = window.location.state.pass;
        console,log(pass);
        if (pass !== undefined) {
            return (
                <div>RoomPass: {pass}</div>
            );
        }
    }, []);

    return (
        <div>RoomPass:noooo</div>
    );
}