import {MdFilterAlt} from "react-icons/md";
import React, {useState} from "react";

function FilterColumn(props){
    const toggleField = () => {
        setShowField(!showField);
    }
    const [searchValue, setSearchValue] = useState();
    const SearchField = () =><form>
        <input placeholder={`Enter ${props.fieldToSearch} to search`} value = {searchValue} onChange={e => setSearchValue(e.target.value)}/>
        <button onClick={handleChange}>Search</button>
    </form>

    function handleChange() {
        props.filter(searchValue);
    }
    const [showField, setShowField] = useState();



    return(
        <div className={"filter-column"}>
            <MdFilterAlt onClick={() => {toggleField()
            }}/>
            {showField ? <SearchField /> : <text>Filter</text>}

        </div>
    );
}

export default FilterColumn;