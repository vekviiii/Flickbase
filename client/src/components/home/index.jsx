import { useEffect } from "react"
import { homeLoadMore } from "../../store/actions/articles"
import { useDispatch, useSelector } from "react-redux"

/// mui
import MuiGrid from '@mui/material/Grid'
import MuiButton from '@mui/material/Button'

import ArticleCard from "../../utils/articleCard"

const Home = () => {
  const articles = useSelector( state=>state.articles)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(articles.articles.length <= 0)
    {
      dispatch(homeLoadMore(articles.homeSort))
    }
  },[])

  const getNextArticles = () => {
    let skip = articles.homeSort.skip + articles.homeSort.limit
    dispatch(homeLoadMore({...articles.homeSort}))
  }


  return (
    <>
      <MuiGrid container spacing={2} className="article_card">
          {
            articles && articles.articles ?
              articles.articles.map(item=>(
                <MuiGrid key={item._id} item xs={12} sm={6} lg={3}>
                    <ArticleCard article={item}/>
                </MuiGrid>
              ))
            :null
          }
      </MuiGrid>
      <hr/>
      <MuiButton
        variant='outlined'
        onClick={getNextArticles}
      >
        Load more
      </MuiButton>
    </>
  )
}

export default Home