import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-api6.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'shazam/top_tracks_country' }),
    getSongsByGenre: builder.query({ query: (genre) => `shazam/top_tracks_country?genre_code=${genre}` }),
    getSongsByCountry: builder.query({ query: (countryCode) => `shazam/top_tracks_city?country_code=${countryCode}` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `shazam/search_track/?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
    getArtistDetails: builder.query({ query: (artistId) => `shazam/search_artist/'?artist_id=${artistId}` }),
    getSongDetails: builder.query({ query: ({ songid }) => `shazam/about_track/details?track_id=${songid}` }),
    getSongRelated: builder.query({ query: ({ songid }) => `shazam/similar_tracks/related?track_id=${songid}` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;