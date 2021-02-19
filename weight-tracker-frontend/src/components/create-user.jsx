import React,  { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";



function CreateUser() {
    const [username, setUsername] = useState("");

    function handleUsernameInput(event) {
        setUsername(event.target.value);
      }

      async function onSubmit(){
          const user = {
              username
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