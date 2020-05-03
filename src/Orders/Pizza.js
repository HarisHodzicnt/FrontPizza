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
          title={props.Name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.image?.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
          {props.image?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
        {
          props.admin ?  <div>
                          <Button size="small" color="primary" style={{margin:'0 auto'}} onClick={()=>props.delete(props.itemId)}>
                                    Delete
                                  </Button>
                            <Button size="small" color="primary" style={{margin:'0 auto'}} onClick={()=>props.edit(props.itemId)}>
                                    Edit
                            </Button>
                          </div>   :
                          <div>
                          <Button size="small" color="primary" style={{margin:'0 auto'}} onClick={()=>props.setPizza(props.item)}>
                                    Select
                                  </Button>
                                  <Button size="small" color="primary" style={{margin:'0 auto'}} onClick={()=>props.addToCheckOut(props.item)}>
                                    Add to Checkout
                                  </Button>
                        </div> 
                       
        }
        
      </CardActions>
    </Card>
  );
}