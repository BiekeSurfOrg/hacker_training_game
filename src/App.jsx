import React, { useState, useEffect } from 'react'
import { MessageSquare, Shield, Globe, User, Send, ExternalLink, Terminal, Mail, CheckCircle, AlertCircle, Briefcase, Building, MapPin, Heart, Info, Search, Power, Target, Lock, Key, MousePointer2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { GameStateProvider, useGameState } from './context/GameStateContext'
import './index.css'

const ChatPanel = () => {
  const { messages, addMessage, currentMission, selectMission } = useGameState();
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    addMessage(inputValue, 'user');
    setInputValue('');
  };

  return (
    <aside className="panel">
      <header className="panel-header">
        <div className="panel-title">
          <Terminal size={14} className="neon-text" />
          <span>Encrypted Comm: Zero</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {currentMission && (
            <button
              onClick={() => selectMission(null)}
              style={{ background: 'rgba(255,50,50,0.2)', border: '1px solid rgba(255,50,50,0.5)', color: '#ff5f56', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Power size={10} /> ABORT
            </button>
          )}
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88' }} />
        </div>
      </header>

      <div className="chat-messages" style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {messages.map((msg, i) => (
          <motion.div
            initial={{ opacity: 0, x: msg.role === 'zero' ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            key={i}
            style={{
              marginBottom: '16px',
              alignSelf: msg.role === 'zero' ? 'flex-start' : 'flex-end',
              textAlign: msg.role === 'zero' ? 'left' : 'right',
              width: '100%'
            }}
          >
            <div style={{
              display: 'inline-block',
              padding: '10px 14px',
              borderRadius: '8px',
              backgroundColor: msg.role === 'zero' ? 'rgba(112, 0, 255, 0.2)' : 'rgba(0, 242, 255, 0.1)',
              border: `1px solid ${msg.role === 'zero' ? 'rgba(112, 0, 255, 0.3)' : 'rgba(0, 242, 255, 0.3)'}`,
              maxWidth: '85%',
              fontSize: '0.9rem',
              lineHeight: '1.4',
              color: msg.role === 'zero' ? '#e0e0e0' : '#00f2ff'
            }}>
              {msg.text}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              {msg.timestamp}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="chat-input" style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your response..."
          style={{
            flex: 1,
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '8px 12px',
            color: 'white',
            outline: 'none'
          }}
        />
        <button onClick={handleSend} style={{
          background: 'var(--accent-primary)',
          border: 'none',
          borderRadius: '6px',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Send size={18} color="black" />
        </button>
      </div>
    </aside>
  );
};

const SocialBrowser = ({ target }) => {
  const { collectEvidence, evidence } = useGameState();
  const [view, setView] = useState('posts');

  if (target === 'higgins') {
    return (
      <div style={{ maxWidth: '600px', margin: '20px auto', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
        <div style={{ height: '150px', background: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)', position: 'relative' }} />
        <div style={{ padding: '0 20px 20px', marginTop: '-40px', position: 'relative' }}>
          <div style={{ width: '130px', height: '130px', borderRadius: '50%', border: '4px solid white', background: '#ddd', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #ccc, #eee)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={64} color="#999" />
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#1c1e21' }}>Robert Higgins</h2>
            <p style={{ color: '#65676b', fontWeight: 500 }}>Manager at CloudTech Solutions</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #ddd', padding: '0 16px', display: 'flex', gap: '20px' }}>
          <div onClick={() => setView('posts')} style={{ padding: '15px 0', borderBottom: view === 'posts' ? '3px solid #1877f2' : 'none', color: view === 'posts' ? '#1877f2' : '#666', cursor: 'pointer', fontWeight: 600 }}>Posts</div>
          <div onClick={() => setView('about')} style={{ padding: '15px 0', borderBottom: view === 'about' ? '3px solid #1877f2' : 'none', color: view === 'about' ? '#1877f2' : '#666', cursor: 'pointer', fontWeight: 600 }}>About</div>
        </div>
        <div style={{ padding: '16px', background: '#f0f2f5' }}>
          {view === 'posts' ? (
            <div style={{ background: 'white', borderRadius: '8px', padding: '16px', border: evidence.includes('BARNABY_DOG') ? '2px solid #00ff88' : 'none' }}>
              <p>Can't believe <strong>Barnaby</strong> is already 5 years old! 🐾</p>
              <div onClick={() => collectEvidence('BARNABY_DOG')} style={{ height: '200px', background: '#eee', marginTop: '10px', borderRadius: '8px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=400" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {!evidence.includes('BARNABY_DOG') && <div style={{ position: 'absolute', top: 10, right: 10, background: '#00f2ff', color: 'black', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 800 }}>EXAMINE</div>}
              </div>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: '8px', padding: '16px' }}>
              <p>Born on <strong>August 24</strong></p>
              <button onClick={() => collectEvidence('BIRTHDAY_AUG24')} style={{ marginTop: '10px', background: '#1877f2', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Take Note</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (target === 'miller') {
    return (
      <div style={{ maxWidth: '600px', margin: '20px auto', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
        <div style={{ height: '150px', background: 'linear-gradient(to right, #ff9a9e 0%, #fecfef 100%)' }} />
        <div style={{ padding: '0 20px 20px', marginTop: '-40px' }}>
          <div style={{ width: '130px', height: '130px', borderRadius: '50%', border: '4px solid white', background: '#ddd', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ marginTop: '10px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#1c1e21' }}>Joe Miller</h2>
            <p style={{ color: '#65676b' }}>Living life one flight at a time ✈️</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #ddd', padding: '0 16px', display: 'flex', gap: '20px' }}>
          <div onClick={() => setView('posts')} style={{ padding: '15px 0', borderBottom: view === 'posts' ? '3px solid #1877f2' : 'none', color: view === 'posts' ? '#1877f2' : '#666', cursor: 'pointer', fontWeight: 600 }}>Feed</div>
          <div onClick={() => setView('about')} style={{ padding: '15px 0', borderBottom: view === 'about' ? '3px solid #1877f2' : 'none', color: view === 'about' ? '#1877f2' : '#666', cursor: 'pointer', fontWeight: 600 }}>About</div>
        </div>
        <div style={{ padding: '16px', background: '#f0f2f5' }}>
          {view === 'posts' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'white', borderRadius: '8px', padding: '16px', border: evidence.includes('JOE_CANCUN') ? '2px solid #00ff88' : 'none' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700 }}>Joe Miller</div>
                  <div style={{ color: '#1877f2', fontSize: '0.8rem' }}>at Austin-Bergstrom Airport</div>
                </div>
                <p>Off to <strong>Cancun</strong> for a week of relaxation! ✈️🍹 Don't call me!</p>
                <div onClick={() => collectEvidence('JOE_CANCUN')} style={{ height: '150px', background: '#eee', marginTop: '10px', borderRadius: '8px', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {!evidence.includes('JOE_CANCUN') && <div style={{ position: 'absolute', top: 10, right: 10, background: '#00f2ff', color: 'black', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 800 }}>NOTE LOCATION</div>}
                </div>
              </div>
              <div style={{ background: 'white', borderRadius: '8px', padding: '16px', border: evidence.includes('JOE_BUSTER_DOG') ? '2px solid #00ff88' : 'none' }}>
                <div style={{ fontWeight: 700, marginBottom: '8px' }}>Joe Miller</div>
                <p>Happy 5th Birthday to my best boy, <strong>Buster</strong>! 🐶🎂</p>
                <div onClick={() => collectEvidence('JOE_BUSTER_DOG')} style={{ height: '150px', background: '#eee', marginTop: '10px', borderRadius: '8px', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {!evidence.includes('JOE_BUSTER_DOG') && <div style={{ position: 'absolute', top: 10, right: 10, background: '#00f2ff', color: 'black', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 800 }}>NOTE PET</div>}
                </div>
              </div>
              <div style={{ background: 'white', borderRadius: '8px', padding: '16px', border: evidence.includes('JOE_WIFE_EMILY') ? '2px solid #00ff88' : 'none' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700 }}>Emily Miller</div>
                  <div style={{ color: '#65676b', fontSize: '0.8rem' }}>tagged you</div>
                </div>
                <p>So happy to celebrate 10 years with my amazing husband @Joe Miller! 🥂❤️</p>
                <button onClick={() => collectEvidence('JOE_WIFE_EMILY')} style={{ marginTop: '10px', background: evidence.includes('JOE_WIFE_EMILY') ? '#00ff88' : '#e4e6eb', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 600, color: 'black', cursor: 'pointer' }}>
                  {evidence.includes('JOE_WIFE_EMILY') ? 'Recorded: Emily' : 'Note Relationship'}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Birthday: <strong>March 14th</strong></span>
                <button style={{ background: 'none', border: 'none', color: '#1877f2', fontWeight: 600 }}>See Details</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (target === 'vance') {
    return (
      <div style={{ maxWidth: '600px', margin: '20px auto', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
        <div style={{ height: '150px', background: 'linear-gradient(to right, #00c6ff 0%, #0072ff 100%)' }} />
        <div style={{ padding: '0 20px 20px', marginTop: '-40px' }}>
          <div style={{ width: '130px', height: '130px', borderRadius: '50%', border: '4px solid white', background: '#ddd', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ marginTop: '10px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#1c1e21' }}>Elias Vance</h2>
            <p style={{ color: '#65676b' }}>Always looking for the next moonshot 🚀💎</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #ddd', padding: '0 16px', display: 'flex', gap: '20px' }}>
          <div onClick={() => setView('posts')} style={{ padding: '15px 0', borderBottom: view === 'posts' ? '3px solid #1877f2' : 'none', color: view === 'posts' ? '#1877f2' : '#666', cursor: 'pointer', fontWeight: 600 }}>Feed</div>
          <div onClick={() => setView('about')} style={{ padding: '15px 0', borderBottom: view === 'about' ? '3px solid #1877f2' : 'none', color: view === 'about' ? '#1877f2' : '#666', cursor: 'pointer', fontWeight: 600 }}>About</div>
        </div>
        <div style={{ padding: '16px', background: '#f0f2f5' }}>
          {view === 'posts' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'white', borderRadius: '8px', padding: '16px', border: evidence.includes('VANCE_LOSS_SOLANA') ? '2px solid #00ff88' : 'none' }}>
                <div style={{ fontWeight: 700, marginBottom: '8px' }}>Elias Vance</div>
                <p>RIP to my 500 SOL. Rugged again. 🤡 Lesson learned: never trust a project with 10k% APY. Just need one solid win to make it back.</p>
                <button onClick={() => collectEvidence('VANCE_LOSS_SOLANA')} style={{ marginTop: '10px', background: evidence.includes('VANCE_LOSS_SOLANA') ? '#00ff88' : '#e4e6eb', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 600, color: 'black', cursor: 'pointer' }}>
                  {evidence.includes('VANCE_LOSS_SOLANA') ? 'Note: 500 SOL Loss' : 'Record Loss'}
                </button>
              </div>
              <div style={{ background: 'white', borderRadius: '8px', padding: '16px', border: evidence.includes('VANCE_IDO_INTEREST') ? '2px solid #00ff88' : 'none' }}>
                <div style={{ fontWeight: 700, marginBottom: '8px' }}>Elias Vance</div>
                <p>Anyone got leads on upcoming IDOs that aren't trash? I'm looking for Tier 1 project allocations only. 📈</p>
                <button onClick={() => collectEvidence('VANCE_IDO_INTEREST')} style={{ marginTop: '10px', background: evidence.includes('VANCE_IDO_INTEREST') ? '#00ff88' : '#e4e6eb', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 600, color: 'black', cursor: 'pointer' }}>
                  {evidence.includes('VANCE_IDO_INTEREST') ? 'Target: IDO Interest' : 'Record Interest'}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: '8px', padding: '16px' }}>
              <p>Top Exchanges: <strong>BitVault Pro</strong>, Kraken, Binance</p>
              <button onClick={() => collectEvidence('VANCE_EXCHANGE_BITVAULT')} style={{ marginTop: '10px', background: evidence.includes('VANCE_EXCHANGE_BITVAULT') ? '#00ff88' : '#1877f2', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                {evidence.includes('VANCE_EXCHANGE_BITVAULT') ? 'Main Exchange Identified' : 'Note Exchange: BitVault'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}

const LinkedInBrowser = () => {
  const { collectEvidence, evidence } = useGameState();

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', background: '#f3f2ef', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}>
        <div style={{ height: '100px', background: '#a0b4b7' }} />
        <div style={{ padding: '0 24px 24px', marginTop: '-50px' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid white', background: '#eee', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ marginTop: '12px' }}>
            <h1 style={{ fontSize: '1.5rem', color: 'rgba(0,0,0,0.9)' }}>Joe Miller</h1>
            <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '1rem' }}>Junior Logistics Coordinator at Summit Peak Logistics</p>
            <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.8rem' }}>Austin, Texas • <span style={{ color: '#0a66c2', fontWeight: 600 }}>500+ connections</span></p>
          </div>
        </div>

        <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Activity</h3>
          <div style={{ background: 'white', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', position: 'relative' }}>
            {evidence.includes('JOE_PROJECT_HORIZON') && <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: '#00ff88' }} />}
            <div style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.8rem', marginBottom: '8px' }}>Joe Miller posted this • 2d</div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: 'black' }}>
              So excited to announce I’ve been promoted to lead the <strong>'Project Horizon'</strong> distribution team!
              Huge thanks to my manager, <strong>Sarah Jenkins</strong>, for the trust. #Logistics #CareerGrowth
            </p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
              <button onClick={() => collectEvidence('JOE_PROJECT_HORIZON')} style={{ background: evidence.includes('JOE_PROJECT_HORIZON') ? '#00ff88' : '#0a66c2', color: evidence.includes('JOE_PROJECT_HORIZON') ? 'black' : 'white', border: 'none', padding: '6px 14px', borderRadius: '16px', cursor: 'pointer', fontWeight: 600 }}>
                {evidence.includes('JOE_PROJECT_HORIZON') ? 'Project Saved' : 'Note Project'}
              </button>
              <button onClick={() => collectEvidence('JOE_MANAGER_SARAH')} style={{ background: evidence.includes('JOE_MANAGER_SARAH') ? '#00ff88' : '#eef3f8', color: '#0a66c2', border: 'none', padding: '6px 14px', borderRadius: '16px', cursor: 'pointer', fontWeight: 600 }}>
                {evidence.includes('JOE_MANAGER_SARAH') ? 'Manager Identified' : 'Note Manager: Sarah'}
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Skills</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div onClick={() => collectEvidence('JOE_NETSUITE')} style={{ background: evidence.includes('JOE_NETSUITE') ? '#00ff88' : '#eef3f8', color: 'black', padding: '8px 16px', borderRadius: '16px', cursor: 'pointer', border: '1px solid #ccc', fontWeight: 600 }}>
              NetSuite ERP
            </div>
            <div style={{ background: '#eef3f8', color: 'black', padding: '8px 16px', borderRadius: '16px' }}>Project Management</div>
            <div style={{ background: '#eef3f8', color: 'black', padding: '8px 16px', borderRadius: '16px' }}>Supply Chain</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CorporateBrowser = () => {
  const { collectEvidence, evidence } = useGameState();

  return (
    <div style={{ flex: 1, background: 'white', color: '#333' }}>
      <div style={{ background: '#002d54', padding: '20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '1px' }}>SUMMIT PEAK LOGISTICS</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>Solutions</span>
          <span>Routes</span>
          <span>About</span>
          <span style={{ borderBottom: '2px solid white' }}>Careers</span>
        </div>
      </div>
      <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '20px' }}>Press Releases</h1>
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #002d54' }}>
          <div style={{ color: '#666', fontSize: '0.8rem', marginBottom: '10px' }}>Published: 1 week ago</div>
          <h2>Summit Peak Logistics partners with GlobalFreight Solutions to expand Mexican distribution routes.</h2>
          <p style={{ marginTop: '10px', color: '#444' }}>
            The partnership with <strong>GlobalFreight Solutions</strong> will enable seamless transit for Q3 distribution loads...
          </p>
          <button onClick={() => collectEvidence('JOE_GLOBALFREIGHT')} style={{ marginTop: '15px', background: evidence.includes('JOE_GLOBALFREIGHT') ? '#00ff88' : '#002d54', color: evidence.includes('JOE_GLOBALFREIGHT') ? 'black' : 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
            {evidence.includes('JOE_GLOBALFREIGHT') ? 'Partner Recorded' : 'Record Partner: GlobalFreight'}
          </button>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h3>Contact Us</h3>
          <div style={{ marginTop: '10px', padding: '10px', background: '#eee', borderRadius: '4px' }}>
            IT Support Helpdesk: <strong>support@summitpeaklogistics.com</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

const CryptoExchange = () => {
  return (
    <div style={{ flex: 1, background: '#0e1118', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#1a1f2e', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2d364a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#0072ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>BV</div>
          <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '1px' }}>BITVAULT <span style={{ color: '#0072ff' }}>PRO</span></span>
        </div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '0.9rem', color: '#a0aec0' }}>
          <span>Markets</span>
          <span>Trade</span>
          <span style={{ color: '#0072ff', fontWeight: 700 }}>Launchpad</span>
          <span>VIP</span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button style={{ background: 'transparent', border: '1px solid #2d364a', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Log In</button>
          <button style={{ background: '#0072ff', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 700 }}>Register</button>
        </div>
      </div>
      <div style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Tier 1 <span style={{ color: '#0072ff' }}>Launchpad</span></h1>
            <p style={{ color: '#a0aec0', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '40px' }}>
              BitVault Pro Launchpad is a highly selective platform for the world's most innovative blockchain projects.
              We provide our VIP members with early access to institutional-grade IDOs.
            </p>
            <div style={{ background: 'rgba(0,114,255,0.05)', border: '1px solid rgba(0,114,255,0.2)', padding: '30px', borderRadius: '16px' }}>
              <h3 style={{ marginBottom: '15px' }}>Upcoming IDO: <span style={{ color: '#00ff88' }}>NovaChain (NOVA)</span></h3>
              <div style={{ display: 'flex', gap: '40px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '4px' }}>PRICE</div>
                  <div style={{ fontWeight: 700 }}>1 NOVA = 0.05 USDT</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '4px' }}>QUOTA</div>
                  <div style={{ fontWeight: 700 }}>VIP ONLY</div>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#a0aec0', marginBottom: '20px' }}>
                Access to the NOVA IDO is strictly limited to BitVault VIP Level 3 and above.
                Invitation tokens will be sent to eligible accounts via registered email.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#1a1f2e', padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ marginBottom: '15px', color: '#a0aec0' }}>VIP Stats</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#4a5568' }}>Active VIPs</span>
                  <span>14,202</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#4a5568' }}>Total IDO Fill</span>
                  <span style={{ color: '#00ff88' }}>$42.5M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrowserSimulation = () => {
  const { currentMission } = useGameState();
  const [tab, setTab] = useState(currentMission === 'MISSION_1' ? 'social' : currentMission === 'MISSION_2' ? 'linkedin' : 'crypto');

  useEffect(() => {
    setTab(currentMission === 'MISSION_1' ? 'social' : currentMission === 'MISSION_2' ? 'linkedin' : 'crypto');
  }, [currentMission]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ background: '#e0e0e0', padding: '4px 10px', display: 'flex', gap: '4px' }}>
        {currentMission === 'MISSION_2' && (
          <>
            <button onClick={() => setTab('linkedin')} style={{ padding: '6px 12px', background: tab === 'linkedin' ? 'white' : 'transparent', border: tab === 'linkedin' ? '1px solid #ccc' : 'none', borderBottom: 'none', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'black' }}>
              <Briefcase size={14} /> LinkedIn
            </button>
            <button onClick={() => setTab('corp')} style={{ padding: '6px 12px', background: tab === 'corp' ? 'white' : 'transparent', border: tab === 'corp' ? '1px solid #ccc' : 'none', borderBottom: 'none', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'black' }}>
              <Building size={14} /> Summit Peak
            </button>
          </>
        )}
        {currentMission === 'MISSION_3' && (
          <button onClick={() => setTab('crypto')} style={{ padding: '6px 12px', background: tab === 'crypto' ? 'white' : 'transparent', border: tab === 'crypto' ? '1px solid #ccc' : 'none', borderBottom: 'none', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'black' }}>
            <Key size={14} /> BitVault Pro
          </button>
        )}
        <button onClick={() => setTab('social')} style={{ padding: '6px 12px', background: tab === 'social' ? 'white' : 'transparent', border: tab === 'social' ? '1px solid #ccc' : 'none', borderBottom: 'none', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'black' }}>
          <Globe size={14} /> SocialConnect
        </button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', background: tab === 'social' ? '#f0f2f5' : tab === 'crypto' ? '#0e1118' : '#f3f2ef' }}>
        {tab === 'social' && <SocialBrowser target={currentMission === 'MISSION_1' ? 'higgins' : currentMission === 'MISSION_2' ? 'miller' : 'vance'} />}
        {tab === 'linkedin' && <LinkedInBrowser />}
        {tab === 'corp' && <CorporateBrowser />}
        {tab === 'crypto' && <CryptoExchange />}
      </div>
    </div>
  );
};

const Clipboard = () => {
  const { evidence, evidenceMap } = useGameState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 100 }}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          background: 'rgba(0, 242, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #00f2ff',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(0, 242, 255, 0.3)'
        }}
      >
        <Terminal size={24} color="#00f2ff" />
        {evidence.length > 0 && !isOpen && (
          <div style={{ position: 'absolute', top: -5, right: -5, background: '#ff3e3e', color: 'white', fontSize: '0.7rem', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {evidence.length}
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '70px',
              left: 0,
              width: '300px',
              background: 'rgba(10, 11, 16, 0.95)',
              backdropFilter: 'blur(15px)',
              border: '1px solid #00f2ff33',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              maxHeight: '400px',
              overflowY: 'auto'
            }}
          >
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #ffffff11', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={14} color="#00f2ff" />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#00f2ff', letterSpacing: '1px' }}>CAPTURED INTEL</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>×</button>
            </header>

            {evidence.length === 0 ? (
              <div style={{ color: '#666', fontSize: '0.8rem', textAlign: 'center', padding: '20px' }}>No intelligence gathered yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {evidence.map(id => (
                  <div key={id} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '6px', borderLeft: '2px solid #00f2ff' }}>
                    <div style={{ fontSize: '0.65rem', color: '#00f2ff', textTransform: 'uppercase', marginBottom: '2px', opacity: 0.7 }}>{evidenceMap[id]?.label || 'Evidence'}</div>
                    <div style={{ fontSize: '0.85rem', color: '#e0e0e0' }}>{evidenceMap[id]?.value || id}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EmailDrafter = () => {
  const { addMessage, currentMission, selectMission } = useGameState();
  const [sent, setSent] = useState(false);
  const [showExploit, setShowExploit] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);

  const m1Email = {
    from: 'Bean & Brew Rewards <loyalty@bean-n-brew.com>',
    to: 'robert.higgins@cloudtech.com',
    subject: 'Happy Birthday Robert! Your Barnaby-themed gift awaits!',
    body: `Hi Robert, 

Happy Birthday! We saw you were celebrating Barnaby's 5th birthday! As a valued regular at Bean & Brew, we've loaded a special "Birthday Croissant & Coffee" reward to your account.

To claim your reward, please verify your loyalty account via our secure portal:`,
    link: 'https://bean-n-brew-rewards.com/claim-reward/higgins',
    linkText: 'https://bean-n-brew.com/loyalty/verify',
    footer: `
Enjoy your day!
- The Bean & Brew Team`,
    exploitType: 'Credential Harvesting',
    exploitDesc: 'This link redirects the victim to a fake "NetSuite" or "Bean & Brew" login page. When Robert enters his corporate email and password to "verify" his identity, those credentials are sent directly to your server.',
    exploitIcon: <Lock size={24} />,
    triggers: ['Personalization (Dog)', 'Reward Scarcity', 'Familiar Brand']
  };

  const m2Email = {
    from: 'sarah.jenkins@summit-peak-logistics.net',
    to: 'jmiller@summitpeaklogistics.com',
    subject: 'URGENT: Project Horizon / GlobalFreight Issue - Action Required',
    body: `Hi Joe,
I know you're down in Cancun right now (hope the weather is better there than here!), and I hate to bother you while you're celebrating with Emily.

However, we hit a critical snag with the Project Horizon rollout this morning. GlobalFreight Solutions is claiming they never received the final manifest for the Q3 distribution.

Since you are the lead on this now, I need you to quickly log into the NetSuite portal and approve the attached manifest so we don't miss the shipping window.

Please click the link below to verify:`,
    link: 'https://summitpeak-netsuite-portal-login.com/auth',
    linkText: 'https://summitpeaklogistics.com/netsuite/login',
    footer: `
P.S. Give Buster a pet for me when you get back!

Best,
Sarah Jenkins
VP of Operations`,
    exploitType: 'Credential Harvesting',
    exploitDesc: 'By spoofing his manager and referencing specific project names (Project Horizon) and family members (Emily, Buster), you created a scenario where Joe feels safe. The link clones the real NetSuite ERP login page, capturing his high-level logistics access.',
    exploitIcon: <Key size={24} />,
    triggers: ['Authority (Manager)', 'Urgency (Snag)', 'Personalization (Family/Pets)']
  };

  const m3Email = {
    from: 'BitVault Pro VIP Desk <vip.allocations@bitvault-pro.net>',
    to: 'e.vance@vancemail.com',
    subject: 'EXCLUSIVE: Priority Access Token - NovaChain (NOVA) IDO',
    body: `Dear Elias,
We noticed your recent activity on the BitVault Pro platform. As a Tier 1 investor, you have been selected for exclusive early access to the NovaChain (NOVA) IDO.

We understand you recently experienced a setback with a third-party project. BitVault Pro is committed to providing our VIPs with secure, institutional-grade opportunities to rebuild and grow their portfolios.

Your unique allocation of 50,000 NOVA is ready. 

Please click the button below to claim your allocation on the BitVault VIP Portal:`,
    link: 'https://bitvault-pro-vip-portal.com/claim/vance-nova',
    linkText: 'https://bitvault-pro.net/vip/claim',
    footer: `
Note: This invitation is unique to your account and will expire in 4 hours.

Best regards,
The BitVault Pro VIP Team`,
    exploitType: 'Credential Harvesting / Wallet Drainer',
    exploitDesc: 'This payload targets "Greed" and "Loss Aversion". By referencing his recent 500 SOL loss and offering an "exclusive" way to recover, you bypass his normal suspicion. The portal will ask for his BitVault credentials and eventually his seed phrase to "verify wallet compatibility".',
    exploitIcon: <Shield size={24} />,
    triggers: ['Exclusivity (VIP)', 'Loss Recovery', 'Urgency (4 Hour Window)']
  };

  const email = currentMission === 'MISSION_1' ? m1Email : currentMission === 'MISSION_2' ? m2Email : m3Email;

  const handleSendEmail = () => {
    setSent(true);
    if (currentMission === 'MISSION_1') {
      setTimeout(() => {
        addMessage("Zero: Success. Robert just clicked. He's trying to claim that croissant with his work login. We're in.", 'zero');
        setTimeout(() => {
          setShowExploit(true);
          addMessage("Zero: Mission 1 Complete. Return to the Hub or move to the next target.", 'zero');
        }, 1500);
      }, 1000);
    } else if (currentMission === 'MISSION_2') {
      setTimeout(() => {
        addMessage("Zero: Payload active... and he's hooked! He thinks his boss Sarah sent that email. The personal touches worked perfectly.", 'zero');
        setTimeout(() => {
          setShowExploit(true);
          addMessage("Zero: Miller just leaked his NetSuite credentials. Summit Peak is wide open. Good work, kid.", 'zero');
          setTimeout(() => {
            addMessage("Zero: Remember: People hack people, not just computers. Public data is the blueprint for the key.", 'zero');
          }, 2000);
        }, 2000);
      }, 1500);
    } else {
      setTimeout(() => {
        addMessage("Zero: Vance took the bait. He just entered his BitVault 2FA code. Greedy people are the easiest to hack.", 'zero');
        setTimeout(() => {
          setShowExploit(true);
          addMessage("Zero: We've got his entire portfolio. 500 SOL? That's just the tip of the iceberg. Excellent work.", 'zero');
        }, 1500);
      }, 1500);
    }
  };

  return (
    <div style={{ flex: 1, padding: '20px', background: '#1a1b25' }}>
      <div style={{ background: 'white', borderRadius: '8px', color: 'black', maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', position: 'relative' }}>
        <div style={{ background: '#0a66c2', color: 'white', padding: '12px 20px', borderBottom: '1px solid #ddd', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
          <span>Phish-O-Matic 3000: Payload Deployment</span>
          <Mail size={16} />
        </div>
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ color: '#666', fontSize: '0.8rem' }}>SENDER SPOOF</div>
            <div style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>{email.from}</strong></div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ color: '#666', fontSize: '0.8rem' }}>TARGET</div>
            <div style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>{email.to}</strong></div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ color: '#666', fontSize: '0.8rem' }}>SUBJECT</div>
            <div style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>{email.subject}</strong></div>
          </div>
          <div>
            <div style={{ color: '#666', fontSize: '0.8rem' }}>BODY PAYLOAD</div>
            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '4px', marginTop: '5px', fontSize: '0.9rem' }}>
              {email.body}
              <div
                onMouseEnter={() => setHoveringLink(true)}
                onMouseLeave={() => setHoveringLink(false)}
                style={{
                  color: '#0066cc',
                  textDecoration: 'underline',
                  margin: '10px 0',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                {email.linkText}
                {hoveringLink && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    background: '#1a1b25',
                    color: '#00ff88',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    border: '1px solid #00ff88',
                    zIndex: 100,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    marginTop: '5px'
                  }}>
                    Link Destination: {email.link}
                  </div>
                )}
              </div>
              {email.footer}
            </div>
          </div>
        </div>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #ddd', background: '#eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => selectMission(null)} style={{ background: 'transparent', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>ABORT</button>
          <button onClick={handleSendEmail} disabled={sent} style={{ padding: '10px 30px', background: sent ? '#00ff88' : '#0a66c2', color: sent ? 'black' : 'white', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>
            {sent ? 'TARGET COMPROMISED' : 'SEND PHISH'}
          </button>
        </div>

        <AnimatePresence>
          {showExploit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ position: 'absolute', inset: 0, background: '#1a1b25f2', zIndex: 10, padding: '40px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: '8px' }}
            >
              <div style={{ background: 'rgba(0,242,255,0.05)', border: '1px solid #00f2ff', padding: '30px', borderRadius: '12px', maxWidth: '450px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ color: '#00f2ff' }}>{email.exploitIcon}</div>
                  <h2 style={{ letterSpacing: '2px' }}>EXPLOIT BREAKDOWN</h2>
                </div>

                <div style={{ textAlign: 'left', marginBottom: '25px' }}>
                  <h4 style={{ color: '#00ff88', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '10px' }}>Attack Vector: {email.exploitType}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: '1.6' }}>{email.exploitDesc}</p>
                </div>

                <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '30px' }}>
                  <h4 style={{ color: '#ffbd2e', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '1px', marginBottom: '10px' }}>Psychological Triggers Used:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {email.triggers.map(t => (
                      <span key={t} style={{ fontSize: '0.65rem', background: 'rgba(255,189,46,0.1)', color: '#ffbd2e', border: '1px solid rgba(255,189,46,0.3)', padding: '4px 8px', borderRadius: '4px' }}>{t}</span>
                    ))}
                  </div>
                </div>

                <button onClick={() => selectMission(null)} style={{ background: '#00f2ff', color: 'black', border: 'none', padding: '12px 40px', borderRadius: '4px', fontWeight: 800, cursor: 'pointer', letterSpacing: '1px' }}>RETURN TO HUB</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MissionHub = () => {
  const { selectMission, completedMissions } = useGameState();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', background: 'radial-gradient(circle at center, #1a1b25 0%, #0a0b10 100%)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="neon-text" style={{ fontSize: '3rem', marginBottom: '10px' }}>MISSION HUB</h1>
        <p style={{ color: 'var(--text-dim)' }}>Select a target profile to begin reconnaissance.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1000px', width: '100%' }}>
        {[
          { id: 'MISSION_1', name: 'Robert Higgins', role: 'Middle Manager', level: 'EASY', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
          { id: 'MISSION_2', name: 'Joe Miller', role: 'Logistics Lead', level: 'INTERMEDIATE', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200' },
          { id: 'MISSION_3', name: 'Elias Vance', role: 'Crypto Investor', level: 'HARD', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }
        ].map(mission => (
          <motion.div
            whileHover={{ scale: 1.02, borderColor: 'var(--accent-primary)' }}
            key={mission.id}
            onClick={() => selectMission(mission.id)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(0,242,255,0.2)',
              borderRadius: '16px',
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              gap: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {completedMissions.includes(mission.id) && (
              <div style={{ position: 'absolute', top: 10, right: 10, background: '#00ff88', color: 'black', padding: '2px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 800 }}>COMPLETED</div>
            )}
            <img src={mission.img} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} alt={mission.name} />
            <div>
              <h3 style={{ color: 'white', marginBottom: '4px' }}>{mission.name}</h3>
              <p style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>{mission.role}</p>
              <span style={{ fontSize: '0.7rem', color: mission.level === 'EASY' ? '#00ff88' : '#ffbd2e', border: `1px solid ${mission.level === 'EASY' ? '#00ff88' : '#ffbd2e'}`, padding: '2px 6px', borderRadius: '4px' }}>{mission.level}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ marginTop: '40px', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Shield size={14} /> Encrypted Session Active
      </motion.div>
    </div>
  );
};

const MainArea = () => {
  const { currentMission, step } = useGameState();

  return (
    <main className="panel active-task" style={{ position: 'relative' }}>
      {!currentMission ? (
        <MissionHub />
      ) : (
        <>
          <header className="panel-header">
            <div className="panel-title">
              <Target size={14} className="neon-text" />
              <span>{step === 1 ? 'Target Reconnaissance' : 'Exploitation Tool'}</span>
            </div>
          </header>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMission + step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
              {step === 1 ? <BrowserSimulation /> : <EmailDrafter />}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </main>
  );
};

function App() {
  return (
    <GameStateProvider>
      <div className="hacker-os">
        <ChatPanel />
        <MainArea />
        <Clipboard />
      </div>
    </GameStateProvider>
  )
}

export default App
