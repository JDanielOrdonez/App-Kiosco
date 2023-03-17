import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useSWR from 'SWR';
import clienteAxios from "../config/axios";

export const useAuth = ({middleware, url}) => {

    // Este token se trae del almacenamiento local y lo guardamos cuando el usuario inicia sesion 
    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()//para hacer navegacion de url

    // HOOK PARA REVALIDAR AL USUARIO
    // Esta funcion es para leer y validar el token que esta en el servidor
    const { data: user, error, mutate } = useSWR('/api/user', () => 
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        }));

    const login = async (datos, setErrores) => {
        try{
            // mandamos los datos a la api de registro y si hay algun error entonces dara error y tambien mostrara un mensaje de error para la vista
            const {data} = await clienteAxios.post('/api/login', datos)
           
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])//limpiamos los errores para que desaparezcan
            await mutate() //Vuelve a llamar el codigo del useSWR para que revalide los datos
        }catch(error){
             console.log(error)
             setErrores(Object.values(error.response.data.errors))
         }
    }

    const registro = async (datos, setErrores) => {
        try{
            // mandamos los datos a la api de registro y si hay algun error entonces dara error y tambien mostrara un mensaje de error para la vista
            const {data} = await clienteAxios.post('/api/registro', datos)
            // console.log(data.token)
            
            // Guardamos un token de autenticacion en el almacenamiento local
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            await mutate()//para que revalide swr y tengamos el usuario

        }catch(error){
           setErrores(Object.values(error.response.data.errors))
        }
    }

    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // Eliminamos el token de localStorage
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(undefined) 
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    console.log(user)
    console.log(error)

    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            navigate(url)
        }

        // si el middleware es de invitado y el user esta correcto y user.admin es 1, es decir que es administrador, entonces lo redirigimos a la pantalla para administradores
        if (middleware === 'guest' && user && user.admin) {
            navigate('/admin')
        }
        // identificamos que el usuario no sea administrador para redirigirlo a donde pueda realizar un pedido y no entre al panel de administrador
        if (middleware === 'admin' && user && !user.admin) {
            navigate('/')
        }

        // si el middleware es de autenticacion y tenemos un error quiere decir que no hemos iniciado sesion por lo que reenviamos al usuario al login
        if(middleware === 'auth' && error){
            navigate('/auth/login')
        }
    }, [user, error])
    

    return {
        login, 
        registro, 
        logout,
        user, 
        error
    }
}