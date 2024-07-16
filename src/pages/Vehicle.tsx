import { useState } from "react";
import { Button, Typography } from "@mui/material";
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

    const vehicle = useLiveQuery(() => db.vehicles.where('vin').equals(vin).first()) || {};
    let serviceRows = useLiveQuery(() => db.services.where('vin').equals(vin).toArray()) || [];

    const handleDeleteVehicle = async () => {
        let res = await db.vehicles.where("vin").equals(vin).delete()
        console.log(res)
        res > 0 && navigate('/customer')
    }

    const handleDialogToggle = () => {
        setDialogId('create')
    }

    const handleServiceCreate = async (data: any) => {
        const { name, vin, date, price, hours, notes } = data;
        console.log(data)
        const id = await db.services.add({vin, name, date, price, hours, notes});
        console.log(id)
        return false
    }

    const handleServiceClick = (e: { preventDefault: () => void; currentTarget: { getAttribute: (arg0: string) => any; }; }) => {
        e.preventDefault()
        const serviceId = e.currentTarget.getAttribute('itemid')
        setDialogId(serviceId)
    }

    const {name, make, model} = vehicle

    return (
       <div>
                <Typography variant={'h1'} color={'gray'}>{vin}</Typography><Typography>{name}</Typography>
                <Typography>{make}</Typography>
                <Typography>{model}</Typography>
                <Typography variant={'h5'}>Notes:</Typography>
                <Typography variant={'body2'}> the notes go here the notes</Typography>

                <Typography variant={'h2'}>Services</Typography>
                <Button onClick={handleDialogToggle}>Create Service</Button>
                <Table rows={serviceRows} columns={serviceColumns} handleDoubleClick={handleServiceClick}/>
                <ServiceCreateDialog 
                    itemId={dialogId} 
                    setItemId={setDialogId} 
                    onSave={handleServiceCreate}
                    defaultFormData={{
                        name: '',
                        vin,
                        date: '',
                        price: '',
                        hours: '',
                        notes: '',
                    }}
                    />
                <Button onClick={handleDeleteVehicle}>Delete Vehicle</Button>
       </div>
    )
   }