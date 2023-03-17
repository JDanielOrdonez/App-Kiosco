import { formatearDinero } from "../helpers";
import useKiosco from "../hooks/useKiosco"
import ResumenProducto from "./ResumenProducto";
import { useAuth } from "../hooks/useAuth"

export default function Resumen() {
  
  const { pedido, total, handleSubmitNuevaOrden } = useKiosco();
  const { logout } = useAuth({});

  // Aqui comprobamos si el pedido tiene algo, retorna true o false
  const comprobarPedido = () => pedido.length === 0;  

  const handleSubmit = e => {
    e.preventDefault();
    handleSubmitNuevaOrden(logout);
  }

  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">
        Mi pedido
      </h1>      
      <p className="text-lg my-5">
        Aquí podrás ver el resumen y totales de tu pedido
      </p>
      <div className="py-10">
        {pedido.length === 0 ? (
          <p className="text-center text-2xl">
            No hay elementos en tu pedido aún
          </p>
        ) : (
          pedido.map(producto => (
            <ResumenProducto 
              key={producto.id}
              producto={producto}/>
          ))
        )}
      </div>
      <p className="text-xl mt-10">
        Total: {''}
        {formatearDinero(total)}
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mt-5">
          <input 
            value="Confirmar Pedido" 
            type="submit" 
            className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} 
                        px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`} 
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </aside>
  )
}
