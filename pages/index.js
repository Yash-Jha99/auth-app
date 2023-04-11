import Head from 'next/head'
import { auth } from '../firebase'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { signOut } from 'firebase/auth'

export default function Home() {
  const router = useRouter()

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.replace("/login")
    }).catch((error) => {
      setAuthError(error.code)
    });
  }

  if (!auth.currentUser) return null


  return (
    <div >
      <Head>
        <title>Auth App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex flex-col justify-center items-center h-screen '><h1 className='text-6xl'>Hello World !</h1>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-8 " onClick={handleLogout}>Logout</button>
        </div>

      </main>
    </div>
  )
}

