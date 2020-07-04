import jwt from 'jsonwebtoken'

const SECRET = "my SECRET jwt"

const minutes = 60;

const sign = async (payload) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * minutes),
        data: payload
    }, SECRET)

    return token
}

const verify = async (token) => {
    return jwt.verify(token, SECRET)
}

const decode = (token) => {
    return jwt.decode(token, SECRET)
}

export { sign, verify, decode }