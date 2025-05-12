import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MigraMatch = () => {
  const [showStartPage, setShowStartPage] = useState(true);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [showMatch, setShowMatch] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [startX, setStartX] = useState(0);
  const imageIntervalRef = useRef(null);
  const [showFullScreenImage, setShowFullScreenImage] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState('');
  
  // Define all the profiles with multiple images
  const profiles = [
    {
      name: "Demographics",
      age: "critical",
      images: [
        "https://images.unsplash.com/photo-1447005497901-b3e9ee359928?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      ],
      bio: `🚨 PROBLEM: Germany's aging workforce crisis
 
 - Working population shrinking by 6 million by 2040 📉
 - 28.3% of companies can't find qualified workers 🔍
 - 75% of legal/tax firms unable to fill positions ⚖️
 - €70 billion annual productivity loss 💸
 - Critical sectors like healthcare severely understaffed 🏥`,
      backgroundColor: "#ffebee"
    },
    {
      name: "Economic Losses",
      age: "€40B ",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      ],
      bio: `💰 Economic losses from workforce shortage
 
 - €40 billion total economic impact annually 📊
 - Critical infrastructure gaps in key sectors 🏗️
 - Need 300,000 skilled workers annually (only getting 200,000) 👷‍♀️
 - Manufacturing down 23%, healthcare severely affected 🏭
 - SMEs losing €120K per unfilled position yearly 💳`,
      backgroundColor: "#e8f5e9"
    },
    {
      name: "Bureaucracy",
      age: "Bottelneck",
      images: [
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      ],
      bio: `📋 Bureaucratic barriers killing talent influx
 
 - 6+ months average processing time ⏳
 - 40% application abandonment rate 🚶‍♂️
 - 7 disconnected government systems 🔄
 - 35% error rate in documentation ❌
 - €2,000+ translation costs per candidate 💶
 - Still using fax machines in 2025 📠`,
      backgroundColor: "#fff8e1"
    },
    {
      name: "Jobportals",
      age: "Inadequate",
      images: [
        process.env.PUBLIC_URL + "/images/job_boards.png"
        ],
      bio: `❌ Existing platforms miss the mark
 
 COMPETITORS:
 - LinkedIn: Expensive, auto-archives non-EU candidates 🔒
 - Indeed/StepStone: No migration focus, overwhelming 🌊
 - Limited international reach, poor SME integration
 
 GOVERNMENT EFFORTS:
 - Make-it-in-Germany: Documentation-first, no human connection 📋
 - Process-driven, not user-friendly
 - No gamification or modern UX 🤖`,
      backgroundColor: "#f3e5f5"
    },
    {
      name: "MigraMatch",
      age: "The Solution",
      images: [
       process.env.PUBLIC_URL + "/images/migra.jpeg"
      ],
      bio: `🎯 SOLUTION: Human connections first, paperwork later
 
 ✅ AI-powered skill-based matching (not credentials)
 ✅ 65% faster hiring process
 ✅ 30% higher match quality & retention
 ✅ Gamified skill verification challenges
 ✅ Direct messaging/video calls before bureaucracy
 ✅ Automated visa tracking & documentation
 ✅ Government API integration
 ✅ Mobile-first, Tinder-like UX`,
      backgroundColor: "#fce4ec"
    },
    {
      name: "Sofia",
      age: "29, Software Engineer",
      images: [
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      ],
      bio: `👩‍💻 CASE STUDY: International Talent Success
 
 FROM ROMANIA 🇷🇴 TO BERLIN 🇩🇪
 
 THE CHALLENGE:
 - 5+ years experience but credentials not recognized
 - Spent €2,000+ on translations
 - 8 months waiting for verification
 - 40+ hours on failed applications
 
 WITH MIGRA MATCH:
 - Matched based on coding skills, not papers ⚡
 - Connected directly with employers 🤝
 - Visa process started immediately after match ✅
 - Landed job in 3 weeks vs. 8+ months 🎯`,
      backgroundColor: "#e0f7fa"
    },
    {
      name: "Klaus",
      age: "CEO SME",
      images: [
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
         ],
      bio: `🏭 CASE STUDY: SME Success Story
 
 BAVARIA-BASED MANUFACTURING COMPANY
 
 THE CHALLENGE:
 - Needed skilled technicians urgently 🔧
 - 40+ hours spent per failed international hire
 - 70% candidate abandonment rate
 - Lost €240K in productivity while positions vacant
 
 WITH MIGRA MATCH:
 - Found 3 qualified technicians from Poland 🇵🇱
 - Skill-based matching eliminated guesswork ✅
 - Direct communication reduced misunderstandings 💬
 - Hired all 3 within 6 weeks 🚀
 - Saved €180K in recruitment costs 💰`,
      backgroundColor: "#f1f8e9"
    },
    {
      name: "Market Opportunity",
      age: "€40B",
      images: [
       process.env.PUBLIC_URL + "/images/oppertunity4.png"
      ],
      bio: `Huge potential for the right partner 📊 Validated market need.

• TAM: €40 billion (Germany skilled worker recruitment market) 🏢
• SAM: €4 billion (10% focused on international recruitment) 🌍
• SOM: €400 million (initial target for first 5 years) 🎯
• 100,000+ annual skilled worker gap to fill 👥
• Customer discovery with 15 HR managers, 22 workers, 8 officials 🔍`,
      backgroundColor: "#e1f5fe"
    },
    {
      name: "Revenue Streams",
      age: "€€€",
      images: [
        process.env.PUBLIC_URL + "/images/streams4.png"
      ],
      bio: `Multiple ways to make this relationship profitable 💰

• Employers: Freemium for 10 postings, €150/additional posting 🏢
• Candidates: Basic (free), Premium €9.99/month 👤
• Government: Integration fees and SaaS licenses 🏛️
• Unit Economics: Employer CAC €35, LTV €450 📈
• Candidate CAC €12, LTV €65 📊
• Gross margin: 75% 💹`,
      backgroundColor: "#fff3e0"
    },
    {
      name: "Market Entry Plan",
      age: "24",
      images: [
        process.env.PUBLIC_URL + "/images/entry5.png"
      ],
      bio: `Three phases to market domination 🚀

• Phase 1: Government partnerships (Make-it-in-Germany integration) 🏛️
• Phase 2: Source country outreach (Embassies, Außenhandelskammern) 🌍
• Phase 3: SME targeting in high-demand sectors 🏢
• Target countries: India, Philippines, Vietnam, Ukraine, Brazil 🗺️
• Industry focus: Healthcare, IT, Engineering, Manufacturing 🏭`,
      backgroundColor: "#e8f5e9"
    },
    {
      name: "Financial Projections",
      age: "€1.8M",
      images: [
       process.env.PUBLIC_URL + "/images/revenue5.png"
      ],
      bio: `Looking for €150K investment for a serious relationship 📈

• Break-even point: 18-24 months ⏱️
• Revenue projections: Y1 €300K, Y2 €750K, Y3 €1.8M 📊
• Monthly burn rate: €25K with 18-month runway 💸
• Target growth: 40% quarterly after launch 📈
• Series A trigger: 5,000 successful matches 🤝
• Funding allocation: Platform €60K, Gov. integration €30K, GTM €40K, Team €20K 💰`,
      backgroundColor: "#e0f2f1"
    },
    {
      name: "Nima",
      age: "Co-Founder",
      images: [
        process.env.PUBLIC_URL + "/images/nima.jpeg"
      ],
      bio: `Data Scientist passionate about solving global challenges 🧠

• Data Scientist @ Welthungerhilfe 🌍
• AI/ML expertise in matching algorithms and NLP 🤖
• Deep experience in data analysis and pattern recognition 📊
• Product design with focus on user experience 🎨
• Proven track record in building AI-powered solutions 💻`,
      backgroundColor: "#ede7f6"
    },
    {
      name: "Johannes",
      age: "Co-Founder",
      images: [
        process.env.PUBLIC_URL + "/images/johannes.jpg"
      ],
      bio: `GenAI Engineer with policy expertise 🤖🏛️

• GenAI Engineer @ Accenture 💻
• Former policy advisor in German Bundestag 🏛️
• General Manager at KlimaUnion 🌱
• Public sector knowledge and regulatory expertise 📜
• Technical skills combined with policy understanding 🔄`,
      backgroundColor: "#e3f2fd"
    },
    {
      name: "Perfect Match Investor",
      age: "€150K",
      images: [
        "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      ],
      bio: `Seeking innovative GovTech solutions with global impact 🌍

• €150K seed funding opportunity 💰
• Strategic introductions to government stakeholders 🏛️
• Industry partnerships in key sectors (Healthcare, IT, Manufacturing) 🤝
• HR tech knowledge and connections 👥
• Support with international expansion and public sector procurement 🌐
• Perfect timing with new regulations and digital transformation ⏰`,
      backgroundColor: "#fce4ec"
    }
  ];

  // Setup auto-rotating images
  useEffect(() => {
    if (profiles[currentProfileIndex]?.images.length > 1) {
      // Clear any existing interval
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
      }
      
      // Set up a new interval
      imageIntervalRef.current = setInterval(() => {
        setCurrentImageIndex(prevIndex => 
          (prevIndex + 1) % profiles[currentProfileIndex].images.length
        );
      }, 2000);
    }
    
    // Cleanup interval on profile change or component unmount
    return () => {
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
        imageIntervalRef.current = null;
      }
    };
  }, [currentProfileIndex, profiles]);

  // Reset image index when profile changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentProfileIndex]);

  const handleStartPageClick = () => {
    setShowStartPage(false);
  };

  const moveToNextProfile = () => {
    if (currentProfileIndex === profiles.length - 1) {
      setShowMatch(true);
      
      // Auto-hide match overlay after 3 seconds
      const timer = setTimeout(() => {
        setShowMatch(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    setCurrentProfileIndex(prevIndex => prevIndex + 1);
  };

  const handleLike = () => {
    setDirection('right');
    setTimeout(() => {
      moveToNextProfile();
      setDirection(null);
    }, 300);
  };

  const handleDislike = () => {
    setDirection('left');
    setTimeout(() => {
      moveToNextProfile();
      setDirection(null);
    }, 300);
  };

  const handleRewind = () => {
    if (currentProfileIndex > 0) {
      setDirection('down');
      setTimeout(() => {
        setCurrentProfileIndex(currentProfileIndex - 1);
        setDirection(null);
      }, 300);
    }
  };

  const handleSuperLike = () => {
    setDirection('up');
    setTimeout(() => {
      moveToNextProfile();
      setDirection(null);
    }, 300);
  };

  const handleMessage = () => {
    // Open message popup
    setShowMessagePopup(true);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (profiles[currentProfileIndex].images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? profiles[currentProfileIndex].images.length - 1 : prevIndex - 1
      );
      
      // Reset timer when manually changing images
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
        imageIntervalRef.current = setInterval(() => {
          setCurrentImageIndex(prevIndex => 
            (prevIndex + 1) % profiles[currentProfileIndex].images.length
          );
        }, 2000);
      }
    }
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (profiles[currentProfileIndex].images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % profiles[currentProfileIndex].images.length
      );
      
      // Reset timer when manually changing images
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
        imageIntervalRef.current = setInterval(() => {
          setCurrentImageIndex(prevIndex => 
            (prevIndex + 1) % profiles[currentProfileIndex].images.length
          );
        }, 2000);
      }
    }
  };

  // Touch handlers for swiping
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left - dislike
        handleDislike();
      } else {
        // Swiped right - like
        handleLike();
      }
    }
  };

  const currentProfile = profiles[currentProfileIndex];
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
              📱 How to Navigate This Presentation
            </h3>
            
            <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#555' }}>
              <p style={{ marginBottom: '10px' }}>
                <strong>Navigation:</strong>
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                <li>❌ ❤️ ⭐ = Next slide</li>
                <li>↩️ = Previous slide</li>
                <li>💬 = Demo chat </li>
              </ul>
              
              <div style={{ 
                backgroundColor: '#e3f2fd',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '15px'
              }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>
                  <strong>Note:</strong> This is our pitch deck presented as a matching app interface - not a prototype of MigraMatch itself. It follows our course structure: Problem → Solution → Competition → User Journey → Financials.
                </p>
              </div>
              
              <p style={{ fontSize: '13px', margin: 0, color: '#777' }}>
                Swipe or use buttons to explore our startup journey!
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
    <div className="app-container" style={{ 
      height: '100vh', 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: '#f0f2f5',
      padding: '20px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Profile card */}
      <motion.div 
        className="profile-card"
        initial={{ opacity: 1 }}
        animate={{ 
          x: direction === 'left' ? -500 : direction === 'right' ? 500 : 0,
          y: direction === 'up' ? -500 : direction === 'down' ? 500 : 0,
          opacity: direction ? 0 : 1,
          rotate: direction === 'left' ? -30 : direction === 'right' ? 30 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{
          width: '100%',
          maxWidth: '500px',
          minHeight: '70vh',
          backgroundColor: 'white',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
      {/* Profile image carousel */}
      <div 
        style={{ 
          height: '60%', 
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Main clickable image area (center 60%) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '20%',
            width: '60%',
            height: '100%',
            cursor: 'pointer',
            zIndex: 3
          }}
          onClick={(e) => {
            e.stopPropagation();
            setFullScreenImageUrl(currentProfile.images[currentImageIndex]);
            setShowFullScreenImage(true);
          }}
        />
        
        <img 
          src={currentProfile.images[currentImageIndex]}
          alt={currentProfile.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />
        
        {/* Image navigation buttons */}
        {currentProfile.images.length > 1 && (
          <>
            <div 
              onClick={handlePrevImage}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '20%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '0 15px',
                zIndex: 4,
                background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent)'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                transition: 'all 0.2s ease'
              }}>
                ◀
              </div>
            </div>
            
            <div 
              onClick={handleNextImage}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: '20%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0 15px',
                zIndex: 4,
                background: 'linear-gradient(to left, rgba(0,0,0,0.1), transparent)'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                transition: 'all 0.2s ease'
              }}>
                ▶
              </div>
            </div>
          </>
        )}

        {/* Image indicators */}
        {currentProfile.images.length > 1 && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            zIndex: 2
          }}>
            {currentProfile.images.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        )}

        {/* Gradient overlay for text visibility */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          zIndex: 2
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '10px'
          }}>
            <h2 style={{ color: 'white', margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
              {currentProfile.name}
            </h2>
            <span style={{ color: 'white', fontSize: '24px', marginBottom: '4px' }}>
              , {currentProfile.age}
            </span>
          </div>
        </div>
      </div>
        
        {/* Profile bio */}
        <div style={{ 
          padding: '20px', 
          flex: 1, 
          overflowY: 'auto',
          backgroundColor: currentProfile.backgroundColor || 'white',
          background: `linear-gradient(to bottom, ${currentProfile.backgroundColor || 'white'}, white)`
        }}>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.5',
            margin: 0,
            whiteSpace: 'pre-line',
            color: '#333'
          }}>
            {currentProfile.bio}
          </p>
        </div>
      </motion.div>
      
      {/* Action buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        width: '100%',
        maxWidth: '500px',
        padding: '20px 0'
      }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#ffb7b7',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          onClick={handleDislike}
        >
          ✖️
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#ffcf85',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          onClick={handleRewind}
        >
          ↩️
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#90e0ef',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          onClick={handleSuperLike}
        >
          ⭐
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#c77dff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          onClick={handleMessage}
        >
          💬
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#a7e8bd',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          onClick={handleLike}
        >
          ❤️
        </motion.button>
      </div>
      
      {/* Progress indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        marginTop: '10px'
      }}>
        {profiles.map((_, index) => (
          <div
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: index === currentProfileIndex ? '#0069b4' : '#ddd'
            }}
          />
        ))}
      </div>

      {/* Match overlay */}
      {showMatch && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            color: 'white',
            textAlign: 'center'
          }}
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity, 
              repeatType: "loop" 
            }}
          >
            <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>✨ IT'S A MATCH! ✨</h1>
          </motion.div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '40px' }}>You've found your perfect investor!</h2>
          <p style={{ fontSize: '1.2rem' }}>Tap anywhere to continue</p>
        </motion.div>
      )}
      
      {/* Message popup */}
      <AnimatePresence>
        {showMessagePopup && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'white',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.2)',
              padding: '20px',
              zIndex: 1000,
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid #eee',
              paddingBottom: '15px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={currentProfile.images[0]}
                    alt={currentProfile.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>{currentProfile.name}</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Active now</p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '15px'
              }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#f0f2f5',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '20px'
                  }}
                >
                  📞
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#f0f2f5',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '20px'
                  }}
                >
                  📹
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#f0f2f5',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '20px'
                  }}
                  onClick={() => setShowMessagePopup(false)}
                >
                  ✖️
                </motion.button>
              </div>
            </div>
            
            {/* Messages */}
            <div style={{
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                marginBottom: '15px'
              }}>
                <div style={{
                  maxWidth: '80%',
                  backgroundColor: '#f0f2f5',
                  padding: '12px 15px',
                  borderRadius: '18px',
                  marginRight: 'auto'
                }}>
                  <p style={{ margin: 0 }}>Hi there, we have a good feeling to be matching. We would like to know you more detailed.</p>
                </div>
              </div>
              
  
            </div>
            
            {/* Input */}
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}>
              <input 
                type="text" 
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: '12px 15px',
                  borderRadius: '20px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#0069b4',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
              >
                ↗️
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen image overlay */}
      <AnimatePresence>
        {showFullScreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2000,
              cursor: 'pointer'
            }}
            onClick={() => setShowFullScreenImage(false)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={fullScreenImageUrl}
              alt="Full screen view"
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                borderRadius: '10px'
              }}
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2001
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowFullScreenImage(false);
              }}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MigraMatch;