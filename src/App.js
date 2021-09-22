import React from "react";
import Header from "./component/header";
import Main from "./component/main";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import './App.css';


function App() {
  let [taskList, setTaskList] = React.useState([])
  return (
    <div className="App">
      <Header taskList={taskList} setTaskList={setTaskList}/>
      <DndProvider backend = {HTML5Backend}>
        <Main taskList={taskList} setTaskList={setTaskList}/>
      </DndProvider>
    </div>
  );
}

export default App;
