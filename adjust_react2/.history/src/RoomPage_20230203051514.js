import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function RoomPage() {

    const location = useLocation();

    useEffect(() =>  {
        const pass = location.state;
        console.log(pass);
        if (pass !== null) {
            return (
                <div>RoomPass: {pass: pass}</div>
            );
        }
    }, []);

    return (
        <div>RoomPass:noooo</div>
    );
}