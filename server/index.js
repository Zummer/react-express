import express from 'express';
import path from 'path';

let app = module.exports = express();

app.get("/*", (req, res) => { 
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(3001, () => {
  console.log('Runnig on localhost: 3001');
});

