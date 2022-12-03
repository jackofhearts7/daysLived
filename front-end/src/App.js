import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Match from './Match.js';

function App() {
  const [person, setPersons] = useState([]);
  const [error, setError] = useState("");
  const [userBDay, setUserBDay] = useState("");
  const [update, setUpdate] = useState(true);

  const fetchPersons = async() => {
    try {
      const response = await axios.get("/api/persons");
      setPersons(response.data);
    } catch(error) {
      setError("error retrieving persons" + error);
  }
  setUpdate(true);
  }

  const updatePeople = async() => {
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

return (
  <div className = "App">
    {error}
    <h1>Your daysLived Celebrity Match!</h1>
    <form onSubmit={userBDay}>
      <div>
        <label>
          Your Date of Birth(DOB):
          <input type="date" value={userBDay} onChange={e => setUserBDay(e.target.value)}/>
        </label>
      </div>
  </form>



    <h1>Celebrities Days Lived</h1>
    <div key={person.id} className="person">
        {person.name}, {person.daysLived}, {person.link}
    </div>
  </div>





)

  }
  export default App;