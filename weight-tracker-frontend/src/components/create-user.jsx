import React,  { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";



function CreateUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleUsernameInput(event) {
        setUsername(event.target.value);
      }

      function handlePasswordInput(event) {
        setPassword(event.target.value);
      }

      async function onSubmit(){
          const user = {
              username,
              password
          }
        const result = await axios.post('http://localhost:5000/users/add', user);
        console.log(result.data);
    }

return (<div>
    <h3>Create New User</h3>
   
    <div className="form-group">
        <label>Username: </label>
        <input type="text"
        required
        className="form-control"
        value={username}
        onChange={handleUsernameInput}
        placeholder="Username"
        />
        </div>
        <div className="form-group">
        <label>Password: </label>
        <input type="text"
        required
        className="form-control"
        value={password}
        onChange={handlePasswordInput}
        type="password"
            placeholder="Password"
        />
        </div>
        <div className="form-group">
        <button className="btn btn-primary" onClick={onSubmit}>
            Create User
            </button>
        </div>
        
</div>);
};

export default CreateUser;