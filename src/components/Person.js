import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Box } from "./People";
import { Loading } from "./People";

const PersonDiv = styled.div`
    .title a {
        color: #efa00d;
        a {
            color: white;
        }
    }
    ul {
        padding: 0;
        li {
            list-style: none;
            color: white;
            padding: 10px 0;
            font-size: 25px;
        }

        a {
            color: white;
        }
    }
`;

export function Person (props) {
    const [person, setPerson] = useState();
    let { personID } = useParams();
  
    useEffect(() => {
      axios
        .get(`https://swapi.dev/api/people/${personID}/`)
        .then((res) => {
          console.log(res);
          setPerson(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [setPerson, personID]);
  
    if (!person) {
      return <Loading>Loading...</Loading>;
    }
  
    return (
    <Box>
      <PersonDiv>
        <h2 className="title"><Link to="/">Menu</Link></h2>
        <ul>
            <li>Name: { person.name }</li>
            <li>Gender: { person.gender }</li>
            <li>Hair: { person.hair_color }</li>
            <li>Height: { person.height }</li>
            <li>Mass: { person.mass }</li>
        </ul>
      </PersonDiv>
      <PersonDiv>
        <h2 className="title"><Link to="/films/">Films</Link></h2>
        <ul>
            {person.films.map((film) => {
              const filmID = film.substr(-2,1);
              return (
                <li key={film}>
                  <Link to={`/films/${filmID}`}>{film}</Link>
                </li>
              );
            })}
          </ul>
        </PersonDiv>
    </Box>
    );
}