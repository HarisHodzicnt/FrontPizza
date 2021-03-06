import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,

  },
});

export default function Pizza(props) {
  const classes = useStyles();

  console.log(props.image)
  return (
    <Card className="image" style={{background:'rgba(170, 155, 155,0.5)', margin:'0px 2px 10px 10px'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          style={{maxHeight:'200px'}}
          image={props.image}
          title={props.item?.Name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.item?.Name}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
          {props.item?.Material}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
              {
                  props.admin ? <div>
                      <Button size="small" color="primary" style={{ margin: '0 auto' }} onClick={() => props.delete(props.itemId)}>
                          Delete
                                  </Button>
                      <Button size="small" color="primary" style={{ margin: '0 auto' }} onClick={() => props.edit(props.itemId)}>
                          Edit
                            </Button>
                  </div> :
                      <div style={{margin:'0 auto'}}>
                          <Button size="small" color="primary" style={{ padding:'10px 30px', background: 'rgba(169,169,169,0.4)'}} onClick={()=>props.setPizza(props.item)}>
                                    Select
                          </Button>
                
                        </div> 
                       
        }
        
      </CardActions>
    </Card>
  );
}