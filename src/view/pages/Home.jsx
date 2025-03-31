import React, { useEffect } from 'react';
import CardsList from '../components/cardList';

export default function Home() {
  const openCalendly = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    window.Calendly.initPopupWidget({ url: 'https://calendly.com/dluis-valdivia/30min' });
  };

  // Added functionality to close Calendly because 'Esc' doesn't natively work.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {

        window.Calendly.closePopupWidget();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (

    <div className='container'>

      <div className='row mt-3 mb-2'>
        <div className='col col-md-12 text-center'>
          <h1 className='heading1'>Danny Valdivia</h1>
          <h2>Full Stack Developer</h2>
        </div>
      </div>

      <div className='row justify-content-center'>
        <div className='col col-md-8 mb-3'>
          <p>Frontend Developer dedicated to crafting <b>intuitive</b>, <strong>accessible</strong>, and <b>WCAG</b>-compliant web applications. I simplify complex systems to enhance user experience, ensuring technology is inclusive for all. Passionate about staying ahead of industry trends, I design interfaces that are both functional and user-friendly.</p>
        </div>
      </div>

      <div className='row text-start'>
        <h2>Projects</h2>
        <CardsList />
      </div>

      <div className='row text-start'>
        <h2>Contact</h2>

        <a href="#" onClick={openCalendly}>Schedule time with me</a>

      </div>

    </div>
  );
}