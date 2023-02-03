import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Adjustment from "./Adjustment";


export default function RoomPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const [roomPass, setRoomPass] = useState("");
    const [sum, setSum] = useState(0);

    useEffect(() =>  {
        const pass = location.state.pass;
        console.log(pass);
        if (pass !== null) {
            setRoomPass(pass);
        }
    }, []);

    function Adjustment() {
        
    }

    return (
        <>
            <div>RoomPass: {roomPass}</div>
            <div>現在{sum}人が参加しています</div>
            <form>
                <button onClick={<Adjustment />}>調整する</button>
                <button>更新する</button>
            </form>
        </>
    );
}