import React , { Component, useEffect, useState }from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Room() {
    
    //room作成ボタン
    function CreateRoomButton() {
        return(
            <button onClick={CreateRoom}>Room作成</button>
        );
    }

    //room入室ボタン
    function JoinRoomButton() {
        const [pass, setPass] = useState("");

        //入力された値を取得
        const onClickJoinRoom = () => {
            setPass(pass);
            JoinRoom(setPass);
        }

        return(
            <form>
                <input type="text" max_length="5" required />
                <button onClick={onClickJoinRoom}>Room入室</button>
            </form>
            
        );
    }


    //room作成
    function CreateRoom() {
        //部屋を立てた人のsubを送信
        const AuthInfo = getAuthInfo();
        const sub = AuthInfo.id_token;

        axios.post("http://akanation4.server-on.net/makeroom", {
            sub: sub    
        });
        
        //部屋の鍵の取得
        const res =  axios
            .get("http://akanation4.server-on.net/makeroom")
            .then((res) => res.data);
                
        //roomページの生成
        window.location.href = "/room/" + res;
        RoomPage();
    }

    //room入室
    function JoinRoom(pass) {
        //roomページへ遷移
    window.location.href = "/room/" + pass;
    }

    //roomページ
    function RoomPage() {
        //dbから同じ暗号のひとのじょうほうを
        return(
            <div>
                <h1>room:{}</h1>
            </div>
        );
    }

    return (
        <form>
            <CreateRoomButton />
            <JoinRoomButton />
        </form>
    )
}
