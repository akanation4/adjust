import React from 'react';

function Room() {
    //room作成
    function CreateRoom() {
        //部屋の鍵の取得
        const res =  axios
            .get("",{})
            .then((res) => res.data);

        //部屋の作成
        
        return(
            <>
            <div>Room: {res}</div><div>現在{res}人</div></>
        );
        }
}
