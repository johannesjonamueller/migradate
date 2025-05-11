import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MigraDate = () => {
  const [showStartPage, setShowStartPage] = useState(true);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [showMatch, setShowMatch] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [startX, setStartX] = useState(0);
  const imageIntervalRef = useRef(null);
  
  // Define all the profiles with multiple images
  const profiles = [
    {
      name: " Workforce",
      age: "aging",
      images: [
        "https://images.unsplash.com/photo-1447005497901-b3e9ee359928?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1559156280-0ae54c5aeab8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      ],
      bio: `Getting older by the day 👴👵 and desperately seeking fresh talent.

• Shrinking by 6 million working-age people by 2040 📉
• 28.3% of companies can't find qualified workers 🔍
• Service providers (35.1%) and legal/tax firms (75%) hit hardest ⚖️
• Skilled worker shortage costs €70 billion annually in productivity 💸`,
      backgroundColor: "#ffebee"
    },
    {
      name: "Economy",
      age: "recessive",
      images: [
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      ],
      bio: `Currently losing serious money due to workforce shortages 📉

• €40 billion annual economic impact from worker shortage 💰
• Critical infrastructure gaps emerging in key sectors 🏗️
• Need 300,000+ skilled workers annually (only getting 200,000) 👷‍♀️
• Heavy impact on manufacturing (23%) and healthcare sectors 🏭`,
      backgroundColor: "#e8f5e9"
    },
    {
      name: "Fax-Loving Bureaucracy",
      age: "20th century",
      images: [
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1568219656418-15c329312bf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      ],
      bio: `Old-fashioned type who loves paperwork 📠📋 Not great with technology.

• Application processing takes 6+ months on average ⏳
• 40% abandonment rate on skilled worker applications 🚶‍♂️
• 7 disconnected systems for verification 🔄
• 35% error rate in documentation processing ❌
• €2,000+ costs for credential translations 💶`,
      backgroundColor: "#fff8e1"
    },
    {
      name: "Bundesregierung",
      age: "2 weeks",
      images: [
        process.env.PUBLIC_URL + "/images/merz.png",
        process.env.PUBLIC_URL + "/images/Bas.png",
        process.env.PUBLIC_URL + "/images/Reiche.png"
      ],
      bio: `Looking for innovative solutions to Germany's workforce crisis 💼

• Supporter of digital transformation in public administration 💻
• Implementing Fachkräfteeinwanderungsgesetz (Skilled Immigration Act) 📜
• Need tech solutions to process more than 200,000 visas annually 🔄
• Focused on economic growth through talent acquisition 📈`,
      backgroundColor: "#e3f2fd"
    },
    {
      name: "Competition",
      age: "numerous",
      images: [
        process.env.PUBLIC_URL + "/images/job_boards.png",
      ],
      bio: `Good at matching jobs within countries but lacking on international stage 🔄

• LinkedIn: Premium costs deter users, auto-archiving of non-EU candidates 🔒
• Indeed: Overwhelming for niche seekers, limited filters 🔍
• StepStone: High costs for small firms, minimal migrant support 💰
• Xing: Small international job pool, complex for non-networkers 🌐
• Monster: Generic experience, weak migrant integration 👾`,
      backgroundColor: "#f3e5f5"
    },
    {
      name: "Make it in Germany",
      age: "20",
      images: [
       process.env.PUBLIC_URL + "/images/makeitin.jpg",
       process.env.PUBLIC_URL + "/images/jobs.png"
      ],
      bio: `Government's first attempt at matchmaking 🇩🇪 but not user-friendly enough.

• Overly focused on documentation before connections 📑
• Requires extensive paperwork upfront 📝
• Limited interaction between employers and candidates 🤝
• Missing gamification elements to increase engagement 🎮
• Platform is process-driven rather than human-centered 🤖`,
      backgroundColor: "#e8eaf6"
    },
    {
      name: "MigraDate",
      age: "Pre Seed",
      images: [
        "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      ],
      bio: `Human connections first, paperwork later 🤝 Making migration fun!

• AI-powered skill-based matching (not just credentials) 🧠
• 65% faster hiring process than traditional methods ⚡
• 30% higher match quality leading to better retention 🎯
• Gamified skill verification through interactive challenges 🎮
• Direct messaging/video calls before bureaucracy begins 💬
• Integrated with government systems for visa tracking 🔄`,
      backgroundColor: "#fce4ec"
    },
    {
      name: "International Talent",
      age: "Worldwide",
      images: [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      ],
      bio: `Skilled professionals seeking German opportunities but facing barriers 🌍

• Medical, tech, and engineering degrees but struggling with credential recognition 🎓
• 8-month waits for qualification verification ⏱️
• €2,000+ spent on document translations 💶
• Application abandonment after 40+ hours spent on hiring process ⏰
• No visibility into application status after submission 🔍
• Software development expertise with 5+ years experience 👩‍💻
• Need direct connections with potential employers 🤝`,
      backgroundColor: "#e0f7fa"
    },
    {
      name: "Small-Medium Enterprises",
      age: "Germany",
      images: [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      ],
      bio: `Growing German businesses desperate for talent 🔍

• 40+ hours spent per international hire attempt ⏱️
• 70% application abandonment rate from international candidates 📉
• Limited global reach for talent acquisition 🌍
• Can't effectively evaluate foreign qualifications 📄
• No resources for managing complex visa processes 🛂`,
      backgroundColor: "#f1f8e9"
    },
    {
      name: "Market Opportunity",
      age: "€40B",
      images: [
       process.env.PUBLIC_URL + "/images/oppertunity2.png"
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
        process.env.PUBLIC_URL + "/images/streams2.png"
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
        process.env.PUBLIC_URL + "/images/entry2.png"
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
       process.env.PUBLIC_URL + "/images/revenue2.png"
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
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
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
        "https://images.unsplash.com/photo-1559523182-a284c3fb7cff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
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
        background: 'linear-gradient(135deg, #0069b4, #00a0dc)',
        padding: '20px',
        color: 'white',
        textAlign: 'center',
        cursor: 'pointer'
      }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '600px'
          }}
        >
          {/* Logo */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ marginBottom: '30px' }}
          >
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}>
              <div style={{ fontSize: '60px' }}>
                💼❤️
              </div>
            </div>
          </motion.div>
          
          {/* App Name */}
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            margin: '0 0 20px 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            MigraDate
          </h1>
          
          {/* Tagline */}
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'normal', 
            margin: '0 0 30px 0',
            opacity: 0.9
          }}>
            The Global Skilled Worker Matching Platform
          </h2>
          
          <p style={{
            fontSize: '18px',
            maxWidth: '500px',
            lineHeight: 1.5,
            margin: '0 0 40px 0'
          }}>
            Connecting international talent to German employers through human-centered matching
          </p>
          
          {/* Founders */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px',
            width: '100%'
          }}>
            <div style={{ margin: '0 15px', textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 10px',
                border: '3px solid white'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Nima" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <p style={{ margin: 0 }}>Nima</p>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Data Scientist</p>
            </div>
            <div style={{ margin: '0 15px', textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 10px',
                border: '3px solid white'
              }}>
                <img 
                  src= "/images/johannes.jpg" 
                  alt="Johannes" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <p style={{ margin: 0 }}>Johannes</p>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>GenAI Engineer & Policy Expert</p>
            </div>
          </div>
          
          {/* QR Code mockup */}
          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              width: '150px',
              height: '150px',
              background: 'repeating-conic-gradient(#0069b4 0% 25%, white 0% 50%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundSize: '20px 20px'
            }}>
              <div style={{ background: 'white', padding: '8px', borderRadius: '4px' }}>
                <div style={{ fontSize: '24px' }}>💼❤️</div>
              </div>
            </div>
          </div>

          <motion.p
            animate={{ opacity: [0, 1, 0], y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
            style={{
              marginTop: '40px',
              fontSize: '18px'
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
          <img 
            src={currentProfile.images[currentImageIndex]}
            alt={currentProfile.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
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
                  zIndex: 2
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '20px'
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
                  zIndex: 2
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '20px'
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
            justifyContent: 'flex-end'
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
    </div>
  );
};

export default MigraDate;