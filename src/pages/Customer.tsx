import { Button } from '@mui/material'
import {Table} from '../components'
import {vehicleColumns} from '../models'
import { useState } from 'react'
import { VehicleCreateDialog } from '../components'
import { db } from '../models'
import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate } from "react-router-dom";


export default function Customer() {
    const navigate = useNavigate();
    const emptyVehicleForm = {
        vin: '',
        name: '',
        make: '',
        model: '',
        notes: '',
    }

    const [showVehicleDialog, setShowVehicleDialog] = useState(false)

    let vehicleRows = useLiveQuery(() => db.table('vehicles').toArray()) || [];

    const handleDialogToggle = () => {
        setShowVehicleDialog(true)
    }

    const handleVehicleCreate = async (data: {vin: string, name: string, make: string, model: string, notes: string}) => {
        const { vin, name, make, model, notes } = data;
        const id = await db.table('vehicles').add({vin, name, make, model, notes});
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
            <Button onClick={handleDialogToggle} sx={{float: 'right', marginBottom: 1}}>Add Vehicle</Button>
            <Table rows={vehicleRows} columns={vehicleColumns} handleDoubleClick={handleServiceClick} primaryKey={'vin'}/>
            <VehicleCreateDialog 
                itemId='create' 
                mode='create'
                onSave={handleVehicleCreate}
                show={showVehicleDialog}
                setShow={setShowVehicleDialog}
                defaultFormData={emptyVehicleForm}
                />
        </div>

    )

}