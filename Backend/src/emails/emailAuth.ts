import transport from "../conf/email-Send";

interface IEmail {
    email: string;
    name: string;
    token: string;

}

export class  AuthEmail {
    
    static sendEmail = async (user:IEmail) => {
        console.log(user)
        try {
        
        const info = await transport.sendMail({
                from: 'Gestor de Tareas',
                to: user.email,
                subject: 'Confirma tu cuenta',
                html: ` <h1> Hola ${user.name} </h1>
                <p> Confirma tu cuenta </p>
                <a href="http://localhost:5173/auth/confirm">Confirmar cuenta</a>
                <p>Token:${user.token}</p>
                <p> este token expira en 10 minutos</p>
                `   });
      
                 console.log('Message sent: %s', info.messageId);
        } catch (error) {
            console.log(error)
        }

    }


    static sendEmailForgotPassword = async (user:IEmail) => {
        console.log(user)
        try {
        
        const info = await transport.sendMail({
                from: 'Gestor de Tareas',
                to: user.email,
                subject: 'Recuperar contraseña',
                html: ` <h1> Hola ${user.name} </h1>
                <p> Recupera tu contraseña </p>
                <a href="http://localhost:5173/auth/forgot-password">Recuperar contraseña</a>
                <p>Token:${user.token}</p>
                <p> este token expira en 10 minutos</p>
                `   });
      
                 console.log('Message sent: %s', info.messageId);
        } catch (error) {
            console.log(error)
        }
    }







}