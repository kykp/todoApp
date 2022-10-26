import React, {useState}  from 'react'
import { useAppDispatch } from 'hook'
import {changeTodoTitle} from "../../feauters/todo/todo.slice"
import "./task.scss"
import GambIcon from "../../assets/icons/hamburger.png"
 
import  {Popup}  from "../Popup/Popup"

interface Todo { 
  id: string,
  title: string, 
  status: string, 
}


export const Task: React.FC<Todo> = ({ id, title, status    } ) => { 
  const [showPopup, setShowPopup] = useState(false)
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const dispatch = useAppDispatch(); 

  const onHandlePopup = () => {
    setShowPopup(!showPopup)
  }
  const onHamburgerClick = (event:any ) => {
    setAnchorPoint({ x: event.pageX, y: event.pageY });
    setShowPopup(!showPopup)
  }
  return (  
    <div className='task-container'>  
      <div className='task-container__header'>
       <img id={id}  src={GambIcon} alt="" onClick={(event)=> onHamburgerClick(event)}/>
       <Popup id ={id} onHandlePopup={onHandlePopup} anchorPoint={anchorPoint} trigger={showPopup} status={status}  />
       
      </div>
      <textarea 
          className = "task-container__text" 
          placeholder= "Ввести заголовок для этой карточки" 
          name="" 
          id={id} 
          value={title}
          onChange={(e) => dispatch(changeTodoTitle({title: e.target.value, id: e.currentTarget.id} ))}
          cols ={30}
          rows ={3}>
            {title}
          </textarea> 
    </div> 
  )
}
