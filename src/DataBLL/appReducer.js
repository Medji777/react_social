import ConstantType from "./ConstantType";

const {SET_IS_WIDTH_RESIZE_MODE,SET_WIDTH_SCREEN} = ConstantType;

const initialState = {
    widthScreen: null,
    widthMobile: 695,
    isWidthResizeMode: false
};

const appReducer = (state = initialState,action) => {
    switch (action.type) {
        case SET_IS_WIDTH_RESIZE_MODE:
        case SET_WIDTH_SCREEN:{
            return {...state, ...action.payload};
        }
        default: return state
    }
};

export const setWidthScreen = (widthScreen) => ({type: SET_WIDTH_SCREEN,payload:{widthScreen}});
export const setIsWidthResizeMode = (isWidthResizeMode) => ({type: SET_IS_WIDTH_RESIZE_MODE,payload:{isWidthResizeMode}});

export const getWidthAppScreen = () => (dispatch,getState) => {
    const {widthScreen,widthMobile,isWidthResizeMode} = getState().app;
    if(widthScreen <= widthMobile && !isWidthResizeMode){
        dispatch(setIsWidthResizeMode(!isWidthResizeMode))
    }
    if(widthScreen > widthMobile && isWidthResizeMode){
        dispatch(setIsWidthResizeMode(!isWidthResizeMode))
    }
};

export default appReducer;