import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { ReactComponent as Logo } from "../assets/logoAnimated.svg";
import { easeIn } from "popmotion";

const LoadingContainerOuter = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const LoadingBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled(motion.div)`
  width: 75px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  color: #fff;
  font-size: 52px;
`;

const Text = styled(motion.div)`
  color: #d2d2d2;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const LoadingBar = styled.div`
  height: 3px;
  width: 150px;
  border-radius: 55px;
  background-color: #121212;
  overflow: hidden;
`;

const LoadingIndicator = styled(motion.div)`
  height: 100%;
  width: 10%;
  background-color: #29266a;
`;

function LoadingContainer({ loading, setDisplayLoader }) {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setDisplay(false);
      }, 3000);
      setTimeout(() => {
        setDisplayLoader(false);
      }, 3500);
    }
  }, [loading]);

  const loadingSentences = [
    "Tuning the Guitars...",
    "Doing a soundcheck...",
    "Warming up...",
    "Grabbing the drumsticks...",
  ];

  const loadingNum = useMemo(
    () => Math.floor(Math.random() * loadingSentences.length) + 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    null
  );

  const ContainerAnim = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  const LogoAnim = {
    hidden: {
      opacity: 0,
      y: -40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
      },
    },
  };

  const TextAnim = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };

  const ProgressAnim = {
    hidden: {
      width: "0",
    },
    loading: {
      width: "22%",
    },
    loaded: {
      width: "100%",
      transition: {
        duration: 1.3,
        ease: "easeOut",
        delay: 1.5,
      },
    },
  };

  return (
    <LoadingContainerOuter
      variants={ContainerAnim}
      initial="show"
      animate={display ? "show" : "hidden"}
    >
      <LoadingBoxContainer>
        <LogoContainer
          variants={LogoAnim}
          initial="hidden"
          animate={display ? "show" : "hidden"}
        >
          {/*<Logo />*/}
        </LogoContainer>

        <Text
          variants={TextAnim}
          initial="hidden"
          animate={display ? "show" : "show"}
        >
          {loadingSentences[loadingNum]}
        </Text>
        <LoadingBar>
          <LoadingIndicator
            variants={ProgressAnim}
            initial="hidden"
            animate={loading ? "loading" : "loaded"}
          />
        </LoadingBar>
      </LoadingBoxContainer>
    </LoadingContainerOuter>
  );
}

export default LoadingContainer;
