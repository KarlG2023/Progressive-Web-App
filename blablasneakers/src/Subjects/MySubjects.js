/* eslint-disable no-unused-vars */
// import React from 'react'

// export default function MySubjects() {
//   return (
//     <div>MySubjects</div>
//   )
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MySubjects = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios.get(`https://api.pexels.com/v1/search?query=nike dunk/?per_page=20`, {
      headers: {
        Authorization: "563492ad6f91700001000001440cc0c996704d388e050eda3cfa5879"
      },
      // params: {
      //   api_key: process.env.SNEAKY_KEY
      // }
    })
      .then((response) => {
        setLoading(false);
        console.log("response", response?.data?.photos);
        setTitle(response?.data?.photos);

      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      })
  }, [])

  return (
    <div className="flex flex-wrap -mb-4">
      {title.map((photo, index) => {
        return (
          <div key={index}>
            <img src={`${photo?.src?.landscape ?? ''}`} alt={photo.alt} />
            <h2>name: {photo.photographer}</h2>

            <hr />
          </div>
        );
      })}
      {/* {!loading && movies?.length ? movies.map( (movie, index) =>  <Movie key={movie?.id ?? index} movie={movie}/>) : <h2>Loading...</h2>} */}
      {/* {!loading && title?.length ? title.map( (photo, index) =>  <Movie key={photo?.id ?? index} movie={photo}/>) : <h2>Loading...</h2>} */}
    </div>
  )
}

export default MySubjects
