import React , { useEffect, useState }from 'react';
import axios from 'axios';
import getAuthInfo from './Login';
import decodeJWT from './Login';
import { getValue } from '@testing-library/user-event/dist/utils';

export default function Room() {

    //room作成ボタン
    function CreateRoomButton() {
        return(
            <button onClick={CreateRoom}>Room作成</button>
        );
    }

    //room入室ボタン
    function JoinRoomButton() {
        
        const {pass, setPass} = useState("");

        return(
            <form >
                <input className='password' value={pass} type="text" required />
                <button onSubmit={(e) => {
                    setPass(e.target.value);
                    getValue()
                    
                }}>Room入室</button>
            </form>
            
        );
    }

    //room作成
    function CreateRoom() {
        //部屋を立てた人のsubを送信
        const authInfo = getAuthInfo();
        const sub = authInfo.id_token;

        axios.post("http://akanation4.server-on.net/makeroom", {
            sub: sub    
        });
        
        //部屋の鍵の取得
        const res =  axios
            .get("http://akanation4.server-on.net/makeroom")
            .then((res) => res.data);
                
        //roomページの生成
        window.location.href = "/room/pass=" + res;
        RoomPage(res,authInfo.data.name);
    }

    //room入室
    function JoinRoom(pass) {
        //roomページへ遷移
        window.location.href = "/room/pass=" + pass;
    RoomPage(pass);
    }

    //roomページ
    function RoomPage(pass) {
        //dbから同じ暗号の人の情報を取得


        const [response, setResponse] = useState([]);

        useEffect(() => {
            fetch("")
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
    }

    return (
        <div>
            <h1>room作成</h1>
            <CreateRoomButton />
            <JoinRoomButton />
        </div>  
    );
}
