import axios from './axios-instance';


const API  = {
    getProfileInfo(id){
        return axios.get(`profile/${id()}`)
    },

    follow(id){
        return axios.post(`follow/${id}`)
    },

    unfollow(id){
        return  axios.delete(`follow/${id}`)
    },

    getUserInfoAuth(){
        return axios.get('auth/me')
    },

    logIn(email,password,rememberMe){
      return axios.post('auth/login',{
          email,
          password,
          rememberMe
      })
    },

    logOut(){
        return axios.post('auth/logout')
    },

    getUsers(page,count){
        return axios.get(`users?page=${page}&count=${count}`)
    },

    getSearchUsers(str,count){
        return axios.get(`users?term=${str}&count=${count}`)
    }
};

export default API;