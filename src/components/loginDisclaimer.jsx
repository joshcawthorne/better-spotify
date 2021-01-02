import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import useOnclickOutside from "react-cool-onclickoutside";

import { ReactComponent as CloseIcon } from "../assets/icons/closeSquare.svg";

const LoginDisclaimerContainerOuter = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #0000007a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginDisclaimerContainer = styled(motion.div)`
  padding: 40px;
  border-radius: 20px;
  background-color: #fff;
  width: 600px;
  position: relative;
`;

const Title = styled.div`
  color: #000;
  font-weight: 800;
  font-size: 32px;
  line-height: 36px;
  margin-bottom: 25px;
  letter-spacing: 0.3px;
  width: 500px;
`;

const Text = styled.div`
  color: #000;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  cursor: pointer;
`;

const BackgroundAnim = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const ContainerAnim = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

function LoginDisclaimer({ setShowDisclaimer }) {
  const [visible, setVisible] = useState(true);

  const ref = useOnclickOutside(() => {
    unMountDisclaimer();
  });

  function unMountDisclaimer() {
    setVisible(false);
    setTimeout(() => {
      setShowDisclaimer(false);
    }, 400);
  }

  return (
    <LoginDisclaimerContainerOuter
      variants={BackgroundAnim}
      initial="hidden"
      animate={visible ? "show" : "hidden"}
    >
      <LoginDisclaimerContainer
        ref={ref}
        variants={ContainerAnim}
        initial="hidden"
        animate={visible ? "show" : "hidden"}
      >
        <CloseIconContainer>
          <CloseIcon fill={"#2c2871"} onClick={() => unMountDisclaimer()} />
        </CloseIconContainer>
        <Title>Why does Opevo need access to my Spotify Account?</Title>
        <Text>
          Opevo uses the Spotify API, which allows us to get all of your Spotify
          Playlists, Albums and Favourites, and also allows us to play music via
          your account. You must have Spotify Premium to use Opevo.
        </Text>
      </LoginDisclaimerContainer>
    </LoginDisclaimerContainerOuter>
  );
}

export default LoginDisclaimer;
