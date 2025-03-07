import
{
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Chip
} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import PersonIcon from '@mui/icons-material/Person'
import StarIcon from '@mui/icons-material/Star'


const ScoreCard = ({current}) => {
  return (
    <>
      <hr/>
      <List className='scorecard'>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <StarIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary="Our Score"
                secondary={current.score}
                className='rating'
            >

            </ListItemText>
        </ListItem>
         <Divider variant='inset' component="li"/>
        
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <PersonIcon/>
                </Avatar>
            </ListItemAvatar>
            <div>
                { current.actor.map((item,index)=>(
                    <Chip
                        key={`${item+index}`}
                        item={item}
                        label={item}
                        clickable
                        color='primary'
                        className="chip"
                    />
                )) }
            </div>
        </ListItem>
        <Divider variant='inset' component="li"/>

        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <MovieIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary='Director'
                secondary={current.director}
            />
        </ListItem>
      </List>
    </>
  )
}

export default ScoreCard
