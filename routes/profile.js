const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:platform/:username', async (req, res) => 
{
    try 
    {
        const headers = {
            'TRN-Api-Key': process.env.TRACKER_API_KEY
        }    
        
        const { platform, username } = req.params;

        const response = await fetch(`${process.env.TRACKER_API_URL}/profile/${platform}/${username}`, { headers: headers });

        const data = await response.json();

        console.log(data);

        if(data.errors && data.errors.length > 0)
        {
            return res.status(404).json(
            {
                message: 'Profile Not Found'
            });
        }

        res.json(data);
    } 
    catch (err) 
    {
        console.error(err);
        console.log(err.message);
        res.status(500).json({
            message: 'Server Error'
        });
    }
});

module.exports = router;