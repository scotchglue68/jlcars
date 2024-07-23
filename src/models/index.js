import { columns as serviceColumns, createService } from './service'
import { columns as vehicleColumns, createVehicle } from './vehicle'
import Dexie from 'dexie';

const db = new Dexie('CarsDatabase');
db.version(1).stores({
    vehicles: '++vin, name, make, model, notes',
    services: '++serviceId, name, vin, date, price, hours, notes'
});
  


export {
    serviceColumns,
    vehicleColumns,
    createVehicle,
    createService,
    db
}