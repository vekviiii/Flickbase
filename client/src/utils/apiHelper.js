// src/utils/apiHelper.js
import api from './api';

export const apiRequest = async (dispatch, endpoint, method = 'GET', data = null, headers = {}) => {
    try {
        const response = await api({
            method,
            url: endpoint,
            data,
            headers: {
                ...headers
            }
        });

        return response.data? response.data : true;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        dispatch(errorGlobal(errorMessage));
        throw error;
    }
};