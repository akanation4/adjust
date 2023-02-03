import React from "react";
import { useEffect, useRef } from "react";


export default function RoomPage() {

    useEffect(() =>  {
        const L
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