import React, { useState } from "react";
import "../index.js";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { People } from "./People"
import { Person } from "./Person"
import { Films } from "./Films";
import { Film } from "./Film.js";
import styled from "styled-components";
import { ThemeProvider, createGlobalStyle} from "styled-components";
import style from "styled-theming";
import { theme } from "./ThemeStyle";

const getBackground = style('mode', {
  light: theme.light.background,
  dark: theme.dark.background
});

const getOldBackground = style('mode', {
  light: theme.light.backgroundOld,
  dark: theme.dark.backgroundOld
});

const getForeground = style('mode', {
  light: theme.light.color,
  dark: theme.dark.color
});

const getBackColor = style('mode', {
  light: theme.light.backColor,
  dark: theme.dark.backColor
});

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${getOldBackground};
    background: ${getBackground};
    color: ${getForeground};
  }
`
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ToggleButton = styled.button`
  width: 100px;
  height: 35px;
  position: absolute;
  top: 20px;
  right: 20px;
  outline: none;
  letter-spacing: 1px;
  border: 1px solid ${getBackColor};
  border-radius: 10px;
  background-color: ${getForeground};
  color: ${getBackColor};
  transition: 0.3s;
  :hover {
    cursor: pointer;
    color: ${getForeground};
    background-color: ${getBackColor};
    border: 1px solid ${getForeground};
  }
`

export default function App() {
  const [theme, setTheme] = useState({ mode:'light' });
  return (
      <ThemeProvider theme={ theme }>
      <GlobalStyle />
      <ToggleButton onClick={e => setTheme(theme.mode === 'dark' ? { mode: 'light'} : { mode: 'dark'})}>SWITCH</ToggleButton>
      <Wrapper>
      <Router>
      <Switch>
        <Route path="/" exact>
          <People />
        </Route>
        <Route path="/people/:personID">
          <Person />
        </Route>
        <Route path="/films/" exact>
          <Films />
        </Route>
        <Route path="/films/:filmID">
          <Film />
        </Route>
      </Switch>
    </Router>
    </Wrapper>
    </ThemeProvider>
  );
}
