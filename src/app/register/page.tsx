"use client";

import axios, {AxiosError} from "axios"
import { FormEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState(null)

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const res = await axios.post('/api/auth/signup', {
        email: formData.get('email'),
        password: formData.get('password'),
        fullname: formData.get('fullname')
      })

      const resAuth = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
      })

      if (resAuth?.ok) return router.push('/dashboard')

      console.log(res.data)      
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError){
        setError(error.response?.data.message)
      }
    }

  }

  return (
    <div>
      <form onSubmit={register}>
        {error && <div className="bg-red-500 text-white px-4 py-2 mb-2">{error}</div>}
        <h1>SignUp</h1>
        <input type="text" placeholder="John Doe" name="fullname"
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />
        <input type="email" placeholder="sergio@gmail.com" name="email" className="bg-zinc-800 px-4 py-2 block mb-2" />
        <input type="password" placeholder="*******" name="password" className="bg-zinc-800 px-4 py-2 block mb-2" />
        <button className="bg-indigo-500 px-4 py-2">
          register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage