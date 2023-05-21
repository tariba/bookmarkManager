import CloseSharpIcon from '@mui/icons-material/CloseSharp';

export default function SearchBox(props) {
   
    return (
        <div className="search">
        <div className="searchInputs"></div>
        <input type="text" placeholder="seach by title..." onChange={(e)=>{props.handleSearch(e)}} />
        
        
        </div>

    )
   
}