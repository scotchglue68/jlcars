interface Service {
    name: string;
    vin: string;
    date: string;
    price: number;
    hours: number;
    notes: string;
  }

  interface Column {
    id: 'name' | 'vin' | 'date' | 'price' | 'hours' | 'notes';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'vin', label: 'VIN', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'price', label: 'Price', minWidth: 170 },
    { id: 'hours', label: 'Hours', minWidth: 170, },
    { id: 'notes', label: 'Notes', minWidth: 170, },
  ];

  function createService(
    name: string,
    vin: string,
    date: string,
    price: number,
    hours: number,
    notes: string,
  ): Service {
    return { name, vin, date, price, hours, notes};
  }

  export {
    columns,
    createService
  }
