import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.section`
  .container 
  {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    max-width: 700px;
    margin: 1rem auto;
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }

  h1.gamertag 
  {
    font-size: 2rem;
    background: rgba(0, 0, 0, 0.6);
    padding: 0.3rem 0.5rem;
    text-align: center;
    border-radius: 20px;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
  }

  a 
  {
    display: inline-block;
    margin-top: 2rem;
    border: #fff 2px solid;
    padding: 0.5rem 0.8rem;
  }

  a:hover 
  {
    border: #ccc 2px solid;
    color: #ccc;
  }

  .platform-avatar 
  {
    width: 40px;
    margin-right: 0.7rem;
  }

  img 
  {
    width: 100%;
  }

  .grid 
  {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }

  li 
  {
    background: rgba(0, 0, 0, 0.6);
    padding: 1rem;
    margin-bottom: 0.7rem;
    border-radius: 10px;
  }
  
  li p 
  {
    font-size: 2rem;
  }

  li:first-child p 
  {
    font-size: 1.5rem;
  }

  li span 
  {
    font-size: 1rem;
    color: #ccc;
  }

  @media (max-width: 500px) 
  {
    h1 
    {
      font-size: 1.5rem;
      display: block;
      text-align: center;
    }

    .platform-avatar 
    {
      display: none;
    }

    .grid 
    {
      grid-template-columns: 1fr;
    }

    li p 
    {
      font-size: 1.5rem;
    }
  }
`

const Profile = (props) => 
{
    const [username, setUsername] = useState(props.match.params.username);
    const [platform, setPlatform] = useState(props.match.params.platform);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => 
    {
        const create = async (username, platform) => 
        {
            try 
            {
                const result = await axios(`/api/v2/profile/${platform}/${username}`);
                setData(result.data.data);
                console.log(data);
                setLoading(false);
            } 
            catch (err) 
            {
                setLoading(false);
                setError(err.response.data.message);
            }
        };

        if(loading) 
        {
            create(username, platform);
        }
    });

    return (
        <Wrapper>
            {loading && <div>
                <h3>Loading...</h3>
            </div>}

            {error && <div>
                <h1>{error}</h1>
                <Link to='/'>Go Back</Link>
            </div>}

            {data && <div className="container">
                <h1 class="gamertag">
                <img src={data.platformInfo.avatarUrl} alt class="platform-avatar" />
                    {data.platformInfo.platformUserId}
                </h1> 
                <div class="grid">
                    <div>
                    <img src={data.segments[1].metadata.imageUrl} alt />
                    </div>
                    <div>
                    <ul>
                        <li>
                        <h4>Selected Legend</h4>
                        <p>{data.metadata.activeLegendName}</p>
                        </li>
                        {data.segments[0].stats.level && <li>
                        <h4>Apex Level</h4>
                        <p>
                            {data.segments[0].stats.level.displayValue}
                            <span>({data.segments[0].stats.level.percentile}%)</span>
                        </p>
                        </li>}
                        {data.segments[0].stats.kills && <li>
                        <h4>Lifetime Kills</h4>
                        <p>
                            {data.segments[0].stats.kills.displayValue}
                            <span>({data.segments[0].stats.kills.percentile}%)</span>
                        </p>
                        </li>}
                        {data.segments[0].stats.rankScore && <li>
                        <h4>Current Season Rank</h4>
                        <p>
                            {data.segments[0].stats.rankScore.metadata.rankName}
                            <img class="center" src={data.segments[0].stats.rankScore.metadata.iconUrl} alt />
                        </p>
                        </li>}
                    </ul>
                    </div>
                </div>

                <Link to="/">Go Back</Link>                     
            </div>}
        </Wrapper>
    );
};

export default Profile;