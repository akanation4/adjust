import React from "react";
import { useContext } from "react";
import { RoomContext } from "./Room";

export default function JoinRoom() {
    const pass = useContext(RoomContext);

    return (
        <div>RoomPass: {</div>
    );
}