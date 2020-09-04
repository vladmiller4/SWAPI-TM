import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Box } from "./People";
import { Loading } from "./People";

const FilmDiv = styled.div`
    ul{
        padding: 0;
        li {
            list-style: none;
            padding: 10px 0;
            color: white;
            font-size: 25px;
        }
    } 
    .title a {
        color: #efa00d;
        a {
            color: white;
        }
    }
`;

export function Film() {
  const [film, setFilm] = useState();
  let { filmID } = useParams();

  useEffect(() => {
    axios
    .get(`https://swapi.dev/api/films/${filmID}/`)
    .then((res) => {
      console.log(res);
      setFilm(res.data);
    })
    .catch(err => {
        console.log(err);
    });
  }, [setFilm, filmID]);

  if (!film) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Box>
        <FilmDiv>
            <h2 className="title"><Link to="/">Menu</Link></h2>
            <ul>
                <li>Title: {film.title}</li>
                <li>Producer: {film.producer}</li>
                <li>Director: {film.director}</li>
                <li>Release date: {film.release_date}</li>
            </ul>
        </FilmDiv>
    </Box>
  );
}
