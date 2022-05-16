const express = require('express');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const mockUsersFile = fs.readFileSync(__dirname + '/usersData.json', 'utf8');
const Users = JSON.parse(mockUsersFile);
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    state: true,
    message: 'Server-mock working'
  })
});

app.post('/mock/login', async (req, res) => {

  if (!req.body.email) {
    return res.status(400).json({
      error: 'El correo Electrónico es requerido'
    });
  }

  let user = Users.find(user => user.email === req.body.email);

  if (!user) {
    return res.status(400).json({
      error: 'Correo no encontrado'
    });
  }

  const token = jwt.sign({ email: req.body.email }, req.body.email);

    res.json({
      token: token,
      user : {
        name : user.name,
        lastname : user.lastname,
        email : user.email,
      }
    });

  })


app.listen(8080, () => console.log('MOCK-SERVER is running on http://localhost:8080/'));