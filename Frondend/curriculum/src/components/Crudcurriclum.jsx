import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../Navbar/Navbar";
import { Button,Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidemenu from "./Dashboard";

const Readcurriclum = () => {
  const navigate = useNavigate();

  const [APIData, setAPIData] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/curriculum`).then((response) => {
      console.log(response.data);
      setAPIData(response.data);
    });
  }, []);

  const onDelete = (_id) => {
    axios.delete(`http://localhost:3001/curriculum/${_id}`).then(() => {
      getData();
    });
  };
  const getData = () => {
    axios.get("http://localhost:3001/curriculum").then((getData) => {
      setAPIData(getData.data);
    });
  };

  const handleApprove = (_id) => {
    axios
      .patch(`http://localhost:3001/curriculum/${_id}`, { status: "Approved" })
      .then((res) => {
        setData(
          data.map((d) => {
            if (d._id === _id) {
              return { ...d, status: "Approved" };
            } else {
              return d;
            }
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
      navigate('/');
  };

  return (
    <>
    <Box sx={{display:"flex",backgroundColor:'lightblue',height:900,mt:6}}>
     <Sidemenu/>
      <TableContainer component={Paper}>
        <Table sx={{ width:'100%',marginTop:'80px',backgroundColor:'gray' }}aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row" align="right">
                <TableCell>Name</TableCell>
                <TableCell >Area</TableCell>
              <TableCell >category</TableCell>
              <TableCell >Comments</TableCell>
              <TableCell >No Of Hours</TableCell>
              
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {APIData.map((data) => (
              <TableRow
                key={data._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="right"padding="30px">
                  <TableCell align="right">{data.reqid.title}</TableCell>
                  <TableCell align="right">{data.reqid.type}</TableCell>
                  <TableCell align="right" >{data.reqid.category}</TableCell>
                  <TableCell align="right" >{data.comment}</TableCell>
                  <TableCell align="right" >{data.reqid.hours}</TableCell>
                {/* <TableCell>{data.file}</TableCell> */}
                </TableCell>

                <TableCell sx={{ marginRight:"40px"}}>
                    <Button sx={{color:'#fff'}} onClick={() => handleApprove(data._id)}disabled={data.status === "Approved"}>
                      Approve
                    </Button>
                  <Link to={`/update/${data._id}`}>
                    <Button sx={{color:'#fff'}}>update</Button>
                  </Link>
                  <Button sx={{color:'#fff'}} onClick={() => onDelete(data._id)}>delete</Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </>
  );
};

export default Readcurriclum;
