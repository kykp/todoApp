import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";    
import { act } from "react-dom/test-utils";
 // {project: "Входящие", id: "incomming",  archive: false, deleted: false , weight: -1}, 
    // {project: "Архив",  id: "archive", archive: true, deleted: false, weight:10}, 
    // {project: "Корзина", id: "deleted", archive: false, deleted: true, weight: 10}
export const filters = {
  filter: "incomming",
};

type Todo = {
  id: string,
  title: string,
  status: string,
  project: string,
  archive: boolean,
  deleted: boolean,  
}

type Project = {
  project: string,
  id: string,
  archive: boolean,
  deleted: boolean,
  weight:number,
}
 
type TodosState = {
  list: Todo[] , 
  projects: Project[],
  filters: string, 
  loading: boolean,
  error: string | null,
}
 
export const fetchProjects = createAsyncThunk<Project[], void, {rejectValue: string}> ("todos/fetchProjects", async (_,{ rejectWithValue}) => {
  const response = await fetch(`http://localhost:5000/projects/get`)
  if(!response.ok) {
    return rejectWithValue(`server error`)
  }
  const data = await response.json();
  return data;
});

export const addProject = createAsyncThunk<Project, Project, {rejectValue: string}>("todos/addProject", async ({project, id, archive, deleted, weight}, {rejectWithValue}) => {
  const newProject = {
    project,
    id,
    archive,
    deleted,
    weight,
  }
  const response = await fetch(`http://localhost:5000/projects/add`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(newProject)  
    body:  "text-text"
  });

  if(!response.ok) {
    return rejectWithValue("cant add new project. Server Error")
  }
  
  return (await response.json()) as Project; 
});


const initialState : TodosState = {
  projects: [],
  list: [], 
  filters: filters.filter,
  loading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    updateProjects: (state, action: PayloadAction<{status: boolean}>)=>{
      if (action.payload.status === true) {
      }
},
    addTodo: (state, action: PayloadAction<{id:string, title: string, status: string, project: string, archive: boolean, deleted: boolean}>) => {
      state.list.push({
        id: action.payload.id,
        title: action.payload.title,
        status: action.payload.status,
        project: action.payload.project,
        archive: action.payload.archive,
        deleted: action.payload.deleted,
    });
    },
    changeTodoTitle: (state, action: PayloadAction<{id:string, title: string}>) => { 
     const currentTask = state.list.find(task => task.id === action.payload.id)
     if (currentTask){
       currentTask.title = action.payload.title;
     }
    },
    changeTodoStatus: (state,action: PayloadAction<{id:string, status: string, archive: boolean, deleted:boolean}>) => {
      const currentTask = state.list.find(task => task.id === action.payload.id) 
      if(currentTask){ 
          currentTask.archive = action.payload.archive;
          currentTask.deleted = action.payload.deleted;  
          currentTask.status = action.payload.status; 
      }  
    }, 
    changeTodoProjext: (state,action: PayloadAction<{id:string, project: string}>) => {
      const currentTask = state.list.find(task => task.id === action.payload.id)
      if(currentTask){
        currentTask.status = action.payload.project
      }
    },
    filterBy(state, action) {
      state.filters = action.payload;
    },
    // addNewProject(state, action: PayloadAction<{id:string,   project: string, archive: boolean, deleted: boolean, weight: number}>) {
    //   state.projects.push({ 
    //     id: action.payload.id ,
    //     project: action.payload.project,
    //     archive: action.payload.archive,
    //     deleted: action.payload.deleted,
    //     weight: action.payload.weight,
    //   })
    // },
    deleteProject(state,action: PayloadAction<{id: string}>) {
     state.projects = state.projects.filter(project => project.id !== action.payload.id);
    },

    changeProjectName(state, action: PayloadAction<{id: string, project:string }>) {
      let currentProject = state.projects.find(project => project.id === action.payload.id); 
      if (currentProject){
        currentProject.project = action.payload.project;
      }
    }
  }, 
  extraReducers: (builder)=>{
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(addProject.pending, (state) => {
        state.error = null
      })
      .addCase(addProject.fulfilled, (state, action)=> {
        state.projects.push(action.payload)
      })
  },  
   
});

export const { addTodo, changeTodoTitle, changeTodoStatus, changeTodoProjext, filterBy,  deleteProject, changeProjectName } = todoSlice.actions;
export default todoSlice.reducer;
