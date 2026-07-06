import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Compass, Plus, Clock, MapPin, DollarSign, ChevronLeft, Edit2, Trash2 } from 'lucide-react';
import { api } from '../api';
import { format } from 'date-fns';
import './Planner.css';

const Planner = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showDayModal, setShowDayModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);

  const fetchData = async () => {
    try {
      const tripData = await api.getTrip(id);
      setTrip(tripData);
      const daysData = await api.getDaysByTrip(id);
      // For each day, fetch activities
      const daysWithActivities = await Promise.all(daysData.map(async (day) => {
        const activities = await api.getActivitiesByDay(day.id);
        return { ...day, activities };
      }));
      setDays(daysWithActivities);
    } catch (error) {
      console.error("Error fetching planner data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAddDay = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDay = {
      trip: id,
      date: formData.get('date'),
      title: formData.get('title')
    };
    await api.createDay(newDay);
    setShowDayModal(false);
    fetchData();
  };

  const handleSaveActivity = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const activityData = {
      title: formData.get('title'),
      description: formData.get('description'),
      time: formData.get('time') || null,
      location: formData.get('location'),
      cost: formData.get('cost') || null,
    };
    if (editingActivity) {
      await api.updateActivity(editingActivity.id, activityData);
    } else {
      activityData.day = selectedDayId;
      await api.createActivity(activityData);
    }
    setShowActivityModal(false);
    setEditingActivity(null);
    fetchData();
  };

  const handleDeleteActivity = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      await api.deleteActivity(id);
      fetchData();
    }
  };

  if (loading) return <div className="loading">Loading your itinerary...</div>;
  if (!trip) return <div className="loading">Trip not found.</div>;

  const bgImage = trip.cover_image_url || 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80';

  return (
    <div className="planner animate-fade-in">
      <nav className="navbar" style={{background: '#003b2b'}}>
        <div className="container nav-content">
          <Link to="/dashboard" className="back-link" style={{color: 'white', display: 'flex', alignItems: 'center', gap: '4px'}}>
            <ChevronLeft size={20} /> RouteCraft
          </Link>
          <div className="logo" style={{color: 'white'}}>
            <Compass className="icon" style={{color: '#10b981'}} />
            <span style={{fontFamily: 'Outfit, sans-serif', fontWeight: 800, letterSpacing: '-0.5px'}}>RouteCraft</span>
          </div>
          <div style={{width: '140px'}}></div>
        </div>
      </nav>

      <div className="planner-hero" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="planner-hero-overlay">
          <div className="container" style={{textAlign: 'center', width: '100%'}}>
            <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '48px', marginBottom: '16px'}}>{trip.title}</h1>
            <p className="planner-meta" style={{justifyContent: 'center'}}>
              <MapPin size={18}/> {trip.destination} &nbsp;|&nbsp; 
              <Clock size={18}/> {format(new Date(trip.start_date), 'MMM d')} - {format(new Date(trip.end_date), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>

      <div className="container planner-content" style={{paddingTop: '80px'}}>
        <div className="planner-header" style={{marginBottom: '48px'}}>
          <h2>Itinerary</h2>
          <button className="btn btn-primary" onClick={() => setShowDayModal(true)} style={{backgroundColor: '#10b981', border: 'none', padding: '10px 24px', fontWeight: 'bold', fontSize: '15px'}}>
            <Plus size={16} style={{marginRight: '8px'}} /> Add Day
          </button>
        </div>

        <div className="days-list">
          {days.length === 0 ? (
            <div className="empty-state">
              <p>Your itinerary is empty. Start by adding a day.</p>
            </div>
          ) : (
            days.map(day => (
              <div key={day.id} className="day-card card">
                <div className="day-header">
                  <h3>{format(new Date(day.date), 'EEEE, MMM d, yyyy')} {day.title && `- ${day.title}`}</h3>
                  <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedDayId(day.id); setShowActivityModal(true); }}>
                    <Plus size={14} style={{marginRight: '4px'}}/> Activity
                  </button>
                </div>
                
                <div className="activities-list">
                  {day.activities.length === 0 ? (
                    <p className="no-activities">No activities planned for this day.</p>
                  ) : (
                    day.activities.map(activity => (
                      <div key={activity.id} className="activity-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <div style={{display: 'flex', gap: '20px'}}>
                          <div className="activity-time">
                            {activity.time ? activity.time.substring(0, 5) : '--:--'}
                          </div>
                          <div className="activity-details">
                            <h4>{activity.title}</h4>
                            {activity.description && <p className="activity-desc">{activity.description}</p>}
                            <div className="activity-meta">
                              {activity.location && <span><MapPin size={12}/> {activity.location}</span>}
                              {activity.cost && <span><DollarSign size={12}/> ${activity.cost}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="activity-actions" style={{display: 'flex', gap: '8px'}}>
                          <button className="btn-icon" onClick={() => { setEditingActivity(activity); setShowActivityModal(true); }} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280'}}><Edit2 size={16}/></button>
                          <button className="btn-icon" onClick={() => handleDeleteActivity(activity.id)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444'}}><Trash2 size={16}/></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showDayModal && (
        <div className="modal-overlay">
          <div className="modal card animate-fade-in">
            <div className="modal-header">
              <h3>Add a Day</h3>
              <button className="btn-close" onClick={() => setShowDayModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddDay} className="modal-body">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="date" name="date" className="form-input" required min={trip.start_date} max={trip.end_date} />
              </div>
              <div className="form-group">
                <label className="form-label">Title (Optional)</label>
                <input type="text" name="title" className="form-input" placeholder="e.g. Arrival & Exploration" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDayModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Day</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showActivityModal && (
        <div className="modal-overlay">
          <div className="modal card animate-fade-in">
            <div className="modal-header">
              <h3>{editingActivity ? 'Edit Activity' : 'Add Activity'}</h3>
              <button className="btn-close" onClick={() => { setShowActivityModal(false); setEditingActivity(null); }}>&times;</button>
            </div>
            <form onSubmit={handleSaveActivity} className="modal-body">
              <div className="form-group">
                <label className="form-label">Activity Title</label>
                <input type="text" name="title" className="form-input" required defaultValue={editingActivity?.title || ''} placeholder="e.g. Visit Colosseum" />
              </div>
              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea name="description" className="form-input" rows="3" defaultValue={editingActivity?.description || ''}></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Time (Optional)</label>
                  <input type="time" name="time" className="form-input" defaultValue={editingActivity?.time || ''} />
                </div>
                <div className="form-group">
                  <label className="form-label">Cost (Optional)</label>
                  <input type="number" step="0.01" name="cost" className="form-input" defaultValue={editingActivity?.cost || ''} placeholder="0.00" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Location (Optional)</label>
                <input type="text" name="location" className="form-input" defaultValue={editingActivity?.location || ''} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => { setShowActivityModal(false); setEditingActivity(null); }}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingActivity ? 'Save Changes' : 'Add Activity'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planner;
