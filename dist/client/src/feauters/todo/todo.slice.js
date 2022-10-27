var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const filters = {
    filter: "incomming",
};
export const fetchProjects = createAsyncThunk("todos/fetchProjects", (_, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5000/projects/get`);
    if (!response.ok) {
        return rejectWithValue(`server error`);
    }
    const data = yield response.json();
    return data;
}));
export const addProject = createAsyncThunk("todos/addProject", ({ project, id, archive, deleted, weight, }, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const newProject = {
        project,
        id,
        archive,
        deleted,
        weight,
    };
    const response = yield fetch(`http://localhost:5000/projects/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject)
    });
    if (!response.ok) {
        return rejectWithValue("cant add new project. Server Error");
    }
    return (yield response.json());
}));
export const changeProjectTitle = createAsyncThunk("todos/changeProjectTitle", ({ project, id }, { rejectWithValue, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5000/projects/change`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project, id })
    });
    if (!response.ok) {
        return rejectWithValue("cant change project. Server Error");
    }
    dispatch(changeProjectName({ project, id }));
    return (yield response.json());
}));
export const delProject = createAsyncThunk("todos/delProject", (id, { rejectWithValue, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5000/projects/delete`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        return rejectWithValue("cant add new project. Server Error");
    }
    dispatch(filterBy("incomming"));
    return id;
}));
export const fetchTasks = createAsyncThunk("todos/fetchTasks", (_, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5000/tasks/get`);
    if (!response.ok) {
        return rejectWithValue(`server error`);
    }
    const data = yield response.json();
    return data;
}));
export const addTask = createAsyncThunk("todos/addTask", ({ id, title, status, project, archive, deleted }, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = {
        id,
        title,
        status,
        project,
        archive,
        deleted
    };
    const response = yield fetch(`http://localhost:5000/tasks/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask)
    });
    if (!response.ok) {
        return rejectWithValue("cant add new project. Server Error");
    }
    return (yield response.json());
}));
export const changeTask = createAsyncThunk("todos/changeTask", ({ id, title, status, project, archive, deleted }, { rejectWithValue, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5000/tasks/change`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, status, project, archive, deleted })
    });
    if (!response.ok) {
        return rejectWithValue("cant add new project. Server Error");
    }
    dispatch(changeTaskReducer({ id, title, status, project, archive, deleted }));
    return (yield response.json());
}));
const initialState = {
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
        changeTodoTitle: (state, action) => {
            const currentTask = state.list.find(task => task.id === action.payload.id);
            if (currentTask) {
                currentTask.title = action.payload.title;
            }
        },
        changeTaskReducer: (state, action) => {
            const currentTask = state.list.find(task => task.id === action.payload.id);
            if (currentTask) {
                currentTask.id = action.payload.id;
                currentTask.title = action.payload.title;
                currentTask.status = action.payload.status;
                currentTask.project = action.payload.project;
                currentTask.archive = action.payload.archive;
                currentTask.deleted = action.payload.deleted;
            }
        },
        filterBy(state, action) {
            state.filters = action.payload;
        },
        changeProjectName(state, action) {
            let currentProject = state.projects.find(project => project.id === action.payload.id);
            if (currentProject) {
                currentProject.project = action.payload.project;
            }
        }
    },
    extraReducers: (builder) => {
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
            state.error = null;
        })
            .addCase(addProject.fulfilled, (state, action) => {
            state.projects.push(action.payload);
        })
            .addCase(delProject.fulfilled, (state, action) => {
            state.projects = state.projects.filter(project => project.id !== action.payload);
        })
            .addCase(fetchTasks.fulfilled, (state, action) => {
            state.list = action.payload;
        })
            .addCase(addTask.fulfilled, (state, action) => {
            state.list.push(action.payload);
        })
            .addMatcher(isError, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});
export const { changeTodoTitle, changeProjectName, changeTaskReducer, filterBy } = todoSlice.actions;
export default todoSlice.reducer;
function isError(action) {
    return action.type.endsWith('rejected');
}
