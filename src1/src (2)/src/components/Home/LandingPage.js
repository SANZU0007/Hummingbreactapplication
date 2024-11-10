import React from 'react';
import './HummingBee.css';
import image1 from "./Humming.jpg"
import image2 from "./humming2.jpg"
import logo from "./logo.png"
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const HummingBee = () => {


const navigate = useNavigate()

  return (
    <div className='home-page'>
      <header className="header">
        <img src={logo} alt="Humming Bee Logo" className="logo" />
        <div onClick={()=> navigate('/')} className="user-icon"><PersonIcon/></div>
      </header>
      <section className="intro-section">
        <div className='section-container'>
        <h1 className="main-title">
          On a mission to create <br />
          <span className="highlight">thriving workplaces</span>
        </h1>
        <p className="intro-text">
        Humming Bee (previously called Ippy) is an IIT Madras Startup incubated at Nirmaan. We offer tailor made solutions for startups and midsize organizations to improve 'Workplace Engagement'. This has a direct impact on business outcomes such as productivity, work quality, attrition, sales productivity, and profits.
        </p>
        </div>
        <div className="image-circle">
          <img src={image1} alt="Team Meeting" />
        </div>
      </section>
      <section className="content-section">
        <div className='content-section-1'>
        <h2 style={{textAlign:"start"}} className="content-title">Employee <br/><span className='Engagement'>Engagement</span> </h2>
        <p className="content-text">
          ‘Employee Engagement’ as a topic and HR activity has gained popularity in the last
          two decades. In practice, it has multiple meanings and understood differently.
        </p>
        <ul className="content-list">
          <li>Simultaneous engagement and expression of a person’s preferred self (Kahn, 1990)</li>
          <li>Fulfilling work-related state of mind characterized by <strong>vigor, dedication, and absorption</strong> (Schaufeli et al., 2002)</li>
          <li>Involvement and enthusiasm in their work and workplace (Gallup)</li>
        </ul>
        <p className="content-text">
          We work closely with organizations and create tailor-made solutions to improve
          overall workplace engagement impacting productivity, work quality, attrition,
          absenteeism, sales, and profits.
        </p>
        </div>
        <div className="secondary-image">
          <img src={image2} alt="Discussion" />
        </div>
      </section>
    </div>
  );
};

export default HummingBee;
