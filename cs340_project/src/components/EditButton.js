import {MdEdit} from "react-icons/md";

const EditButton = () => {
    return(
     <MdEdit onClick={() => {
            alert("its a popup");
        }}/>
    );


}
export default EditButton;