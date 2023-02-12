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

const View = () => {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/requirements`).then((response) => {
      console.log(response.data);
      setAPIData(response.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">
                Name Of Requirement
              </TableCell>
              <TableCell>Area Of Training</TableCell>
              <TableCell align="right">category</TableCell>
              <TableCell align="right">Organisation/Institution</TableCell>
              <TableCell align="right">No Of Hours</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData.map((data) => (
              <TableRow
                key={data._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.title}
                </TableCell>
                <TableCell>{data.type}</TableCell>
                <TableCell align="right">{data.category}</TableCell>
                <TableCell align="right">{data.organisation}</TableCell>
                <TableCell align="right">{data.hours}</TableCell>
                <TableCell align="right">
                  <Link to={`/curriculum/${data._id}`}>
                    <Button>View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default View;
