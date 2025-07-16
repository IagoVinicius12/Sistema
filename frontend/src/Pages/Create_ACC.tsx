import Input from '../Components/Input'
import { useState } from 'react'
import { Submit_create_account} from '../Requisitions/login'


export default function Create_ACC() {
      const [email, setEmail] = useState<string>('')
      const [password, setPassword] = useState<string>('')
      const [name, setName] = useState<string>('')
    
      const handle_typing_email = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
      }
      const handle_typing_password=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
      }
      const handle_typing_name=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
      }
      const handle_submit_create_account=async()=>{
        await Submit_create_account(name,email,password)
      }
      return (
        <>
          <div className='flex justify-center items-center bg-black h-svh'>
            <div className='bg-white h-80 w-lg flex flex-col justify-center items-center rounded-lg gap-4'>
              <Input placeholder="Name" value={name} type='email' onChange={handle_typing_name} className='border-black w-sm h-10 rounded-lg shadow-sm'></Input>
              <Input placeholder="Email" value={email} type='email' onChange={handle_typing_email} className='border-black w-sm h-10 rounded-lg shadow-sm'></Input>
              <Input placeholder="Password" value={password} type='password' onChange={handle_typing_password} className='border-black w-sm h-10 rounded-lg shadow-sm'></Input>
              <button onClick={handle_submit_create_account}>criar</button>
            </div>
          </div>
        </>
      )
    }