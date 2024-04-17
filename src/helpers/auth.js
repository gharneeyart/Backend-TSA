import bcrypt from "bcrypt";
 // hash the password - using a package called bcrypt
 export const hashPassword = (password) =>{
    // one function to create the hashed password and another function to compare the password
    return new Promise((resolve, reject) =>{
        // generate saltRound
        bcrypt.genSalt(12, (err, salt) =>{
            if(err){
                reject(err);
            }
            // generate the hashed password
            bcrypt.hash(password, salt, (err, hash) =>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}

// compare password - against password hash and return a promise that resolves to a promise that resolves to a promise that rejects if the password is incorrect 
export const comparePassword = (password, hashed) =>{
    return bcrypt.compare(password, hashed)
}
