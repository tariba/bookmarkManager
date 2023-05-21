import CloseSharpIcon from '@mui/icons-material/CloseSharp';

export default function SearchBox(props) {
   
    return (
        <form className="form-wrapper">
        <div className="search">
        <div className="searchInputs"></div>
        <input type="text" placeholder="seach by title..." id= "search" onChange={(e)=>{props.handleSearch(e)}} />
        
        
        </div>
        </form>

    )
   
}