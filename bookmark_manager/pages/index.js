import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Login from '../components/login'
import Logout from '../components/logout'
import { useUser } from '@auth0/nextjs-auth0/client';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { user, error, isLoading } = useUser();
  return (
    <>
    <h1>hello</h1>
    {user? <Logout/>: <Login/>}
    {user && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
      ) }
    
    

    </>
    
    
  )
}
