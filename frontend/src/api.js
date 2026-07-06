const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  // Trips
  getTrips: () => fetch(`${API_BASE_URL}/trips/`).then(res => res.json()),
  getTrip: (id) => fetch(`${API_BASE_URL}/trips/${id}/`).then(res => res.json()),
  createTrip: (data) => fetch(`${API_BASE_URL}/trips/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),
  updateTrip: (id, data) => fetch(`${API_BASE_URL}/trips/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),
  deleteTrip: (id) => fetch(`${API_BASE_URL}/trips/${id}/`, { method: 'DELETE' }),

  // Days
  getDaysByTrip: (tripId) => fetch(`${API_BASE_URL}/days/?trip=${tripId}`).then(res => res.json()),
  createDay: (data) => fetch(`${API_BASE_URL}/days/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),

  // Activities
  getActivitiesByDay: (dayId) => fetch(`${API_BASE_URL}/activities/?day=${dayId}`).then(res => res.json()),
  createActivity: (data) => fetch(`${API_BASE_URL}/activities/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),
  updateActivity: (id, data) => fetch(`${API_BASE_URL}/activities/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),
  deleteActivity: (id) => fetch(`${API_BASE_URL}/activities/${id}/`, { method: 'DELETE' }),
};
