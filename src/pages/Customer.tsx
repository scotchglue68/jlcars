import { Button } from '@mui/material'
import {Table} from '../components'
import {vehicleColumns} from '../models'
import { useState } from 'react'
import { VehicleCreateDialog } from '../components'
import { db } from '../models'
import { useLiveQuery } from 'dexie-react-hooks'
import { useParams, useNavigate, } from "react-router-dom";


export default function Customer() {
    const navigate = useNavigate();

    const [dialogId, setDialogId] = useState('')
    let vehicleRows = useLiveQuery(() => db.vehicles.toArray()) || [];

    const handleDialogToggle = () => {
        setDialogId('create')
    }

    const handleVehicleCreate = async (data: {vin: string, name: string, make: string, model: string}) => {
        const { vin, name, make, model } = data;
        const id = await db.vehicles.add({vin, name, make, model});
        console.log(id)
        return false
    }

    const handleServiceClick = (e: { preventDefault: () => void; currentTarget: { getAttribute: (arg0: string) => any } }) => {
        e.preventDefault()
        const vinid = e.currentTarget.getAttribute('itemid')
        navigate(`/vehicle/${vinid}`)
    }


    return (
        <div>
            <h1>Vehicles</h1>
            <Button onClick={handleDialogToggle}>Add Vehicle</Button>
            <Table rows={vehicleRows} columns={vehicleColumns} handleDoubleClick={handleServiceClick}/>
            <VehicleCreateDialog itemId={dialogId} setItemId={setDialogId} onSave={handleVehicleCreate}/>
        </div>

    )

}