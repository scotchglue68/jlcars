interface Vehicle {
    name: string;
    vin: string;
    make: string;
    model: string;
    notes: string;
  }
  
  function createVehicle(
    name: string,
    vin: string,
    make: string,
    model: string,
    notes: string
  ): Vehicle {
    return { name, vin, make, model, notes};
  }

interface Column {
    id: 'vin' | 'name' | 'make' | 'model' | 'notes';
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
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'model',
      label: 'Model',
      minWidth: 170,
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'notes',
      label: 'Notes',
      minWidth: 170,
    },
  ];


  export {
    columns, createVehicle
  }