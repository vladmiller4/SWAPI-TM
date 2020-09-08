import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "./ThemeStyle";
import style from "styled-theming";

const getForeground = style('mode', {
  light: theme.light.color,
  dark: theme.dark.color
});

const getHover = style('mode', {
  light: theme.light.hover,
  dark: theme.dark.hover
});

const getBackColor = style('mode', {
  light: theme.light.backColor,
  dark: theme.dark.backColor
});

const Wrapper = styled.div`
  cursor: pointer;
  color: ${getForeground};
  text-align: center;
  font-size: 25px;
  padding: 10px 0;
  &:hover {
    background-color: ${getHover};
    color: ${getBackColor};
  }
`;

export function PersonListItem ({name, id}) {
    return (
      <Link to={`people/${id}`} key={id}>
        <Wrapper>{name}</Wrapper>
      </Link>
    );
}