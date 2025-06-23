import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Items from './pages/Items';
import Categories from './pages/Categories';
import Login from './pages/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;