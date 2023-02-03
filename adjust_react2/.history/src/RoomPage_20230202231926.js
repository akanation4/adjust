import { useParams } from "react-router-dom";

export default function RoomPage() {
    const { pass } = useParams();
    console.log(pass);
    return <div>RoomPage:{pass}</div>;
}