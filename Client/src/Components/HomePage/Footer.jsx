

import React from 'react';
import mountainLine from '../../assets/mountain_line.svg'


import emailicon from '../../assets/mountain_line.svg'
import whatsapp from '../../assets/whatsapp-svgrepo-com.svg'
import instagram from '../../assets/instagram-svgrepo-com.svg'


function Footer() {
  return (
    <>
      {/* Image Section */}
      <img 
        src={mountainLine} 
        className="w-full object-cover object-center" 
        alt="Mountain Line Art" 
      />

      {/* Title Section */}
      <div className="pt-24 pb-12 px-8 w-full bg-slate-800">
        <p 
          data-visible="false"
          className="fade-in scale-in duration-[2s] ease-in-out text-5xl text-white [letter-spacing:8px] drop-shadow-xl font-archivo text-center md:[letter-spacing:16px] md:text-6xl"
        >
          <span className="text-brand">ADVENTURE</span> <span>AWAITS</span>
        </p>
      </div>

      {/* Contact Section */}
      <section id="contact" className="w-full bg-slate-800 pb-48">
        <div
          data-visible="false"
          className="fade-in duration-[2s] ease-in-out max-w-screen-lg w-full mx-auto px-8 text-white flex flex-row flex-wrap justify-evenly items-center text-2xl gap-4 font-medium"
        >
          {/* Email Contact */}
          <div className="flex flex-row items-center gap-3 w-max">
            <img 
              src={emailicon} 
              className="w-8" 
              alt="Email Icon" 
            />
            <a href="mailto:langtangoutdoorinitiative@gmail.com">
              langtangoutdoorinitiative@gmail.com
            </a>
          </div>

          {/* WhatsApp Contact */}
          <div className="flex flex-row items-center gap-3 w-max">

            <img 
              src={whatsapp}
              className="w-8" 
              alt="WhatsApp Icon" 
            />
            <a href="tel:+000000000000">
              +000000000000
            </a>
          </div>

          {/* Instagram Contact */}
          <div className="flex flex-row items-center gap-3 w-max">
            <img 
              src={instagram} 
              className="w-8" 
              alt="Instagram Icon" 
            />
            <a href="https://www.instagram.com/langtang_outdoor_initiative/" target="_blank" rel="noopener noreferrer">
              @langtangoutdoorinitiative
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;

