import React, { useState } from "react";
import styled from "styled-components";
import { SpotifyAuth, Scopes } from "react-spotify-auth";

import LoginDisclaimer from "./loginDisclaimer";

import Logo from "../assets/logoWhite.svg";
import SpotifyLogo from "../assets/spotifyLogo.svg";

import { ReactComponent as Question } from "../assets/icons/infoCircle.svg";

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: rgb(45, 41, 114);
  background: linear-gradient(
    146deg,
    rgba(45, 41, 114, 1) 0%,
    rgba(18, 18, 18, 1) 80%
  );
  color: #eef1f3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .loginButton {
    color: #000;
    background: #fff;
    border-radius: 30px;
    font-size: 16px;
    padding: 12px 16px;
    border-style: none;
    outline: none;
    cursor: pointer;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    ::before {
      background-size: 20px;
      background-image: url(${(props) => props.logo});
      background-size: 20px;
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 7.5px;
      margin-top: -2px;
      content: "";
    }
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0%;
  margin: 20px;
`;

const TitleText = styled.div`
  font-size: 80px;
  font-weight: 900;
  margin-bottom: 5px;
`;

const SubtitleText = styled.div`
  font-size: 16px;
  letter-spacing: 0.3px;
  max-width: 650px;
  text-align: center;
  margin-bottom: 50px;
  font-weight: 500;
`;

const DisclaimerContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const DisclaimerText = styled.div`
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.3px;
  margin-top: 10px;
  color: #dcd4d4;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #31294c;
  border-radius: 12px;
  padding: 5px 10px;
  width: 330px;
  line-height: 0;
  cursor: pointer;
  user-select: none;
`;

const LogoImg = styled.img`
  width: 45px;
`;

const QuestionIconContainer = styled.div`
  margin-right: 5px;
`;

const CopyrightText = styled.div`
  font-size: 11px;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 20px;
  font-weight: 500;
  color: #aaa3a5;
`;

function Login() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  return (
    <LoginContainer logo={SpotifyLogo}>
      <LogoContainer>
        <LogoImg src={Logo} alt={"Opevo"} />
      </LogoContainer>
      <TitleText>Better listening.</TitleText>
      <SubtitleText>
        With Opevo, you can use your entire Spotify library of Playlists, Albums
        and Favourites with our killer interface to elevate your listening
        experience.
      </SubtitleText>
      <SpotifyAuth
        redirectUri="http://localhost:3000/login"
        clientID="f36b6da0fd1945909c79f422f7ca8d85"
        noLogo={true}
        btnClassName={"loginButton"}
        title={"Continue with Spotify"}
        scopes={[
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
          "user-library-read",
        ]}
      />
      <DisclaimerContainer>
        <DisclaimerText onClick={() => setShowDisclaimer(true)}>
          <QuestionIconContainer>
            <Question width={"20px"} fill={"#fff"} />
          </QuestionIconContainer>
          Why does Opevo need access to my Spotify Account?
        </DisclaimerText>
      </DisclaimerContainer>
      {showDisclaimer && (
        <LoginDisclaimer setShowDisclaimer={setShowDisclaimer} />
      )}
    </LoginContainer>
  );
}

export default Login;
