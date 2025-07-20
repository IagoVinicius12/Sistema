import { useEffect, useState } from "react"
import { Submit_Create_Product, Submit_Delete_Product, Submit_Get_all_products, type Products } from "../Requisitions/Products"
import Input from "../Components/Input"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Products() {
    const [products, setProd] = useState<Products[]>()
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [str_price,setSTRprice]=useState<string>('')
    const [str_quantity,setSTRquantity]=useState<string>('')
    const [quantity, setQuantity] = useState<number>(0)

    useEffect(()=>{
        handle_get_all_products()
    },[])


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

    const handle_delete_product=async(id:number)=>{
        const token:string|null=localStorage.getItem('authToken')
        if(!token){
            throw new Error('Não autorizado')
        }
        await Submit_Delete_Product(id,token)
    }   

    const handle_update_all_products_post_creation=async ()=>{
        await handle_create_product()
        await handle_get_all_products()
    }

    const handle_update_all_products_post_deletion=async (id:number)=>{
        await handle_delete_product(id)
        await handle_get_all_products()
    }

    return (
        <>
            <div className='flex flex-col align-middle items-center bg-white h-svh pt-16'>
                <div className="flex flex-col gap-2 items-center">
                    <Input placeholder="Name" value={name} onChange={handle_typing_product_name}></Input>
                    <Input placeholder="Price" value={str_price} onChange={handle_typing_product_price} ></Input>
                    <Input placeholder="Quantity" value={str_quantity} onChange={handle_typing_product_quantity} ></Input>
                    <button onClick={handle_update_all_products_post_creation} className="w-15 h-10 bg-black text-white rounded-md">Criar</button>
                </div>
                <div className="min-w-full h-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-center w-[20%]">ID</th>
                            <th className="py-2 px-4 border-b text-center w-[30%]">Nome</th>
                            <th className="py-2 px-4 border-b text-center w-[20%]">Price</th>
                            <th className="py-2 px-4 border-b text-center w-[20%]">Quantity</th>
                            <th className="py-2 px-4 border-b text-center w-[10%]">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, index) =>
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b text-center border-r-1">{product.id}</td>
                                <td className="py-2 px-4 border-b text-center border-r-1">{product.name}</td>
                                <td className="py-2 px-4 border-b text-center border-r-1">{product.price}</td>
                                <td className="py-2 px-4 border-b text-center border-r-1">{product.quantity}</td>
                                <td className="py-2 px-4 border-b text-center"><FontAwesomeIcon icon={faTrash} onClick={()=>handle_update_all_products_post_deletion(product.id)}/></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
}