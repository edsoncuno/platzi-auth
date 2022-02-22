const error = {}

error.errorHandle = (err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.json({
        error: true,
        severity: 'error',
        summary: err.name,
        detail: err.message
    });
}

module.exports = error;