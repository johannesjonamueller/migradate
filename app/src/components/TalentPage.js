import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TinderStyleCard from './TinderStyleCard';
import { talentProfiles } from '../data/talentProfiles';

const TalentPage = () => {
  const [showMatch, setShowMatch] = useState(false);
  const [filterTag, setFilterTag] = useState(null);

  const handleMatch = () => {
    setShowMatch(true);
    setTimeout(() => {
      setShowMatch(false);
    }, 3000);
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
      {/* Filter Bar */}
      <div style={{
        backgroundColor: 'white',
        padding: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilterTag(null)}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: filterTag === null ? '#0069b4' : '#f0f2f5',
            color: filterTag === null ? 'white' : '#333',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          All Companies
        </motion.button>
        
        {['IT', 'Health', 'Engineering'].map((industry) => (
          <motion.button
            key={industry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterTag(industry)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: filterTag === industry ? '#0069b4' : '#f0f2f5',
              color: filterTag === industry ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            {industry}
          </motion.button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <TinderStyleCard
          profiles={talentProfiles}
          onMatch={handleMatch}
          showMatch={showMatch}
          setShowMatch={setShowMatch}
          showTags={true}
          filterTag={filterTag}
        />
      </div>
    </motion.div>
  );
};

export default TalentPage;