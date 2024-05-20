import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true para el puerto 465, false para otros puertos
    auth: {
      user: "codercarlosdev@gmail.com",
      pass: "vllbyruotxdxnnvk"
    }
});

export default transport;