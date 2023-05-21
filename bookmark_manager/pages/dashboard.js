import { useState, useEffect } from "react";

// import "./App.css";
// import UserDashboard from "../UserDashboard/userDashboard";
import axios from 'axios'
import Logout from "../components/logout";
import DeleteIcon from '@mui/icons-material/Delete';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Dashboard() {
  const [data, setdata] = useState([]);
//   const [filterData, setFilterData] = useState([])
  const { user, error, isLoading } = useUser();


  //function to fetch the data from the backend and save it in data state
   async function getData ()  {
    try {
        const bookmark= await axios.get('https://average-sombrero-crab.cyclic.app/bookmark');
        console.log(bookmark.data.payload)
        setdata(bookmark.data.payload)
    } catch (err) {
        console.log(err)
    }
    
    // setFilterData(bookmark.payload)
  };

//   using useeffect to run the fetch function on page load
  useEffect (() =>{
    
        getData();
    
  },[])

  console.log(data)
//   async function deleteDataByID(id) {
//     await axios.delete(`https://average-sombrero-crab.cyclic.app/bookmark/${id}`)
//   }

//   async function handleDeleteButton (e) {
//     console.log(e)
//     await deleteDataByID(e)
//     await getData()
//   }

//   async function handleSubmitButton (e) {
//     const data = e
//     console.log(data)
//     await axios.post('https://average-sombrero-crab.cyclic.app/bookmark', data)
//     await getData()
//   }
 
//  function handleSearch (e) {
//     const value = e.target.value
//     setFilterData(data.filter((item) =>{ return   item.title.toLowerCase().includes(value.toLowerCase())}))
//   }

  return (
    <>
    <div className="dashboard">
    <div className="profile">
            {user && 
            <img src={user.picture} alt={user.name} />
             
            }
        </div>
    <div className="logout"> 
        <Logout/>
     </div>
    </div>
        
        {data && data.map((data) => {
          return (
            <li className="list" key={data.id}>
              {data.title}
              <a target="_blank " href={data.link}>
                <button className="button">Click Here!</button>
              </a>
              <button className="delete" key={data.id} type="click" onClick={()=>handleDeleteButton(data.id)}><DeleteIcon/></button>
            </li>
          );
        })}
      
        
      </>
  );
}

