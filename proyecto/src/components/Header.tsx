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
    <header className={`fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 ${
      isServicesPage 
        ? 'bg-gradient-to-r from-[#2a3446] via-[#2a3446] to-[#1e2936] shadow-2xl' 
        : 'bg-gradient-to-r from-[#014fca] via-[#0056d6] to-[#003db3] shadow-2xl'
    } h-[15vh] md:h-auto`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={isServicesPage ? "/logo-azul.png" : "/logo.png"}
              alt="INFORCE SEGURIDAD"
              className="max-h-[10vh] md:max-h-20 w-auto object-contain mx-auto transition-all duration-300 hover:scale-105 drop-shadow-lg"
            />
          </Link>

          {/* Menú desktop */}
          <div className="hidden md:flex space-x-12 text-base font-medium tracking-wider">
            <button 
              onClick={handleAboutClick} 
              className="relative px-4 py-2 uppercase transition-all duration-300    group"
            >
              <span className="relative z-10">Sobre nosotros</span>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </button>
            <Link 
              to="/services" 
              className="relative px-4 py-2 uppercase transition-all duration-300    group"
            >
              <span className="relative z-10">Servicios</span>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
            <Link 
              to="/contact" 
              className="relative px-4 py-2 uppercase transition-all duration-300    group"
            >
              <span className="relative z-10">Contacto</span>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          </div>

          {/* Menú mobile */}
          <button
            className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105 border border-transparent hover:border-white/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Navegación Mobile */}
        {isOpen && (
        <div
          className={`absolute top-full left-0 w-full z-40 backdrop-blur-md border-t border-white/10 ${
            isServicesPage 
              ? 'bg-gradient-to-b from-[#2a3446]/95 to-[#1e2936]/95' 
              : 'bg-gradient-to-b from-[#014fca]/95 to-[#003db3]/95'
          } shadow-2xl`}
        >
          <div className="flex flex-col space-y-2 p-4">
            <button
              onClick={() => { handleAboutClick(); setIsOpen(false); }}
              className="text-left px-4 py-3 text-base font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white/10 rounded-lg hover:scale-105 border border-transparent hover:border-white/20"
            >
              Sobre nosotros
            </button>
            <Link 
              to="/services" 
              className="px-4 py-3 text-base font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white/10 rounded-lg hover:scale-105 border border-transparent hover:border-white/20"
              onClick={() => setIsOpen(false)}
            >
              Servicios
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-3 text-base font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white/10 rounded-lg hover:scale-105 border border-transparent hover:border-white/20"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}

      </nav>
    </header>
  );
};

export default Header;
