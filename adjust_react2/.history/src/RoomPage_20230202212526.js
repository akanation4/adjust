import { useParams } from "react-router-dom";

export default function RoomPage(propd) {

    let { pass } = useParams();

    return (
        <div>
            <h1>部屋パスワード: {props.match.params.pass}</h1>
            <div>wawaawaawawaw</div>
        </div>
    );
}