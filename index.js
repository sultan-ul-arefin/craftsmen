const express = require('express');
const app = express();
const errorHandler = require('./_middleware/error-handler');

// api routes
app.use('/', require('./_controller/request.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
