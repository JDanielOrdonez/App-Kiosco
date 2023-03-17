// Esta funcion sirve para formater enteros(int) y que se vea como dinero

export const formatearDinero = cantidad => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}