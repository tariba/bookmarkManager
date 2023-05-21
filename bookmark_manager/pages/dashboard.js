import { useState, useEffect } from "react";

// import "./App.css";
// import UserDashboard from "../UserDashboard/userDashboard";
import axios from 'axios'
import Logout from "../components/logout";
import { useUser } from '@auth0/nextjs-auth0/client';
import SearchBox from "../components/search";
import Form from "../components/form";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {  grey } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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

  async function handleSubmitButton (e, inputValue, setInputValue, setOpen) {
    e.preventDefault()
    const data = inputValue
    console.log(data)
    await axios.post('https://average-sombrero-crab.cyclic.app/bookmark', data)
    await getData()
    setInputValue({title: "",
    link: ""})
    setOpen(false)
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
    <Box sx={{ flexGrow: 1, position:"sticky" }} position="sticky">
      <AppBar >
        <Toolbar>
          <Stack direction="row" spacing={1}>
      <Avatar src ={user.picture} />
      
    </Stack>
    <SearchBox handleSearch={handleSearch}/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          
          </Typography>
          <Form handleSubmitButton={handleSubmitButton}/>
          <Button color="inherit"><Logout/></Button>
          
        </Toolbar>
      </AppBar>
    </Box>
    
    
    
    
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

