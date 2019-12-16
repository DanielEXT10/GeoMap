const express = require('express');
const app = express();
const Datastore = require('nedb');

app.listen(3000, () =>{
    console.log('Server on Port 3000');
    
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();


app.post('/api', (req,res)=>{
    console.log('I got a request');
    console.log(req.body);
    const data = req.body
    database.insert(data);
    const timestamp = Date.now();
    data.timestamp = timestamp;
    res.json({
        status: 'success',
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lon
    });
});