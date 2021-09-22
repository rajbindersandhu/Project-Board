import React from "react";
import "./main.css";
import Card from "./card";
import {useDrop} from "react-dnd";


function Main({taskList,setTaskList}){

    const notStarted = taskList.filter((task) => task.status === "Not Started");
    const inProgress = taskList.filter((task) => task.status === "In Progress");
    const completed = taskList.filter((task) => task.status === "Completed");

    const [{isOverNS}, dropNS] = useDrop({
        accept:"card",
        drop : (item, monitor) => moveCardNS(item.id),
        collect: (monitor) => ({
            isOverNS : !!monitor.isOver()
        })
    });
    const [{isOverIP}, dropIP] = useDrop({
        accept:"card",
        drop : (item, monitor) => moveCardIP(item.id),
        collect: (monitor) => ({
            isOverIP : !!monitor.isOver()
        })
    });
    const [{isOverC}, dropC] = useDrop({
        accept:"card",
        drop : (item, monitor) => moveCardC(item.id),
        collect: (monitor) => ({
            isOverC : !!monitor.isOver()
        })
    });

    function moveCardNS(ind){
        let temp = [...taskList];
        temp[ind].status = "Not Started";
        setTaskList([...temp]);

    }
    function moveCardIP(ind){
        let temp = [...taskList];
        temp[ind].status = "In Progress";
        setTaskList([...temp]);

    }
    function moveCardC(ind){
        let temp = [...taskList];
        temp[ind].status = "Completed";
        setTaskList([...temp]);

    }

    //console.log(notStarted,inProgress,completed);
    function handleSave(item,index){
        let tempList = []
        for(let i=0;i<taskList.length;i++){
            if(i == index){
                tempList.push(item);
            }
            else{
                tempList.push(taskList[i]);
            }
        }
        setTaskList([...tempList]);
    }

    function dltObj(index){
        let tempList = []
        for(let i=0;i<taskList.length;i++){
            if(i !== index){
                tempList.push(taskList[i]);
            }
        }
        setTaskList([...tempList]);
    }

    return <div className="main-box">

        <div className="box" ref={dropNS}>
            <p>Not Started <sup>{notStarted.length}</sup></p>
            {notStarted &&  taskList.map((task,index)=> task.status =="Not Started" ? <Card task={task} i={index} handleSave ={handleSave} dltObj={dltObj}  key ={index}/> : null)}
        </div>
        <div className="box" ref={dropIP}>
            <p>In Progress <sup>{inProgress.length}</sup></p>
            {inProgress &&  taskList.map((task,index)=> task.status =="In Progress" ? <Card task={task} i={index} handleSave ={handleSave} dltObj={dltObj} key ={index}/> : null)}
        </div>
        <div className="box" ref={dropC}>
            <p>Completed <sup>{completed.length}</sup></p>
            {completed &&  taskList.map((task,index)=> task.status =="Completed" ? <Card task={task} i={index} handleSave ={handleSave} dltObj={dltObj}  key ={index}/> : null)}
        </div>

    </div>
}

export default Main;