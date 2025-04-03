import React, { useEffect, useState } from 'react';
import { Code2, Zap, Cloud, ArrowRight, Github } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
function App() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const gradientAnimation = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 20000 },
    loop: true,
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const glowStyles = {
    boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)',
    animation: 'glow 2s infinite alternate',
  };

  return (
    <animated.div style={{ 
      minHeight: '100vh', 
      width: '100%',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(-45deg, #0f172a, #1e293b, #1a1c2c, #2d1b30)',
      backgroundSize: '400% 400%',
      ...gradientAnimation,
    }}>
      <style>
        {`
          @keyframes glow {
            from {
              box-shadow: 0 0 10px rgba(249, 115, 22, 0.4);
            }
            to {
              box-shadow: 0 0 20px rgba(249, 115, 22, 0.8);
            }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        style={{ 
          width: '100%', 
          borderBottom: '1px solid rgba(51, 65, 85, 0.5)', 
          padding: '1rem 0',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}>
        <div style={{ 
          maxWidth: '1280px', 
          marginLeft: 'auto', 
          marginRight: 'auto', 
          padding: '0.5rem 1.5rem',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}>
          <motion.div 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Replace the Server icon and text with the logo image */}
            <img 
  src="/logo.png" 
  alt="ORBIT Logo" 
  style={{ 
    maxHeight: '15vh', // Limits the image height
    objectFit: 'contain' // Keeps the aspect ratio
  }} 
/>

          </motion.div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <motion.a 
              href="#features" 
              style={{ color: '#d1d5db' }}
              whileHover={{ scale: 1.1, color: 'white' }}
              whileTap={{ scale: 0.95 }}
            >
              Features
            </motion.a>
            <motion.a 
              href="#try-it" 
              style={{ color: '#d1d5db' }}
              whileHover={{ scale: 1.1, color: 'white' }}
              whileTap={{ scale: 0.95 }}
            >
              Try It
            </motion.a>
            <motion.a 
              href="https://github.com/fnhub-io" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                backgroundColor: '#f97316', 
                color: 'white', 
                padding: '0.5rem 1rem', 
                borderRadius: '0.5rem',
                ...glowStyles
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github style={{ height: '1.25rem', width: '1.25rem' }} />
              <span>GitHub</span>
            </motion.a>
          </div>
        </div>
      </motion.nav>

      <main style={{ 
        flex: '1 1 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <motion.div 
          style={{ 
            width: '100%',
            padding: '5rem 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            style={{ 
              maxWidth: '1280px', 
              width: '100%',
              padding: '0 1.5rem',
              scale
            }}
          >
            <motion.h1 
              style={{ 
                fontSize: '3.5rem', 
                fontWeight: 'bold', 
                color: 'white', 
                marginBottom: '1.5rem',
                background: 'linear-gradient(45deg, #f97316, #ea580c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Serverless Rust Made Simple
            </motion.h1>
            <motion.p 
              style={{ 
                fontSize: '1.25rem', 
                color: '#d1d5db', 
                marginBottom: '3rem', 
                maxWidth: '42rem', 
                marginLeft: 'auto', 
                marginRight: 'auto' 
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Deploy your Rust applications instantly with our powerful serverless platform.
              Write, compile, and run Rust code directly in your browser.
            </motion.p>
            <motion.a
              href="#try-it"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                backgroundColor: '#f97316', 
                color: 'white', 
                padding: '0.75rem 2rem', 
                borderRadius: '0.5rem', 
                fontSize: '1.125rem', 
                fontWeight: '600',
                ...glowStyles
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span>Try It Now</span>
              <ArrowRight style={{ height: '1.25rem', width: '1.25rem' }} />
            </motion.a>
          </motion.div>
        </motion.div>

        <div id="features" style={{ 
          width: '100%',
          padding: '5rem 0',
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(10px)',
        }}>
          <motion.div 
            style={{ 
              maxWidth: '1280px',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: '0 1.5rem'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              style={{ 
                fontSize: '1.875rem', 
                fontWeight: 'bold', 
                color: 'white', 
                textAlign: 'center', 
                marginBottom: '3rem',
                background: 'linear-gradient(45deg, #f97316, #ea580c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Choose Orbit?
            </motion.h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '2rem' 
            }}>
              {[
                { Icon: Code2, title: 'Browser-Based Compilation', description: 'Compile and run your Rust code directly in the browser. No local setup required.' },
                { Icon: Zap, title: 'Lightning Fast', description: 'Experience blazing-fast compilation times with our optimized serverless infrastructure.' },
                { Icon: Cloud, title: 'Serverless Architecture', description: 'Scale automatically with serverless deployment. Pay only for what you use.' }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  style={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.5)', 
                    padding: '1.5rem', 
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(249, 115, 22, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(249, 115, 22, 0.2)',
                  }}
                >
                  <feature.Icon style={{ 
                    height: '3rem', 
                    width: '3rem', 
                    color: '#f97316', 
                    marginBottom: '1rem',
                    animation: 'float 3s ease-in-out infinite',
                  }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#9ca3af' }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          id="try-it" 
          style={{ 
            width: '100%',
            padding: '5rem 0' 
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div style={{ 
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 1.5rem'
          }}>
            <motion.div 
              style={{ 
                backgroundColor: 'rgba(30, 41, 59, 0.5)', 
                borderRadius: '0.75rem', 
                padding: '2rem',
                border: '1px solid rgba(249, 115, 22, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
              whileHover={{ 
                boxShadow: '0 0 30px rgba(249, 115, 22, 0.2)',
              }}
            >
              <motion.h2 
                style={{ 
                  fontSize: '1.875rem', 
                  fontWeight: 'bold', 
                  color: 'white', 
                  marginBottom: '1.5rem',
                  background: 'linear-gradient(45deg, #f97316, #ea580c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p 
                style={{ color: '#d1d5db', marginBottom: '2rem' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Jump right in and try our Rust compiler. Write your code, hit compile, and see the magic happen.
              </motion.p>
              <motion.a
                href="/upload"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  backgroundColor: '#f97316', 
                  color: 'white', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '0.5rem', 
                  fontWeight: '600',
                  ...glowStyles
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Go to Uploader</span>
                <ArrowRight style={{ height: '1.25rem', width: '1.25rem' }} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <footer style={{ 
        width: '100%',
        borderTop: '1px solid #334155',
        marginTop: 'auto',
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(10px)',
      }}>
        <motion.div 
          style={{ 
            maxWidth: '1280px', 
            marginLeft: 'auto', 
            marginRight: 'auto', 
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Update the footer logo as well */}
            <img 
              src="/path/to/orbit-logo.png" 
              alt="ORBIT Logo" 
              style={{ 
                height: '1.5rem', 
                objectFit: 'contain'
              }} 
            />
          </motion.div>
          <p style={{ color: '#9ca3af' }}>© 2025 ORBIT. All rights reserved.</p>
        </motion.div>
      </footer>
    </animated.div>
  );
}

export default App;