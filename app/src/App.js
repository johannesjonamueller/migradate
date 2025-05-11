import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MigraTinder = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [showMatch, setShowMatch] = useState(false);
  const [startX, setStartX] = useState(0);
  
  // Define all the profiles
  const profiles = [
    {
      name: "Aging Workforce",
      age: "72",
      image: "https://images.unsplash.com/photo-1447005497901-b3e9ee359928?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      bio: `Getting older by the day 👴👵 and desperately seeking fresh talent.

• Shrinking by 6 million working-age people by 2040 📉
• 28.3% of companies can't find qualified workers 🔍
• Service providers (35.1%) and legal/tax firms (75%) hit hardest ⚖️
• Skilled worker shortage costs €70 billion annually in productivity 💸`,
      backgroundColor: "#ffebee"
    },
    {
      name: "Economic Growth",
      age: "43",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      bio: `Currently losing serious money due to workforce shortages 📉

• €40 billion annual economic impact from worker shortage 💰
• Critical infrastructure gaps emerging in key sectors 🏗️
• Need 300,000+ skilled workers annually (only getting 200,000) 👷‍♀️
• Heavy impact on manufacturing (23%) and healthcare sectors 🏭`,
      backgroundColor: "#e8f5e9"
    },
    {
      name: "Fax-Loving Bureaucracy",
      age: "67",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      bio: `Old-fashioned type who loves paperwork 📠📋 Not great with technology.

• Application processing takes 6+ months on average ⏳
• 40% abandonment rate on skilled worker applications 🚶‍♂️
• 7 disconnected systems for verification 🔄
• 35% error rate in documentation processing ❌
• €2,000+ costs for credential translations 💶`,
      backgroundColor: "#fff8e1"
    },
    {
      name: "Katharina Reiche",
      age: "Minister",
      image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      bio: `Looking for innovative solutions to Germany's workforce crisis 💼

• Supporter of digital transformation in public administration 💻
• Implementing Fachkräfteeinwanderungsgesetz (Skilled Immigration Act) 📜
• Need tech solutions to process more than 200,000 visas annually 🔄
• Focused on economic growth through talent acquisition 📈`,
      backgroundColor: "#e3f2fd"
    },
    {
      name: "The Competition Crew",
      age: "Various",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
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
      age: "3",
      image: "/images/makeitin.jpg",
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
      age: "25",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
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
      name: "Jamal",
      age: "28",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      bio: `Qualified care worker currently in Albania 🏥 Seeking German opportunity.

• Dual medical degree but struggling with credential recognition 🎓
• 8-month wait for qualification verification ⏱️
• Spent €2,000+ on document translations 💶
• Abandoned three German applications due to complexity 😓
• Needs practical demonstrations over paperwork 💪`,
      backgroundColor: "#e0f7fa"
    },
    {
      name: "Maria",
      age: "31",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      bio: `Tech specialist with MBA from US 💻 Looking for German opportunity.

• Software development expertise with 5+ years experience 👩‍💻
• Application abandonment after 40+ hours spent on hiring process ⏰
• Can't evaluate her own foreign qualifications against German standards 📊
• No visibility into application status after submission 🔍
• Needs direct connection with potential employers 🤝`,
      backgroundColor: "#f9fbe7"
    },
    {
      name: "TechSolutions GmbH",
      age: "SME",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      bio: `Growing tech company in Munich desperate for talent 🔍

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
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
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
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
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
      image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
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
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
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
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
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
      image: "/images/johannes.jpg",
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
      image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
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

  useEffect(() => {
    // Show match overlay when reaching the investor profile
    if (currentProfileIndex === profiles.length - 1) {
      setShowMatch(true);
      
      // Auto-hide match overlay after 3 seconds
      const timer = setTimeout(() => {
        setShowMatch(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [currentProfileIndex, profiles.length]);

  const handleLike = () => {
    setDirection('right');
    setTimeout(() => {
      setCurrentProfileIndex((prevIndex) => 
        prevIndex < profiles.length - 1 ? prevIndex + 1 : prevIndex
      );
      setDirection(null);
    }, 300);
  };

  const handleDislike = () => {
    setDirection('left');
    setTimeout(() => {
      setCurrentProfileIndex((prevIndex) => 
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
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
      setCurrentProfileIndex((prevIndex) => 
        prevIndex < profiles.length - 1 ? prevIndex + 1 : prevIndex
      );
      setDirection(null);
    }, 300);
  };

  const handleBoost = () => {
    // Add pulse animation to current profile
    // Then proceed to next
    setTimeout(() => {
      handleLike();
    }, 800);
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
        // Swiped left
        handleDislike();
      } else {
        // Swiped right
        handleLike();
      }
    }
  };

  const currentProfile = profiles[currentProfileIndex];

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
        {/* Profile image */}
        <div 
          style={{ 
            height: '60%', 
            backgroundImage: `url(${currentProfile.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        >
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
          onClick={handleBoost}
        >
          ⚡
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
              duration: 1.5,
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
    </div>
  );
};

export default MigraTinder;