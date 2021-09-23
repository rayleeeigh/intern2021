const express = require('express');
const account = require("./models/accounts");
const accountRoutes = require("./routes/accountRoutes");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

require("./connection.js");
app.use("/", accountRoutes);

app.listen(5000);