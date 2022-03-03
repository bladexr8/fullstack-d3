// catch all unhandled errors

let lastResortErrorHandler = (err, req, res, next) => {
    
    // catch and log unhandled errors
    const traceId = req.context ? req.context.traceId : 'none'
    console.error(traceId, err);

    res.status(500).send('error');
}

module.exports = lastResortErrorHandler;