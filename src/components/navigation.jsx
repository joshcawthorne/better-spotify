import React from "react";
import styled from "styled-components";

import { ReactComponent as Arrow } from "../assets/icons/chevron.svg";

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 80px;
  margin-left: 40px;
`;

const ArrowBackContainer = styled.div`
  transform: rotate(-90deg);
  margin-right: 22px;
  cursor: pointer;
`;

const ArrowForwardContainer = styled.div`
  transform: rotate(90deg);
  cursor: pointer;
`;

function Navigation() {
  return (
    <NavigationContainer>
      <ArrowBackContainer>
        <Arrow stroke={"#f8f8f8"} width={"20px"} />
      </ArrowBackContainer>
      <ArrowForwardContainer>
        <Arrow stroke={"#777777"} width={"20px"} />
      </ArrowForwardContainer>
    </NavigationContainer>
  );
}

export default Navigation;
