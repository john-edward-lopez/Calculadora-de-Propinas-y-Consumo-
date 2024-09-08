import { useMemo } from "react";
import type {  OrderItem } from "../types"
import { formatCurrency } from "../helpers/indext";

type OrderTotalProps = {
order:OrderItem[]
tip:number
placeOrder:() => void
}


function OrderTotals({order , tip ,placeOrder} :OrderTotalProps) {
  //console.log(order);
    const subtotalAmount = useMemo(()=> order.reduce((total, item)=> total + (item.quantity * item.price) , 0 ), [order])
   
    const tipAmount = useMemo( ()=> subtotalAmount * tip , [tip , subtotalAmount])

    const totalAmount = useMemo(()=>subtotalAmount + tipAmount ,[subtotalAmount , tipAmount])
     
    return( 
     <>
        <div className="space-y-3">
             <h2 className="font-black text-2xl">
                Totales y Propinas
             </h2>
             <p>
                Subtotal a pagar: {''}
                <span className="">{formatCurrency(subtotalAmount)}</span>
             </p>
             <p>
                Propinas: {''}
                <span className="">{formatCurrency(tipAmount)}</span>
             </p>
             <p>
                Total a Pagar: {''}
                <span className="">{formatCurrency(totalAmount)}</span>
             </p>
        </div>
        <button className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
         disabled ={totalAmount === 0}
         onClick={placeOrder}
        >
             Guardar Orden
                
        </button>
       </> 
    );
}

export default OrderTotals;