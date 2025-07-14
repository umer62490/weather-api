// import { useState, useEffect } from "react";
// const Loader = () => {
//   const [photos, setPhotos] = useState([]);
//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setPhotos(data);
//       });
//   }, []);
//   return (
//     <div >
//       {photos.map((photo) => (
//         <div key={photo.id} className="card">
//         <div className="container">
//         <img src={photo.image} width={80} height={80} />
//           <h1>{photo.title}</h1>
//           <p>{photo.description}</p>
//           <strong>{photo.price}</strong>
//           </div>
//         </div>
//       ))}
//     </div>
    
//   );
// };
// export default Loader;



//-----------------------------------------2nd weather-----------------------------------------------


import "./Loader.css";

const Loader = () => {

  return (
    <div className='lds-roller'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
  )
}

export default Loader

