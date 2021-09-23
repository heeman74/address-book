import express from 'express';
import path from 'path';

const app  = express();

// app.get('/', (req, res) => res.send("HELLO"));

app.use(express.static(path.resolve(__dirname,  '..', '../client/dist')));
// console.log(path.resolve())
// console.log(__dirname)
app.get('/', (_, res) => {
  res.sendFile(path.resolve('/Users/heechung/address-book/address-book/src/client/dist/index.html'));
})
app.listen(3000, () => console.log("server is listening on port 3000"))