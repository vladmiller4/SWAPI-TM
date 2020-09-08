import React, { useState, useEffect} from "react";
import axios from "axios";
import { PersonListItem } from "./PersonListItem"
import styled from "styled-components";
import { theme } from "./ThemeStyle";
import style from "styled-theming";

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

const getHover = style('mode', {
    light: theme.light.hover,
    dark: theme.dark.hover
});

const getBackColor = style('mode', {
    light: theme.light.backColor,
    dark: theme.dark.backColor
});

export const Box = styled.div`
    margin: 0 auto;
    padding: 30px 0;
    width: 60%;
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    border: 2px solid ${getForeground};   
`

export const Loading = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${getOldBackground};
    background: ${getBackground};  
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${getForeground};
    font-size: 30px;
`

const PeopleDiv = styled.div`   
        width: 100%;
        display: flex;
        flex-direction: column;
        .input{
            background: ${getHover};
            width: 40%;
            height: 30px;
            text-align: center;
            font-size: 25px;
            color: ${getBackColor};
            padding: 10px 0;
            margin-left: 30%;
            margin-bottom: 30px;
            border-radius: 10px;
            outline: none;
            border: 2px solid ${getForeground};
            ::placeholder {
                color: ${getBackColor};
            }
        }
   
        a {
            text-decoration: none;
        }

        .no-results {
            font-size: 25px;
            text-align: center;
            color: ${getForeground};
        }
`

export function People () {
    const [people, setPeople] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredPersons, setFilteredPersons] = useState([]);
  
    useEffect(() => {
      axios
        .get('https://swapi.dev/api/people/')
        .then((response) => {
          console.log(response.data.results);
          setPeople(response.data.results);
        })
        .catch(err => {
            console.log(err);
        });
    }, [setPeople]);

    useEffect(() => {
        setFilteredPersons(
            people.filter(person => {
                return person.name.toLowerCase().includes( search.toLowerCase());
            })
        )
    }, [search, people])

    if (!people) {
        return <Loading>Loading...</Loading>;
    }
    
    const generatePeople = () => {
        if (filteredPersons.length) {
            return filteredPersons.map((person, index) => (
            <PersonListItem name={person.name} id={index + 1} key={person.name}/>
            ))
        } else {
            return <p className="no-results">No results</p>
        }
    }

    return (
        <Box>
            <PeopleDiv>
                <input className="input" type="text" placeholder="Input name" onChange={ e => setSearch(e.target.value)} value={search}/>
                { generatePeople() }
            </PeopleDiv>
        </Box>
    );
  }
