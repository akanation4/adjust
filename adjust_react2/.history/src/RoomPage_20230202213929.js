import { useParams } from "react-router-dom";

export default function RoomPage() {
    const roomPass = [];
    for(let i = 0; i < 10000; i++) {
        roomPass.push({pass: i});

    const { pass } = useParams();
    const 

    return (
        <div>
            <h1>部屋パスワード: {pass}</h1>
            <div>wawaawaawawaw</div>
        </div>
    );
}