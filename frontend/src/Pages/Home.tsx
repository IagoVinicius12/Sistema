import Input from '../Components/Input'
import { useState } from 'react'
import { Submit_get_users, Submit_login } from '../Requisitions/login'


export default function Login() {
    const handle_get_all = async () => {
        try {
            const token: string | null = localStorage.getItem('authToken')
            if(!token){
                throw new Error('Token não encontrado relogue!!')
            }
            await Submit_get_users(token)
        } catch (err) {
            throw new Error('Internal Server Error')
        }
    }
    return (
        <>
            <div className='flex justify-center items-center bg-black h-svh'>
                <div className='bg-white h-80 w-lg flex flex-col justify-center items-center rounded-lg gap-4'>
                    <button onClick={handle_get_all}>get</button>
                </div>
            </div>
        </>
    )
}