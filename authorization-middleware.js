const jwt = require('jsonwebtoken');


module.exports = () => {
    return (req, res, next) => {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            jwt.verify(req.token, 'my_secret_key')
            
                    next();

                        
                
            
            

        } else {
            res.sendStatus(403);
        }
    }
}

       