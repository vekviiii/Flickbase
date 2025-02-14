import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorGlobal, successGlobal } from "../reducers/notifications";
import { getAuthHeader } from "../../utils/tools";

import axios from "axios";
import { updateCategories } from "../reducers/articles";

const BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : 'https://flickbase-mu.vercel.app/api';

export const addArticle = createAsyncThunk(
    'articles/addArticle',
    async(article,{dispatch})=>{
        try {
            const request = await axios.post(`${BASE_URL}/articles`, article, getAuthHeader())
            dispatch(successGlobal('Post Created!!!'))
            return request.data
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            console.log('error is here')
            console.log('article:', article)
            throw error
        }
    }
)


export const updateArticle = createAsyncThunk(
    'articles/updateArticle',
    async({values, articleId},{dispatch})=>{
        try {
            await axios.patch(`${BASE_URL}/articles/article/${articleId}`, values, getAuthHeader())
            dispatch(successGlobal('Article Updated !!!'))
            return true
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            console.log('error is here')
            console.log('article:', article)
            throw error
        }
    }
)


export const getAdminArticle = createAsyncThunk(
    'articles/getAdminArticle',
    async(_id,{dispatch})=>{
        try {
            const request = await axios.get(`${BASE_URL}/articles/article/${_id}`, getAuthHeader())
            return request.data
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            console.log('error is here')
            console.log('article:', article)
            throw error
        }
    }
)


export const getPaginateArticles = createAsyncThunk(
    'articles/getPaginateArticles',
    async({page=1, limit=4, keywords=''},{dispatch})=>{
        try {
            const request = await axios.post(`${BASE_URL}/articles/admin/paginate`, 
                {
                    page, 
                    limit, 
                    keywords
                }
                ,getAuthHeader())
            return request.data
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            console.log('error is here')
            console.log('article:', article)
            throw error
        }
    }
)

export const getCategories = createAsyncThunk(
    'articles/getCategories',
    async(obj,{dispatch})=>{
        try {
            const request = await axios.get(`${BASE_URL}/articles/categories`, getAuthHeader())
            return request.data
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)


export const addCategories = createAsyncThunk(
    'articles/addCategories',
    async(data,{dispatch, getState})=>{
        try {
            const category = await axios.post(`${BASE_URL}/articles/categories`, data, getAuthHeader())
            
            const state = getState().articles.categories

            const prevState = [...state]
            const newState = [...prevState, category.data]

            dispatch(updateCategories(newState))
            dispatch(successGlobal('Category Created !!!'))

            return newState

        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)

export const removeArticle = createAsyncThunk(
    'articles/removeArticle',
    async(_id,{dispatch,getState})=>{
        try {
            await axios.delete(`${BASE_URL}/articles/article/${_id}`, getAuthHeader())
            dispatch(successGlobal('Article Removed'))

            let page = getState().articles.adminArticles.page
            dispatch(getPaginateArticles({page}))
            return true
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)


export const changeStatusArticle = createAsyncThunk(
    'articles/changeStatusArticle',
    async({newStatus,_id},{dispatch, getState})=>{
        try {
            const request = await axios.patch(`${BASE_URL}/articles/article/${_id}`,
                 {status: newStatus},
                 getAuthHeader())

            let article = request.data
            //// previous state
            let state = getState().articles.adminArticles.docs
            /// find the position 
            let position = state.findIndex( article => article._id === _id)
            ///  WE CANNOT MUTATE 'let state'
            const newState = [...state] 
            newState[position] = article

            dispatch(successGlobal('Status changed !!!'))

            return newState

        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)

export const homeLoadMore = createAsyncThunk(
    'articles/homeLoadMore',
    async(sort,{dispatch, getState})=>{
        try {
            const articles = await axios.post(`${BASE_URL}/articles/all`, sort)
            const state = getState().articles.articles

            const prevState = [...state]
            const newState = [...prevState,...articles.data]

            return { newState, sort}
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)

export const getArticle = createAsyncThunk(
    'articles/getArticle',
    async(id,{dispatch})=>{
        try {
            const request = await axios.get(`${BASE_URL}/articles/users/article/${id}`)

            return request.data
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)