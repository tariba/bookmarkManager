import { Inter } from '@next/font/google'

import { useRouter } from 'next/router';
import Login from '../components/login'

import { useUser } from '@auth0/nextjs-auth0/client';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  console.log(isLoading)
  
  return (
    <div className='main'>
       <h1 className='header'>Welcome to your Bookmark Manager</h1>
       {isLoading &&  <div>Loading...</div>}
        {user? router.push('/dashboard'): <Login/>}
      

    </div>
   
    
    

    
    
    
  )
}
