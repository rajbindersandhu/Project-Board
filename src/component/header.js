import React from "react";
import "./header.css";
import Modal from "react-modal";
Modal.setAppElement("body");

function Header({taskList,setTaskList}){
    let [openModal, setOpenModal] = React.useState(false);
    let [taskTitle,setTaskTitle] = React.useState("");
    let [taskStatus, setTaskStatus] = React.useState("");
    let [taskDef, setTaskDef] = React.useState("");

    function handleInput(e){
        if(e.target.id == "title"){
            setTaskTitle(e.target.value);
        }
        else if(e.target.id == "status"){
            setTaskStatus(e.target.value);
        }
        else if(e.target.id == "def"){
            setTaskDef(e.target.value);
        }
    }
   
    function saveToList(){
        let taskObject = {
            title : taskTitle,
            status : taskStatus,
            def : taskDef
        };
        let tempTaskList = [...taskList];
        tempTaskList.push(taskObject);
        setTaskList([...tempTaskList]);
        setOpenModal(false);
        setTaskTitle("");
        setTaskStatus("");
        setTaskDef("");
        //console.log(taskList);
    }

    return <>
        <button className="add-btn" onClick={()=>setOpenModal(true)}><span style={{fontSize:"50px",verticalAlign:"-6px",width:"10px",backgroundColor:"black"}}>+</span> Add New Card...</button>
        {/* onClick={()=>setOpenModal(true)} */}
        <Modal isOpen={openModal}
            style={
              {  overlay:{
                    backgroundColor: "gray"
                },
                content:{
                    width:"50%",
                    marginLeft : "auto",
                    marginRight:"auto",
                    padding:"5%",
                    backgroundColor:"#e7e7e7"
                    
                }
            }
            }
        >
            <div className = "modal-box">
                <form onSubmit ={(e)=>e.preventDefault()}>
                    <lable>
                        <h3>Title :</h3>
                        <input type="text" id="title" value={taskTitle} onChange={handleInput}/>
                    </lable><br/>
                    <label>
                        <h3>Status : </h3>
                        <select id="status" onChange={handleInput} >
                            <option  disabled selected>Select status </option>
                            <option>Not Started</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                    </label><br/>
                    <label>
                        <h3>Description :</h3>
                        <textarea  id="def" value={taskDef} onChange={handleInput} rows={10}  cols={30} placeholder="Enter description....."/>
                    </label><br/>
                    <div className="btn">
                        <button className="save-btn" onClick = {saveToList}>Save</button>
                        <button className = "back-btn" onClick = {()=>{
                            setOpenModal(false);
                            setTaskTitle("");
                            setTaskStatus("");
                            setTaskDef("");
                            }}
                        >Back</button>
                    </div>
                </form>
            </div>
        </Modal>
        
    </>
}

export default Header;