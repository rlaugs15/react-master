import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { darkState } from "./theme";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { motion } from "framer-motion";

const SwitchBtn = styled(motion.div)`
  width: 80px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: ${(props) => (props.changeIcon ? "flex-end" : "flex-start")};
  align-items: center;
  border-radius: 50px;
  padding: 10px;
  cursor: pointer;
`;

const Handle = styled(motion.div)`
  width: 40px;
  height: 40px;
  background-color: ${(props) =>
    props.theme.bgColor === "#353b48" ? "#F7F8E0" : "navy"};
  color: ${(props) =>
    props.theme.bgColor === "#353b48" ? "#F57C00" : "#FEFD48"};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
`;

function DarkModeBtn() {
  const [isDark, setIsdark] = useRecoilState(darkState);
  const toggleDark = () => setIsdark((prev) => !prev);
  return (
    <>
      <SwitchBtn changeIcon={isDark}>
        <Handle layout onClick={toggleDark}>
          {isDark ? <BsFillSunFill /> : <BsFillMoonFill />}
        </Handle>
      </SwitchBtn>
    </>
  );
}
export default DarkModeBtn;
