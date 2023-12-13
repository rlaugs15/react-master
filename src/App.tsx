import Router from "./Router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import DarkModeBtn from "./themes/DarkModeBtn";
import { useRecoilValue } from "recoil";
import { darkState, theme } from "./themes/theme";

//전역적인 스타일을 다룬다.
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  //배경색, 글자색 프롭스 제거됨
  color: ${(props) => props.theme.white.darker};
  background-color: black;
}
a {
  text-decoration:none;
  color: inherit;
}
::-webkit-scrollbar { //스크롤바 없애기
display: none
}
`;

function App() {
  const isDark = useRecoilValue(darkState);
  return (
    <>
      {/*ThemeProvider 안에 있는 모든 것이 theme로 접근할 수 있다는 것을 의미
    스타일 컴포넌트로부터 오는 컴포넌트(props입력 필요)*/}
      <ThemeProvider theme={theme}>
        {/* <DarkModeBtn /> */}
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}
export default App;
