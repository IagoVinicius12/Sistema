import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Submit_Get_all_products } from "../Requisitions/Products"
import type { Products } from "../Requisitions/Products"
import { useEffect, useState } from "react"
import { faAppleWhole } from '@fortawesome/free-solid-svg-icons'


export default function Catalog() {

    const [products, setProducts] = useState<Products[]>()
    useEffect(() => {
        handle_get_all_products()
    }, [])

    const handle_get_all_products = async () => {
        const prod = await Submit_Get_all_products()
        setProducts(prod)
    }

    return (
        <div className="w-svw h-svh flex flex-col justify-center items-center pt-18 overflow-x-hidden">
            <div className="flex bg-amber-50 justify-center flex-wrap w-[50%] h-[100%] ">
            {products?.map((product, index) => (
                    <div  key={index}  className="flex flex-col w-[33%] h-[30%]">
                        <FontAwesomeIcon icon={faAppleWhole}></FontAwesomeIcon>
                        <p>{product.name}</p>
                    </div>
            ))}
             </div>
        </div>
    )
}