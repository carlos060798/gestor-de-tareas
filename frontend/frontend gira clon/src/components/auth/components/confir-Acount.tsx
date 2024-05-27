import { Link } from "react-router-dom";
import  {PinInput, PinInputField} from '@chakra-ui/pin-input'
import { useState } from "react";
import  {useMutation} from '@tanstack/react-query'
import { confirmAcount } from "../../../api/user";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState('')

  const handleComplete = (token: string) => {
    mutate(token)
  }
  
  const handleChange = (token: string) => {
    setToken(token)
  }

  const {mutate} = useMutation({
    mutationFn:  confirmAcount,
    onError: (error) => {
      console.log(error)
      
      toast.error('Error al confirmar la cuenta')
      
    },
    onSuccess: () => {
      toast.success('Cuenta confirmada con éxito')
  }}
  )




  return (

  <>
  <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex flex-col justify-center items-center p-5">
    <h1 className="text-5xl font-black text-white mb-5">Confirma tu Cuenta</h1>
    <p className="text-2xl font-light text-white mt-5">
      Ingresa el código que recibiste
      <span className="text-cyan-600 font-bold"> por e-mail</span>
    </p>

    <div className="space-y-8 p-10 bg-gray-800 rounded-lg shadow-lg mt-10 w-full max-w-md text-center">
    <form>
      <label className="font-normal text-2xl text-gray-300">Código de 6 dígitos</label>
      <div className="flex justify-center gap-5">
        <PinInput value={token}  
        onChange={handleChange}
        onComplete={handleComplete}
        >
          <PinInputField 
           className="w-12 h-12 rounded-lg bg-gray-700 text-white text-center font-bold text-2xl"
          />
           <PinInputField 
           className="w-12 h-12 rounded-lg bg-gray-700 text-white text-center font-bold text-2xl"
          />
           <PinInputField 
           className="w-12 h-12 rounded-lg bg-gray-700 text-white text-center font-bold text-2xl"
          />
           <PinInputField 
           className="w-12 h-12 rounded-lg bg-gray-700 text-white text-center font-bold text-2xl"
          />
           <PinInputField 
           className="w-12 h-12 rounded-lg bg-gray-700 text-white text-center font-bold text-2xl"
          />
           <PinInputField 
           className="w-12 h-12 rounded-lg bg-gray-700 text-white text-center font-bold text-2xl"
          />
         
        </PinInput>

      </div>

      </form>
    </div>
    <nav className="mt-10 flex flex-col space-y-4">
      <Link to='/auth/request' className="text-center text-gray-400 font-medium hover:text-fuchsia-400 transition duration-300">
        Solicitar un nuevo Código
      </Link>
    </nav>
  </div>
</>
 


  )
}