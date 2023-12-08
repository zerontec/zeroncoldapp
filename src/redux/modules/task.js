import axios from 'axios';
import authHeader from '../services/auth-header';

const API_URL_D = 'http://localhost:5040/';
const API_URL = 'https://expressjs-postgres-production-bd69.up.railway.app/';

const FETCH_TASK_REQUEST = 'FETCH_TASK_REQUEST';
const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE';
const CREATE_TASK = 'CREATE_TASK';
const GET_ALL_TASKS = 'GET_ALL_TASKS';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const MOVE_INVENTORY = 'MOVE_INVENTORY';

const CREATE_TASKS = 'CREATE_TASKS';
const TAKE_TASK = 'TAKE_TASK';
const ASSIGNED_TASK = 'ASSIGNED_TASK';
const FINISHTASKTEC_TASK = 'FINISHTASKTEC_TASK';
const GET_ALL_TASKS_FINISH = 'GET_ALL_TASKS_FINISH';
const GET_ALL_TASKS_PENDING = 'GET_ALL_TASKS_PENDING';
const REJECT_TASK = 'REJECT_TASK';
const FINISH_TASK = 'FINISH_TASK';
const TAKE_TASK_ID = 'TAKE_TASK_ID';
const GET_ALL_PROGRESS = 'GET_ALL_PROGRESS';
const GET_ALL_TASK_FINISH_R = 'GET_ALL_TASK_FINISH_R';
const TAKE_TASK_ID_F = 'TAKE_TASK_ID_F';

export const fetchTaskRequest = () => ({
  type: FETCH_TASK_REQUEST,
});

export const fetchTaskSuccess = (tasks) => ({
  type: FETCH_TASK_SUCCESS,
  payload: tasks,
});

export const fetchTaskFailure = (error) => ({
  type: FETCH_TASK_FAILURE,
  payload: error,
});

export const fetchTasks = (query) => async (dispatch) => {
  dispatch(fetchTaskRequest());
  try {
    const response = await fetch(`${API_URL_D}api/task/search-query?q=${query}`, { headers: authHeader() });
    const data = await response.json();
    dispatch(fetchTaskSuccess(data));
    return data;
  } catch (error) {
    dispatch(fetchTaskFailure(error.message));
    return null; // O devuelve otro valor adecuado en caso de error
  }
};

export const createTask = (formInfo) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL_D}api/task/create`, formInfo, { headers: authHeader() });
    dispatch({
      type: CREATE_TASK,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error('El código ya existe. Ingrese otro.');
    }
    throw error;
  }
};

export const takeTask = (taskId, tecnicoId) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL_D}api/task/take/${taskId}/${tecnicoId}`);
    dispatch({
      type: TAKE_TASK,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('tarea esta tomada');
    }
    throw error;
  }
};

export const rejecTask = (taskId) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL_D}api/task/reject/${taskId}`);
    dispatch({
      type: REJECT_TASK,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('tarea esta tomada');
    }
    throw error;
  }
};

export const finishTask = (taskId, tecnicoId) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL_D}api/task/task-finish/${taskId}/${tecnicoId}`);
    dispatch({
      type: FINISH_TASK,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('tarea esta tomada');
    }
    throw error;
  }
};

export const takeTaskById = (taskId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL_D}api/task/task/${taskId}`);
    dispatch({
      type: TAKE_TASK_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('tarea esta tomada');
    }
    throw error;
  }
};

export const getAllTask = () => async (dispatch) => {
  try {
    const resp = await axios.get(`${API_URL_D}api/task/all `, { headers: authHeader() });

    dispatch({
      type: GET_ALL_TASKS,
      payload: resp.data,
    });
    return resp.data;
  } catch (err) {
    return err.response;
  }
};

export const getAllTaskFinish = () => async (dispatch) => {
  try {
    const resp = await axios.get(`${API_URL_D}api/task/task-finish `, { headers: authHeader() });

    dispatch({
      type: GET_ALL_TASKS_FINISH,
      payload: resp.data,
    });
    return resp.data;
  } catch (err) {
    return err.response;
  }
};

export const getAllTaskProgress = () => async (dispatch) => {
  try {
    const resp = await axios.get(`${API_URL_D}api/task/task-progress `, { headers: authHeader() });

    dispatch({
      type: GET_ALL_PROGRESS,
      payload: resp.data,
    });
    return resp.data;
  } catch (err) {
    return err.response;
  }
};

export const getAllTaskPendding = () => async (dispatch) => {
  try {
    const resp = await axios.get(`${API_URL_D}api/task/pending `, { headers: authHeader() });


    console.log('Tareas Asignadas:', resp.data); // Agrega este log

    dispatch({
      type: GET_ALL_TASKS_PENDING,
      payload: resp.data,
    });
    return resp.data;
  } catch (err) {
    return err.response;
    
  }
};

export const assignedTaskTec = (tecnicoId) => async (dispatch) => {
  try {
    const resp = await axios.get(`${API_URL_D}api/task/assigned/${tecnicoId}`, { headers: authHeader() });

    dispatch({
      type: ASSIGNED_TASK,
      payload: resp.data,
    });

    return resp.data;
  } catch (err) {
    return err.response;
  }
};

export const finishTaksTec = (tecnicoId) => async (dispatch) => {
  try {
    const resp = await axios.get(`${API_URL_D}api/task/finish-task-teca/${tecnicoId}`, { headers: authHeader() });

    dispatch({
      type: FINISHTASKTEC_TASK,
      payload: resp.data,
    });

    return resp.data;
  } catch (err) {
    return err.response;
  }
};

export const allTaskFinishR = () => async (dispatch) => {
  try {
    const resp = await axios.get(`${API_URL_D}api/task/finish-historial `, { headers: authHeader() });
    dispatch({
      type: GET_ALL_TASK_FINISH_R,

      payload: resp.data,
    });

    return resp.data;
  } catch (error) {
    return error.response;
  }
};

export const taskByIdF = (taskId) => async (dispatch) => {
  try {
    const respon = await axios.get(`${API_URL_D}api/task/finish-historial/${taskId}`);
    dispatch({
      type: TAKE_TASK_ID_F,
      payload: respon.data,
    });
    return respon.data;
  } catch (error) {
    return error.response;
  }
};

export const updateTask = (id, data) => async (dispatch) => {
  try {
    const resp = await axios.put(`${API_URL_D}api/task/update/${id}`, data, { headers: authHeader() });

    dispatch({
      type: UPDATE_TASK,
      payload: resp.data,
    });

    return resp.data;
  } catch (err) {
    return err.response;
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL_D}api/task/delete/${id}`, { headers: authHeader() });

    dispatch({
      type: DELETE_TASK,
      payload: { id },
    });
    return { message: 'Eliminado con exito' };
  } catch (err) {
    return err.response;
  }
};

export const initialState = {
  tasks: [],
  message: null,
  error: null,
  sendTasks: {},
  assignedtask:[],
  finishedtasks:[]
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    case GET_ALL_TASKS_FINISH:
      return {
        ...state,
        tasks: action.payload,
      };

    case GET_ALL_TASKS_PENDING:
      return {
        ...state,
        tasks: action.payload,
      };

    case FINISHTASKTEC_TASK:
      return {
        ...state,
        finishedtasks: action.payload,
      };

    case REJECT_TASK:
      return {
        ...state,
        sendTasks: action.payload,
      };

    case FINISH_TASK:
      return {
        ...state,
        sendTasks: action.payload,
      };

    case TAKE_TASK_ID:
      return {
        ...state,
        sendTasks: action.payload,
      };

    case GET_ALL_PROGRESS:
      return {
        ...state,
        tasks: action.payload,
      };

    case CREATE_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case CREATE_TASK:
      return {
        ...state,
        sendTasks: action.payload,
      };

    case FETCH_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case FETCH_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: action.payload,
      };
    case FETCH_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case DELETE_TASK:
      return {
        ...state,
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: action.payload,
      };

    case GET_ALL_TASK_FINISH_R:
      return {
        ...state,
        tasks: action.payload,
      };

    case TAKE_TASK_ID_F:
      return {
        ...state,
        tasks: action.payload,
      };

      case ASSIGNED_TASK:
        return {


          ...state,
          assignedtask: action.payload

        }

    default:
      return state;
  }
}
