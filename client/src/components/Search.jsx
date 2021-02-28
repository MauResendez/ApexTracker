import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

const Search = () => 
{
    // useStates helps with setting a value to variable

    const [username, setUsername] = useState("");
    const [platform, setPlatform] = useState("psn");
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (event) => 
    {
        event.preventDefault();

        if(username) // If username string is not empty, set submit to true to accept the GET request
        {
            setSubmitted(true)
        }
    }

    return (
        <div className="search">
            {submitted && <Redirect to={`/profile/${platform}/${username}`}/> }

            <h1>Track Player Stats</h1>

            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label for='platform'>Platform</label>
                    <select name='platform' id='platform' onChange={e => setPlatform(e.target.value)}>
                        <option value='psn'>Playstation</option>
                        <option value='xbl'>Xbox</option>
                        <option value='origin'>Origin</option>
                    </select>
                </div>
                
                <div className='form-group'>
                    <label for='username'>Username</label>
                    <input
                        type='text'
                        name='text'
                        id='username'
                        onChange={e => setUsername(e.target.value)}
                        placeholder='Origin ID, Xbox Live Gamertag, PSN ID, etc'
                    />
                </div>

                <div className='form-group'>
                    <input type='submit' value='Submit' className='btn' />
                </div>
            </form>
        </div>
    );
};

export default Search;