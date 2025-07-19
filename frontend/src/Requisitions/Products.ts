export interface Products{
    id:number
    price:number
    quantity:number
    name:string
}

export async function Submit_Create_Product(name:string, price:number, quantity:number, token:string){
    try{
        const response=await fetch('http://localhost:3050/products/create',
            {
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-type':'application/json'
                },
                body:JSON.stringify({name,price,quantity})
            }
        )
        if(!response.ok){
            throw new Error('Internal Server Error!')
        }

        const data =await response.json()

        console.log('criação bem sucedida')

        return data as Products[]
    }catch(err){
        return err
    }
}   

export async function Submit_Get_all_products() {
    try{

        const response= await fetch('http://localhost:3050/products/listall',{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            },
        })

        if(!response.ok){
            throw new Error('Internal Server Error')
        }
        const data=await response.json()
        console.log(data)
        return data as Products[]

    }catch(err){
        throw err
    }
}