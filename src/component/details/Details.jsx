import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileId = parseInt(id, 10);
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

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (!profile) return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <p className="text-red-600 text-xl font-medium">Profile not found.</p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Profile Image Section */}
          <div className="md:col-span-1 bg-gray-50 p-6 flex flex-col items-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden border-4 border-white shadow-lg mb-6">
              <img 
                src={profile.img} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h1>
            <p className="text-lg text-blue-600 font-medium mb-6">{profile.occupation}</p>
            
            <div className="w-full bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Contact Info</h2>
              <div className="space-y-2">
                <p className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {profile.email}
                </p>
                <p className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  {profile.phone}
                </p>
                <p className="flex items-start text-gray-600">
                  <svg className="w-5 h-5 mr-2 mt-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>{profile.address}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="md:col-span-2 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Age</p>
                  <p className="text-lg font-medium">{profile.age}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="text-lg font-medium">{profile.location}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Emergency Contact</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Contact Person</p>
                <p className="text-lg font-medium">{profile.emergencyContact.name}</p>
                <p className="text-gray-500 text-sm mt-2">Phone Number</p>
                <p className="text-lg font-medium">{profile.emergencyContact.phone}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Hobbies & Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">About</h2>
              <p className="text-gray-700 leading-relaxed">{profile.description}</p>
            </div>

            <Link 
              to="/" 
              className="mt-8 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to profiles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;