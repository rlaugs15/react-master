import styled from "styled-components";
import { useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

//button에서 div로 바꾸니 테두리의 여백이 사라짐
const Button = styled.div`
  padding: 10px;
  font-weight: 600;
  padding: 0;
  border: 0px;
  margin: 7px;
  display: flex;
`;
const Icon = styled.div`
  color: ${(props) => (!props.isDark ? "yellow" : "orange")};
  font-size: 30px;
  background-color: ${(props) => (!props.isDark ? "navy" : "#00e5ff")};
  padding: 10px;
  border-radius: 15px;
  display: flex;
`;

function Side({ isDarkMode, toggleDarkMode }) {
  return (
    <Button onClick={toggleDarkMode}>
      <Icon isDark={isDarkMode}>
        {isDarkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
      </Icon>
    </Button>
  );
}

export default Side;
