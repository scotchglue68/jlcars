import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material";

import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function ServiceCreateDialog(props: { itemId: any; setItemId?: any; onSave: Function, defaultFormData: any}) {
    const { itemId, setItemId, onSave, defaultFormData } = props;
    // const [editMode, setEditMode] = useState(itemId === "create");
    const [open, setOpen] = useState(false)
    useEffect(() => itemId ? setOpen(true) : setOpen(false), [props.itemId]);
    const [formData, setFormData] = useState(defaultFormData)

    const handleCancel = () => {
      setFormData(defaultFormData)
      setItemId('')
    }

    const handleSave = () => {
      const success = onSave(formData)
      success && setItemId('')
      setFormData(defaultFormData)
    }
    
    const handleChange = (e: { target: { id: any; value: any; }; }) => {
      const {target: {id, value}} = e
      setFormData({...formData, [id]: value})
      console.log(formData)
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
        <DialogContentText>
        Create a new Service
        </DialogContentText>
        </Grid>
        <Grid item xs={12}>
          <TextField disabled fullWidth id="vin" label="VIN" variant="filled" value={formData.vin} onChange={handleChange}/>    
        </Grid>
        <Grid item xs={12}>
           <TextField fullWidth id="name" label="Service Name" variant="filled" value={formData.name} onChange={handleChange}/>
         </Grid>

         <Grid item xs={3}>
           <TextField fullWidth id="price" label="Price" variant="filled" value={formData.price} onChange={handleChange}/>
         </Grid>
         <Grid item xs={3}>
           <TextField fullWidth id="hours" label="Hours" variant="filled" value={formData.hours} onChange={handleChange}/>
         </Grid>
         <Grid item xs={6}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date Serviced" defaultValue={dayjs(formData.date)}/>
          </LocalizationProvider>
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