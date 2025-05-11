import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MigraTinder = () => {
  // Sample profile data - replace with your own content
  const initialProfiles = [
    {
      id: 1,
      name: "Digital Migration",
      age: "Case Study 1",
      bio: "How a small business successfully migrated from paper-based processes to cloud solutions, increasing productivity by 35%.",
      image: "https://picsum.photos/seed/digital/500/800"
    },
    {
      id: 2,
      name: "Data Migration",
      age: "Case Study 2",
      bio: "A healthcare provider's journey of securely transferring patient records to a new system while maintaining compliance and data integrity.",
      image: "https://picsum.photos/seed/data/500/800"
    },
    {
      id: 3,
      name: "Legacy Systems",
      age: "Challenge",
      bio: "Overcoming the challenges of integrating legacy systems with modern solutions without disrupting operations.",
      image: "https://picsum.photos/seed/legacy/500/800"
    },
    {
      id: 4,
      name: "Cloud Migration",
      age: "Strategy",
      bio: "Step-by-step approach to migrating infrastructure to the cloud with minimal downtime and maximum security.",
      image: "https://picsum.photos/seed/cloud/500/800"
    },
    {
      id: 5,
      name: "Migration Planning",
      age: "Best Practices",
      bio: "Key considerations and planning strategies to ensure a smooth migration process for any organization.",
      image: "https://picsum.photos/seed/planning/500/800"
    }
  ];

  const [profiles, setProfiles] = useState(initialProfiles);
  const [lastDirection, setLastDirection] = useState("");

  const removeCard = (id, direction) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
    setLastDirection(direction);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        position: 'relative', 
        width: '320px', 
        height: '550px',
        marginBottom: '20px'
      }}>
        <AnimatePresence>
          {profiles.length > 0 && profiles.map((profile, index) => (
            // Only render the top card to improve performance
            index === profiles.length - 1 && (
              <motion.div
                key={profile.id}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'white',
                  overflow: 'hidden',
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -100) {
                    removeCard(profile.id, "left");
                  } else if (swipe > 100) {
                    removeCard(profile.id, "right");
                  }
                }}
                whileDrag={{ scale: 1.05 }}
                exit={
                  lastDirection === "left"
                    ? { x: -300, opacity: 0, transition: { duration: 0.2 } }
                    : { x: 300, opacity: 0, transition: { duration: 0.2 } }
                }
              >
                <div style={{
                  width: '100%',
                  height: '65%',
                  backgroundImage: `url(${profile.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}></div>
                <div style={{ padding: '16px' }}>
                  <h2 style={{ margin: '0 0 4px 0', color: '#333' }}>
                    {profile.name} <span style={{ fontWeight: 'normal', fontSize: '18px' }}>{profile.age}</span>
                  </h2>
                  <p style={{ margin: '8px 0', color: '#777', fontSize: '14px' }}>{profile.bio}</p>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {profiles.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <h2>No more cards!</h2>
          <button 
            onClick={() => setProfiles(initialProfiles)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Restart
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <p>Swipe right if you like, left if you don't</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button
              onClick={() => removeCard(profiles[profiles.length - 1].id, "left")}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#FF5864',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ✖️
            </button>
            <button
              onClick={() => removeCard(profiles[profiles.length - 1].id, "right")}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#4CAF50',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ❤️
            </button>
          </div>
        </div>
      )}

      <div style={{ position: 'absolute', bottom: '10px', textAlign: 'center' }}>
        <p style={{ color: '#999', fontSize: '12px' }}>MigraDate App - Swipe through migration concepts</p>
      </div>
    </div>
  );
};

export default MigraTinder; 