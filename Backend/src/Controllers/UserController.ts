
import  { Request, Response } from "express";
import User from '../Models/User';
import bycrypt from "bcrypt";
import {AuthEmail } from "../emails/emailAuth";
import Token from "../Models/Token";
import { generateToken } from "../utils/TokenGenerate";
export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
     const exitEmail = await User.findOne({ email: req.body.email});
      if(exitEmail){
        return res.status(400).json({message: 'El email ya esta registrado'});

      }
      const user = new User(req.body);  

      //  Encriptar contraseña
      const salt = await bycrypt.genSalt(10);
      user.password = await bycrypt.hash(user.password, salt);
     
      //  Generar token
      const token= new Token()
      token.token= generateToken();
      token.user= user._id;
      // Generar email
     AuthEmail.sendEmail({
        email: user.email,
        name: user.name,
        token: token.token

      });

      

      await Promise.all([user.save(),token.save()]);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
 
  static async confirmToken(req: Request, res: Response) {
    try {
      const{ token } = req.body;
      const tokenExist = await Token .findOne({token});
      if(!tokenExist){
        return res.status(400).json({message: 'Token invalido'});
      }
      const user = await User.findById(tokenExist.user);
       user.confirmed=true

       Promise.all([user.save(),tokenExist.deleteOne()]);
       
      return res.status(200).json({message: 'Token valido'});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  
  
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }
   
      if(!user.confirmed){
        const token = new Token();
        token.user = user._id;
        token.token = generateToken();
        await token.save();
        
        AuthEmail.sendEmail({
          email: user.email,
          name: user.name,
          token: token.token
        });

        return res.status(400).json({message: 'Usuario no confirmado enviamos un nuevo token a tu correo electronico'});
      }
      const passwordMatch = await bycrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
      return res.json({ message: 'Bienvenido' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
}



  static async RequestNewEmail(req: Request, res: Response) {
    try {
     const user = await User.findOne({ email: req.body.email});
      if(!user){
        return res.status(400).json({message: 'El usuario no esta registrado'});

      }

      if(user.confirmed){
        return res.status(400).json({message: 'El usuario  ya esta confirmado'});

      }
     
      //  Generar token
      const token= new Token()
      token.token= generateToken();
      token.user= user._id;
      // Generar email
     AuthEmail.sendEmail({
        email: user.email,
        name: user.name,
        token: token.token

      });

      

      await Promise.all([user.save(),token.save()]);
      return res.status(201).json('se envio un nuevo token a tu correo');
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}