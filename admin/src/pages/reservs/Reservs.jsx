import "./reservs.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Reservs = ({columns}) => {
  const [list, setList] = useState([]);
  const [data, setData] = useState([])
  const {user} = useContext(AuthContext);
    


  useEffect(() => {
    axios.get(`/reservs/`)
        .then((getFirst) => {
            const promises = getFirst.data.map((item, index)=>
                axios.get(`/rooms/${item.roomId}`).then(getSecond => {/*console.log(getFirst.data[index]); console.log(getSecond.data);*/ 
                getSecond.data["unavailableDates"]=(getFirst.data[index].unavailableDates[0].slice(0,10) +" до " + getFirst.data[index].unavailableDates.slice(-1)[0].slice(0,10));
                getSecond.data["roomNumber"]=(getFirst.data[index].roomNumber);
                getSecond.data["reservId"]=(getFirst.data[index]._id);
                getSecond.data["roomNumberId"]=(getFirst.data[index].roomNumberId);
                getSecond.data["userId"]=(getFirst.data[index].userId);
                /*console.log(getSecond.data);*/ return getSecond.data;})
            )
            // console.log(getFirst.data)
            return Promise.all(promises)
        })
        .then((roomData) => {
            setData(roomData)
            // setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })
}, [])

  useEffect(() => {
    console.log(data)
    setList(data);
  }, [data]);

  const handleDelete = async (reservId, roomNumberId) => {
    try {
        await axios.put(`/rooms/availability/${user._id}`, {reservId:reservId, roomNumberId: roomNumberId, delete: "true"}).then(
            await axios.delete(`/reservs/${user._id}`, {data:{reservId:reservId}})).then(
                setList(list.filter((item) => item.reservId !== reservId))
            )
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.reservId, params.row.roomNumberId)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
            <div className="datatable">
            <div className="datatableTitle">
                Бронь
            </div>
            <DataGrid
                className="datagrid"
                rows={list}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={(row) => row.reservId}
            />
            </div>
        </div>
    </div>
  );
};

export default Reservs;
