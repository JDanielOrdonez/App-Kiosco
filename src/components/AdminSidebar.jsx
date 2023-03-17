import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function AdminSidebar() {

    const {logout} = useAuth({middleware: 'auth'});
    
    return (
    <div>
        <aside className="md:w-72 h-screen">
            <div className="p-4">
                <img src="/img/logo.svg" alt="imagen logotipo" className="w-40" />
            </div>
            <nav className="flex flex-col p-4"> 
                {/* estos link son como las etiquetas <a></a> en html */}
                <Link to="/admin" className="font-bold text-lg">Ordenes</Link>
                <Link to="/admin/productos" className="font-bold text-lg">Productos</Link>
            </nav>
            <div className="my-5 px-5">
                <button onClick={logout} type="button" className="text-center bg-red-500 w-full p-3 font-bold text-white truncate hover:bg-red-400">Cerrar sesión</button>
            </div>
        </aside>
    </div>
  )
}
