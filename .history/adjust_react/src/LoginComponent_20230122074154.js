import { useEffect, useState } from "react";
import { loadGoogleScript } from "./GoogleLoginUtil";

export default function LoginComponent() {
  const [gapi, setGapi] = useState();

  // ログイン
  const onClickLogin = async () => {
    gapi.auth2.authorize(
      {
        apiKey: process.env.GCP_AUTH_API_KEY, // GCPのAPIキーを取得したらここに設定
        clientId: process.env.GCP_AUTH_CLIENT_ID, // GCPのクライアントIDを取得したらここに設定
        response_type: "code", // 今回は認証コードを取得する
        scope: "profile email",
        access_type: "offline",
      },
      async function (response) {
        if (response.error) {
          console.log(response.error);
        } else {
          const authCode = response.code;
          console.log(authCode);
        }
      }
    );
  };

  useEffect(() => {
    // ライブラリのスクリプトを読み込んだ後処理
    window.onGoogleScriptLoad = () => {
      const _gapi = window.gapi;
      _gapi.load("client:auth2");
      setGapi(_gapi);
    };
    // ここでライブラリのスクリプトを読み込む
    loadGoogleScript();
  });

  return (
    <>
      <button type="button" onClick={onClickLogin}>
        Googleログイン
      </button>
    </>
  );
}

