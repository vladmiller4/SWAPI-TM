import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box } from "./People";
import { Loading } from "./People";

const FilmsDiv = styled.div`
    width: 100%;
    text-align: center;

    ul{
        padding: 0;
        li {
            list-style: none;
            padding: 10px 0;
            &:hover {
              background-color: #efa00d42;
            }
            a {
                display: block;
                color: white;
                text-decoration: none;
                font-size: 25px;
            }
        }
    } 
`;

export function Films() {
  const [films, setFilms] = useState();

  useEffect(() => {
    axios.get(`https://swapi.dev/api/films/`).then((res) => {
      console.log(res);
      setFilms(res.data.results);
    });
  }, [setFilms]);

  if (!films) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Box>
        <FilmsDiv>
            <ul>
              {films.map((film) => (
                <li key={film.episode_id}><Link to={`/films/${film.episode_id}`}>{film.title}</Link></li>
              ))}
            </ul>
        </FilmsDiv>
    </Box>
  );
}
