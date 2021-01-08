import React from "react";
import styled from "styled-components";
import Logout from "../utils/logout";

import Playlists from "./playlists";

import { ReactComponent as Logo } from "../assets/icons/logo.svg";

const SidebarContainer = styled.div`
  width: calc(100% - 20px);
  height: 100%;
  background-color: #000;
  color: #fff;
  padding: 0px 10px 0px 10px;
`;

const AppLogo = styled.div`
  height: 100px;
  display: flex;
  width: 100%;
  justify-content: center;
  padding-left: 0px;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 10px;
`;

const SectionTitle = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <AppLogo>
        <Logo stroke={"#fff"} />
      </AppLogo>
      <SectionTitle>Playlists</SectionTitle>
      <Playlists />
      <Title onClick={() => Logout()} style={{ cursor: "pointer" }}>
        Logout
      </Title>
    </SidebarContainer>
  );
}

export default Sidebar;
