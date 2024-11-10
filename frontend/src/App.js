import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CreateProduct from './components/CreateProduct';
import Products from './components/Products';
import GenerateReport from './components/GenerateReport';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: '240px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/products" element={<Products />} />
            <Route path="/generate-report" element={<GenerateReport />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
