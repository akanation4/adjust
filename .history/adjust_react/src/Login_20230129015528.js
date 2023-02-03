import React, { useEffect, Component} from 'react';
import './App.css';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useQuery } from 'react-query';

export default function Login() {

    const queryClient = new QueryClient();

    //認可に必要なパラメータ
    const authParams ={
        clientId: "???",
        clientSecret: "???",
        scope: "profile email",
        responseType: "code",
        approvalPrompt: "force",
        accessType: "offline",
        redirectUri: "http://localhost:3000/auth_code",
        grantType: "authorization_code"   
    }

    //client_secret.jsonからclient_idとclient_secretを取得
    const data = require("./client_secret.json");

    authParams.clientId = data.client_id;
    authParams.clientSecret = data.client_secret;

    //認可情報
    const AuthInfo = {
        access_token: "",
        refresh_token: "",
        scope: "",
        token_type: "",
        id_token: "",
        expires_in: 0
    };


    //認可情報をLocalStorageに保存
    function setAuthInfo(AuthInfo) {
        window.localStorage.setItem("authInfoKey", JSON.stringify(AuthInfo));
    }

    //認可情報をLocalStorageから取得
    function getAuthInfo() {
        const item = window.localStorage.getItem("authInfoKey");
        if (item !== null) {
            return JSON.parse(item);
        } else {
            return null;
        }
    }

    //認可情報をLocalStorageから削除
    function removeAuthInfo() {
        window.localStorage.removeItem("authInfoKey");
    }

    //Googleのログイン画面に遷移
    function requestCodeFlow() {
        const params = {
            client_id: authParams.clientId,
            redirect_uri: authParams.redirectUri,
            scope: authParams.scope,
            response_type: authParams.responseType,
            approval_prompt: authParams.approvalPrompt,
            access_type: authParams.accessType
        };
        const query = new URLSearchParams(params).toString();
        window.location.href = "https://accounts.google.com/o/oauth2/auth?" + query;
    }

    //URLをパースしcodeを取得
    function getCode() {
        const params = new URLSearchParams(window.location.search);
        return params.get("code");
    }

    //トークンを取得
    async function getAuthToken(code) {
        const params = {
            code,
            client_id: authParams.clientId,
            client_secret: authParams.clientSecret,
            redirect_uri: authParams.redirectUri,
            grant_type: authParams.grantType
        };
        const res = await axios.post('https://www.googleapis.com/oauth2/v4/token', params);
        return res.data;
    }

    //ログアウト
    async function signOut(AuthInfo) {
        try {
            if(AuthInfo !== undefined) {
                const res = await axios.get('https://accounts.google.com/o/oauth2/revoke',
                    {
                        params: {
                            token: AuthInfo.access_token,
                        },
                    }
                );
                if (res.status === 200) {
                    removeAuthInfo();
                    window.location.href = "/";
                }
            }
        } finally {
            removeAuthInfo();
            window.location.href = "/";
        }
        return;
    }

    //ユーザ情報の取得
    function getUserInfo(AuthInfo) {
        return axios
            .get("https://www.googleapis.com/oauth2/v1/userinfo", {
                params: {
                access_token: AuthInfo.access_token,
                },
            })
            .then((res) => res.data);
    }    

    //Authorizedコンポーネントの実装
    const AuthorizedContext = React.createContext({});

    function Authorized({unauthorized, children}) {
        const authInfo = getAuthInfo();

        React.useEffect(() => {
            if (window.location.pathname === "/auth_code") {
                const code = getCode();
                if (code != null) {
                    getAuthToken(code)
                        .then((token) => {
                            setAuthInfo(token);
                            window.location.href = "/";
                        })
                    .catch((err) => console.log(err));
                }
            }
        });

        if (authInfo === null) {
            return unauthorized || null;
        } else {
            return (
                <AuthorizedContext.Provider value={{ authInfo }}>
                    {children}
                </AuthorizedContext.Provider>
            );
        }
    }

    //未ログイン時の画面
    function Unauthorized() {
        return (
            <div>
                <div>ログインしてください</div>
                <button onClick={() => requestCodeFlow()}>Login</button>
            </div>
        );
    }

    //ユーザ情報の表示
    function UserInfo() {
        const { authInfo } = React.useContext(AuthorizedContext);
        const query = useQuery('email', () => {
            if (authInfo == null) {
                return Promise.reject(new Error(`No AuthInfo`));
            }
            return getUserInfo(authInfo);
        });

        if (query.isError) {
            return <div>Failed to get the email</div>;
        } else if (query.isSuccess) {
            return (
                <div>ようこそ、{query.data.name}さん</div>
            );
        } else {
            return <div>Loading</div>;
        }
    }

    //ログアウトボタン
    function SignOut() {
        const { authInfo } = React.useContext(AuthorizedContext);
        return (
            <div>
                <button onClick={() => signOut(authInfo)}>Logout</button>
            </div>
        );
    }

    //room作成
    function CreateRoom() {
        //部屋の鍵の取得
        const res =  axios
            .get("",{})
            .then((res) => res.data);

    
        return(
            <div>{res}</div>
        );
        }

    return(
            <QueryClientProvider client={queryClient}>
                <Authorized  unauthorized={<Unauthorized />}>
                    <UserInfo />
                    <SignOut />
                </Authorized>
            </QueryClientProvider>
    );

}