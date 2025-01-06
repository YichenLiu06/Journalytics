

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    const arrayToken = tokenPayload.split('.')
    const tokenPayload = JSON.parse(atob(arrayToken[1]))
    console.log(tokenPayload)
    req.tokenPayload = tokenPayload
    next()
}

module.exports={
    verifyToken
}