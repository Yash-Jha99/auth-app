// import axios from 'axios'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth } from '../firebase'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Alert from '../components/Alert'
// import Alert from './Alert'

const Login = () => {
    const router = useRouter()
    const provider = new GoogleAuthProvider();
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState({
        email: "",
        password: "",
    })
    const [authError, setAuthError] = useState("")
    const [signup, setSignup] = useState(false)
    const [toast, setToast] = useState(false)
    const { email, password } = form

    const handleChange = (e) => {
        setError({ email: "", password: "" })
        setAuthError("")
        const { name, value } = e.target
        setForm(form => ({ ...form, [name]: value }))
    }

    const handleSignup = (e) => {
        if (email.trim() === "") return setError(error => ({ ...error, email: "Email is required" }))
        if (password.trim() === "") return setError(error => ({ ...error, password: "Password is required" }))

        createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
            const { user } = userCredential
            router.replace("/")
            setForm({ email: "", password: "" })
        }).catch(err => {
            setAuthError(err.code)
        })
    }

    const handleSignin = () => {
        if (email.trim() === "") return setError(error => ({ ...error, email: "Email is required" }))
        if (password.trim() === "") return setError(error => ({ ...error, password: "Password is required" }))
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setForm({ email: "", password: "" })
                router.replace("/")
            })
            .catch((error) => {
                setAuthError(error.code)
            });
    }

    const googleSignin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
            }).catch((error) => {
                setError(error.code)
            });

    }

    const resetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setToast(true)
                setTimeout(() => {
                    setToast(false)
                }, 3000)
            })
            .catch((error) => {
                setAuthError(error.code)

            });
    }

    if (auth.currentUser) return null


    return (<>
        <Head>
            <title>Auth App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex justify-center items-center bg-cover bg-slate-100 h-screen" >
            <div className="w-full max-w-md min-w-max ">
                <div className="bg-white shadow-xl rounded-lg px-8 py-8 ">
                    <div className='text-2xl font-bold mb-4'>{signup ? "Sign Up" : "Sign In"}</div>
                    <div className="mb-3">
                        <label className={`${error.email ? "text-red-500" : "text-gray-700"} block  text-md font-semibold mb-1`} htmlFor="email">
                            Email*
                        </label>
                        <input value={email} name="email" className={` appearance-none border rounded w-full py-2 px-3 text-lg text-gray-700  mb-1 leading-tight focus:outline-blue-500 ${error.email && "border-red-500"}`} id="email" type="email" onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                        <label className={`${error.password ? "text-red-500" : "text-gray-700"} block  text-md font-semibold mb-1`} htmlFor="email">
                            Password*
                        </label>
                        <input value={password} name="password" className={` appearance-none border rounded w-full py-2 px-3 text-lg text-gray-700  mb-1 leading-tight focus:outline-blue-500 ${error.password && "border-red-500"}`} id="password" type="password" onChange={handleChange} />
                        <p id='error' className="text-red-500 text-sm mt-2 capitalize">{error.email || error.password || authError?.split("/")[1]?.replace(/-/g, " ")} &nbsp;</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm " type="button" onClick={signup ? handleSignup : handleSignin}>
                            {signup ? "Sign Up" : "Sign In"}
                        </button>
                        <div>
                            <div className='flex items-center'>
                                <p className='text-sm text-gray-700'>{signup ? "Already a user" : "Don't have an account"}</p>
                                <button className="ml-1.5 inline-block align-baseline text-sm text-green-500 font-medium "
                                    onClick={() => {
                                        setSignup(!signup);
                                        setForm({ email: "", password: "" })

                                    }}>
                                    {signup ? " Sign In" : "Sign Up"}
                                </button>
                            </div>
                            <div className='flex items-center'>
                                <p className='text-sm text-gray-700'>Forgot password?</p>
                                <button className="ml-1.5 inline-block align-baseline text-sm  font-medium "
                                    onClick={resetPassword}>
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center space-x-2 mt-3'><hr className='w-1/2' /><span>or</span><hr className='w-1/2' /></div>
                    <div className='flex justify-center'>
                        <button className="ml-1.5 flex space-x-2 rounded-md border shadow items-center align-baseline font-medium mt-4 py-2 px-4 "
                            onClick={googleSignin}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="20" height="20"
                                viewBox="0 0 30 30">
                                <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
                            </svg>
                            <p>
                                Signin with Google</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {toast && <Alert>Password reset link sent to your email</Alert>}
    </>
    )
}

export default Login