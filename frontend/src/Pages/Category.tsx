import { useEffect, useState } from "react"
import Input from "../Components/Input"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { type Category, Submit_Create_Category, Submit_find_all_categories } from "../Requisitions/Category"


export default function Category() {
    const [category, setCat] = useState<Category[]>()
    const [name, setName] = useState<string>('')
    const [pages, setPages] = useState<number[]>()
    const [currentPage,setCurrentPage]=useState<number>(0)

    useEffect(() => {
        handle_get_all_category()
    }, [])

    useEffect(() => {
        if (category) {
            const len_pages = Math.ceil(category?.length / 5)
            const array_pages=Array.from({length:len_pages},(_,i)=> i)
            setPages(array_pages)
        }
    },[category])

    const handle_typing_product_name = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handle_get_all_category = async () => {
        try {
            const data = await Submit_find_all_categories()
            if (!data || !Array.isArray(data)) {
                alert("Não há nenhum produto")
            }
            setCat(data)
        } catch (err) {
            return err
        }
    }
    const handle_create_product = async () => {
        const token: string | null = localStorage.getItem('authToken')
        if (!token) {
            throw new Error('Não autorizado!!')
        }
        await Submit_Create_Category(name,token)
    }

    // const handle_delete_product = async (id: number) => {
    //     const token: string | null = localStorage.getItem('authToken')
    //     if (!token) {
    //         throw new Error('Não autorizado')
    //     }
    //     await Submit_Delete_Product(id, token)
    // }

    const handle_update_all_category_post_creation = async () => {
        await handle_create_product()
        await handle_get_all_category()
    }

    // const handle_update_all_category_post_deletion = async (id: number) => {
    //     await handle_delete_product(id)
    //     await handle_get_all_category()
    // }
    const handle_current_page=(index:number)=>{
        setCurrentPage(index)
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center bg-white h-svh pt-18'>
                <div className="flex flex-col gap-2 items-center min-w-full">
                    <Input placeholder="Name" value={name} onChange={handle_typing_product_name}></Input>
                    <button onClick={handle_update_all_category_post_creation} className="w-15 h-10 bg-black text-white rounded-md">Criar</button>
                </div>
                <div className="min-w-full">
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
                            {category?.slice(5*currentPage, 5*(currentPage+1)).map((cat, index) =>
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b text-center border-r-1">{cat.id}</td>
                                    <td className="py-2 px-4 border-b text-center border-r-1">{cat.name}</td>
                                    {/* <td className="py-2 px-4 border-b text-center"><FontAwesomeIcon icon={faTrash} onClick={() => handle_update_all_Category_post_deletion(product.id)} /></td> */}
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-center items-center gap-0.5 pt-5">
                        {pages?.map((index)=>(
                            <button key={index} className="w-10 h-8 bg-black text-white" onClick={()=>handle_current_page(index)}>
                                {index+1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}