import React,  { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";



function EditWeight() {
    const [weight, setWeight] = useState(0);
    const [date, setDate] = useState(new Date());

    function handleWeightInput(event) {
        setWeight(event.target.value);
      }

      function onsubmit() {
        console.log(weight);
    }

return (
    <div>
        Edit Weight
        <div className="form-group">
            <label>Weight: </label>
            <input type="text"
            required
            className="form-control"
            value={weight}
            onChange={handleWeightInput}
            />
        </div>
        <div className="form-group">
            <label>Date: </label>
            <div>
                <DatePicker
                selected={date}
                onChange={setDate}
                />
            </div>
        </div>
        <div className="form-group">
            <button className="btn btn-primary" onClick={onsubmit}>
            Submit Weight
            </button>
            </div>
        
    </div>
);
}

export default EditWeight;