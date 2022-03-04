import {MdFilterAlt} from "react-icons/md";
import React, {useEffect, useState} from "react";

function FilterColumn(props){
    const toggleField = () => {
        setShowField(!showField);
        localStorage.setItem('showField', 'false')
    }
    const SearchField = () => <input placeholder={`Enter ${props.fieldToSearch} to search`} onChange={handleChange}/>

    function handleChange(event) {
        props.onChange(event.target.value);
    }
    const [showField, setShowField] = useState();

    // useEffect(() => {
    //     setShowField(localStorage.getItem('showField' === 'true'));
    // });

    return(
        <div className={"filter-column"}>
            <MdFilterAlt onClick={() => {toggleField()
            }}/>
            {showField ? <SearchField /> : <text>Filter</text>}

        </div>
    );
}

export default FilterColumn;