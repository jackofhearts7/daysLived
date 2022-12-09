import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Match from './Match.js';

function App() {
  //const [persons, setPersons] = useState([]);
  const [persons, setPersons] = useState([{id:"123", _id: "123", name: "j", birth: "2000-02-19", death: "2100-02-19", daysLived: "36500", link: "test.com"  }]);

  const [error, setError] = useState("");
  const [userBDay, setUserBDay] = useState("");
  const [update, setUpdate] = useState(true);
  
  const fetchPersons = async() => {
    try {
      const response = await axios.get("/api/persons");
      setPersons(response.data)
    } catch(error) {
      setError("error retrieving persons" + error);
    }
    setUpdate(true);
  }

  const updatePersons = async() => {
    setUpdate(true);
  }

  useEffect(() => {
    fetchPersons();
  },[]);

  useEffect(() => {
    if(update) {
      fetchPersons();
    }
  },[update]);
  
  //const setUserBDday = async() => {
    
  //}
  
  
  

return (
  <div className = "App">
    {error}
    <h1>Your daysLived Celebrity Match!</h1>
      <div>
        <label>
          Your Date of Birth(DOB):
          <input type="date" value={userBDay} onChange={e => setUserBDay(e.target.value)}/>
        </label>
      </div>

  <h1>Celebrities Days Lived</h1>
    
    {persons.map( person => (
      <div key = {person.id} className="person">
        {person.name}, {person.daysLived}, {person.link}
      </div>
      
    ))}
    <a href="https://github.com/jackofhearts7/daysLived"> Github Repo</a>


  </div>

);
}
  
  export default App;