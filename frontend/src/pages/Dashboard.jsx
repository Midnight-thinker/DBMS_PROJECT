import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Plus, MapPin, Calendar, User, Edit2, Trash2 } from 'lucide-react';
import { api } from '../api';
import { format } from 'date-fns';
import './Dashboard.css';

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      const data = await api.getTrips();
      setTrips(data);
    } catch (error) {
      console.error("Failed to fetch trips", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502602898657-3e907614f141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  const handleSaveTrip = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const randomImage = DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];
    const coverImage = editingTrip?.cover_image_url || randomImage;

    const tripData = {
      title: formData.get('title'),
      destination: formData.get('destination'),
      start_date: formData.get('start_date'),
      end_date: formData.get('end_date'),
      cover_image_url: coverImage
    };
    
    try {
      if (editingTrip) {
        await api.updateTrip(editingTrip.id, tripData);
      } else {
        await api.createTrip(tripData);
      }
      setShowModal(false);
      setEditingTrip(null);
      fetchTrips();
    } catch (error) {
      console.error("Failed to save trip", error);
    }
  };

  const handleDeleteTrip = async (id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      await api.deleteTrip(id);
      fetchTrips();
    }
  };

  return (
    <div className="dashboard animate-fade-in">
      <nav className="navbar" style={{background: '#003b2b'}}>
        <div className="container nav-content">
          <Link to="/" className="logo" style={{color: 'white', textDecoration: 'none'}}>
            <Compass className="icon" style={{color: '#10b981'}} />
            <span style={{fontFamily: 'Outfit, sans-serif', fontWeight: 800, letterSpacing: '-0.5px'}}>RouteCraft</span>
          </Link>
          <div className="nav-profile-container">
            <div className="nav-profile" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <User className="profile-icon" />
            </div>
            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <Link to="/dashboard" className="dropdown-item">My plans</Link>
              <Link to="/account" className="dropdown-item">Account Info</Link>
              <Link to="/auth" className="dropdown-item">Sign In/Out</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container dashboard-content" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="dashboard-header" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '36px', color: '#111827', fontFamily: 'var(--font-serif)' }}>My Plans</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ backgroundColor: '#5E7B89', border: 'none', padding: '10px 20px', fontWeight: 'bold' }}>
            <Plus size={18} style={{ marginRight: '8px' }} /> New Trip
          </button>
        </div>

        <div className="trips-grid">
          {trips.length === 0 ? (
            <div className="empty-state">
              <p>You haven't planned any trips yet.</p>
              <button className="btn btn-secondary mt-16" onClick={() => setShowModal(true)} style={{marginTop: '16px'}}>
                Plan your first adventure
              </button>
            </div>
          ) : (
            trips.map(trip => {
              const bgImage = trip.cover_image_url || 'https://images.unsplash.com/photo-1502602898657-3e907614f141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              return (
                <div key={trip.id} style={{position: 'relative'}}>
                  <Link to={`/planner/${trip.id}`} className="trip-card card">
                    <div className="trip-image" style={{ backgroundImage: `url(${bgImage})` }}></div>
                    <div className="trip-details">
                      <h3 style={{fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 'bold', color: '#111827'}}>{trip.title}</h3>
                      <div className="trip-meta" style={{marginTop: '12px'}}>
                        <span className="meta-item"><MapPin size={14}/> {trip.destination}</span>
                        <span className="meta-item"><Calendar size={14}/> {format(new Date(trip.start_date), 'MMM d')} - {format(new Date(trip.end_date), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="trip-actions" style={{position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px', zIndex: 10}}>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditingTrip(trip); setShowModal(true); }} style={{background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer', color: '#374151', display: 'flex', alignItems: 'center'}}><Edit2 size={16}/></button>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteTrip(trip.id); }} style={{background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center'}}><Trash2 size={16}/></button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal card animate-fade-in">
            <div className="modal-header">
              <h3>{editingTrip ? 'Edit Trip' : 'Plan a New Trip'}</h3>
              <button className="btn-close" onClick={() => { setShowModal(false); setEditingTrip(null); }}>&times;</button>
            </div>
            <form onSubmit={handleSaveTrip} className="modal-body">
              <div className="form-group">
                <label className="form-label">Trip Title</label>
                <input type="text" name="title" className="form-input" required defaultValue={editingTrip?.title || ''} placeholder="e.g. Summer in Italy" />
              </div>
              <div className="form-group">
                <label className="form-label">Destination</label>
                <input type="text" name="destination" className="form-input" required defaultValue={editingTrip?.destination || ''} placeholder="e.g. Rome, Italy" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input type="date" name="start_date" className="form-input" required defaultValue={editingTrip?.start_date || ''} />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input type="date" name="end_date" className="form-input" required defaultValue={editingTrip?.end_date || ''} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false); setEditingTrip(null); }}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingTrip ? 'Save Changes' : 'Create Trip'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
