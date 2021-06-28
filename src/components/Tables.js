import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Tables = ({ tableData }) => {
  console.log({ tableData });
  const [newData, setNewData] = useState([]);

  const manipulateData = () => {
    let date = new Date(Date.now());
    let newDateArr = [];
    //console.log(data);
    for (let newDate of tableData) {
      //console.log(newDate);

      newDate.map((newD) => {
        let today = new Date(date);
        let visitDay = new Date(newD.dateOfVisit);
        //console.log(visitDay);
        if (
          visitDay.getDate() === today.getDate() &&
          visitDay.getMonth() === today.getMonth() &&
          visitDay.getFullYear() === today.getFullYear()
        ) {
          newDateArr.push(newD);
          //newDateArr.push(newD);
          //console.log(newDateArr);
        }
        //console.log(newDateArr);
        setNewData(newDateArr);
        return newDateArr;
      });
    }
  };

  useEffect(() => {
    manipulateData();
  }, [tableData]);

  //console.log(newData);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Resident Name</th>
            <th>Visitor Name</th>
            <th>Date of Visit</th>
            <th>Time of Visit</th>
            <th>Access Pass</th>
          </tr>
        </thead>
        <tbody>
          {newData.map((tabularData, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{tabularData.resident}</td>
              <td>{tabularData.visitor}</td>
              <td>{tabularData.dateOfVisit}</td>
              <td>{tabularData.time}</td>
              <td>{tabularData.code}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Tables;
