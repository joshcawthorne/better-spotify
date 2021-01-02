import React from "react";
import styled from "styled-components";
import Logout from "../utils/logout";

import Playlists from "./playlists";

const Logo = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

const SidebarContainer = styled.div`
  width: calc(100% - 20px);
  height: 100%;
  background-color: #121212;
  color: #fff;
  padding: 0px 10px 0px 10px;
`;

const AppLogo = styled.div`
  padding-top: 50px;
  margin-bottom: 50px;
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
      <AppLogo>Opevo v0.01a</AppLogo>
      <SectionTitle>Playlists</SectionTitle>
      <Playlists />
      <Title onClick={() => Logout()} style={{ cursor: "pointer" }}>
        Logout
      </Title>
    </SidebarContainer>
  );
}

export default Sidebar;
