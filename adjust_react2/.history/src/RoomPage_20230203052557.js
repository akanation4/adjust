import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function RoomPage() {

    const location = useLocation();

    useEffect(() =>  {
        const [roomPass, setRoomPass] = useState("");
        const pass = location.state.pass;
        console.log(pass);
        if (pass !== null) {
            setRoomPass(pass);
        }
    }, []);

    return (
        <div>RoomPass: {pass}</div>
    );
}