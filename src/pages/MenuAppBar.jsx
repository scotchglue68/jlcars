import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import {
    useNavigate,
    Outlet
  } from 'react-router-dom';
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
      // const data = [...vehicles, ...services]
      const vehiclesCsv = csvmaker(vehicles)
      download(vehiclesCsv)
      const servicesCsv = csvmaker(vehicles)
      download(servicesCsv)
      // console.log('export!!!')
      // console.log(data)
    }
    return (
      <>
      <Box sx={{ flexGrow: 1 }}>
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
            <Button variant='standard' endIcon={<FileDownloadIcon />} onClick={handleExportClick}>
              Export to csv
            </Button> 
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{paddingTop: 5}}>
      <Outlet />
      </Container>
      </>

    );
  }