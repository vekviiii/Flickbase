import { useDispatch } from "react-redux"
import { Loader } from "../../utils/tools"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { accountVerify } from "../../store/actions/users"

const AccountVerify = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useSearchParams()
    const navigate = useNavigate()
    const token = search.get('t')

    useEffect(()=>{
        if(token)
        {
            dispatch(accountVerify(token))
            .unwrap()
            .finally(()=>{
                navigate('/')
            })
        }
        else
        {
            navigate('/')
        }
    },[dispatch,navigate])


  return (
    <>
      <Loader/>
    </>
  )
}

export default AccountVerify
