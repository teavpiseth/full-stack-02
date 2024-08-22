import { Image, Tag } from "antd";
import { useEffect, useState } from "react";
import { Gender, getImageView, Status } from "../../../../utils/constant";
import moment from "moment";

export function useEmployee() {
  const [fixedTop, setFixedTop] = useState(false);

  function columns({ imageCustom, statusCustom }) {
    return [
      {
        title: "Name",
        width: 100,
        dataIndex: "FirstName",
        key: "FirstName",
        fixed: "left",
        render: (record, text, index) => {
          return `${text.FirstName} ${text.LastName}`;
        },
      },
      {
        title: "Image",
        dataIndex: "address",
        key: "1",
        width: 150,
        render: (record, text, index) => imageCustom(text.Image),
      },
      {
        title: "Gender",
        dataIndex: "Gender",
        key: "Gender",
        width: 150,
        render: (record, text, index) => Gender[text.Gender],
      },
      {
        title: "Role",
        dataIndex: "RoleName",
        key: "RoleName",
        width: 150,
      },
      {
        title: "Dob",
        dataIndex: "Dob",
        key: "Dob",
        width: 150,
        render: (record, text, index) => {
          return moment(text.Dob).format("MMMM Do YYYY");
        },
      },
      {
        title: "Tel",
        dataIndex: "Tel",
        key: "Tel",
        width: 150,
      },
      {
        title: "Email",
        dataIndex: "Email",
        key: "Email",
        width: 150,
      },
      {
        title: "Address",
        dataIndex: "Address",
        key: "7",
        width: 150,
      },
      {
        title: "Status",
        dataIndex: "Status",
        render: (record, text, index) => {
          return statusCustom(text.Status);
        },
        key: "8",
        width: 150,
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: () => "action",
      },
    ];
  }

  useEffect(() => {
    console.log("use effect");
  }, []);
  return {
    fixedTop,
    setFixedTop,
    columns,
  };
}
