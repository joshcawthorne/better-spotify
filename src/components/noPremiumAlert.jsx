import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import logout from "../utils/logout";

import { ReactComponent as Logout } from "../assets/icons/logoutIcon.svg";

const NoPremiumAlertContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgb(45, 41, 114);
  background: linear-gradient(
    146deg,
    rgba(45, 41, 114, 1) 0%,
    rgba(18, 18, 18, 1) 80%
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  padding: 40px;
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

const Desc = styled.div`
  color: #000;
  font-weight: 500;
  letter-spacing: 0.3px;
  width: 500px;
  margin-bottom: 8px;
`;

const LogoutButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const LogoutButton = styled.div`
  margin-top: 20px;
  background-color: rgba(45, 41, 114, 1);
  padding: 6px 14px;
  color: #fff;
  width: fit-content;
  border-radius: 10px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const IconContainer = styled.div`
  margin-right: 7.5px;
  margin-top: 4px;
`;

const LogoutText = styled.div`
  line-height: 0;
  font-weight: 500;
`;

function NoPremiumAlert() {
  return (
    <NoPremiumAlertContainer>
      <BoxContainer>
        <Title>You'll need Spotify Premium to use Opevo </Title>
        <Desc>
          Due to Spotify's requirements, you'll need to upgrade your account to
          a shiny Premium one if you want to use Opevo.
        </Desc>
        <Desc> Sorry about that 😔 </Desc>
        <LogoutButtonContainer>
          <LogoutButton onClick={() => logout()}>
            <IconContainer>
              <Logout fill={"#fff"} />
            </IconContainer>
            <LogoutText>Logout</LogoutText>
          </LogoutButton>
        </LogoutButtonContainer>
      </BoxContainer>
    </NoPremiumAlertContainer>
  );
}

export default NoPremiumAlert;
