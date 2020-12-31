import React from "react";

function Login() {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const clientId = "f36b6da0fd1945909c79f422f7ca8d85";
  const redirectUri = "http://localhost:3000";
  const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-recently-played",
    "user-top-read",
    "user-read-playback-position",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "app-remote-control",
    "streaming",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-modify",
    "user-library-read",
    "user-follow-modify",
    "user-follow-read",
    "streaming",
    "user-read-email",
    "user-read-private",
  ];
  return (
    <div>
      <a
        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
          "%20"
        )}&response_type=token&show_dialog=true`}
      >
        Login to Spotify
      </a>
    </div>
  );
}

export default Login;
