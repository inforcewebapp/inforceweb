import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';



const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);


  const location = useLocation();
  const navigate = useNavigate();

  const handleAboutClick = () => {
    if (location.pathname === '/') {
      const section = document.getElementById('empresa');
      section?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: 'empresa' } });
    }
  };
  
  const isServicesPage = location.pathname === '/services';



  return (
    <header className={`fixed top-0 w-full z-50 shadow-md ${
      isServicesPage ? 'bg-[#2a3446] text-white' : 'bg-[#014fca] text-white'
    } h-[20vh] md:h-auto`}>
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={isServicesPage ? "/logo-azul.png" : "/logo.png"}
              alt="INFORCE SEGURIDAD"
              className="max-h-full h-auto w-auto object-contain"
            />
          </Link>

          {/* Menú desktop */}
          <div className="hidden md:flex space-x-10 text-sm font-light tracking-wide">
            <button onClick={handleAboutClick} className="hover:text-white/80">Sobre nosotros</button>
            <Link to="/services" className="hover:text-white/80">Servicios</Link>
            <Link to="/contact" className="hover:text-white/80">Contacto</Link>
          </div>

          {/* Menú mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navegación Mobile */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-4 text-sm">
            <button onClick={() => { handleAboutClick(); setIsOpen(false); }} className="hover:text-white/80 text-left">
              Sobre nosotros
            </button>
            <Link to="/services" className="hover:text-white/80">Servicios</Link>
            <Link to="/contact" className="hover:text-white/80">Contacto</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
