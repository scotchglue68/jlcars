import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material";
import { useEffect, useState } from "react";


export default function VehicleCreateDialog(props: { itemId: any; setItemId?: any; onSave: Function}) {
    const { itemId, setItemId, onSave } = props;
    // const [editMode, setEditMode] = useState(itemId === "create");
    const [open, setOpen] = useState(false)
    useEffect(() => itemId ? setOpen(true) : setOpen(false), [props.itemId]);
    const [formData, setFormData] = useState({
      vin: '',
      name: '',
      make: '',
      model: '',
      notes: '',
    })

    const handleCancel = () => {
        setItemId('')
    }

    const handleSave = () => {
      const success = onSave(formData)
      success && setItemId('')
    }
    
    const handleChange = (e: { target: { id: any; value: any; }; }) => {
      const {target: {id, value}} = e
      setFormData({...formData, [id]: value})
    }

    // const renderEditMode = () => {
    // }

    // const renderViewMode = () => {
    // }


    return (
           <Dialog
            aria-labelledby="draggable-dialog-title" open={open}      >
        {/* <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle> */}
        <DialogContent>
          <Grid container spacing={2} display='flex'>
          <Grid item xs={12}>
              <DialogContentText>Create new Vehicle</DialogContentText>  
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="vin" label="VIN" variant="filled" value={formData.vin} onChange={handleChange}/>    
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="name" label="Name" variant="filled" value={formData.name} onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="make" label="Make" variant="filled" value={formData.make}onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="model" label="Model" variant="filled" value={formData.model} onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="notes" label="Notes" variant="filled" value={formData.notes} onChange={handleChange} multiline rows={4}/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    )
   }