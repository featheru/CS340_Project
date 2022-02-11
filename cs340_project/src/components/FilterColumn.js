import {MdFilterAlt} from "react-icons/md";
import React, { useState } from "react";

function FilterColumn(props){
    const toggleField = () => setShowField(!showField);
    const SearchField = () => <input placeholder={`Enter ${props.fieldToSearch} to search`}/>

    const [showField, setShowField] = useState(false);
    return(
        <div>
            <MdFilterAlt onClick={() => {toggleField()
            }}/>
            {showField ? <SearchField /> : null}
        </div>
    );
}

export default FilterColumn;