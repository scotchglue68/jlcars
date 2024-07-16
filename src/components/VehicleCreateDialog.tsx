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
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <Grid container spacing={2} display='flex'>
            <Grid item>
              <TextField id="vin" label="VIN" variant="standard" value={formData.vin} onChange={handleChange}/>    
            </Grid>
            <Grid item>
              <TextField id="name" label="Name" variant="standard" value={formData.name} onChange={handleChange}/>
            </Grid>
            <Grid item>
              <TextField id="make" label="Make" variant="standard" value={formData.make}onChange={handleChange}/>
            </Grid>
            <Grid item>
              <TextField id="model" label="Model" variant="standard" value={formData.model} onChange={handleChange}/>
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