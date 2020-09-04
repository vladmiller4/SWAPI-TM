import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  cursor: pointer;
  color: white;
  text-align: center;
  font-size: 25px;
  padding: 10px 0;
  &:hover {
    background-color: #efa00d42;
  }
`;

export function PersonListItem ({name, id}) {
    return (
      <Link to={`people/${id}`} key={id}>
        <Wrapper>{name}</Wrapper>
      </Link>
    );
  }