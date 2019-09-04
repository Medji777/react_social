import ConstantType from "./ConstantType";
import API from "../DAL/api";

const {SEND_MESSAGE,SET_DIALOGS_SUCCESS,
    SET_SELECT_DIALOG_ID,PUT_UP_DIALOG,GET_MESSAGES,
    GET_COUNT_NEW_MESSAGE,SET_HAS_NEW_MESSAGE,GET_DIALOGS_COUNT_MODE,
    GET_VIEWED_MESSAGE,SET_NEED_REFRESH,SET_TOTAL_COUNT_MESSAGES,
    SET_PREV_MESSAGES,SET_CURRENT_PAGE,UPDATE_MESSAGES,SET_NEXT_MESSAGES,DELETE_MESSAGE} = ConstantType;

const initialState = {
    messageName: [],
    dialogName: [],
    selectDialogId: null,
    countNewMessage: 0,
    getDialogsCountMode: true,
    needRefresh: false,
    messageDelete: false,
    totalCountMessages: 0,
    currentPage: 1
};

export const methodInterval = {
  setInterval: 'setInterval',
  clearInterval: 'clearInterval'
};

const interval = {
    init: null
};

const nextPrevMessages = (state,argFirst,argLast) => {
    return {
        ...state,
        messageName: [...argFirst,...argLast]
    }
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messageName: [...state.messageName, action.message]}
        }
        case SET_DIALOGS_SUCCESS:
        case SET_SELECT_DIALOG_ID:
        case GET_COUNT_NEW_MESSAGE:
        case GET_DIALOGS_COUNT_MODE:
        case SET_NEED_REFRESH:
        case SET_TOTAL_COUNT_MESSAGES:
        case SET_CURRENT_PAGE:
        case UPDATE_MESSAGES:
        case DELETE_MESSAGE:
        case GET_MESSAGES: {
            return {...state, ...action.payload}
        }
        case PUT_UP_DIALOG: {
            return {
                ...state,
                dialogName: [
                    state.dialogName.find(d => d.id === +action.userId),
                    ...state.dialogName.filter(d => d.id !== +action.userId)
                ]
            }
        }
        case SET_HAS_NEW_MESSAGE: {
            return {
                ...state,
                dialogName:
                    state.dialogName.map(d =>
                        d.id === +action.userId ? {...d, hasNewMessages: action.hasNewMessages} : d
                    )
            }
        }
        case GET_VIEWED_MESSAGE: {
            return {
                ...state,
                messageName:
                    state.messageName.map(m =>
                    m.id === action.id ? {...m, viewed: action.viewed} : m
                )
            }
        }
        case SET_PREV_MESSAGES: {
            return nextPrevMessages(state,action.prevMessages,state.messageName)
        }
        case SET_NEXT_MESSAGES: {
            return nextPrevMessages(state,state.messageName,action.nextMessages)
        }
        default:
            return state;
    }
};

export const sendMessageText = (message) => ({type: SEND_MESSAGE,message});
export const setDialogsSuccess = (dialogName) => ({type: SET_DIALOGS_SUCCESS, payload: {dialogName}});
export const setSelectDialogId = (selectDialogId = null) => ({type: SET_SELECT_DIALOG_ID, payload: {selectDialogId}});
export const getMessages = (messageName) => ({type: GET_MESSAGES, payload: {messageName}});
export const putUpDialog = (userId) => ({type: PUT_UP_DIALOG, userId});
export const getCountNewMessage = (countNewMessage) => ({type: GET_COUNT_NEW_MESSAGE,payload: {countNewMessage}});
export const setHasNewMessage = (userId,hasNewMessages) => ({type: SET_HAS_NEW_MESSAGE,userId,hasNewMessages});
export const getDialogsCountMode = (getDialogsCountMode) => ({type: GET_DIALOGS_COUNT_MODE, payload: {getDialogsCountMode}});
export const getViewedMessage = (viewed,id) => ({type: GET_VIEWED_MESSAGE, viewed,id});
export const setNeedRefresh = (needRefresh) => ({type: SET_NEED_REFRESH,payload:{needRefresh}});
export const setTotalCountMessagesWithFriend = (totalCountMessages) => ({type: SET_TOTAL_COUNT_MESSAGES, payload: {totalCountMessages}});
export const setPrevMessages = (prevMessages) => ({type: SET_PREV_MESSAGES,prevMessages});
export const setNextMessages = (nextMessages) => ({type: SET_NEXT_MESSAGES,nextMessages});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, payload: {currentPage}});
export const updateMessages = (currentPage = 1) => ({type: UPDATE_MESSAGES,payload:{currentPage}});
export const setDeleteMessage = (messageDelete = true) => ({type: DELETE_MESSAGE,payload: {messageDelete}});


export const getDialogs = () => async (dispatch) => {
    let res = await API.getDialogs();
    try {
        dispatch(setDialogsSuccess(res.data))
    }
    catch (e) {
        console.log(e.message)
    }
};

export const startDialogs = (userId) => async (dispatch, getState) => {
    await API.setStartDialog(userId);
    let dialog = getState().dataDialogs.dialogName.find(d => d.id === +userId);
    if (dialog) {
        dispatch(putUpDialog(userId))
    }
};

export const getMessageDialogWithFriends = (userId) => async (dispatch) => {
    dispatch(updateMessages());
    let res = await API.getMessageDialogWithFriend(userId);
    if(res.data.items.some(m => !m.viewed)){
        dispatch(setNeedRefresh(true));
    }
    dispatch(getMessages(res.data.items));
    dispatch(setHasNewMessage(userId,false));
    dispatch(setTotalCountMessagesWithFriend(res.data.totalCount));
};

export const setMessageFriend = (userId,body) => async (dispatch) => {
    if(body.trim()){
        let res = await API.setMessageFriend(userId,body);
        if(res.data.resultCode === 0){
            dispatch(sendMessageText(res.data.data.message));
            dispatch(putUpDialog(userId))
            //dispatch(getMessageDialogWithFriends(userId));
        }
    }
};

export const getListNewMessagesCount = () => async (dispatch,getState) => {
    let res = await API.getListNewMessagesCount();
    let {countNewMessage,needRefresh,selectDialogId} = getState().dataDialogs;
    if(countNewMessage !== res.data || needRefresh){
        dispatch(setNeedRefresh(false));
        dispatch(getCountNewMessage(res.data));
        dispatch(getDialogs());
        if(selectDialogId !== null){
            //dispatch(getMessageDialogWithFriends(selectDialogId));
            dispatch(getMessagesDialogNewerThenDate());
        }
    }
};

export const initDialogs = (userId) => async (dispatch) => {
    if(!!userId){
        await dispatch(startDialogs(userId));
        dispatch(getDialogs());
        dispatch(getMessageDialogWithFriends(userId));
        dispatch(setSelectDialogId(userId));
    } else {
        dispatch(setSelectDialogId());
        dispatch(getDialogs())
    }
};

export const updateInitDialogs = (userId) => (dispatch) => {
    if(!!userId){
        dispatch(getMessageDialogWithFriends(userId));
        dispatch(setSelectDialogId(userId));
    } else {
        dispatch(setSelectDialogId())
    }
};

export const setDialogsCountMode = (method,mode) => (dispatch) => {
    switch (method) {
        case methodInterval.setInterval: {
            dispatch(getDialogsCountMode(mode));
            interval.init = setInterval(() => {
                dispatch(getListNewMessagesCount())
            },10000); // интервал запроса количества новых сообщений в диалоге
            break;
        }
        case methodInterval.clearInterval: {
            dispatch(getDialogsCountMode(mode));
            clearInterval(interval.init);
            break;
        }
        default: break;
    }
};

export const getMessageViewed = (messageId) => async (dispatch) => {
    let res = await API.getMessageViewed(messageId);
    try {
        dispatch(getViewedMessage(res.data,messageId));
    }
    catch (e) {
        console.log(e.message)
    }
};

export const getPreveMessages = (page) => async (dispatch,getState) => {
    let userId = getState().dataDialogs.selectDialogId;
    let res = await API.getMessageDialogWithFriend(userId,page);
    try {
        dispatch(setPrevMessages(res.data.items));
    }
    catch (e) {
        console.log(e.message)
    }
};

export const getMessagesDialogNewerThenDate = () => async (dispatch,getState) => {
    let {selectDialogId,messageName} = getState().dataDialogs;
    let date = messageName[messageName.length - 1].addedAt;
    let res = await API.getMessagesDialogNewerThenDate(selectDialogId,date);
    try {
        if(res.data.length > 0){
            dispatch(setNextMessages(res.data));
            dispatch(getMessageViewed(res.data.id));
        }
    }
    catch (e) {
        console.log(e.message)
    }
};

export const deleteMessage = (messageId) => async (dispatch) => {
    let res = await API.deleteMessage(messageId);
    try {
        if(res.data.resultCode === 0){
            dispatch(setDeleteMessage())
        }
    }
    catch (e) {
        console.log(e.message)
    }
};

export default dialogsReducer;