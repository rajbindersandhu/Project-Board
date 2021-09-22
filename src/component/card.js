import React from "react";
import "./card.css";
import {useDrag} from "react-dnd"
import Modal from "react-modal";
Modal.setAppElement("body");

function Card({task,i,handleSave,dltObj}){
    let [saveModal,setSaveModal] = React.useState(false);
    let [openModal, setOpenModal] = React.useState(false);
    let [taskTitle,setTaskTitle] = React.useState(task.title);
    let [taskStatus, setTaskStatus] = React.useState(task.status);
    let [taskDef, setTaskDef] = React.useState(task.def);

    let [{ opacity }, drag] = useDrag(() => ({
        type: "card",
        item: {
            id : i,
        },
        collect : (monitor) =>({
                    opacity : monitor.isDragging() ? 0 : 1,
        })
    }),[i]);

    

    return <div className="card" ref={drag}>
            <button  style = {{opacity, width:"60%",cursor:"pointer",borderRadius:"5px",fontWeight:"800",marginBottom:"2%",padding: "1%"}} onClick = {()=>setOpenModal(true)}>{task.title}</button>

            <Modal 
                isOpen={openModal}
                style={{
                    overlay:{
                        backgroundColor: "gray"
                    },
                    content:{
                        width:"50%",
                        marginLeft : "auto",
                        marginRight:"auto",
                        padding:"5%",
                        backgroundColor:"#e7e7e7"
                    
                    }
                }}
                >
                    <fieldset>
                        <legend><b>Title  </b></legend>
                        <p className="text">{taskTitle}</p>
                    </fieldset>
                    <fieldset>
                        <legend><b>Status  </b></legend>
                        <p className="text">{taskStatus}</p>
                    </fieldset>
                    <fieldset>
                        <legend><b>Description  </b></legend>
                        <p className="text">{taskDef}</p>
                    </fieldset>                  
                    <div className="btn-box">
                        <button className="edit-btn" onClick={()=>{setSaveModal(true)}}>Edit</button>
                        <button className="bck-btn" onClick={()=>setOpenModal(false)}>Back</button>
                        <button className="dlt-btn" onClick={()=> {
                            dltObj(i);
                            setOpenModal(false);
                        }}>Delete</button>
                    </div>
                </Modal>

                <Modal 
                isOpen={saveModal}
                style={{
                    overlay:{
                        backgroundColor: "gray"
                    },
                    content:{
                        width:"50%",
                        marginLeft : "auto",
                        marginRight:"auto",
                        padding:"5%",
                        backgroundColor:"#e7e7e7"
                    }
                }}
                >
                    <div className = "modal-box">
                        <form onSubmit ={(e)=>e.preventDefault()}>
                            <lable>
                                <h3>Title : </h3>
                                <input type="text" id="title" value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)}/>
                            </lable><br/>
                            <label>
                                <h3>Status : </h3>
                                <select id="status" onChange={(e)=>setTaskStatus(e.target.value)}>
                                    <option  disabled selected>Select status</option>
                                    <option>Not Started</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                </select>
                            </label><br/>
                            <label>
                                <h3>Description : </h3>
                                <textarea  id="def" value={taskDef} onChange={(e) => setTaskDef(e.target.value)} rows={10} placeholder="Enter description....."/>
                            </label><br/>
                            <div className="btn">
                                <button className="save-btn" onClick = {() => {
                                    let tempObjt = {
                                        title : taskTitle,
                                        status : taskStatus,
                                        def : taskDef
                                    }
                                    handleSave(tempObjt,i);
                                    setOpenModal(true);
                                    setSaveModal(false);
                                    }}>Save</button>
                            </div>
                        </form>
                    </div>
                </Modal>
    </div>

}

export default Card;