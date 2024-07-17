import { useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useParams, useNavigate, } from "react-router-dom";
import { Table } from "../components";
import { serviceColumns } from "../models"
import { ServiceCreateDialog } from '../components'
import { db } from '../models'
import { useLiveQuery } from 'dexie-react-hooks'

export default function Vehicle() {
    const navigate = useNavigate();

    const {vin} = useParams()
    const [dialogId, setDialogId] = useState('')

    const vehicle = useLiveQuery(() => db.table('vehicles').where('vin').equals(vin).first()) || {};
    let serviceRows = useLiveQuery(() => db.table('services').where('vin').equals(vin).toArray()) || [];

    const handleDeleteVehicle = async () => {
        let res = await db.table('vehicles').where("vin").equals(vin).delete()
        let res2 = await db.table('services').where("vin").equals(vin).delete()
        console.log('DELETING')
        console.log(res)
        console.log(res2)
        navigate('/customer')
    }

    const handleDialogToggle = () => {
        setDialogId('create')
    }

    const handleServiceCreate = async (data: any) => {
        const { name, vin, date, price, hours, notes } = data;
        console.log(data)
        const id = await db.table('services').add({vin, name, date, price, hours, notes});
        console.log(id)
        return false
    }

    const handleServiceClick = (e: { preventDefault: () => void; currentTarget: { getAttribute: (arg0: string) => any; }; }) => {
        e.preventDefault()
        const serviceId = e.currentTarget.getAttribute('itemid')
        setDialogId(serviceId)
    }

    const {name, make, model, notes} = vehicle

    return (
    <Stack spacing={3}>
        <Typography variant={'h2'} >{`${name}'s ${make} ${model}`}</Typography>
        <Typography variant={'h4'} color={'gray'}>VIN: {vin}</Typography>
        {
            notes && <div> 
                <Typography variant={'h5'}>Notes:</Typography>
                <Typography variant={'body2'}>{notes}</Typography> 
                </div>
        }

        <Box>
        <Button onClick={handleDialogToggle} sx={{float: 'right', marginBottom: 1}}>Create Service</Button>
        <Table rows={serviceRows} columns={serviceColumns} handleDoubleClick={handleServiceClick}/>
        <ServiceCreateDialog 
            itemId={dialogId} 
            setItemId={setDialogId} 
            onSave={handleServiceCreate}
            defaultFormData={{
                name: '',
                vin,
                date: (new Date).toISOString().split('T')[0],
                price: '',
                hours: '',
                notes: '',
            }}
            />
        </Box>
        <Button variant={'outlined'} onClick={handleDeleteVehicle} size='medium' sx={{color:'red', outlineColor: 'red'}}>Delete Vehicle</Button>

    </Stack>
    )
   }