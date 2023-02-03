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
        //部屋の鍵の取得
        const res =  axios
            .get("",{})
            .then((res) => res.data);
                
        //roomページの生成
        window.location.href = "/room/" + res;
    }

    //room入室
    function JoinRoom(pass) {
        //roomページへ遷移
        window.location.href = "/room/" + pass;
    }

    //roomページ
    function RoomPage() {
        return(
            <div>
                <h1>Room</h1>
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
