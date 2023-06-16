import { useState, useEffect } from 'react'
import './App.css'
import dice from './images/icon-dice.svg'
import divider from './images/pattern-divider-desktop.svg'
import divider_mobile from './images/pattern-divider-mobile.svg'

export default function App() {
  const [adviceNum, setAdviceNum] = useState('')
  const [advice, setAdvice] = useState('')
  const [isMobile, setIsMobile] = useState(false);

  const Generator = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://api.adviceslip.com/advice", requestOptions)
      .then(response => response.json())
      .then(result => {
        setAdviceNum(result.slip.id)
        setAdvice(result.slip.advice)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.matchMedia('(max-width: 600px)').matches;
      setIsMobile(isMobileView);
    };

    handleResize(); // Call it initially to set the initial state based on the current viewport width

    window.addEventListener('resize', handleResize); // Listen for resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener when the component unmounts
    };
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://api.adviceslip.com/advice", requestOptions)
      .then(response => response.json())
      .then(result => {
        setAdviceNum(result.slip.id)
        setAdvice(result.slip.advice)
      })
      .catch(error => console.log('error', error));
  }, [])

  return (
    <>
      <div className="card-container">
        <div className="header">
          <p className='card-header'>ADVICE #{adviceNum}</p>
        </div>
        <div className="body">
          <p className='advice'>&ldquo; {advice} &rdquo;</p>
          <img src={isMobile ? divider_mobile : divider} alt="icon-divider" />
        </div>
        <div className="footer">
          <button onClick={Generator} className='generator-btn'><img src={dice} alt="Generator" /></button>
        </div>
      </div>
    </>
  )
}
