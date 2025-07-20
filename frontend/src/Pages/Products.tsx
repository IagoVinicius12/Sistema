import { useState } from "react"
import { Submit_Create_Product, Submit_Get_all_products, type Products } from "../Requisitions/Products"
import Input from "../Components/Input"

export default function Products() {
    const [products, setProd] = useState<Products[]>()
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [str_price,setSTRprice]=useState<string>('')
    const [str_quantity,setSTRquantity]=useState<string>('')
    const [quantity, setQuantity] = useState<number>(0)

    const handle_typing_product_name = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handle_typing_product_price = (e: React.ChangeEvent<HTMLInputElement>) => {
        const price_input=Number(e.target.value)
        setPrice(price_input)
        setSTRprice(e.target.value)
    }
    const handle_typing_product_quantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantity_input=parseFloat(e.target.value)
        setQuantity(quantity_input)
        setSTRquantity(e.target.value)
    }

    const handle_get_all_products = async () => {
        try {
            const data = await Submit_Get_all_products()
            if (!data || !Array.isArray(data)) {
                alert("Não há nenhum produto")
            }
            setProd(data)
        } catch (err) {
            return err
        }
    }
    const handle_create_product = async () => {
        console.log(name, price, quantity)
        const token: string | null = localStorage.getItem('authToken')
        if (!token) {
            throw new Error('Não autorizado!!')
        }
        await Submit_Create_Product(name, price, quantity, token)
    }

    const handle_update_all_products=async ()=>{
        await handle_create_product()
        await handle_get_all_products()
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center bg-white h-svh'>
                <div className="flex flex-col">
                    <Input placeholder="Name" value={name} onChange={handle_typing_product_name}></Input>
                    <Input placeholder="Price" value={str_price} onChange={handle_typing_product_price} ></Input>
                    <Input placeholder="Quantity" value={str_quantity} onChange={handle_typing_product_quantity} ></Input>
                    <button onClick={handle_update_all_products}>Criar</button>
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