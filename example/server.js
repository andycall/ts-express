let express = require('../lib/express').default
let app = express();

let router = app.router;
router.get('/', (req, res) => {
    console.log(1234);
});

app.listen(8090)