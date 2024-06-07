
import  { Request, Response } from "express";
import User from '../Models/User';
import bycrypt from "bcrypt";
import {AuthEmail } from "../emails/emailAuth";
import Token from "../Models/Token";
import { generateToken } from "../utils/TokenGenerate";
import { createToken } from "../utils/jwt";
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
      const  jwttoken = createToken({id:user._id});
      return res.json( jwttoken );
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

  static async forgotPassword(req: Request, res: Response) {
    try {
     const user = await User.findOne({ email: req.body.email});
     
      if(!user){
        return res.status(400).json({message: 'El usuario no esta registrado'});

      } 
       console.log(user);
 
     
      //  Generar token
      const token= new Token()
      token.token= generateToken();
      token.user= user._id;
     
      // Generar email
     AuthEmail.sendEmailForgotPassword({
        email: user.email,
        name: user.name,
        token: token.token

      });
      
      await token.save();
      return res.status(201).json('revisa tu correo electronico para recuperar tu contraseña');
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }  

  static async TokenPassword(req: Request, res: Response) {
    try {
      const{ token } = req.body;
      const tokenExist = await Token .findOne({token});
      if(!tokenExist){
        return res.status(400).json({message: 'Token invalido'});
      } 
      return res.status(200).json({message: 'Token valido, puedes cambiar tu contraseña'});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

  }

  static async changePassword(req: Request, res: Response) {
    try {
      const{ token } = req.params;
      const tokenExist = await Token .findOne({token});
      if(!tokenExist){
        return res.status(400).json({message: 'Token invalido'});
      } 
      const user = await User.findById(tokenExist.user);
      const salt = await bycrypt.genSalt(10);
      user.password = await bycrypt.hash(req.body.password, salt);
      await user.save();
      await tokenExist.deleteOne();
      return res.status(200).json({message: 'Contraseña cambiada correctamente'});
  
    }
    catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
      
  static async user(req: Request, res: Response) {
   
    return res.status(200).json(req.user);
  }
      
  static async userByID(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }  

  static async updateUser(req: Request, res: Response) {
    try {
    const {name, email } = req.body;
 

    const exitEmail= await User.findOne({ email})
    if(exitEmail  && exitEmail._id.toString() !== req.user._id.toString()){
      return res.status(400).json({message: 'El email ya esta registrado'});
    }
    req.user.name = name;
    req.user.email = email; 

   

    await req.user.save();
    return res.status(200).json("Usuario actualizado correctamente");

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

  }


  static async updatePassword(req: Request, res: Response) {
    try {
      const { current_password, password } = req.body; 
      const user=  await User.findById(req.user._id);
      const passwordMatch = await bycrypt.compare(current_password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Contraseña actual incorrecta' });
      }

      const salt = await bycrypt.genSalt(10);
      user.password = await bycrypt.hash(password, salt);

      
      await req.user.save();
      return res.status(200).json("Contraseña actualizada correctamente");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}