import { animals } from './animals';
import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app')
const root = createRoot(container)
const title = ''
const background = <img className="background" alt="ocean" src='/images/ocean.jpg' />
const showBackground = true

const images = []
for (const animal in animals) {
  images.push(<img key={animal} className='animal' alt={animal} src={animals[animal].image} aria-label={animal} role='button' onClick={displayFact}/>)
}

function displayFact(e) {
  const animal = e.target.alt;
  const facts = animals[animal].facts;
  const randomIndex = Math.floor(Math.random() * facts.length);
  const funFact = facts[randomIndex];
  // console.log(funFact);
  document.getElementById('fact').innerHTML = funFact
}

const animalFacts = (
  <div>
    <h1>{title === '' ? `Click an animal for a fun fact`: title}</h1>
    {showBackground && background}
    <p id="fact"></p>
    <div className='animals'>{images}</div>
  </div>
)

root.render(animalFacts)
