import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TinderStyleCard from './TinderStyleCard';

const TeamPage = () => {
  const [showMatch, setShowMatch] = useState(false);
  
  const teamProfiles = [
    {
      name: "Nima",
      age: "29",
      images: [
        process.env.PUBLIC_URL + "/images/nima.jpeg"
      ],
      bio: `Data Scientist solving global challenges 🧠

• Data Scientist @ Welthungerhilfe 🌍
• AI/ML expertise in matching algorithms and NLP 🤖
• Product design with focus on user experience 🎨
• Proven track record in engeneering solutions 💻`,
      backgroundColor: "#ede7f6",
      role: "Chief Data Officer",
      company: "MigraMatch",
      location: "Berlin, Germany"
    },
    {
      name: "Johannes",
      age: "27",
      images: [
        process.env.PUBLIC_URL + "/images/johannes.jpg"
      ],
      bio: `GenAI Engineer with policy expertise 🤖🏛️

• GenAI Engineer @ Accenture 💻
• Former policy advisor in German Bundestag 🏛️
• General Manager at KlimaUnion 🌱
• Technical skills combined with policy understanding 🔄`,
      backgroundColor: "#e3f2fd",
      role: "Chief Technology Officer",
      company: "MigraMatch",
      location: "Berlin, Germany"
    }
  ];

  const handleMatch = () => {
    setShowMatch(true);
    // Keep match overlay visible longer for investor page
    setTimeout(() => {
      setShowMatch(false);
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{
          margin: 0,
          color: '#0069b4',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Meet The MigraMatch Team
        </h2>
        <p style={{
          margin: '5px 0 0 0',
          color: '#666',
          fontSize: '16px'
        }}>
          The perfect blend of technical expertise and policy understanding
        </p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <TinderStyleCard
          profiles={teamProfiles}
          onMatch={handleMatch}
          showMatch={showMatch}
          setShowMatch={setShowMatch}
          showTags={false}
        />
      </div>
    </motion.div>
  );
};

export default TeamPage;