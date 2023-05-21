import {useState} from "react"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Form (props) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState({
        title: "",
        link: ""
    })

    function HandleChange(e) {
        const value = e.target.value
        setInputValue ({...inputValue, [e.target.name]: value})
        console.log(inputValue)
        
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <>  
        <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
       Add Bookmark
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Bookmark</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title..."
            type="email"
            fullWidth
            name="title"
            variant="standard"
            value ={inputValue.title} onChange={HandleChange}
          />
        <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Link..."
            type="email"
            fullWidth
            variant="standard"
            value = {inputValue.link}
            onChange={HandleChange}
            name="link" 
          />  
        </DialogContent>
        <DialogActions>
          <Button onClick={(e)=>{props.handleSubmitButton(e, inputValue, setInputValue, setOpen)}}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
        
        </>
    )
}