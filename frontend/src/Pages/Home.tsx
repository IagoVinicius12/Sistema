import { useEffect, useState } from 'react'
import { Submit_get_users, type User } from '../Requisitions/login'


export default function Home() {
    const [users, setUsers] = useState<User[]>()

    useEffect(()=>{
        handle_get_all()
    },[])

    const handle_get_all = async () => {
        try {
            const token: string | null = localStorage.getItem('authToken')
            if (!token) {
                throw new Error('Token não encontrado relogue!!')
            }
            const users_vet = await Submit_get_users(token)
            if (!users_vet || !Array.isArray(users_vet)) {
                throw new Error("Dados de usuários inválidos recebidos do servidor");
            }

            setUsers(users_vet);
        } catch (err) {
            throw new Error('Internal Server Error')
        }
    }
    return (
        <>
            <div className='flex flex-col justify-center items-center bg-white h-svh'>
                <div className='bg-white h-80 w-lg flex flex-col justify-center items-center rounded-lg gap-4'>
                    <button className='bg-green-300 w-16 h-8 rounded-lg' onClick={handle_get_all}>get</button>
                </div>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-center">ID</th>
                            <th className="py-2 px-4 border-b text-center">Nome</th>
                            <th className="py-2 px-4 border-b text-center">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user,index) =>
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b text-center">{user.id}</td>
                                <td className="py-2 px-4 border-b text-center">{user.name}</td>
                                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </>
    )
}