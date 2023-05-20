import { Inter } from '@next/font/google'
import styles from '../styles/styles.module.css'
import { useRouter } from 'next/router';
import Login from '../components/login'
import Logout from '../components/logout'
import { useUser } from '@auth0/nextjs-auth0/client';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  return (
    <div className='App'>
       <h1 className='header'>Welcome to your Bookmark Manager</h1>
    
      {user? router.push('/dashboard'): <Login/>}
      

    </div>
   
    
    

    
    
    
  )
}
