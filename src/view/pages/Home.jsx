import React, { useEffect, useState } from 'react';
import CardsList from '../components/cardList';
import linkedinIcon from '../../assets/linkedin.svg';
import githubLight from '../../assets/github-light.svg';
import githubDark from '../../assets/github-dark.svg';
import calendlyIcon from '../../assets/calendly.svg';

export default function Home() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute('data-theme') || 'light'
  );

  const openCalendly = (e) => {
    e.preventDefault();
    window.Calendly.initPopupWidget({
      url: 'https://calendly.com/dluis-valdivia/30min',
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        window.Calendly.closePopupWidget();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const githubIcon = theme === 'dark' ? githubDark : githubLight;

  return (
    <div className='container'>

      <div className='row mt-3 mb-2'>
        <div className='col-md-12 col-sm-6 text-center'>
          <h1>Danny Valdivia</h1>
          <h2>Full Stack Developer</h2>
        </div>
      </div>

      <div className='row justify-content-center'>
        <div className='col col-md-8 mb-3'>
          <p>
            Frontend Developer dedicated to crafting <b>intuitive</b>,{' '}
            <strong>accessible</strong>, and <b>WCAG</b>-compliant web applications.
            I simplify complex systems to enhance user experience, ensuring technology
            is inclusive for all. Passionate about staying ahead of industry trends,
            I design interfaces that are both functional and user-friendly.
          </p>
        </div>
      </div>

      <div className='row text-start mt-3'>
        <h2 id="projects">Projects</h2>
        <CardsList />
      </div>

      <div className='row text-start mt-3'>
        <h2 id="contact">Contact me</h2>

        <a
          href='https://www.linkedin.com/in/dannyvaldivia/'
          target='blank'
          aria-label="new-tab-link to danny's linkedin"
        >
          <img className='custom-icons' src={linkedinIcon} alt='Linkedin Icon' />
        </a>

        <a href='https://github.com/dluisvaldivia'
        target='blank'
          aria-label="new-tab-link to danny's Github"
        ><img src={githubIcon} alt='github icon' className='custom-icons' /></a>

        <a
          href='https://calendly.com/dluis-valdivia/30min'
          target='blank'
          aria-label="new-tab-link to danny's calendly">
          <img src={calendlyIcon} alt='Calendly icon' className='custom-icons' />
        </a>
      </div>
    </div>
  );
}
