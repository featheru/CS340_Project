import {MdFilterAlt} from "react-icons/md";
import React, { useState } from "react";

function FilterColumn(props){
    const toggleField = () => setShowField(!showField);
    const SearchField = () => <input placeholder={`Enter ${props.fieldToSearch} to search`}/>

    const [showField, setShowField] = useState(false);
    return(
        <div className={"filter-column"}>
            <MdFilterAlt onClick={() => {toggleField()
            }}/>
            {showField ? <SearchField /> : <text>Filter</text>}

        </div>
    );
}

export default FilterColumn;