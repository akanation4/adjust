import React , { useEffect, useState }from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getAuthInfo from './Login';
import decodeJWT from './Login';

export default function Room() {

    //room作成ボタン
    function CreateRoomButton() {
        return(
            <button onClick={CreateRoom}>Room作成</button>
        );
    }

    //room入室ボタン
    function JoinRoomButton() {
        const navigate = useNavigate();
        
        const [pass, setPass] = useState("");
        const [addPass, setAddPass] = useState("");

        return(
            <form>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="text" required />
                <button onClick={ (e) => {
                    e.preventDefault();
                    setAddPass(pass);
                    navigate(`/adjust`, {state: {pass}});
                }}>Room入室</button>
                <p>now room:{pass}</p>
                <p>room:{addPass}</p>
                
            </form>
            
        );
    }

    //room作成
    function CreateRoom() {
        //部屋を立てた人のsubを送信
        const authInfo = getAuthInfo();
        console.log(authInfo.id_token);
        const token = authInfo.id_token;
        const sub = decodeJWT(token).sub;

        axios.post("http://akanation4.server-on.net/makeroom", {
            sub: sub    
        });
        
        //部屋の鍵の取得
        const res =  axios
            .get("http://akanation4.server-on.net/makeroom")
            .then((res) => res.data);
                
        //roomページの生成
        window.location.href = `room/adjust`;
    }

    //roomページ
    function RoomPage1(pass) {
        //dbから同じ暗号の人の情報を取得
        const authInfo = getAuthInfo();
        console.log(authInfo.id_token);
        const [response, setResponse] = useState([]);

        useEffect(() => {
            fetch("http://akanation4.server-on.net:8080/make",{})
                .then((res) => res.json())
                .then((responseJson) => {
                    setResponse(responseJson['results']);
                });
        }, []);

        return (
            <div>
                <h1>room:</h1>
                <div>現在?人が参加しています</div>
            </div>
        );
    

    return (
        <div>
            <h1>room作成</h1>
            <CreateRoomButton />
            <JoinRoomButton />
            <div></div>
        </div>  
    );
}
