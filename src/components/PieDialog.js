import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import PieChart from './PieChart'

export default function PieDialog({ gastos, isPlot, setIsPlot, escolhido }) {

    return (
        <div>
            <Dialog
                fullScreen={true}
                open={isPlot}
                onClose={() => setIsPlot(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogTitle id="alert-dialog-title">
                    {escolhido.nome} ({escolhido.siglaUf}) - {escolhido.siglaPartido}
                </DialogTitle>

                <DialogContent>
                    <PieChart gastos={gastos} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setIsPlot(false)} color="primary">
                        <CloseIcon /> Fechar
                    </Button>
                </DialogActions>

            </Dialog>
        </div >
    );
}