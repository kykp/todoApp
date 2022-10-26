 import React, {useState} from 'react' 
import { useAppDispatch } from 'hook'  
import {deleteProject, changeProjectName} from "../../feauters/todo/todo.slice"
import "./leftMenu.scss"

interface PopupProps {
    trigger: boolean,  
    anchorPoint: {
      x:number,
      y:number,
    }, 
    id: string,
    onHandlePopupProject: () => void
  }
   
export const ProjecPopup: React.FC <PopupProps> = (props) => {  
  const [newProjectName, setNewProjectName]= useState("");
  const [needToChangeProjectName, setNeedToChangeProjectName] = useState(false);
  const dispatch = useAppDispatch(); 
  
  const onHandleDeleteProject = () => {
     dispatch(deleteProject({id: props.id}));  
     props.onHandlePopupProject();
     setNewProjectName("");
     setNeedToChangeProjectName(false);
  }

  const onHandleChangeNameProject = () => {
    dispatch(changeProjectName({id: props.id, project: newProjectName}))
    setNewProjectName("");
     setNeedToChangeProjectName(false);
    props.onHandlePopupProject();
  }

  const letsChangeNameProject = () => {
    setNeedToChangeProjectName(true);
  }

  return props.trigger ? (
    <div className="popup popup__left-menu">
      <div className="popup-inner" style={{ top: props.anchorPoint.y , left: props.anchorPoint.x }}>   
      {!needToChangeProjectName 
      ?<>
      <p>Выберите действие :</p>
      <button 
        className='button left-menu__button popup-inner__menu'
        onClick={letsChangeNameProject}
        >Изменить
        </button>
      <button 
        className='button left-menu__button popup-inner__menu'
        onClick={onHandleDeleteProject}
        >Удалить 
        </button>  
        </>
        : <>
        <p>Введите новое имя проекта</p>
        <input 
        className='projecPopup__input'
        type="text" 
        placeholder='Ведите название проекта'
        value={newProjectName}
        onChange={(e)=> setNewProjectName(e.currentTarget.value)}
        />
        <div className='left-menu__buttons'>
        <button 
            className='button left-menu__button'  
            onClick={props.onHandlePopupProject}
            >Отмена</button>
        <button 
            className='button left-menu__button' 
            onClick={onHandleChangeNameProject}
            >Ок</button>
            </div>
            </>
    } 
      <button className="close-btn" onClick={props.onHandlePopupProject}>x</button> 
      </div>
    </div>
  ) : null;
};
