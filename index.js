const express = require('express');

const routerAdmin = require('./routers/admin/index.router.js');
const routerClient = require('./routers/client/index.router.js');

const database = require('./config/database.js');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

database.connect();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

routerClient(app);
routerAdmin(app);


// app.get('/', (req, res) => {
//     res.render("client/pages/home/index");
// });

// app.get('/products', (req, res) => {
//     res.render("client/pages/products/index");
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
