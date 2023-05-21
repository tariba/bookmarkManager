import { useState, useEffect } from "react";

// import "./App.css";
// import UserDashboard from "../UserDashboard/userDashboard";
import axios from 'axios'
import Logout from "../components/logout";
import DeleteIcon from '@mui/icons-material/Delete';
import { useUser } from '@auth0/nextjs-auth0/client';
import SearchBox from "../components/search";
import Form from "../components/form";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { purple, red, grey } from '@mui/material/colors';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px"
  }
})
export default function Dashboard() {
  const classes = useStyles()
  const [data, setdata] = useState([]);
  const [filterData, setFilterData] = useState([])
  const { user, error, isLoading } = useUser();


  //function to fetch the data from the backend and save it in data state
    const getData =  async ()=>  {
    try {
        const bookmark=  await axios.get('https://average-sombrero-crab.cyclic.app/bookmark');
        console.log(bookmark.data.payload)
        setdata(bookmark.data.payload)
        setFilterData(bookmark.data.payload)
    } catch (err) {
        console.log(err)
    }
    
  };

//   using useeffect to run the fetch function on page load
  useEffect (() =>{
        getData();
  },[])

  console.log(data)
  async function deleteDataByID(id) {
    await axios.delete(`https://average-sombrero-crab.cyclic.app/bookmark/${id}`)
  }

  async function handleDeleteButton (e) {
    console.log(e)
    await deleteDataByID(e)
    await getData()
  }

  async function handleSubmitButton (e, inputValue, setInputValue) {
    e.preventDefault()
    const data = inputValue
    console.log(data)
    await axios.post('https://average-sombrero-crab.cyclic.app/bookmark', data)
    await getData()
    setInputValue({title: "",
    link: ""})
  }
 
 function handleSearch (e) {
    console.log(e.target.value)
    const value = e.target.value
    setFilterData(data.filter((item) =>{ return   item.title.toLowerCase().includes(value.toLowerCase())}))
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
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
    <Form handleSubmitButton={handleSubmitButton}/>
    
    <SearchBox handleSearch={handleSearch}/>
        
        {/* {filterData && filterData.map((data) => {
          return (
            <li className="list" key={data.id}>
              {data.title}
              <a target="_blank " href={data.link}>
                <button className="button">Click Here!</button>
              </a>
              
              <button className="delete" key={data.id} type="click" onClick={()=>handleDeleteButton(data.id)}><DeleteIcon/></button>
                
            </li>
          );
        })} */}

        <Grid container spacing={4} className={classes.gridContainer} justify="center">
        
        
        {filterData && filterData.map((data) => {
          return (
            <Grid item xs={12} sm={6} >
            <Card sx={{ minWidth: 200, backgroundColor: grey[100], "&:hover": { transform: "scale3d(1.05, 1.05, 1)" } }}>
            <CardContent>
            <Typography key = {data.id} gutterBottom variant="h5" component="div">
              {data.title}
            </Typography>
        </CardContent>
        <CardActions>
        <Button  href= {data.link} size="small">Click Here!</Button>
        <Button key={data.id} onClick={()=>handleDeleteButton(data.id)} size="small">Delete</Button>
      </CardActions>
      </Card>
      </Grid>
          )


        })}
        
      
    </Grid>
        
      </>
  );
}

