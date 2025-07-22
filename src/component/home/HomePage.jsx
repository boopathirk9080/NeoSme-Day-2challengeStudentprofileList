import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/personData')
      .then(res => {
        setData(res.data);
        setAllData(res.data);
      })
      .catch(console.error);
  }, []);

  const handleSearch = e => {
    const v = e.target.value;
    setSearchTerm(v);
    setData(
      v.trim() === ''
        ? allData
        : allData.filter(p =>
          p.name.toLowerCase().includes(v.toLowerCase())
        )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4">Profiles</h1>
      <input
        type="text"
        placeholder="Search profiles..."
        className="border p-2 rounded w-full mb-6"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">

        {data.map(profile => (
          <Link
            key={profile.id}
            to={`/details/${encodeURIComponent(profile.name)}`}
            className="block border p-4 rounded hover:shadow-lg transition "
          ><div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ' >
              <div>
              <img src={profile.img} alt="" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-gray-600"><b><span className='text-gray-800' >Age:</span></b> {profile.age}</p>
             
              <p className="text-gray-600"><b><span className='text-gray-800' >Email:</span></b>  {profile.occupation}</p>
              <p className="text-gray-600"><b><span className='text-gray-800' >Location:</span></b>  {profile.location}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
