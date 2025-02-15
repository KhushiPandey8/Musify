import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const CountryTracks = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          'https://shazam8.p.rapidapi.com/track/top/country',
          {
            headers: {
              'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY, // Ensure this is set correctly
              'X-RapidAPI-Host': 'shazam-api6.p.rapidapi.com',
            },
          }
        );
        setCountry(response?.data?.location?.country || 'Unknown');
      } catch (err) {
        console.error('Error fetching country data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, []);

  if (isFetching || loading) {
    return <Loader title="Loading Songs around you..." />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {Array.isArray(data)
          ? data.map((song, i) => (
              <SongCard
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
                i={i}
              />
            ))
          : <p className="text-white">No data available for this region.</p>}
      </div>
    </div>
  );
};

export default CountryTracks;
