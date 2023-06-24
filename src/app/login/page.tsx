"use client";

import { FormEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const resAuth = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false
    })
    console.log(resAuth)
    if (resAuth?.error) return setError(resAuth.error as string)
    if (resAuth?.ok) return router.push('/dashboard')
  }

  return (
    <div>
      <form onSubmit={register}>
        {error && <div className="bg-red-500 text-white px-4 py-2 mb-2">{error}</div>}
        <h1>Login</h1>
        <input type="email" placeholder="sergio@gmail.com" name="email" className="bg-zinc-800 px-4 py-2 block mb-2" />
        <input type="password" placeholder="*******" name="password" className="bg-zinc-800 px-4 py-2 block mb-2" />
        <button className="bg-indigo-500 px-4 py-2">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage