import { Lock, Mail, User2Icon } from 'lucide-react'
import React from 'react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'



const Login=()=> {

  const dispatch = useDispatch()
  const query= new URLSearchParams(window.location.search)
  const urlState =query.get('state')

  const [state, setState] = React.useState(urlState||"login")

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const {data}= await api.post(`/api/users/${state}`, formData)
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success(data.message)
        }catch(error){
               toast(error?.response?.data?.message || error.message)     
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-indigo-50'>
    <form 
        onSubmit={handleSubmit}
        className="sm:w-96 w-full text-center bg-white border border-gray-200 rounded-2xl px-8 shadow-lg"
    >
        <h1 className="text-gray-800 text-3xl mt-10 font-semibold">
            {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-gray-500 text-sm mt-2">
            Please {state} to continue
        </p>

        {state !== "login" && (
            <div className="flex items-center mt-6 w-full bg-gray-100 border border-gray-200 h-12 rounded-full pl-6 gap-2">
                <User2Icon size={16} className="text-gray-500"/>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name"
                    className="w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
        )}

        <div className="flex items-center w-full mt-4 bg-gray-100 border border-gray-200 h-12 rounded-full pl-6 gap-2">
            <Mail size={13} className="text-gray-500"/>
            <input 
                type="email" 
                name="email" 
                placeholder="Email id"
                className="w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none"
                value={formData.email}
                onChange={handleChange}
                required
            />
        </div>

        <div className="flex items-center mt-4 w-full bg-gray-100 border border-gray-200 h-12 rounded-full pl-6 gap-2">
            <Lock size={13} className="text-gray-500"/>
            <input 
                type="password" 
                name="password" 
                placeholder="Password"
                className="w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none"
                value={formData.password}
                onChange={handleChange}
                required
            />
        </div>

        <div className="mt-4 text-left">
            <button type='button' className="text-sm text-indigo-600 hover:underline">
                Forget password?
            </button>
        </div>

        <button 
            type="submit" 
            className="mt-4 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition"
        >
            {state === "login" ? "Login" : "Sign up"}
        </button>

        <p 
            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
            className="text-gray-500 text-sm mt-4 mb-10 cursor-pointer"
        >
            {state === "login" ? "Don't have an account?" : "Already have an account?"}
            <span className="text-indigo-600 hover:underline ml-1">
                click here
            </span>
        </p>
    </form>
</div>

  )
}

export default Login