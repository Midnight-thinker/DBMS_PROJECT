import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, User, Settings, CreditCard, Bell, LogOut, ChevronRight } from 'lucide-react';
import './LandingPage.css';

const AccountInfo = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [profile, setProfile] = useState({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    location: 'San Francisco, CA'
  });
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/profiles/')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProfile(data[0]);
          setProfileId(data[0].id);
        }
      })
      .catch(err => console.error("Error fetching profile", err));
  }, []);

  const handleSaveProfile = () => {
    const url = profileId 
      ? `http://localhost:8000/api/profiles/${profileId}/` 
      : 'http://localhost:8000/api/profiles/';
    const method = profileId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile)
    })
    .then(res => res.json())
    .then(data => {
      setProfile(data);
      setProfileId(data.id);
      alert('Profile saved successfully!');
    })
    .catch(err => {
      console.error('Error saving profile', err);
      alert('Failed to save profile');
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="landing-page" style={{minHeight: '100vh', backgroundColor: '#F4F5F7'}}>
      <nav className="navbar" style={{background: '#003b2b', position: 'sticky', top: 0, zIndex: 100}}>
        <div className="container nav-content">
          <Link to="/" className="logo" style={{color: 'white', textDecoration: 'none'}}>
            <Compass className="icon" style={{color: '#10b981'}} />
            <span style={{fontFamily: 'Outfit, sans-serif', fontWeight: 800}}>RouteCraft</span>
          </Link>
          <div className="nav-actions">
            <div className="profile-menu" style={{position: 'relative'}}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="profile-btn" style={{background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'background 0.2s'}}>
                <User size={20} />
              </button>
              <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <Link to="/dashboard" className="dropdown-item">My plans</Link>
                <Link to="/account" className="dropdown-item">Account Info</Link>
                <button onClick={handleSignOut} className="dropdown-item text-danger" style={{width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '10px 16px'}}>Sign Out</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container" style={{padding: '40px 24px', display: 'flex', gap: '40px', alignItems: 'flex-start'}}>
        <aside style={{width: '250px', background: 'white', borderRadius: '12px', padding: '20px 0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flexShrink: 0}}>
          <h3 style={{padding: '0 20px', marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '1px'}}>Account Settings</h3>
          <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
            <li>
              <button onClick={() => setActiveTab('profile')} style={{width: '100%', display: 'flex', alignItems: 'center', padding: '12px 20px', border: 'none', background: activeTab === 'profile' ? '#f3f4f6' : 'transparent', color: activeTab === 'profile' ? '#111827' : '#4b5563', cursor: 'pointer', fontWeight: activeTab === 'profile' ? 600 : 400, textAlign: 'left', transition: 'background 0.2s'}}>
                <User size={18} style={{marginRight: '12px', color: activeTab === 'profile' ? '#10b981' : '#9ca3af'}} /> Profile Info
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('preferences')} style={{width: '100%', display: 'flex', alignItems: 'center', padding: '12px 20px', border: 'none', background: activeTab === 'preferences' ? '#f3f4f6' : 'transparent', color: activeTab === 'preferences' ? '#111827' : '#4b5563', cursor: 'pointer', fontWeight: activeTab === 'preferences' ? 600 : 400, textAlign: 'left', transition: 'background 0.2s'}}>
                <Settings size={18} style={{marginRight: '12px', color: activeTab === 'preferences' ? '#10b981' : '#9ca3af'}} /> Preferences
              </button>
            </li>

            <li>
              <button onClick={() => setActiveTab('notifications')} style={{width: '100%', display: 'flex', alignItems: 'center', padding: '12px 20px', border: 'none', background: activeTab === 'notifications' ? '#f3f4f6' : 'transparent', color: activeTab === 'notifications' ? '#111827' : '#4b5563', cursor: 'pointer', fontWeight: activeTab === 'notifications' ? 600 : 400, textAlign: 'left', transition: 'background 0.2s'}}>
                <Bell size={18} style={{marginRight: '12px', color: activeTab === 'notifications' ? '#10b981' : '#9ca3af'}} /> Notifications
              </button>
            </li>
          </ul>
        </aside>

        <main style={{flex: 1, background: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'}}>
          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <h2 style={{fontFamily: 'var(--font-serif)', fontSize: '28px', color: '#111827', marginBottom: '24px'}}>Profile Information</h2>
              <div style={{display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px'}}>
                <div style={{width: '80px', height: '80px', borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af'}}>
                  <User size={40} />
                </div>
                <div>
                  <button className="btn btn-secondary" style={{marginBottom: '8px'}}>Upload New Photo</button>
                  <p style={{fontSize: '12px', color: '#6b7280'}}>JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>
              
              <form style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px'}}>
                <div style={{display: 'flex', gap: '20px'}}>
                  <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <label style={{fontSize: '14px', fontWeight: 600, color: '#374151'}}>First Name</label>
                    <input type="text" value={profile.first_name || ''} onChange={(e) => setProfile({...profile, first_name: e.target.value})} style={{padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none'}} />
                  </div>
                  <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <label style={{fontSize: '14px', fontWeight: 600, color: '#374151'}}>Last Name</label>
                    <input type="text" value={profile.last_name || ''} onChange={(e) => setProfile({...profile, last_name: e.target.value})} style={{padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none'}} />
                  </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <label style={{fontSize: '14px', fontWeight: 600, color: '#374151'}}>Email Address</label>
                  <input type="email" value={profile.email || ''} onChange={(e) => setProfile({...profile, email: e.target.value})} style={{padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none'}} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <label style={{fontSize: '14px', fontWeight: 600, color: '#374151'}}>Location</label>
                  <input type="text" value={profile.location || ''} onChange={(e) => setProfile({...profile, location: e.target.value})} style={{padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none'}} />
                </div>
                <button type="button" onClick={handleSaveProfile} className="btn btn-primary" style={{alignSelf: 'flex-start', marginTop: '16px', background: '#10b981', border: 'none', padding: '10px 24px'}}>Save Changes</button>
              </form>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="animate-fade-in" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', color: '#6b7280'}}>
              <Bell size={48} style={{marginBottom: '16px', opacity: 0.2}} />
              <p style={{fontSize: '16px', fontWeight: 500}}>There is no current notification.</p>
            </div>
          )}
          
          {activeTab === 'preferences' && (
            <div className="animate-fade-in">
              <h2 style={{fontFamily: 'var(--font-serif)', fontSize: '28px', color: '#111827', marginBottom: '8px'}}>Preferences</h2>
              <p style={{color: '#6b7280', marginBottom: '32px'}}>Manage your language, theme, and privacy settings.</p>

              <div style={{display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '500px'}}>
                {/* Language & Region */}
                <div>
                  <h3 style={{fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px'}}>Language & Region</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                      <label style={{fontSize: '14px', fontWeight: 500, color: '#374151'}}>Display Language</label>
                      <select style={{padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: 'white'}}>
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                      <label style={{fontSize: '14px', fontWeight: 500, color: '#374151'}}>Currency</label>
                      <select style={{padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: 'white'}}>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>INR (₹)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Theme & Appearance */}
                <div>
                  <h3 style={{fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px'}}>Appearance</h3>
                  <div style={{display: 'flex', gap: '16px'}}>
                    <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                      <input type="radio" name="theme" defaultChecked />
                      <span style={{fontSize: '14px', color: '#374151'}}>Light</span>
                    </label>
                    <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                      <input type="radio" name="theme" />
                      <span style={{fontSize: '14px', color: '#374151'}}>Dark</span>
                    </label>
                    <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                      <input type="radio" name="theme" />
                      <span style={{fontSize: '14px', color: '#374151'}}>System Auto</span>
                    </label>
                  </div>
                </div>

                {/* Privacy */}
                <div>
                  <h3 style={{fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px'}}>Privacy</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <label style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'}}>
                      <span style={{fontSize: '14px', color: '#374151', fontWeight: 500}}>Make my profile public</span>
                      <input type="checkbox" style={{width: '18px', height: '18px', accentColor: '#10b981'}} />
                    </label>
                    <label style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'}}>
                      <span style={{fontSize: '14px', color: '#374151', fontWeight: 500}}>Allow search engines to index my trips</span>
                      <input type="checkbox" style={{width: '18px', height: '18px', accentColor: '#10b981'}} />
                    </label>
                  </div>
                </div>

                <button type="button" className="btn btn-primary" style={{alignSelf: 'flex-start', marginTop: '16px', background: '#10b981', border: 'none', padding: '10px 24px'}}>Save Preferences</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AccountInfo;
