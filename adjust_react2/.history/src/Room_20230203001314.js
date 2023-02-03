import React , { useEffect, useState }from 'react';
import axios from 'axios';
import getAuthInfo from './Login';
import decodeJWT from './Login';
import RoomPage2 from './RoomPage';
// import { useContext } from 'react';

// export const RoomContext = React.createContext();

// export function useRoom() {
//     return useContext(RoomContext);
// }

export default function Room() {

    //room作成ボタン
    function CreateRoomButton() {
        return(
            <button onClick={CreateRoom}>Room作成</button>
        );
    }

    //room入室ボタン
    function JoinRoomButton(props) {
        
        const [pass, setPass] = useState("");
        const [addPass, setAddPass] = useState("");

        return(
            <form>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="text" required />
                <button onClick={ (e) => {
                    e.preventDefault();
                    setAddPass(pass);
                    RoomPage2(addPass);
                    window.location.href = `room/adjust`;
                }}>Room入室</button>
                <p>now room:{pass}</p>
                {/* <RoomContext.Provider value={addPass}>
                </RoomContext.Provider> */}
                    <p>room:{addPass}</p>
                
            </form>
            
        );
    }

    //room作成
    function CreateRoom() {
        //部屋を立てた人のsubを送信
        const authInfo = getAuthInfo();
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
        RoomPage2({res});
    }

    //roomページ
    function RoomPage1(pass) {
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

    //id_tokenのJWTをデコード
    function decodeJwt(token) {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); 
        const data = JSON.parse(window.atob(base64)); 
        console.log(data); 
        return data;   
    }

    return (
        <div>
            <h1>room作成</h1>
            <CreateRoomButton />
            <JoinRoomButton />
        </div>  
    );
}
