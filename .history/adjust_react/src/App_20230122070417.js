import React from 'react';
import './App.css';
import './Login.js';

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Authorized  unauthorized={<Unauthorized />}>
            <UserInfo />
            <SignOut />
        </Authorized>
    </QueryClientProvider>
  );
}

//認可に必要なパラメータ
const authParams = {
    clientId: "???",
    clientSecret: "???",
    scope: "profile email",
    responseType: "code",
    approvalPrompt: "force",
    accessType: "offline",
    redirectUri: "http://localhost:3000/auth-code",
    grantType: "authorization_code",
}

//認可に必要なトークン
const AuthInfo = {
    access_token: "",
    refresh_token: "",
    scope: "",
    token_type: "",
    id_token: "",
    expires_in: 0
};

//LocalStorageに認可情報を保存
function setAuthInfo(AuthInfo) {
    window.localStorage.setItem("authInfoKey", JSON.stringify(AuthInfo));
}

//LocalStorageから認可情報を取得
function getAuthInfo() {
    const item = window.localStorage.getItem("authInfoKey");
    if (item !== null) {
        return JSON.parse(item);
    } else {
        return null;
    }
}

//ログアウト時のLocalStorageから認可情報削除処理
function deleteAuthInfo() {
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
    window.location.href = 'https://accounts.google.com/o/oauth2/auth?${query}';
}

//URLをパースしcodeを取得する
function getCode() {
    const params = new URLSearchParams(window.location.search);
    return params.get("code");
}

//トークンを取得する
function getAuthToken(code) {
    const params = {
        client_id: authParams.clientId,
        client_secret: authParams.clientSecret,
        redirect_uri: authParams.redirectUri,
        grant_type: authParams.grantType,
        access_type: authParams.accessType
    };
    const res = axios.post(`https://www.googleapis.com/oauth2/v4/token`,
        params
    );
    return res.data;

}

//Authorizedコンポーネント
const AuthorizedContext = React.createContext({});

function Authorized({unauthorized, children}) {
    const authInfo = getAuthInfo();

    React.useEffect(() => {
        if (window.location.pathname === "/auth-code") {
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
    return(
        <div>
            <dev>ログインしていません</dev>
            <button onClick={() => requestCodeFlow()}>login</button>
        </div>
    );
}

//ユーザ情報の表示
function UserInfo() {
    const { authInfo } = React.useContext(AuthorizedContext);

    const query = useQuery("email", () => {
        if (authInfo == null) {
            return Promise.reject(new Error(`No AuthInfo`));
        }
        return getUserInfo(authInfo);
    });

    if (query.isError) {
        return <div>Failed to get the email</div>;
    } else if (query.isSuccess) {
        return (
            <div>
                {Object.keys(query.data).map((k) => (
                    <div>
                        {k}: {query.data[k]}
                    </div>
                ))}
            </div>
        );
    } else {
        return <div>Loading</div>;
    }
}

//ログアウト
function SignOut() {
    const { authInfo } = React.useContext(AuthorizedContext);
    return (
        <div onClick={() => {
            SignOut(authInfo);
        }}>
            Sign Out
        </div>
    );
}

function getUserInfo(authInfo) {
    return axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
        params: {
            access_token: authInfo.access_token,
        },
    }).then(res => res.data);
}

//google認証する
function getAuth() {
    const auth = new google.auth.OAuth2(
        authParams.clientId,
        authParams.clientSecret,
        authParams.redirectUri
    );
    return auth;
}

export default App;
