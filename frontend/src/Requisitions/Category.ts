import {type Products } from "./Products"

export interface Category{
    id:number
    name:string
    products:Products[]
}

export async function Submit_Create_Category(name:String,token:string){
    try{   
        const response=await fetch('http://localhost:3050/category/create',
            {
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({name})
            }
        )
        if(!response.ok){
            const errordata=await response.json()
            throw new Error(errordata.message)
        }
        const data=await response.json()
        return data as Category

    }catch(err){
        throw err
    }
}

export async function Submit_find_all_categories(){
    try{
        const response=await fetch('http://localhost:3050/category/listall',
            {
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                },
            }
        )
        if(!response.ok){
            const errorData=await response.json()
            throw new Error(errorData.message)
        }
        const data= await response.json()
        return data as Category[]
    }catch(err){
        throw err
    }
}