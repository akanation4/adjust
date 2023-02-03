import { useContext } from "react";
import { RoomContext } from "./Room";
export default function RoomPage() {
    
    function RoomPage2(pass) {
        console.log(pass);
        return <div>RoomPage1:{pass}</div>;
    }

    return <div>RoomPage:</div>;
}