import { createRef, useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Registro() {

    // Esto es para guardar los datos que el usuario ponga en los inputs
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();


    const [errores, setErrores] = useState([])
    const { registro } = useAuth({middleware: 'guest', url: '/'})

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        
        registro(datos, setErrores)
    }

    return (
      <>
        <h1 className="text-4xl font-black">Crea tu cuenta</h1>  
        <p>Crea tu cuenta llenando el formulario</p>
        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <form onSubmit={ handleSubmit } noValidate> 

             
                {
                    errores 
                        ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) 
                        : null
                }

                <div className="mb-4">
                    <label className="text-slate-800" htmlFor="name">Nombre:</label>
                    <input ref={nameRef} className="mt-2 w-full p-3 bg-gray-50" type="text" id="name" name="name" placeholder="Tu nombre"/>
                </div>

                <div className="mb-4">
                    <label className="text-slate-800" htmlFor="email">Email:</label>
                    <input ref={emailRef} className="mt-2 w-full p-3 bg-gray-50" type="email" id="email" name="email" placeholder="Tu email"/>
                </div>
                <div className="mb-4">
                    <label className="text-slate-800" htmlFor="password">Contraseña:</label>
                    <input ref={passwordRef} className="mt-2 w-full p-3 bg-gray-50" type="password" id="password" name="password" placeholder="Tu contraseña"/>
                </div>
                <div className="mb-4">
                    <label className="text-slate-800" htmlFor="password_confirmation">Repetir contraseña:</label>
                    <input ref={passwordConfirmationRef} className="mt-2 w-full p-3 bg-gray-50" type="password" id="password_confirmation" name="password_confirmation" placeholder="Repetir contraseña"/>
                </div>
                <input type="submit" value="Crear Cuenta" className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer" />
            </form>
        </div>
        <nav className="mt-5">
            <Link to="/auth/login">¿Ya tienes una cuenta?, Iniciar Sesión</Link>
        </nav>
      </>
  )
}
