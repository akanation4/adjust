import { useContext } from "react";
import { RoomContext } from "./Room";

export default function RoomPage() {
    const pass = useContext(RoomContext);

    return <div>RoomPage:{pass}</div>;
}