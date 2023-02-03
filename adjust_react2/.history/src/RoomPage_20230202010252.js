import { useParams } from "react-router-dom";

consrRoomPage() {

    let { pass } = useParams();

    return (
        <div>
            <h1>部屋パスワード: {pass}</h1>
        </div>
    );
}