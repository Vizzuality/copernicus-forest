import React, { useState, useEffect } from 'react';
import './styles.scss';

import Expand from 'components/expand';

function ChooseCountry() {
  return (
    <div className="c-choose-country">
      <button>Canada</button>
      <button>Indonesia</button>
      <button>Sweden</button>
      <button>Peru</button>
      <button>Tanzania</button>
    </div>
  );
}

function HomePage() {
  const sections = [
    {
      title: 'See species distribution.',
      body:
        'Our i whales Dry place replenish darkness had fifth very subdue in midst behold face two. That winged evening fourth.'
    },
    {
      title: 'See bioclimatic variables.',
      body:
        'Our i whales Dry place replenish darkness had fifth very subdue in midst behold face two. That winged evening fourth.'
    }
  ];
  const [sectionIndex, setSection] = useState(0);
  const [transition, setTransition] = useState('fade-in');
  const section = sections[sectionIndex];

  const changeSection = next => {
    setTransition('fade-out');
    setTimeout(() => setSection(next), 200);
    setTimeout(() => setTransition('fade-in'), 300);
  };

  useEffect(() => {
    const nextSection = sectionIndex === 0 ? 1 : 0;
    const timer = setTimeout(() => {
      changeSection(nextSection);
    }, 5000);
    return () => clearTimeout(timer);
  }, [sectionIndex]);

  return (
    <div className="c-home">
      <div className={`section ${transition}`} key={section.title}>
        <h1>{section.title}</h1>
        <p>{section.body}</p>
      </div>
      <div className="sidebar">
        {sections.map((s, i) => (
          <button className="dot" key={s.title} onClick={() => changeSection(i)}>
            •
          </button>
        ))}
      </div>
      <Expand content={<ChooseCountry />} />
    </div>
  );
}

export default HomePage;
