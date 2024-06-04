import jwt from 'jsonwebtoken';
import  Type  from 'mongoose';

type Payload ={
  id: Type.ObjectId;
}
export const createToken = (payload:Payload) => {
 
  const token= jwt.sign(
    payload,
    process.env.JWT_SECRET ||  "XMXLZMXLPBBVOBVU",
  
    { expiresIn: '7d' }
  
  );

  return token;
}