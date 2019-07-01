import axios from './axios-instance';

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