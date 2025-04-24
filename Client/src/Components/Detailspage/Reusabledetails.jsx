import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

const Detail = () => {
  const [tourDetails, setTourDetails] = useState([]); // Store fetched details
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const IMAGE_BASE_URL = "http://127.0.0.1:8000/api/";  // Ensure this is the correct base URL for images

  useEffect(() => {
    // Fetch data when the component is mounted
    const fetchDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/details/all/');
        setTourDetails(response.data); // Set fetched data to state
        setLoading(false); // Data fetched, set loading to false
      } catch (err) {
        setError(err); // Handle error
        setLoading(false);
      }
    };

    fetchDetails(); // Fetch data when the component is mounted
  }, []);
  
  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error fetching details: {error.message}</div>; // Handle errors

  return (
    <div className="detail-page">
      <h1>All Tours</h1>
      {tourDetails.length > 0 ? (
        <div className="tour-list">
          {tourDetails.map((tour, index) => (
            <div key={index} className="tour-card">
              <h2>{tour.name}</h2>
              <p>{tour.tour_overview}</p>
              <h3>Location: {tour.location}</h3>
              <h3>Difficulty: {tour.difficulty}</h3>
              <h3>Duration: {tour.duration} days</h3>
              
              {/* Images section */}
              <div className="images">
                {/* Make sure tour.image1, tour.image2, and tour.image3 contain relative paths */}
                <img
                  src={`${IMAGE_BASE_URL}${tour.image1}`}
                  alt={`Tour Image 1 for ${tour.name}`}
                  className="tour-image"
                />
                <img
                  src={`${IMAGE_BASE_URL}${tour.image2}`}
                  alt={`Tour Image 2 for ${tour.name}`}
                  className="tour-image"
                />
                <img
                  src={`${IMAGE_BASE_URL}${tour.image3}`}
                  alt={`Tour Image 3 for ${tour.name}`}
                  className="tour-image"
                />
              </div>

              {/* Additional information like itinerary */}
              <div>
                <h3>Itinerary:</h3>
                <ul>
                  {tour.itinerary.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No tours available.</div>
      )}
    </div>
  );
};

export default Detail;
