import Navbar from './NavBar'; 
import Footer from './Footer'; 
import { Outlet } from 'react-router-dom';
import '../../App.css';

const Layout = () => {
  return (
    <div className='root-element'>
      <Navbar />
      <main>
        <Outlet /> 
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
