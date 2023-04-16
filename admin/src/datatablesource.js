export const userColumns = [
  { field: "_id", headerName: "ID", width: 300 },
  {
    field: "user",
    headerName: "Логин",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Почта",
    width: 230,
  },
  {
    field: "isAdmin",
    headerName: "Админ",
    width: 230,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 300 },
  {
    field: "title",
    headerName: "Заголовок",
    width: 230,
  },
  {
    field: "subtitle",
    headerName: "Подзаголовок",
    width: 200,
  },
  {
    field: "price",
    headerName: "Цена",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Макс. мест",
    width: 100,
  },
];
