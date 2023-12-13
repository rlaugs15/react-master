import "styled-components";

/* TypeScript에서 모듈에 대한 확장(extend)을 선언하는 방법 중 하나
"styled-components" 라이브러리의 기존 모듈에 새로운 타입을 추가하는 역할 */
declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
  }
}

/* //textColor 등으로 스타일 컴포넌트에서 통일했으므로 패기
//다른 경우에 코드의 가독성과 유지 보수를 고려하여 선언을 중복해서 작성하는 대신, 
모든 선언을 하나로 합치는 것이 좋다는 것만 알아두자
export interface DarkTheme extends DefaultTheme {
  // DarkTheme의 추가 속성
  darkTextColor: string;
  darkBgColor: string;
  darkAccentColor: string;
} */
