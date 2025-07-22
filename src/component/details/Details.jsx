import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileId=parseInt(id, 10);
    axios.get(
      'https://api.github.com/repos/boopathirk9080/NeoSme-Day-2challengeStudentprofileList/contents/src/data/data.json',
      { headers: { Accept: 'application/vnd.github.v3.raw' } }  
    ).then(res => {
      const data = res.data.personData; 
      const foundProfile = data.find(p => p.id === profileId);
      console.log('Profile fetched:', foundProfile);
      setProfile(foundProfile);
    })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (!profile) return (
    <div className="p-4">
      <p className="text-red-600">Profile not found.</p>
      <Link to="/" className="text-blue-500 underline">Back to home</Link>
    </div>
  );

  // In your Details.jsx (or App.jsx) render:
  return (
    <div className=" h-1/2  bg-gray-100 z-0 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2  ">
      <div>
        <img src={profile.img} alt="" className='h-[500px]' />
      </div>

      <div className="p-6 min-h-1/12 max-w-lg w-full rounded bg-[#178bff81]">
        <h1 className="text-3xl font-bold mb-4">{profile.name}</h1>
        <p className="mb-2"><strong>Age:</strong> {profile.age}</p>
        <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
        <p className="mb-2"><strong>Occupation:</strong> {profile.occupation}</p>
        <p className="mb-2"><strong>Location:</strong>{profile.location}</p>
        <p className="mb-2"><strong>Hobby:</strong> <li>{profile.hobbies[0]} <br /></li> <li>{profile.hobbies[1]} <br /></li>{profile.hobbies[2] && <li>{profile.hobbies[2]} <br /></li>}</p>

        <p className="mb-2"><strong>Phone:</strong> {profile.phone}</p>
        <p className="mb-2"><strong>{profile.emergencyContact.name}:</strong> {profile.emergencyContact.phone}</p>
        <p className="mb-2"><strong>Address:</strong> {profile.address}</p>

        <p className="mb-2"><strong>Description:</strong> {profile.description}</p>
        <Link to="/" className="mt-4 inline-block text-blue-500 underline">
          ← Back to profiles
        </Link>
      </div>
    </div>
  );

}

export default Details;
