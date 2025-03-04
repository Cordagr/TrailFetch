import React, { useState } from 'react';
import axios from 'axios';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function SearchTrails() {
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('');
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!location) {
      setError('Please select a valid location');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/api/trail/searchTrails', {
        params: { location: location.label, radius }
      });

      if (response.data.error) {
        setError(response.data.error);
        setTrails([]);
      } else {
        setTrails(response.data.results || []);
      }
    } catch (err) {
      console.error('Error searching trails:', err);
      setError('Failed to fetch trails. Please try again.');
      setTrails([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Search Nearby Hiking Trails</h1>
      <form onSubmit={handleSearch}>
        <label htmlFor="location">Location (City, State, or Address):</label>
        <GooglePlacesAutocomplete
          apiKey={''}
          selectProps={{
            location,
            onChange: (value) => setLocation(value),
            placeholder: 'Enter location (e.g., New York, NY)',
          }}
        />
        <br />
        <label htmlFor="radius">Radius (meters):</label>
        <input
          type="number"
          name="radius"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          placeholder="Enter search radius"
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="text-red-500 my-4">{error}</div>}

      <h2>Results</h2>
      {loading ? <p>Loading trails...</p> : null}
      <ul>
        {trails.length > 0 ? (
          trails.map((trail) => (
            <li key={trail.place_id}>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4">
                <h3 className="text-lg font-bold">{trail.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{trail.vicinity || trail.formatted_address}</p>
                <p className="text-yellow-500">Rating: {trail.rating || 'N/A'}</p>
              </div>
            </li>
          ))
        ) : (
          !loading && <p>No trails found</p>
        )}
      </ul>
    </div>
  );
}

export default SearchTrails;
