import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Card, CardActionArea, CardActions, CardContent, Button, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    height: 300,
  },
  avatar: {
    borderRadius: '50%',
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  }
}))

export default function DeputadoCard({ id, email, nome, siglaPartido, siglaUf, setDeputadoId, urlFoto }) {

  const classes = useStyles()

  return (
    <Card elevation={3} className={classes.root}>
      <CardActionArea>
        <CardContent>
          <div className={classes.center}>
            <Avatar alt={nome} src={urlFoto} className={classes.avatar} />
          </div>
          <Typography gutterBottom variant="h6" component="p">{nome}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Partido: {siglaPartido}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Estado: {siglaUf}</Typography>
          <Typography variant="body2" color="textSecondary" component="a" href={`mailto:${email}`}>E-mail</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="outlined" size="small" color="primary" onClick={() => setDeputadoId(id)}>Cota parlamentar</Button>
      </CardActions>
    </Card>
  )
}
