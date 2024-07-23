import { useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useParams, useNavigate, } from "react-router-dom";
import { Table } from "../components";
import { serviceColumns } from "../models"
import { ServiceCreateDialog } from '../components'
import { VehicleCreateDialog } from '../components'
import { db } from '../models'
import { useLiveQuery } from 'dexie-react-hooks'
import { v4 as uuidv4 } from 'uuid';
import EditIcon from '@mui/icons-material/Edit';

export default function Vehicle() {
    const {vin} = useParams()
    const emptyFormDefault = {
        name: '',
        vin,
        date: (new Date).toISOString().split('T')[0],
        price: '',
        hours: '',
        notes: '',
    }
    const navigate = useNavigate();

    const [dialogId, setDialogId] = useState('')
    const [defaultFormData, setDefaultFormData] = useState(emptyFormDefault)
    const [showVehicleDialog, setShowVehicleDialog] = useState(false)

    const vehicle = useLiveQuery(() => db.table('vehicles').where('vin').equals(vin).first());
    let serviceRows = useLiveQuery(() => db.table('services').where('vin').equals(vin).toArray()) || [];

    const handleVehicleEdit = () => {
        setShowVehicleDialog(true)
    }
    const handleVehicleUpdate = (id: string, data: any) => {
        db.table('vehicles').update(id, data).then(function (updated) {
            if (updated) console.log ("Vehicle has been updated");
            else console.log (`No vehicle with id ${id}`);
          });
    }

    const handleVehicleDelete = async () => {
        db.transaction("rw", db.table('vehicles'), db.table('services'), () => {
            db.table('vehicles').where("vin").equals(vin).delete()
            db.table('services').where("vin").equals(vin).delete()
        }).then(() => {
            navigate('/customer')
        })
    }

    const handleDialogToggle = () => {
        setDialogId('create')
    }

    const handleServiceCreate = async (data: any) => {
        const { name, vin, date, price, hours, notes } = data;
        const serviceId = uuidv4().toString();
        db.table('services').add({serviceId, vin, name, date, price, hours, notes}).then((res) => {
            console.log(res)
            setDialogId('')
        });
        return false
    }
    const handleServiceEdit = async (id: string, data: any) => {
        db.table('services').update(id, data).then(function (updated) {
            if (updated){
              console.log ("Service has been updated");
            setDefaultFormData(emptyFormDefault)
            setDialogId('')
        }
            else
              console.log (`No service with id ${id}`);
          });
    }

    const handleServiceClick = async (e: { preventDefault: () => void; currentTarget: { getAttribute: (arg0: string) => any; }; }) => {
        e.preventDefault()
        const serviceId = e.currentTarget.getAttribute('itemid')
        db.table('services').where('serviceId').equals(serviceId).first().then((service) => {
            const { name, vin, date, price, hours, notes } = service;
            setDefaultFormData({ name, vin, date, price, hours, notes })
            setDialogId(serviceId)
        })

    }
    const onDelete = (serviceId: string) => {
        db.table('services').where('serviceId').equals(serviceId).delete().then((res) => {
            setDefaultFormData(emptyFormDefault)
            console.log(res)
            return true
        })

    }

    const onCancel = () => {
        setDialogId('')
        setDefaultFormData(emptyFormDefault)
    }

    const renderVehicleInfo = () => {
        if (!vehicle) return <p>Loading...</p>
        const {name, make, model, notes} = vehicle
        return         <Stack spacing={1}>
        <Typography variant={'h2'} >{`${name}'s ${make} ${model}`}
        <IconButton onClick={handleVehicleEdit}><EditIcon/></IconButton>

        </Typography>

        <Typography variant={'h4'} color={'gray'}>VIN: {vin}</Typography>
        {
            notes && <div> 
                <Typography variant={'h5'}>Notes:</Typography>
                <Typography variant={'body2'}>{notes}</Typography> 
                </div>
        }
        </Stack>
    }


    return (
    <Stack spacing={3}>
        {renderVehicleInfo()}
        <Box>
        <Button onClick={handleDialogToggle} sx={{float: 'right', marginBottom: 1}}>Create Service</Button>
        <Table rows={serviceRows} columns={serviceColumns} handleDoubleClick={handleServiceClick} primaryKey={'serviceId'}/>
        {   vehicle &&
            <VehicleCreateDialog
            mode='edit'
            itemId={vin}
            defaultFormData={vehicle}
            onEditSave={handleVehicleUpdate}
            show={showVehicleDialog}
            setShow={setShowVehicleDialog}
        />}
        <ServiceCreateDialog 
            itemId={dialogId} 
            defaultFormData={defaultFormData}
            onSave={handleServiceCreate}
            onCancel={onCancel}
            onDelete={onDelete}
            onEditSave={handleServiceEdit}
            />
        </Box>
        <Button variant={'outlined'} onClick={handleVehicleDelete} size='medium' sx={{color:'red', outlineColor: 'red'}}>Delete Vehicle</Button>

    </Stack>
    )
   }