const initialState = {
    friendsName: [
        {id:'1',name:'Friend 1', avatarImg:'#'},
        {id:'2',name:'Friend 2', avatarImg:'#'},
        {id:'3',name:'Friend 3', avatarImg:'#'},
        {id:'4',name:'Friend 4', avatarImg:'#'},
        {id:'5',name:'Friend 5', avatarImg:'#'}
    ]
};

const friendsSideReducer = (state = initialState, action) => {
    switch (action.type) {

    }
    return state;
};

export default friendsSideReducer;