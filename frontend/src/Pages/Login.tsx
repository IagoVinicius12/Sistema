import Input from '../Components/Input'
import { useState } from 'react'
import { Submit_login } from '../Requisitions/login'
import Home from './Home'
import { useNavigate } from 'react-router-dom'


export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate=useNavigate()

    const handle_typing_email = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handle_typing_password = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handle_submit_login = async () => {
        const tok = await Submit_login(email, password)
        localStorage.setItem('authToken', tok);
        if(!tok){
            throw new Error('O token não foi produzido!')
        }
        navigate('/home')
    }
    return (
        <>
            <div className='flex justify-center items-center bg-black h-svh'>
                <div className='bg-white h-80 w-lg flex flex-col justify-center items-center rounded-lg gap-4'>
                    <Input placeholder="Email" value={email} type='email' onChange={handle_typing_email}></Input>
                    <Input placeholder="Password" value={password} type='password' onChange={handle_typing_password}></Input>
                    <button onClick={handle_submit_login}>login</button>
                </div>
            </div>
        </>
    )
}