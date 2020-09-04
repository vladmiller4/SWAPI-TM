import React from "react";
import "../index.js";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { People } from "./People"
import { Person } from "./Person"
import { Films } from "./Films";
import { Film } from "./Film.js";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #8E2DE2;  
    background: -webkit-linear-gradient(to right, #4A00E0, #8E2DE2);  
    background: linear-gradient(to right, #4A00E0, #8E2DE2); 
`;

export default function App() {
  return (
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
  );
}
