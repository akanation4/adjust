import React , { Component, useEffect, useState }from 'react';

function Room() {
    
    //room作成ボタン
    function CreateRoomButton() {
        return(
            <button onClick={CreateRoom}>Room作成</button>
        );
    }

    //room入室ボタン
    function JoinRoomButton() {
        const [pass, setPass] = useState("");
        
        return(
            <form>
                <input type="password" max_length="5" placeholder="Roomの鍵を入力" required/>
                <button onClick={JoinRoom}>Room入室</button>
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

        //同じ鍵の人を探す(DBから？)
        let sum = 0;
        const history = useHistory();
        if (history.location.pathname === "/room/" + res) {
            sum= sum++;
        }
        return(
            <>
            <div>Room: {res}</div>
            <div>現在{sum}人</div>
            </>
        );
    }

    //room入室
    function JoinRoom(props) {
        const [pass, setPass] = useState("");


    }
}
