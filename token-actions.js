import jwt from "jsonwebtoken";
const secretKey = "angieperez12345";
const expiresIn = "4h";

export function createToken(dataToken) {
    const token = jwt.sign({ dataToken }, secretKey, { expiresIn: expiresIn });
    return token
}

export function getDataFromToken(token){
    const decrypt = jwt.verify(token, secretKey);
    const data = decrypt.datatoken; 
    return data;
}