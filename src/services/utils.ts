// Function to download the CSV file
const download = (data: string) => {
    // Create a Blob with the CSV data and type
    const blob = new Blob([data], { type: 'text/csv' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create an anchor tag for downloading
    const a = document.createElement('a');
    
    // Set the URL and download attribute of the anchor tag
    a.href = url;
    a.download = 'download.csv';
    
    // Trigger the download by clicking the anchor tag
    a.click();
}

// Function to create a CSV string from an object
const csvmaker = (data: Array<any>) => {
    const headers = Object.keys(data[0]);
    const csvString = data.reduce((prev, rowItem) =>  prev + '\n' + Object.values(rowItem).join(','), headers.join(','))
    return csvString
}

export {
    download,
    csvmaker
}