import React from "react";
import styled from "styled-components";

import Searchbar from "./searchbar";
import Navigation from "./navigation";
import UserControls from "./userControls";

const ToolbarContainer = styled.div`
  height: 100px;
  background-color: #000;
  display: flex;
  align-items: center;
  position: relative;
`;

const UserControlsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;

  margin-right: 30px;
`;

function Toolbar() {
  return (
    <ToolbarContainer>
      <Navigation />
      <Searchbar />
      <UserControlsContainer>
        <UserControls />
      </UserControlsContainer>
    </ToolbarContainer>
  );
}

export default Toolbar;
