import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";


export default function RoomPage() {

    const location = useLocation();
    const [roomPass, setRoomPass] = useState("");

    useEffect(() =>  {
        const pass = location.state.pass;
        console.log(pass);
        if (pass !== null) {
            setRoomPass(pass);
        }
    }, []);

    return (
        <div>RoomPass: {roomPass}</div>
        
    );
}