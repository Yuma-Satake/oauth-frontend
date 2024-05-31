import { FC, useMemo, useState } from "react";
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
  response_type: "code",
  scope: SCOPES,
  include_granted_scopes: "true",
  state: "pass-through value",
};
const authUrl = new URL(O_AUTH2_ENDPOINT);
authUrl.search = new URLSearchParams(params).toString();
const AUTH_URL = authUrl.toString();

const App: FC = () => {
  const [code, setCode] = useState("");

  const handleCode = (code: string): void => {
    setCode(code);
  };

  const isCodeEmpty = useMemo(() => code === "", [code]);

  return (
    <div style={{ padding: 30 }}>
      <h3>
        [OAuthCode]
        <p
          style={{
            color: isCodeEmpty ? "red" : "green",
          }}
        >
          {isCodeEmpty ? "EMPTY" : code}
        </p>
      </h3>
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
