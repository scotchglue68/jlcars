interface Service {
    serviceId: string;
    name: string;
    vin: string;
    date: string;
    price: number;
    hours: number;
    notes: string;
  }

  interface Column {
    id: 'serviceId' | 'name' | 'vin' | 'date' | 'price' | 'hours' | 'notes';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    // { id: 'serviceId', label: 'Service ID', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'price', label: 'Price', minWidth: 100 },
    { id: 'hours', label: 'Hours', minWidth: 100, },
    { id: 'notes', label: 'Notes', minWidth: 200, },
  ];

  function createService(
    serviceId: string,
    name: string,
    vin: string,
    date: string,
    price: number,
    hours: number,
    notes: string,
  ): Service {
    return { serviceId, name, vin, date, price, hours, notes};
  }

  export {
    columns,
    createService
  }
