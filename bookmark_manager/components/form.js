import {useState} from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export default function Form (props) {
    
    const [inputValue, setInputValue] = useState({
        title: "",
        link: ""
    })

    function HandleChange(e) {
        const value = e.target.value
        setInputValue ({...inputValue, [e.target.name]: value})
        console.log(inputValue)
        
    }

    return (
        <>  
        <form className="form-wrapper">
            <label>    
            <input type="text" id= "search" placeholder="title..." value ={inputValue.title} onChange={HandleChange} name="title" />
            </label>
            <label>
            <input type="text" id= "search" placeholder="Link..."value = {inputValue.link} onChange = {HandleChange} name="link" />
            </label>
            <br></br>
            <button type='submit' className="form-submit-button" onClick={(e)=>{props.handleSubmitButton(e, inputValue)}}>Submit</button> 
        </form>
        </>
    )
}