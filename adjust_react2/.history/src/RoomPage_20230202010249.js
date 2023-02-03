import { useParams } from "react-router-dom";

RoomPage() {

    let { pass } = useParams();

    return (
        <div>
            <h1>部屋パスワード: {pass}</h1>
        </div>
    );
}