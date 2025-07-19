import { useState } from "react"
import type { Products } from "../Requisitions/Products"
import Input from "../Components/Input"

export default function Products() {
    const [products, setProd] = useState<Products[]>()

    const handle_get_all_products=async ()=>{
        
    }

    return (
        <>
        <div className='flex flex-col justify-center items-center bg-white h-svh'>
            <div className="flex flex-col">
                <Input placeholder="Name"></Input>
                <Input placeholder="Price"></Input>
                <Input placeholder="Quantity"></Input>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-center">ID</th>
                        <th className="py-2 px-4 border-b text-center">Nome</th>
                        <th className="py-2 px-4 border-b text-center">Price</th>
                        <th className="py-2 px-4 border-b text-center">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product, index) =>
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b text-center">{product.id}</td>
                            <td className="py-2 px-4 border-b text-center">{product.name}</td>
                            <td className="py-2 px-4 border-b text-center">{product.price}</td>
                            <td className="py-2 px-4 border-b text-center">{product.quantity}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </>
    )
}