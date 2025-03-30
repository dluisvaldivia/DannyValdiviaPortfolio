import React from 'react';

export default function Home() {
  return (

    <div className='container'>
      <div className='row text-center'>
        <div className='col col-md-12 justify-align-center'>
          <h1 className='heading1'>Danny Valdivia</h1>
          <h2>Full Stack Developer</h2>
        </div>

        <div className='row text-center'>
          <h2>Technologies</h2>
        </div>

        <div className='col col-md-12'>
          <div className='icon-block'>
            <img className='tech-icons' src='src/assets/html-logo.png' alt='HTML5 icon' />
            <span>HTML5</span>
          </div>

          <div className='icon-block'>
            <img className='tech-icons' src='src/assets/css-logo.png' alt='CSS3 icon' />
            <span>CSS3</span>
          </div>

          <div className='icon-block'>
            <img className='tech-icons' src='src/assets/javascript-logo.png' alt='Javascript icon' />
            <span>JavaScript</span>
          </div>

        </div>
      </div>

      <div className='row text-start'>
        <h2>My Bookmarks</h2>
      </div>
    </div>
  );
}