import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField, IconButton, DialogTitle, Stack } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';

export default function ServiceCreateDialog(props: any) {
    const { itemId, onSave, defaultFormData, onCancel, onDelete, onEditSave } = props;
    const [mode, setMode] = useState('view')
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState(defaultFormData)

    useEffect(() => {
      if(itemId) {
        setFormData(defaultFormData)
        setOpen(true)
        itemId === 'create' && setMode('create')
      }
      else{ setOpen(false)}
    },[props.itemId]);

    const handleChange = (e: { target: { id: any; value: any; }; }) => {
      const {target: {id, value}} = e
      setFormData({...formData, [id]: value})
      console.log(formData)
    }

    const resetForm = () => {
      setMode('view')
      setOpen(false) 
    }
    const handleCancel = () => {
      onCancel()
      resetForm()
    }

    const handleSave = () => {
      if (mode === 'edit') {onEditSave(itemId, formData)}
      else if (mode === 'create') {onSave(formData)}
      resetForm()
    }

    const handleEditClick = () => setMode('edit')

    const handleDeleteService = () => {
      onDelete(itemId)
      resetForm()
    }

    const renderDialogActions = () => {
      return <Stack height={30} direction='row' spacing={1}>
      {mode === 'view' && <IconButton sx={{ float:'left', mr: 2 }} onClick={handleEditClick}><EditIcon /></IconButton>}
      {mode === 'edit' && <IconButton sx={{ float:'left', mr: 2 }} onClick={handleDeleteService}><DeleteIcon/></IconButton>}
      {mode !== 'view' &&  <Button autoFocus onClick={handleCancel}>Cancel</Button>}
      {mode !== 'view' && <Button onClick={handleSave}>Save</Button> }
      </Stack>
    }

    return (
        <Dialog
         aria-labelledby="draggable-dialog-title" open={open}      >
     <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {mode ==='create' && "Create a new Service"}
        <CloseIcon sx={{float:'right'}} onClick={handleCancel}/>
     </DialogTitle>
     <DialogContent>
       <Grid container spacing={2} display='flex'>
        
        <Grid item xs={12}>
          <TextField disabled fullWidth id="vin" label="VIN" variant="filled" value={formData.vin} onChange={handleChange}/>    
        </Grid>
        <Grid item xs={12}>
           <TextField disabled={mode === 'view'} fullWidth id="name" label="Service Name" variant="filled" value={formData.name} onChange={handleChange}/>
         </Grid>

         <Grid item xs={3}>
           <TextField disabled={mode === 'view'} fullWidth id="price" label="Price" variant="filled" value={formData.price} onChange={handleChange}/>
         </Grid>
         <Grid item xs={3}>
           <TextField disabled={mode === 'view'} fullWidth id="hours" label="Hours" variant="filled" value={formData.hours} onChange={handleChange}/>
         </Grid>
         <Grid item xs={6}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker disabled={mode === 'view'} label="Date Serviced" defaultValue={dayjs(formData.date)} onChange={(e) => setFormData({...formData, date: e.toISOString().split('T')[0]})}/>
          </LocalizationProvider>
         </Grid>
         <Grid item xs={12}>
           <TextField disabled={mode === 'view'} fullWidth id="notes" label="Notes" variant="filled" value={formData.notes} onChange={handleChange} multiline rows={4}/>
         </Grid>
       </Grid>
     </DialogContent>
          <DialogActions>
            {renderDialogActions()}
        </DialogActions>
   </Dialog>
 )
   }