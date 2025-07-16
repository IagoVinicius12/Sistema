export default function Login() {
    return (
        <div className='flex justify-center items-center bg-black h-svh'>
            <div className='bg-white h-80 w-lg flex flex-col justify-center items-center rounded-lg gap-4'>
                <Input placeholder="Email" value={email} type='email' onChange={handle_typing_email} className='border-black w-sm h-10 rounded-lg shadow-sm'></Input>
                <Input placeholder="Password" value={password} type='password' onChange={handle_typing_password} className='border-black w-sm h-10 rounded-lg shadow-sm'></Input>
                <button onClick={handle_submit}>criar</button>
                <button onClick={handle_submit_login}>login</button>
                <button onClick={handle_get_all}>get</button>
            </div>
        </div>
    )
}