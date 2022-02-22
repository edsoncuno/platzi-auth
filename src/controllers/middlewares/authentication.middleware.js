const authentication = {}

authentication.checkRoles = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (roles.includes(user.role)) {
            next();
        } else {
            const data = { error: true, severity: 'info', summary: 'No autorizado', detail: 'No autorizado' };
            res.json(data);
        }
    }
}

module.exports = authentication;