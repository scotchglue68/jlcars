import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography, Tooltip } from '@mui/material'
import { useNavigate, Outlet } from 'react-router-dom';
import CottageIcon from '@mui/icons-material/Cottage';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { db } from '../models'
import { download, csvmaker } from '../services/utils';


export default function MenuAppBar() {

    const navigate = useNavigate();
  
    const handleHomeClick = () => { navigate('/customer') }

    const handleExportClick = async () => {
      const vehicles = await db.vehicles.toArray()
      const services = await db.services.toArray()

      const vehiclesCsv = csvmaker(vehicles)
      download(vehiclesCsv, 'vehicles_backup.csv')

      const servicesCsv = csvmaker(services)
      download(servicesCsv, 'services_backup.csv')
    }


    const renderCleanDatabase = () => {
      return <Tooltip title="This is mostly for debugging and if your data is causing you issues. DO NOT USE BEFORE BACKING UP IMPORTANT DATA. Double click to wipe your databases.">
          <Button onDoubleClick={()=> {
            db.delete()
            navigate('/customer') 
            location.reload()
            }}>Clean Database</Button>
        </Tooltip>
    }
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleHomeClick}
            >
              <CottageIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              JLCars
            </Typography>
            {renderCleanDatabase()}
            <Button variant='standard' endIcon={<FileDownloadIcon />} onClick={handleExportClick}>
              Export to csv
            </Button> 
          </Toolbar>
        </AppBar>
      <Container sx={{paddingTop: 5, paddingBottom: 5}}>
      <Outlet />
      </Container>
      </>

    );
  }