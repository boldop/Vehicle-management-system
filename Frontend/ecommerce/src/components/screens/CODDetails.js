import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CODDetails = () => {
  const [codDetails, setCodDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cod-details/')
      .then(response => {
        setCodDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>COD Details</h1>
      <ul>
        {codDetails.map(detail => (
          <li key={detail.id}>
            <p><strong>Name:</strong> {detail.name}</p>
            <p><strong>Phone:</strong> {detail.phone}</p>
            <p><strong>Email:</strong> {detail.email}</p>
            <p><strong>Address:</strong> {detail.address}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CODDetails;
