import { useParams } from "react-router-dom";

export default function RoomPage() {
    const

    let { pass } = useParams();

    return (
        <div>
            <h1>部屋パスワード: {pass}</h1>
            <div>wawaawaawawaw</div>
        </div>
    );
}