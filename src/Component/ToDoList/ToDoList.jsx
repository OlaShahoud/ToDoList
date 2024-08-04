import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import './ToDoList.css'
export default function ToDoList  () {
  const [isactivebtn,setIsactivebtn]=useState(false);
  const [allTodo,setITodos]=useState([]);
  const [newTitle,setTitle]=useState("");
  const [newDescription,setDescription]=useState("");
  const [completedTodos,setCompletedTodos]=useState([]);
  const [currentEdit,setCurrentEdit]=useState('');
  const [currentEditedItem,setCurrentEditedItem]=useState('');
  const handleAddTodo=()=>{
    let newTodoItem={
      title: newTitle,
      Description:newDescription
    };
    let updatedTodoArr=[...allTodo];
    updatedTodoArr.push(newTodoItem);
    setITodos(updatedTodoArr);
    localStorage.setItem('ToDoList',JSON.stringify(updatedTodoArr))
    setDescription('');
    setTitle('');
   }
 
  const handleDeleteTask= index =>{
  let reducedTodo=[...allTodo];
   reducedTodo.splice(index,1)
    localStorage.setItem('ToDoList',JSON.stringify(reducedTodo));
    setITodos(reducedTodo);
  }
  const handleCompletedTodo= index =>{
    let now=new Date();
    let day=now.getDate();
    let month=now.getMonth()+1;
    let Year=now.getFullYear();
    let hour=now.getHours();
    let minute=now.getMinutes();
    let second= now .getSeconds();
    let completedOn= day+' - '+month +' - '+Year+' at '+ hour+' : '+minute+' : '+second;
    let filterObject={
      ...allTodo[index],
      completedOn:completedOn,
    }
    let updatedCompletedArr=[...completedTodos];
    updatedCompletedArr.push(filterObject);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTask(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
  }
  const handleDeleteComplatedTask= index =>{ 
    let reducedCompletedTodo=[...completedTodos]
    reducedCompletedTodo.splice(index,1)
    localStorage.setItem('completedTodos',JSON.stringify(reducedCompletedTodo));
    setCompletedTodos(reducedCompletedTodo);
  }
  const handleEditTodo =(index,item) =>{setCurrentEdit(index)
    setCurrentEditedItem(item)
  }
  const handleUpdateTitle= (value) =>{
    setCurrentEditedItem((prev)=>{
      return{...prev,title:value}
    })
  }
  const handleUpdateDescription = (value) =>{
    setCurrentEditedItem((prev)=>{return{...prev,Description:value}})
  }
  const handleUpdateTodo= ()=>{ let newTodo=[...allTodo]
    newTodo[currentEdit]=currentEditedItem;
    setITodos(newTodo)
    setCurrentEdit('');
  }
  useEffect(()=>{
    let savedTodo= JSON.parse( localStorage.getItem('ToDoList'))
    let savedCompleted= JSON.parse( localStorage.getItem('completedTodos'))
    if(savedTodo){setITodos(savedTodo)}
    if(savedCompleted){setCompletedTodos(savedCompleted)}
   },[])
  return (
    <>
    <h3 className='Title-ToDo'>My Todos</h3>
    <div className='ToDo-Wrapper'>
    <div className='todo-input-List'>
    <div className='todo-input'>
    <label >Title</label>
    <input type="text" name="Title" id="Input-Title" placeholder='Enter Task Title' value={newTitle}  onChange={(e)=>{setTitle(e.target.value)}}/>
    </div>
    <div className='todo-input'>
    <label >Description</label>
    <input type="text" name="Description" id="Input-Description" placeholder='Enter Task Description ' value={newDescription}  onChange={(e)=>{setDescription(e.target.value)}} />
    </div>
    <div>
    <button className='btn-add' onClick={handleAddTodo}> add </button>
    </div>
     </div>
    <div className='Btn-List'>
    <button className={`btn-ToDo ${isactivebtn==false &&'active'}`} onClick={()=>setIsactivebtn(false)}>To Do</button>
    <button className={`btn-Complated ${isactivebtn==true &&'active'}`} onClick={()=>setIsactivebtn(true)}>Complated</button>
    </div>
    <div>
      <div className='ToDo-List'>
        { isactivebtn===false && allTodo.map((item,index)=>{
          if(currentEdit===index){
          return(<div className='Edit-Todo' key={index}>
            <input defaultValue='Updated Title' value={currentEditedItem.title} onChange={(e)=>{handleUpdateTitle(e.target.value)}}></input>
            <textarea placeholder='Updated Description' value={currentEditedItem.Description} onChange={(e)=>{handleUpdateDescription(e.target.value)}} rows={4}></textarea>
            <button className='btn-add btn-update' onClick={handleUpdateTodo}> Update </button>
           </div>)
          }
        else{return(
          <div className='ToDo-List-item' key={index} id={index} >
             <div>
               <h3>{item.title}</h3>
                <p>{item.Description}</p>
            </div>
              <div className='ToDo-icon'>
              <FontAwesomeIcon icon= { faTrash } className='FaTrash'  onClick={()=>handleDeleteTask(index)}/>
              <FontAwesomeIcon icon= { faCheck } className='FaCheck ' onClick={()=>handleCompletedTodo(index)} />
              <FontAwesomeIcon icon= { faPenToSquare} className='FaPenToSquare ' onClick={()=>handleEditTodo(index,item)} />
              </div>
         </div>
         );}
        })}
         { isactivebtn===true && completedTodos.map((item,index)=>{
          return(
          <div className='ToDo-List-item' key={index} id={index} >
             <div>
               <h3>{item.title}</h3>
                <p>{item.Description}</p>
                <p> <small> Completed on : {item.completedOn} </small></p>
            </div>
              <div className='ToDo-icon'>
              <FontAwesomeIcon icon= { faTrash } className='FaTrash'  onClick={()=>handleDeleteComplatedTask(index)}/>
             
              </div>
         </div>
         );
        })}
     </div>
    </div>
    </div>
   
    
    </>
  )
}