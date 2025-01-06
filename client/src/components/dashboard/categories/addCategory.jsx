import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import * as Yup from "yup"

import {
    TextField,
    Button
} from '@mui/material'
import { errorHelper } from "../../../utils/tools"
import { addCategories } from "../../../store/actions/articles"

const AddCategory = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues:{name:''},
        validationSchema:Yup.object({
            name: Yup.string()
            .required('The name is required')
        }),
        onSubmit:(values,{resetForm})=>{
            dispatch(addCategories(values))
            resetForm()
        }
    })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <TextField 
                    style={{width:'100%'}}
                    name='name'
                    label='Enter a name'
                    variant="outlined"
                    {...formik.getFieldProps('name')}
                    {...errorHelper(formik,'name')}
                />
            </div>
            <Button
                variant='contained'
                color='primary'
                type='submit'
            >
                Add category
            </Button>
      </form>
    </>
  )
}

export default AddCategory
