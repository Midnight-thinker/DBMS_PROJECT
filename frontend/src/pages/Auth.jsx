import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, Mail, Lock, User as UserIcon } from 'lucide-react';
import './LandingPage.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="landing-page animate-fade-in" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <nav className="navbar" style={{background: '#003b2b'}}>
        <div className="container nav-content">
          <Link to="/" className="logo" style={{color: 'white', textDecoration: 'none'}}>
            <Compass className="icon" style={{color: '#10b981'}} />
            <span style={{fontFamily: 'Outfit, sans-serif', fontWeight: 800, letterSpacing: '-0.5px'}}>RouteCraft</span>
          </Link>
        </div>
      </nav>

      <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F5F7', padding: '40px 20px'}}>
        <div className="card" style={{maxWidth: '400px', width: '100%', padding: '40px', background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)'}}>
          <div style={{textAlign: 'center', marginBottom: '32px'}}>
            <h2 style={{fontFamily: 'var(--font-serif)', fontSize: '32px', color: '#111827', marginBottom: '8px'}}>{isLogin ? 'Welcome Back' : 'Join RouteCraft'}</h2>
            <p style={{color: '#6b7280', fontSize: '15px'}}>{isLogin ? 'Sign in to access your plans.' : 'Create an account to start planning.'}</p>
          </div>

          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {!isLogin && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <label style={{fontSize: '14px', fontWeight: 600, color: '#374151'}}>Full Name</label>
                <div style={{position: 'relative'}}>
                  <UserIcon size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af'}} />
                  <input type="text" required placeholder="John Doe" style={{width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s'}} />
                </div>
              </div>
            )}
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              <label style={{fontSize: '14px', fontWeight: 600, color: '#374151'}}>Email Address</label>
              <div style={{position: 'relative'}}>
                <Mail size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af'}} />
                <input type="email" required placeholder="you@example.com" style={{width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none'}} />
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              <label style={{fontSize: '14px', fontWeight: 600, color: '#374151'}}>Password</label>
              <div style={{position: 'relative'}}>
                <Lock size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af'}} />
                <input type="password" required placeholder="••••••••" style={{width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none'}} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '12px', borderRadius: '8px', marginTop: '8px', backgroundColor: '#10b981', border: 'none', fontWeight: 700, fontSize: '16px'}}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div style={{marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#6b7280'}}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} style={{background: 'none', border: 'none', color: '#10b981', fontWeight: 600, cursor: 'pointer', padding: 0}}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
