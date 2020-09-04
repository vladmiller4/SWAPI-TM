import React, { useState, useEffect} from "react";
import axios from "axios";
import { PersonListItem } from "./PersonListItem"
import styled from "styled-components";

export const Box = styled.div`
    margin: 0 auto;
    padding: 30px 0;
    width: 60%;
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    background: #AA076B; 
    background: -webkit-linear-gradient(to right, #61045F, #AA076B); 
    background: linear-gradient(to right, #61045F44, #AA076B44);
`

export const Loading = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #8E2DE2;  
    background: -webkit-linear-gradient(to right, #4A00E0, #8E2DE2);  
    background: linear-gradient(to right, #4A00E0, #8E2DE2); 
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 30px;
`

const PeopleDiv = styled.div`   
        width: 100%;
        display: flex;
        flex-direction: column;
        .input{
            width: 40%;
            height: 30px;
            text-align: center;
            font-size: 25px;
            padding: 10px 0;
            margin-left: 30%;
            margin-bottom: 30px;
            border-radius: 10px;
        }
   
        a {
            text-decoration: none;
        }

        .no-results {
            font-size: 25px;
            text-align: center;
            color: white;
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
                return person.name.toLowerCase().includes( search.toLowerCase())
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
