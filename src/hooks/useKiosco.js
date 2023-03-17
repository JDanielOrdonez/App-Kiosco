
// ESTE ES UN HOOK
import { useContext } from "react";
import QuioscoContext from "../context/KioscoProvider";

// Con esto useKiosco tendra acceso a QioscoContext
const useKiosco = () => {
    return useContext(QuioscoContext);
}

export default useKiosco