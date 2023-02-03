import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function RoomPage() {

    const location = useLocation();

    useEffect(() =>  {
        const [roomPass, setRoomPass] = useState("");
        const pass = location.state.pass;
        console.log(pass);
        Warning: useEffect must not return anything besides a function, which is used for clean-up. You returned: [object Object]
    }, []);

    return (
        <div>RoomPass:noooo</div>
    );
}