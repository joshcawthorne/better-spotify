import React from "react";
import styled from "styled-components";

import { ReactComponent as SearchIcon } from "../assets/icons/searchIcon.svg";

const SearchbarContainer = styled.div`
  padding: 9px 7px;
  width: 650px;
  border-style: solid;
  border-width: 2px;
  border-color: #cdcdcd;
  border-radius: 18px;
  display: flex;
`;

const SearchbarInput = styled.input`
  outline: none;
  border-style: none;
  background-color: transparent;
  font-family: "Cereal";
  color: #cdcdcd;
  font-weight: 600;
  width: 100%;
  letter-spacing: 0.2px;
  font-size: 14px;
  &::placeholder {
    color: #cdcdcd;
  }
`;

const SearchIconContainer = styled.div`
  margin-top: 3px;
  margin-right: 20px;
  margin-left: 20px;
`;

function Searchbar() {
  return (
    <SearchbarContainer>
      <SearchIconContainer>
        <SearchIcon stroke={"#cdcdcd"} height={"16px"} width={"16px"} />
      </SearchIconContainer>
      <SearchbarInput placeholder={"Search..."} />
    </SearchbarContainer>
  );
}

export default Searchbar;
