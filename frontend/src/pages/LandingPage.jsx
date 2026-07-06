import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, MapPin, DollarSign, Users, User, CheckSquare, Sparkles, Plane, Search, PauseCircle, Heart, ArrowRight, RotateCcw, BadgePercent, Calendar } from 'lucide-react';
import { api } from '../api';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleStartPlanning = async (e) => {
    e.preventDefault();
    if (!destination || !startDate || !endDate) return;
    
    const DEFAULT_IMAGES = [
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e907614f141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    const randomImage = DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];

    setIsSubmitting(true);
    try {
      const trip = await api.createTrip({
        title: `Trip to ${destination}`,
        destination,
        start_date: startDate,
        end_date: endDate,
        cover_image_url: randomImage
      });
      navigate('/dashboard'); // or wherever they should go after creating a trip
    } catch (error) {
      console.error('Failed to create trip', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-page animate-fade-in">
      <nav className="navbar">
        <div className="container nav-content">
          <Link to="/" className="logo">
            <Compass className="icon" />
            <span>RouteCraft</span>
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

      <header className="hero-container">
        <div className="hero-modern">
          <div className="hero-modern-overlay"></div>
          <div className="hero-modern-content">
            <h1>Book traveller-backed things to do</h1>
            <form className="planning-form" onSubmit={handleStartPlanning}>
              <div className="input-group">
                <MapPin className="input-icon" />
                <input type="text" placeholder="Where to?" value={destination} onChange={e => setDestination(e.target.value)} required />
              </div>
              <div className="input-group">
                <Calendar className="input-icon" />
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
              </div>
              <div className="input-group">
                <Calendar className="input-icon" />
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary planning-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Starting...' : 'Start Planning'}
              </button>
            </form>
          </div>
          <div className="hero-modern-bottom">
            <div className="hero-author">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Author" />
              <span>@RouteCraftExplorer</span>
            </div>
            <div className="hero-pagination">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="hero-controls">
              <PauseCircle className="control-icon" />
            </div>
          </div>
        </div>
      </header>

      {/* Can't-miss experiences Section */}
      <section className="experiences-section">
        <div className="container">
          <h2 className="section-title left-align">Can't-miss experiences</h2>
          <div className="experiences-grid">
            {/* Card 1 */}
            <div className="experience-card">
              <div className="experience-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')` }}>
                <button className="heart-btn"><Heart size={16} /></button>
              </div>
              <div className="experience-content">
                <div className="exp-number">1</div>
                <span className="exp-location">Chicago</span>
                <h3>Chicago Architecture River Cruise</h3>
                <div className="exp-rating">
                  <span className="rating-score">4.9</span>
                  <span className="rating-dots">●●●●●</span>
                  <span className="rating-count">(7,061)</span>
                </div>
                <p className="exp-price">from <strong>₹3,806</strong></p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="experience-card">
              <div className="experience-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')` }}>
                <button className="heart-btn"><Heart size={16} /></button>
              </div>
              <div className="experience-content">
                <div className="exp-number">2</div>
                <span className="exp-location">Barcelona</span>
                <h3>Barcelona: Sagrada Familia Skip-the-Line Guided Tour</h3>
                <div className="exp-rating">
                  <span className="rating-score">4.8</span>
                  <span className="rating-dots">●●●●●</span>
                  <span className="rating-count">(2,530)</span>
                </div>
                <p className="exp-price">from <strong>₹6,026</strong></p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="experience-card">
              <div className="experience-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')` }}>
                <button className="heart-btn"><Heart size={16} /></button>
              </div>
              <div className="experience-content">
                <div className="exp-number">3</div>
                <span className="exp-location">Rome</span>
                <h3>Vatican Museums, Sistine Chapel Tour and Basilica</h3>
                <div className="exp-rating">
                  <span className="rating-score">4.6</span>
                  <span className="rating-dots">●●●●●</span>
                  <span className="rating-count">(3,162)</span>
                </div>
                <p className="exp-price">from <strong>₹7,699</strong></p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="experience-card">
              <div className="experience-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555993539-1732b0258235?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')` }}>
                <button className="heart-btn"><Heart size={16} /></button>
              </div>
              <div className="experience-content">
                <div className="exp-number">4</div>
                <span className="exp-location">Athens</span>
                <h3>Acropolis and Parthenon Guided Walking Tour</h3>
                <div className="exp-rating">
                  <span className="rating-score">4.8</span>
                  <span className="rating-dots">●●●●●</span>
                  <span className="rating-count">(2,393)</span>
                </div>
                <p className="exp-price">from <strong>₹3,794</strong></p>
              </div>
            </div>
            <button className="slider-next-btn"><ArrowRight size={20} /></button>
          </div>
        </div>
      </section>

      {/* Guarantees Banner Section */}
      <section className="guarantees-banner">
        <div className="container guarantees-grid">
          <div className="guarantee-item">
            <RotateCcw className="guarantee-icon" />
            <h4>Free cancellation</h4>
            <p>Stay flexible with free cancellation on most experiences, up to 24 hours before.</p>
          </div>
          <div className="guarantee-item">
            <Users className="guarantee-icon" />
            <h4>Backed by travellers</h4>
            <p>Do it or skip it? Check out reviews to help you decide.</p>
          </div>
          <div className="guarantee-item">
            <BadgePercent className="guarantee-icon" />
            <h4>Lowest price guarantee</h4>
            <p>If you find the same thing for less, we'll refund the difference. <a href="#">Learn more</a></p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Features to replace all your other tools</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper blue"><MapPin className="feature-icon" /></div>
              <h3>Add places from guides with 1 click</h3>
              <p>We crawled the web so you don't have to. Easily add mentioned places to your plan.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper green"><DollarSign className="feature-icon" /></div>
              <h3>Expense tracking and splitting</h3>
              <p>Keep track of your budget and split the cost between your tripmates.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper purple"><Users className="feature-icon" /></div>
              <h3>Collaborate with friends in real time</h3>
              <p>Plan along with your friends with live syncing and collaborative editing.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper yellow"><CheckSquare className="feature-icon" /></div>
              <h3>Checklists for anything</h3>
              <p>Stay organized with a packing list, to-do list, shopping list, any kind of list</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper pink"><Sparkles className="feature-icon" /></div>
              <h3>Get personalized recommendations</h3>
              <p>Find the best places to visit with smart recommendations based on your itinerary.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper teal"><Plane className="feature-icon" /></div>
              <h3>Import flight and hotel reservations</h3>
              <p>Connect or forward your emails to get it magically added into your trip plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Must-dos in trending places */}
      <section className="must-dos-section container">
        <h2 className="section-title left-align">Must-dos in trending places</h2>
        <div className="must-dos-grid">
          {/* Rome */}
          <div className="must-do-card">
            <div className="must-do-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')` }}>
              <button className="heart-btn"><Heart size={16} /></button>
            </div>
            <div className="must-do-content">
              <h3>Rome</h3>
              <div className="tags">
                <span className="tag">Rome's secret catacombs</span>
                <span className="tag">Pizza making classes</span>
                <span className="tag">Explore Rome by night</span>
              </div>
            </div>
          </div>
          {/* Oahu */}
          <div className="must-do-card">
            <div className="must-do-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')` }}>
              <button className="heart-btn"><Heart size={16} /></button>
            </div>
            <div className="must-do-content">
              <h3>Oahu</h3>
              <div className="tags">
                <span className="tag">Marine wildlife adventures</span>
                <span className="tag">A taste of Oahu food & culture</span>
                <span className="tag">Surf Hawaii's iconic waves</span>
              </div>
            </div>
          </div>
          {/* New York City */}
          <div className="must-do-card">
            <div className="must-do-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')` }}>
              <button className="heart-btn"><Heart size={16} /></button>
            </div>
            <div className="must-do-content">
              <h3>New York City</h3>
              <div className="tags">
                <span className="tag">NYC art & museums</span>
                <span className="tag">Broadway shows & NYC stages</span>
                <span className="tag">NY pizza crawls</span>
              </div>
            </div>
          </div>
          {/* Las Vegas */}
          <div className="must-do-card">
            <div className="must-do-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')` }}>
              <button className="heart-btn"><Heart size={16} /></button>
            </div>
            <div className="must-do-content">
              <h3>Las Vegas</h3>
              <div className="tags">
                <span className="tag">Emerald cave by kayak</span>
                <span className="tag">Magical Vegas entertainment</span>
                <span className="tag">Red Rock adventures</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by category */}
      <section className="category-section">
        <div className="container">
          <h2 className="section-title left-align">Explore by category</h2>
          <div className="category-grid">
            <div className="category-card" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')` }}>
              <div className="category-overlay"></div>
              <h3>Outdoors</h3>
            </div>
            <div className="category-card" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')` }}>
              <div className="category-overlay"></div>
              <h3>Food</h3>
            </div>
            <div className="category-card" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')` }}>
              <div className="category-overlay"></div>
              <h3>Culture</h3>
            </div>
            <div className="category-card" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')` }}>
              <div className="category-overlay"></div>
              <h3>Water</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended by the press */}
      <section className="press-section">
        <div className="container">
          <div className="press-header">
            <h2 className="section-title">Recommended by the press</h2>
            <p className="press-subtitle">Leading companies and media outlets are talking about RouteCraft.<br/>Discover why we're their top choice for travel planning.</p>
          </div>
          
          <div className="press-carousel">
            <button className="slider-btn prev"><ArrowRight size={20} style={{transform: 'rotate(180deg)'}} /></button>
            <div className="press-cards-wrapper">
              <div className="press-card">
                <h3 className="press-logo thrillist">thrillist</h3>
                <p className="press-quote">"If you're looking for a more 360-degree travel planner, RouteCraft might be a good option for you. The platform is very intuitive, and it's super easy to navigate regardless of the many features it offers. In short, it gives you a lot of tools, but isn't overwhelming."</p>
                <p className="press-author">Serena Tara @thrillist</p>
              </div>
              <div className="press-card">
                <h3 className="press-logo cntraveler">Traveler</h3>
                <p className="press-quote">"One of the best travel apps for planning every kind of trip, including road trips and group travel: create a trip itinerary, budget costs, organise flights and hotel reservations, and collaborate with friends. After your trip, share a travel guide to inspire other travellers."</p>
                <p className="press-author">Charlotte Davey @CN Traveler</p>
              </div>
              <div className="press-card">
                <h3 className="press-logo android-auth">ANDROID<br/>AUTHORITY</h3>
                <p className="press-quote">"If you're looking for an app to help you plan trips, try RouteCraft. It is the travel planner to end all travel planners. It can easily replace lists in Maps, spreadsheets, Chrome bookmarks, calendar events, personal notes, and more. I used to get exhausted planning one or two trips a year; now, I can plan 10 trips a year and have time to spare. That's how good this app is."</p>
                <p className="press-author">Rita El Khoury @Android Authority</p>
              </div>
            </div>
            <button className="slider-btn next"><ArrowRight size={20} /></button>
          </div>

          <div className="press-stats">
            <div className="stat-item">
              <h4>8M+</h4>
              <h5>Trips planned</h5>
              <p>See why millions of trips have been planned with RouteCraft.</p>
            </div>
            <div className="stat-item">
              <h4>33K+</h4>
              <h5>Reviews</h5>
              <p>Trusted by thousands—see why travelers rave about their experience.</p>
            </div>
            <div className="stat-item">
              <h4>4.9<span className="star">★</span></h4>
              <h5>Rating on App Store</h5>
              <p>Top-rated on the App Store for exceptional travel planning.</p>
            </div>
            <div className="stat-item">
              <h4>4.7<span className="star">★</span></h4>
              <h5>Rating on Google Play</h5>
              <p>Highly rated and selected as Editor's Choice on Google Play.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Iconic attractions worldwide */}
      <section className="iconic-section">
        <div className="container">
          <h2 className="section-title left-align">Iconic attractions worldwide</h2>
          <div className="experiences-grid iconic-grid">
            {/* Card 1 */}
            <div className="experience-card">
              <div className="experience-image" style={{ height: '240px', backgroundImage: `url('https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')` }}>
                <button className="heart-btn"><Heart size={16} /></button>
              </div>
              <div className="experience-content">
                <span className="exp-location">Barcelona</span>
                <h3>Basílica de la Sagrada Familia</h3>
                <div className="exp-rating">
                  <span className="rating-score">4.7</span>
                  <span className="rating-dots">●●●●●</span>
                  <span className="rating-count">(1,67,883)</span>
                </div>
                <p className="exp-category">Sights & Landmarks</p>
                <p className="exp-price" style={{marginTop: '12px'}}>from <strong>₹10,176</strong></p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="experience-card">
              <div className="experience-image" style={{ height: '240px', backgroundImage: `url('https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')` }}>
                <button className="heart-btn"><Heart size={16} /></button>
              </div>
              <div className="experience-content">
                <span className="exp-location">Rome</span>
                <h3>Colosseum</h3>
                <div className="exp-rating">
                  <span className="rating-score">4.6</span>
                  <span className="rating-dots">●●●●●</span>
                  <span className="rating-count">(1,51,182)</span>
                </div>
                <p className="exp-category">Sights & Landmarks</p>
                <p className="exp-price" style={{marginTop: '12px'}}>from <strong>₹2,766</strong></p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="experience-card">
              <div className="experience-image" style={{ height: '240px', backgroundImage: `url('https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')` }}>
                <button className="heart-btn"><Heart size={16} /></button>
              </div>
              <div className="experience-content">
                <span className="exp-location">Paris</span>
                <h3>Eiffel Tower</h3>
                <div className="exp-rating">
                  <span className="rating-score">4.6</span>
                  <span className="rating-dots">●●●●●</span>
                  <span className="rating-count">(1,43,953)</span>
                </div>
                <p className="exp-category">Sights & Landmarks</p>
                <p className="exp-price" style={{marginTop: '12px'}}>from <strong>₹5,505</strong></p>
              </div>
            </div>
            <button className="slider-next-btn"><ArrowRight size={20} /></button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What our travelers say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"RouteCraft completely changed how I plan my vacations. The day-by-day planner is so intuitive and beautiful."</p>
              <p className="author">— Sarah Jenkins</p>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"Finally, an app that lets me budget and collaborate with my friends in real-time. A lifesaver for group trips!"</p>
              <p className="author">— Mark T.</p>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"The UI is gorgeous. I use it to keep track of all my flight details, hotel bookings, and checklists in one place."</p>
              <p className="author">— Emily Chen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="logo footer-logo">
              <Compass className="icon" />
              <span>RouteCraft</span>
            </div>
            <p className="copyright">Made with ♥ from SF & more © 2026 RouteCraft Inc.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-col">
              <h4>RouteCraft</h4>
              <ul>
                <li><a href="#">Hotels</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Report security issue</a></li>
                <li><a href="#">Terms, Privacy policy & Copyright</a></li>
                <li><a href="#">Mobile app</a></li>
                <li><a href="#">Browser extension</a></li>
                <li><a href="#">Travel budgeting & cost tracking</a></li>
                <li><a href="#">Jobs</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Google data disclosure</a></li>
                <li><a href="#">How to embed a map on your travel blog</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Guide and resources</h4>
              <ul>
                <li><a href="#">Trip planners by destination</a></li>
                <li><a href="#">Explore cities and countries</a></li>
                <li><a href="#">Road trips by destination</a></li>
                <li><a href="#">Best places to visit by category</a></li>
                <li><a href="#">Popular search terms by destination</a></li>
                <li><a href="#">Weather around the world</a></li>
                <li><a href="#">Travel questions & answers</a></li>
                <li><a href="#">Travel itinerary guides</a></li>
                <li><a href="#">Maps of cities and national parks</a></li>
                <li><a href="#">Destinations at different times of the year</a></li>
                <li><a href="#">Places to visit by destination</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-apps">
            <h4>Get the app</h4>
            <div className="app-buttons">
              <button className="app-btn apple">
                 <span className="app-btn-small">Download on the</span>
                 <strong className="app-btn-large">App Store</strong>
              </button>
              <button className="app-btn google">
                 <span className="app-btn-small">GET IT ON</span>
                 <strong className="app-btn-large">Google Play</strong>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
