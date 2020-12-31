import React from "react";
import styled from "styled-components";

import Playlists from "./playlists";

const Logo = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eee;
`;

const Title = styled.div`
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 10px;
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <Logo>Better Spotify Alpha</Logo>
      <Title>Home</Title>
      <Title>Browse</Title>
      <Title>Playlists</Title>
      <Playlists />
    </SidebarContainer>
  );
}

export default Sidebar;
