const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load env
dotenv.config({ path: './config.env' });

const app = express();

// Dev logging
if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}

// Routes
app.use('/api/v2/profile', require('./routes/profile'));

const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});



