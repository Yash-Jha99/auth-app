import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import '../styles/globals.css'
import { useRouter } from 'next/router'
import Spinner from '../components/Spinner';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(false)
        router.replace("/")
      } else {
        setLoading(false)
        router.replace("/login")
      }
    });
  }, [])

  if (loading) return <Spinner />

  return <Component {...pageProps} />
}



export default MyApp
