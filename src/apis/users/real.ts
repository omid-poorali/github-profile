import API from 'apis/api';
import * as Models from "../../models";

export const getUserInfo = (username: string): Promise<Models.User> => {
    return API.get(`/users/${username}`);
}


export const getUserRepos = (username: string): Promise<Models.Repository[]> => {
    return API.get(`/users/${username}/repos`);
}