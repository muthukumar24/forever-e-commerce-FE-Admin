import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post('http://localhost:4000/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
                navigate('/add');
            } else {
                toast.error(response.data.message)
            }
             
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-2xl rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type={showPassword ? 'text' : 'password'} placeholder='Enter your password' required />
                    <p className='flex gap-1 text-sm font-medium text-gray-700 mt-3'>
                        Show Password <input type="checkbox" className='cursor-pointer w-3' value={showPassword} onChange={() => setShowPassword((prev) => !prev)}/>
                    </p>
                </div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit">{loading ? 'Logging in...' : 'Login'} </button>
            </form>
        </div>
    </div>
  )
}

export default Login