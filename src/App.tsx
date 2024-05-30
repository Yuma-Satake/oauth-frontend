import { FC, useState } from "react";
import OauthPopup from "react-oauth-popup";
import "./global.css";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID ?? "";
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI ?? "";
const O_AUTH2_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

const params = {
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  response_type: "token",
  scope: SCOPES,
  include_granted_scopes: "true",
  state: "pass-through value",
};
const authUrl = new URL(O_AUTH2_ENDPOINT);
authUrl.search = new URLSearchParams(params).toString();
const AUTH_URL = authUrl.toString();

const App: FC = () => {
  const [code, setCode] = useState("");

  const currentUrl = window.location.href;
  const urlParams = (() => {
    if (!currentUrl.includes("?")) return {};
    //現在のURLに付与されているパラメータを配列として取得
    const urlParam = currentUrl.split("?");
    const param = urlParam[1].split("&");
    const paramArray: { [key: string]: string } = {};
    for (const element of param) {
      const paramItem = element.split("=");
      paramArray[paramItem[0]] = paramItem[1];
    }
    return paramArray;
  })();

  const handleCode = (code: string): void => {
    setCode(code);
  };

  return (
    <div>
      <h3>OAuthCode：{code === "" ? "empty" : code}</h3>
      <p>
        <h4>AuthURL</h4>
        <br />
        {AUTH_URL}
      </p>
      <div>
        <h4>Params</h4>
        <br />
        {Object.keys(urlParams).map((key) => {
          const typedKey = key as keyof typeof urlParams;
          return (
            <p key={key}>
              {key}: {urlParams[typedKey]}
            </p>
          );
        })}
      </div>
      <OauthPopup
        title='Login with Google'
        width={600}
        height={600}
        url={AUTH_URL}
        onCode={handleCode}
        onClose={() => console.log("Popup closed")}
      >
        <button>Login with Google</button>
      </OauthPopup>
    </div>
  );
};

export default App;
