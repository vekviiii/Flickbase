import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { AdminTitle, errorHelper, Loader } from '../../../../utils/tools'

//FORMIK

import { useFormik, FieldArray, FormikProvider } from 'formik';

import { formValues, validation } from './validationSchema';

import WYSIWYG from '../../../../utils/form/tiptap'

// redux

import { getCategories, addArticle } from '../../../../store/actions/articles'

import { useSelector, useDispatch } from 'react-redux';

//MUI

import TextField from '@mui/material/TextField'

import Button from '@mui/material/Button' 

import Divider from '@mui/material/Divider' 

import Chip from '@mui/material/Chip'

import Paper from '@mui/material/Paper'

import InputBase from '@mui/material/InputBase'

import IconButton from '@mui/material/IconButton'

import Select from '@mui/material/Select'

import MenuItem from '@mui/material/MenuItem'

import FormControl from '@mui/material/FormControl'

import FormHelperText from '@mui/material/FormHelperText'

import InputLabel from '@mui/material/InputLabel';

import AddIcon from '@mui/icons-material/Add';

const AddArticle = () => {

    const articles =  useSelector(state=>state.articles);

    const dispatch =  useDispatch();

    const actorsValue = useRef()

    let navigate =  useNavigate();

    const formik = useFormik({

        enableReinitialize: true,

        initialValues:formValues,

        validationSchema: validation,

        onSubmit:(values)=>{

            dispatch(addArticle(values))
            .unwrap()
            .then(()=>{
              navigate('/dashboard/articles')
            })

        }   

    })

    const handleEditorState = (state) => {

        formik.setFieldValue('content',state,true)

    }

    useEffect(()=>{

        dispatch(getCategories({}));

    },[])

    return(

        <>

            <AdminTitle title="Add article"/>

            <form className='mt-3 article_form' onSubmit={formik.handleSubmit}>

                <div className='form-group'>

                    <TextField

                        style={{width:'100%'}}

                        name="title"

                        label="Enter a title"

                        variant='outlined'

                        {...formik.getFieldProps('title')}

                        {...errorHelper(formik,'title')}

                    />

                </div>

                <div className='form-group'>

                    <WYSIWYG

                        setEditorState={(state)=>handleEditorState(state)}

                    />

                </div>

                <div className='form-group'>

                    <TextField

                        style={{width:'100%'}}

                        name="excerpt"

                        label="Enter a short desc"

                        variant='outlined'

                        {...formik.getFieldProps('excerpt')}

                        {...errorHelper(formik,'excerpt')}

                        multiline

                        rows={4}

                    />

                </div>          

                <Divider className='mt-3 mb-3'/>

                <div className='form-group'>

                    <TextField

                        style={{width:'100%'}}

                        name="score"

                        label="Enter a score"

                        variant='outlined'

                        {...formik.getFieldProps('score')}

                        {...errorHelper(formik,'score')}

                    />

                </div>

                <div className='form-group'>

                    <FormikProvider value={formik}>

                        <FieldArray

                            name="actor"

                            render={ arrayHelpers => (

                                <div>

                                    <Paper className='actors_form'>

                                        <InputBase

                                            inputRef={actorsValue}

                                            className='input'

                                            placeholder='Add actor name here'

                                        />

                                        <IconButton

                                           onClick={()=>{

                                            if(actorsValue.current.value !== ''){

                                                arrayHelpers.push(actorsValue.current.value)

                                            }

                                            actorsValue.current.value = '';

                                           }}

                                        >

                                            <AddIcon/>

                                        </IconButton>

                                    </Paper>

                                    { formik.errors.actor && formik.touched.actor ?

                                        <FormHelperText error={true}>

                                            {formik.errors.actor}

                                        </FormHelperText>

                                    :null}    

                                    <div className='chip_container'>

                                        { formik.values.actor.map((actor,index)=>(

                                            <div key={index}>

                                                <Chip

                                                    label={`${actor}`}

                                                    color="primary"

                                                    onDelete={()=> arrayHelpers.remove(index)}

                                                />

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            )}

                        />

                    </FormikProvider>

                </div>

                <div className='form-group'>

                    <TextField

                        style={{width:'100%'}}

                        name="director"

                        label="Enter a director"

                        variant='outlined'

                        {...formik.getFieldProps('director')}

                        {...errorHelper(formik,'director')}

                    />

                </div>

                <Divider className='mt-3 mb-3'/>

                <FormControl fullWidth>

                    <InputLabel>Select a status</InputLabel>

                    <Select

                        name="status"

                        label="Select a status"

                        {...formik.getFieldProps('status')}

                        error={ formik.errors.status && formik.touched.status ? true:false}

                    >

                        <MenuItem value=""><em>None</em></MenuItem>

                        <MenuItem value="draft">Draft</MenuItem>

                        <MenuItem value="public">Public</MenuItem>

                    </Select>

                    { formik.errors.status && formik.touched.status ?

                        <FormHelperText error={true}>

                            {formik.errors.status}

                        </FormHelperText>

                    :null}      

                </FormControl>

                <Divider className='mt-3 mb-3'/>

                <FormControl fullWidth>

                    <InputLabel>Select a category</InputLabel>

                    <Select

                        name="category"

                        label="Select a category"

                        {...formik.getFieldProps('category')}

                        error={ formik.errors.category && formik.touched.category ? true:false}

                    >

                        <MenuItem value=""><em>None</em></MenuItem>

                        { articles.categories ?

                            articles.categories.map(item=>(

                                <MenuItem key={item._id} value={item._id}>

                                    {item.name}    

                                </MenuItem>

                            ))

                        :null}

                    </Select>

                    { formik.errors.category && formik.touched.category ?

                        <FormHelperText error={true}>

                            {formik.errors.category}

                        </FormHelperText>

                    :null}      

                </FormControl>

                <Divider className='mt-3 mb-3'/>

                { articles.loading ?

                    <Loader/>

                :

                    <Button

                        variant='contained'

                        color='primary'

                        type='submit'

                    >

                        <span>Add article</span>

                    </Button>

                }

            </form>

        </>

    )

}

export default AddArticle;