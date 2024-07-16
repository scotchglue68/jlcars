import { columns as serviceColumns, createService } from './service'
import { columns as vehicleColumns, createVehicle } from './vehicle'
import Dexie from 'dexie';

const db = new Dexie('CarsDatabase');
db.version(1).stores({
    vehicles: '++vin, name, make, model',
    services: '++id, name, vin, date, price, hours, notes'
});
  


export {
    serviceRows,
    serviceColumns,
    vehicleRows,
    vehicleColumns,
    createVehicle,
    createService,
    db
}