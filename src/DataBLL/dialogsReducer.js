import ConstantType from "./ConstantType";

const {SEND_MESSAGE,UPDATE_NEW_MESSAGE_TEXT} = ConstantType;
const initialState = {
    messageName: [
        {id: '1', message: 'Message 1'},
        {id: '2', message: 'Message 2'},
        {id: '3', message: 'Message 3'}
    ],
    dialogName: [
        {id: '1', name: 'Name 1', avatarImg:'#'},
        {id: '2', name: 'Name 2', avatarImg:'#'},
        {id: '3', name: 'Name 3', avatarImg:'#'}
    ],
    newMessageText: ''
};

const dialogsReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case SEND_MESSAGE: {
            stateCopy = {
                ...state,
                messageName: [...state.messageName]
            };
            //stateCopy.dialogName = [...state.dialogName];
            let count =  state.messageName.length;
            if(state.newMessageText.trim()) {
                let newMessage = {
                    id: ++count,
                    message: state.newMessageText
                };
                stateCopy = {
                    ...state,
                    messageName: [...state.messageName, newMessage],
                    newMessageText: ''
                };
                // Оператор spread (...state) - позволяет склеивать массивы, что заменяет собой метод массивов push
                // messageName: [...state.messageName, newMessage] аналогично записи stateCopy.messageName.push(newMessage)
                // stateCopy.messageName.push(newMessage);
                // stateCopy.newMessageText = '';
            }
            return stateCopy;
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText: action.mewMessage
            }
        }
        default:
            return state;
    }
};

export const sendMessageText = () => ({type: SEND_MESSAGE});
export const updateNewMessageText = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, mewMessage: text});

export default dialogsReducer