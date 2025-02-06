import { useState } from 'react';
import './index.css';

function App() {
 
  const [allUsers, setAllUsers] = useState([]);
  const [userInput, setUser] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [token, setToken] = useState('');

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
      });

      const data = await response.json();

      if (response.ok) {
        setAllUsers((prevUsers) => [...prevUsers, { user: userInput }]);
        console.log('User created:', data);
        alert('Thanks for signing up!');
        setUser('');
        setPassword('');
        setToken(data.token);

      }
    } catch (error) {

      console.error('Error:', error);

    }
  };

  const validationToken = async () => {

    try {

      const resToken = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
      });

      const data = await resToken.json();

      if (resToken.ok) {

        console.log('Authentication Success:', data);

        alert('You have logged in!');

      }

    } catch (error) {

      console.log('Error:', error);

    }
  };

  return (
    <>
      <section>

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

            <div>
              <br />

              <center><h4>Token Validation</h4></center>

              <button type="button" onClick={validationToken}>Log In</button>

            </div>
            
          </fieldset>
        
        </form>
      
      </section>
      
      <section id="userList">
        
        <h2> Recent sign up (users)</h2>
        <hr />
        
        <ul>
          {allUsers.map((user, index) => (
            <li key={index}>{`user : ${user.user}`}</li>
          ))}
        </ul>
        
      </section>
    </>
  );
}

export default App;
