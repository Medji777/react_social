import * as axiosLib from 'axios';

export const axios = axiosLib.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,  // Включает cookie (куки)
    headers: {'API-KEY': 'cf468da1-4098-4d6a-a301-a0693e4da6ed'}
});

export const axiosFile = axiosLib.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,  // Включает cookie (куки)
    headers: {
        'API-KEY': 'cf468da1-4098-4d6a-a301-a0693e4da6ed',
        'Content-Type': 'multipart/form-data'
    }
});