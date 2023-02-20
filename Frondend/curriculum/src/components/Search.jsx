// import {React, useState} from 'react'
// import '../SearchBar/Style.css';
// const Searchtab = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   return (
//     <div className="templateContainer">
//           <div className="searchInput_Container">
//             <input id="searchInput" type="text" placeholder="Search here..." onChange={(event) => {
//               setSearchTerm(event.target.value);
//             }} />
//           </div>
//           <div className="template_Container">
//             {
//               data
//                 .filter((val) => {
//                   if(searchTerm == ""){
//                     return val;
//                   }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
//                     return val;
//                   }
//                 })
//                 .map((val) => {
//                   return(
//                     <div className="template" key={val.id}>
//                         <img src={val.image} alt="" />
//                         <h3>{val.title}</h3>

//                     </div>
//                   )
//                 })
//             }
//           </div>
//         </div>
//   )
// }

// export default Searchtab

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Input } from "semantic-ui-react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import { Button, CardActionArea, CardActions, TextField } from "@mui/material";

// export default function Search() {
//   const id = localStorage.getItem("userId");
//   const [APIData, setAPIData] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/curriculum/${id}/Approved`)
//       .then((response) => {
//         setAPIData(response.data);
//       });
//   }, []);

//   const searchItems = (searchValue) => {
//     setSearchInput(searchValue);
//     if (searchInput !== "") {
//       const filteredData = APIData.filter((item) => {
//         return Object.values(item)
//           .join("")
//           .toLowerCase()
//           .includes(searchInput.toLowerCase());
//       });
//       setFilteredResults(filteredData);
//     } else {
//       setFilteredResults(APIData);
//     }
//   };
//   console.log(filteredResults);

//   return (
//     <>
//       <TextField
//         icon="search"
//         placeholder="Search..."
//         onChange={(e) => searchItems(e.target.value)}
//       />
//       <div style={{ padding: 20, display: "flex" }}>
//         {searchInput.length > 1
//           ? filteredResults.map((item) => {
//               return (
//                 <Card sx={{ maxWidth: 345, marginTop: "30px" }}>
//                   <CardActionArea>
//                     <CardContent>
//                       <Typography gutterBottom variant="h5" component="div">
//                         {item.reqid.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {item.comment}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {item.status}
//                       </Typography>
//                     </CardContent>
//                   </CardActionArea>
//                   <CardActions>
//                     <Button size="small" color="primary">
//                       Download
//                     </Button>
//                   </CardActions>
//                 </Card>
//               );
//             })
//           : APIData.map((item) => {
//               return (
//                 <Card sx={{ maxWidth: 345, marginTop: "30px" }}>
//                   <CardActionArea>
//                     <CardContent>
//                       <Typography gutterBottom variant="h5" component="div">
//                         {item.reqid.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {item.comment}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {item.status}
//                       </Typography>
//                     </CardContent>
//                   </CardActionArea>
//                   <CardActions>
//                     <Button size="small" color="primary">
//                       Download
//                     </Button>
//                   </CardActions>
//                 </Card>
//               );
//             })}
//         {/* </Card.Group> */}
//       </div>
//     </>
//   );
// }
