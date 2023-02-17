import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../Navbar/Navbar";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Readcurriclum = () => {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
      axios.get(`http://localhost:3001/curriculum`).then((response) => {
        console.log(response.data);
        setAPIData(response.data);
      });
    }, []);
  

    const onDelete = (_id) => {
        axios.delete(`http://localhost:3001/curriculum/${_id}`)
        .then(() => {
            getData();
        })
      }
      const getData = () => {
        axios.get("http://localhost:3001/curriculum")
            .then((getData) => {
                 setAPIData(getData.data);
             })
      }

    return (
      <>
        <Navbar />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  comment
                </TableCell>
                
                <TableCell>file</TableCell>
                
                
               
              </TableRow>
            </TableHead>
            <TableBody>
              {APIData.map((data) => (
                <TableRow
                  key={data._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  {data.comment}
                  </TableCell>
                  <TableCell>{data.file}</TableCell>
               
                  <TableCell align="right">
                    <Link to={`/updatecurriclum`}>
                      <Button>update</Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    
                      <Button onClick={() => onDelete(data._id)}>delete</Button>
                   
                  </TableCell>
                  <TableCell align="right">
                  
                      <Button>status</Button>
                   
                  </TableCell>
                  
                  {/* <TableCell align="right">
                    <Link to={`/curriculum/${data._id}`}>
                      <Button>View</Button>
                    </Link>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

export default Readcurriclum