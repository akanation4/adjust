import { useParams } from "react-router-dom";

export default function RoomPage() {

    let { pass } = useParams();

    return (
        <div>
            <h1>部屋パスワード: </h1>
            <div>wawaawaawawaw</div>
        </div>
    );
}