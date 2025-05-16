import React from 'react';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/543516424117"
      target="_blank"
      rel="noopener noreferrer"

      className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50 overflow-hidden"
    >
      <img 
        src="logos/wpp.png" 
        alt="WhatsApp"
        className="w-full h-full object-cover"
      />
    </a>
  );
};

export default WhatsAppButton;

