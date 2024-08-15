const express = require('express');
const router = require('./routers/client/index.router.js');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

router(app);

// app.get('/', (req, res) => {
//     res.render("client/pages/home/index");
// });


// app.get('/products', (req, res) => {
//     res.render("client/pages/products/index");
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});