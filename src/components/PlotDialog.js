import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import PlotChart from './PlotChart'
import SelectComponent from './SelectComponent'

export default function PieDialog({ gastos, isPlot, setIsPlot, escolhido }) {

    const [plotType, setPlotType] = useState('Pizza')

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
                    <PlotChart gastos={gastos} plotType={plotType} />
                </DialogContent>

                <DialogActions>
                    <SelectComponent label='Gráfico' menuItems={['Pizza', 'Barras']} value={plotType} setOnChange={setPlotType} />
                    <Button onClick={() => setIsPlot(false)} color="primary">
                        <CloseIcon /> Fechar
                    </Button>
                </DialogActions>

            </Dialog>
        </div >
    );
}