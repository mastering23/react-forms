import { useState } from 'react';
import './index.css';

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [userInput, setUser] = useState('');
  const [passwordInput, setPassword] = useState('');

  console.log(allUsers);

  const createUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userInput,
          password: passwordInput,
        }),
      },[]);

      const data = await response.json();

      if (response.ok) { //check for if response is ok  === true 

        setAllUsers((prevUsers) => [...prevUsers, { user: userInput }]);
        console.log('User created:', data);
        setUser('');
        setPassword('');
      } else {
        console.error('Error creating user:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={createUser}>
      <fieldset>
        <legend>  <h1>-SIGN UP-</h1></legend>
      <input
          placeholder="User : "
          onChange={(event) => setUser(event.target.value)}
          value={userInput}
        />
        <input
          placeholder="Password : "
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={passwordInput}
        />
        <button type="submit">Sign UP</button>
      </fieldset>        
      </form>
      <br />
      <hr />
      <h2>All Users:</h2>
      <ul>
        {allUsers.map((user, index) => (
          <li key={index}>{user.user}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
