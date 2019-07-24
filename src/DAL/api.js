import {axios,axiosFile} from './axios-instance';
import {captcha} from "../DataBLL/loginReducer";

const API  = {
    getProfileInfo(id){
        return axios.get(`profile/${id}`)
    },

    setAuthProfileInfo(profile){
        let {aboutMe,contacts,lookingForAJob,lookingForAJobDescription,fullName} = profile;
        contacts = !contacts ? {} : contacts;
        return axios.put('profile',{
            aboutMe,
            contacts: {
                facebook: contacts.facebook,
                github: contacts.github,
                instagram: contacts.instagram,
                mainLink: contacts.mainLink,
                twitter: contacts.twitter,
                vk: contacts.vk,
                website: contacts.website,
                youtube: contacts.youtube
            },
            lookingForAJob,
            lookingForAJobDescription,
            fullName
        })
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

    logIn(email,password,rememberMe,captcha){
      return axios.post('auth/login',{
          email,
          password,
          rememberMe,
          captcha
      })
    },

    captcha(){
        return axios.get('security/get-captcha-url')
    },

    logOut(){
        return axios.post('auth/logout')
    },

    getUsers(page,count){
        return axios.get(`users?page=${page}&count=${count}`)
    },

    getSearchUsers(str,count){
        return axios.get(`users?term=${str}&count=${count}`)
    },

    setUpdatePhoto(img){
      return axiosFile.post('profile/photo', img)
    },
    getStatusUser(userId){
      return axios.get(`profile/status/${userId}`)
    },
    setUpdateStatus(status){
        return axios.put('profile/status', {status})
    },
    getDialogs(){
        return axios.get('dialogs')
    },
    setStartDialog(userId){
        return axios.put(`dialogs/${userId}`)
    }

};

export default API;