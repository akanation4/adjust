import React from "react";
import { useEffect, useRef } from "react";


export default function RoomPage() {

    useEffect(() =>  {
        const pass = window.location.state.pass;
        conso
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