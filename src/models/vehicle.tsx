interface Vehicle {
    name: string;
    vin: string;
    make: string;
    model: string;
  }
  
  function createVehicle(
    name: string,
    vin: string,
    make: string,
    model: string,
  ): Vehicle {
    return { name, vin, make, model};
  }

interface Column {
    id: 'vin' | 'name' | 'make' | 'model';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'vin', label: 'VIN', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    {
      id: 'make',
      label: 'Make',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'model',
      label: 'Model',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
  ];


  export {
    columns, createVehicle
  }