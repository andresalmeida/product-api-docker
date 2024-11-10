import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Listar Productos', icon: <InventoryIcon />, path: '/products' },
    { text: 'Agregar Producto', icon: <AddCircleIcon />, path: '/create-product' },
    { text: 'Generar Informe', icon: <PictureAsPdfIcon />, path: '/generate-report' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#273A54',
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          padding: 2,
          textAlign: 'center',
          backgroundColor: '#9FEF04',
          color: '#000',
        }}
      >
        Inventario
      </Typography>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => navigate(item.path)}
            className={location.pathname === item.path ? 'active-menu-item' : ''}
            sx={{
              '& .MuiListItemText-root': { color: '#ffffff' }, // Cambiar color del texto
              '& .MuiListItemIcon-root': { color: '#ffffff' }, // Cambiar color del ícono
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
