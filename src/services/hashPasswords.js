import bcrypt from 'bcrypt'

const saltRounds = 14 // for example, change in .env

export const hash = (myPlaintextPassword) => {
    return bcrypt.hashSync(myPlaintextPassword, saltRounds);
}

export const compare = (myPlaintextPassword, hash) => {
    return bcrypt.compareSync(myPlaintextPassword, hash);
}
