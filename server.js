const express = require('express');
const app = express();






app.get('/', (req, res) => {
    res.send("Hello!")
})

function ServerApp(){
app.listen(7450, () => {})
}

module.exports = ServerApp;
