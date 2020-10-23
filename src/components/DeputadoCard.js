import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 200,
  },
})

export default function DeputadoCard({ id, nome, siglaPartido, siglaUf, setDeputadoId }) {

  const classes = useStyles()

  return (
    <Card elevation={3} className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">{nome}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Partido: {siglaPartido}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Estado: {siglaUf}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="outlined" size="small" color="primary" onClick={()=>setDeputadoId(id)}>Cota parlamentar</Button>
      </CardActions>
    </Card>
  )
}
