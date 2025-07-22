import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Details() {
  const { name } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/personData')
      .then(res => {
        const found = res.data.find(
          p => p.name.toLowerCase() === decodeURIComponent(name).toLowerCase()
        );
        setProfile(found || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <p>Loading…</p>;
  if (!profile) return (
    <div className="p-4">
      <p className="text-red-600">Profile not found.</p>
      <Link to="/" className="text-blue-500 underline">Back to home</Link>
    </div>
  );

  return (
    <div className="p-6 max-w-lg mx-auto border rounded">
      <h1 className="text-3xl font-bold mb-4">{profile.name}</h1>
      <p className="mb-2"><strong>Age:</strong> {profile.age}</p>
      <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
      <p className="mb-2"><strong>Occupation:</strong> {profile.occupation}</p>
        <p className="mb-2"><strong>Location:</strong> {profile.location}</p>
      <Link
        to="/"
        className="mt-4 inline-block text-blue-500 underline"
      >
        ← Back to profiles
      </Link>
    </div>
  );
}

export default Details;
