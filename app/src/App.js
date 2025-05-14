import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TalentPage from './components/TalentPage';
import JobsPage from './components/JobsPage';
import TeamPage from './components/TeamPage';
import AboutPage from './components/AboutPage';
import GovernmentPage from './components/GovernmentPage';


const MigraMatch = () => {
  const [currentPage, setCurrentPage] = useState('start');
  const [showStartPage, setShowStartPage] = useState(true);

  const handleStartPageClick = () => {
    setShowStartPage(false);
  };

  if (showStartPage) {
    return (
      <div className="start-page" onClick={handleStartPageClick} style={{
        height: '100vh', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'white',
        padding: '20px',
        color: '#333',
        textAlign: 'center',
        cursor: 'pointer',
        overflow: 'auto'
      }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '600px',
            width: '100%'
          }}
        >
          {/* MigraMatch Logo */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ marginBottom: '20px' }}
          >
            <img 
              src={process.env.PUBLIC_URL + "/images/migra.jpeg"}
              alt="MigraMatch Logo"
              style={{
                width: '200px',
                height: 'auto',
                borderRadius: '15px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
          </motion.div>
          
          {/* App Name */}
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            margin: '0 0 20px 0',
            color: '#0069b4',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            MigraMatch
          </h1>
          
          {/* Tagline */}
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'normal', 
            margin: '0 0 30px 0',
            color: '#666'
          }}>
            The Global Skilled Worker Matching Platform
          </h2>
          
          <p style={{
            fontSize: '18px',
            maxWidth: '500px',
            lineHeight: 1.5,
            margin: '0 0 40px 0',
            color: '#777'
          }}>
            Connecting international talent to German employers through human-centered matching
          </p>
          
          {/* Founders */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px',
            width: '100%',
            gap: '30px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 10px',
                border: '3px solid #0069b4'
              }}>
                <img 
                  src={process.env.PUBLIC_URL + "/images/nima.jpeg"} 
                  alt="Nima" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Nima</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Data Scientist</p>
              <a 
                href="https://github.com/nimathing2052" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  fontSize: '12px', 
                  color: '#0069b4', 
                  textDecoration: 'none',
                  display: 'inline-block',
                  marginTop: '5px'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                GitHub 🔗
              </a>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 10px',
                border: '3px solid #0069b4'
              }}>
                <img 
                  src={process.env.PUBLIC_URL + "/images/johannes.jpg"} 
                  alt="Johannes" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Johannes</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>GenAI Engineer & Policy Expert</p>
              <a 
                href="https://github.com/johannesjonamueller" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  fontSize: '12px', 
                  color: '#0069b4', 
                  textDecoration: 'none',
                  display: 'inline-block',
                  marginTop: '5px'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                GitHub 🔗
              </a>
            </div>
          </div>
          
          {/* User Guide */}
          <motion.div
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px',
              maxWidth: '500px',
              textAlign: 'left'
            }}
          >
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '15px',
              textAlign: 'center',
              color: '#0069b4'
            }}>
              📱 Navigation Guide
            </h3>
            
            <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#555' }}>
              <p style={{ marginBottom: '15px' }}>
                <strong>Our Platform Sections:</strong>
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                <li>👥 TALENT - Explore the talent </li>
                <li>💼 JOBS - Browse company profiles </li>
                <li>🏛️ GOV - Government integration dashboard</li>
                <li>🚀 TEAM - Meet our team</li>
                <li>ℹ️ ABOUT - Learn more about us</li>
              </ul>
              
              <div style={{ 
                backgroundColor: '#e3f2fd',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '15px'
              }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>
                  <strong>Note:</strong> This is our pitch deck presented as a matching app interface - showcasing MigraMatch's concept through interactive navigation.
                </p>
              </div>
              
              <p style={{ fontSize: '13px', margin: 0, color: '#777' }}>
                Click anywhere to enter the navigation zone!
              </p>
            </div>
          </motion.div>
          
          {/* QR Code */}
          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <img 
              src={process.env.PUBLIC_URL + "/images/qr.png"}
              alt="QR Code"
              style={{
                width: '150px',
                height: '150px'
              }}
            />
          </div>

          {/* Course Information */}
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '15px',
            padding: '20px',
            maxWidth: '500px',
            textAlign: 'center',
            border: '1px solid #e9ecef'
          }}>
            <img 
              src={process.env.PUBLIC_URL + "/images/hertie.png"}
              alt="Hertie School Logo"
              style={{
                width: '120px',
                height: 'auto',
                marginBottom: '15px'
              }}
            />
            <h3 style={{ 
              fontSize: '16px', 
              marginBottom: '10px',
              color: '#0069b4'
            }}>
              Spring 2025 Project
            </h3>
            <p style={{
              fontSize: '14px',
              margin: '0 0 15px 0',
              color: '#555',
              fontWeight: 'bold'
            }}>
              Entrepreneurship, Tech & Public Policy:<br />
              Founding and Scaling a Software Startup with Public Impact
            </p>
            <div style={{ fontSize: '13px', color: '#777' }}>
              <p style={{ margin: '10px 0' }}>
                <strong>Professors:</strong>
              </p>
              <p style={{ margin: '5px 0' }}>
                <a 
                  href="mailto:faruk.tuncer@polyteia.de" 
                  style={{ color: '#0069b4', textDecoration: 'none' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Faruk Tuncer
                </a>
              </p>
              <p style={{ margin: '5px 0' }}>
                <a 
                  href="mailto:alexa.moeller@polyteia.de" 
                  style={{ color: '#0069b4', textDecoration: 'none' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Alexa Möller
                </a>
              </p>
            </div>
          </div>

          <motion.p
            animate={{ opacity: [0, 1, 0], y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
            style={{
              marginTop: '20px',
              fontSize: '18px',
              color: '#0069b4'
            }}
          >
            Tap anywhere to continue
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="app" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1000,
          padding: '10px 0'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          maxWidth: '450px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {[
            { id: 'talent', label: 'JOBS', icon: '💼'  },
            { id: 'jobs', label: 'TALENT', icon: '👥'},
            { id: 'government', label: 'GOV', icon: '🏛️' }, 
            { id: 'team', label: 'TEAM', icon: '🚀' },
            { id: 'about', label: 'ABOUT', icon: 'ℹ️' }
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(item.id)}
              style={{
                background: currentPage === item.id ? '#0069b4' : 'transparent',
                color: currentPage === item.id ? 'white' : '#333',
                border: currentPage === item.id ? 'none' : '1px solid #ddd',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.3s ease'
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Page Content */}
      <div style={{ marginTop: '80px', height: 'calc(100vh - 80px)' }}>
        <AnimatePresence mode="wait">
          {currentPage === 'talent' && <TalentPage key="talent" />}
          {currentPage === 'jobs' && <JobsPage key="jobs" />}
          {currentPage === 'government' && <GovernmentPage key="government" />} 
          {currentPage === 'team' && <TeamPage key="team" />}
          {currentPage === 'about' && <AboutPage key="about" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MigraMatch;