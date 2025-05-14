import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TinderStyleCard from './TinderStyleCard';
import { jobProfiles } from '../data/jobProfiles';

const JobsPage = () => {
  const [showMatch, setShowMatch] = useState(false);
  const [filterTag, setFilterTag] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;

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
        padding: isMobile ? '10px' : '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        gap: isMobile ? '8px' : '10px',
        flexWrap: 'wrap'
      }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFilterTag(null)}
          style={{
            padding: isMobile ? '6px 12px' : '8px 16px',
            borderRadius: '15px',
            border: 'none',
            backgroundColor: filterTag === null ? '#0069b4' : '#f0f2f5',
            color: filterTag === null ? 'white' : '#333',
            cursor: 'pointer',
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: 'bold'
          }}
        >
          All Jobs
        </motion.button>
        
        {['IT', 'Health', 'Engineering'].map((industry) => (
          <motion.button
            key={industry}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilterTag(industry)}
            style={{
              padding: isMobile ? '6px 12px' : '8px 16px',
              borderRadius: '15px',
              border: 'none',
              backgroundColor: filterTag === industry ? '#0069b4' : '#f0f2f5',
              color: filterTag === industry ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: isMobile ? '12px' : '14px',
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
          profiles={jobProfiles}
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

export default JobsPage;