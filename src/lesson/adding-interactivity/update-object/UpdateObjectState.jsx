import { useState } from "react";
import { useImmer } from "use-immer";

const initValue = {
  name: "",
  age: 0,
  city: "phnom penh",
  info: {
    address: "street 20",
    phone: "",
    birth: {
      placeOfBirth: "phnom penh",
      dateOfBirth: "",
    },
  },
};
export default function UpdateObjectState() {
  const [person, updatePerson] = useImmer(initValue);

  const [listStudent, setListStudent] = useState([]);
  console.log(listStudent, "listStudent");

  const [isEdit, setIsEdit] = useState(null);
  const onDeleteStudent = (index) => {
    const newListStudent = listStudent?.filter(
      (_, idxStudent) => idxStudent !== index
    );
    setListStudent(newListStudent);
  };

  function onEditStudent(index) {
    const student = listStudent[index];
    updatePerson(student);
    setIsEdit(index);
  }

  function addHandler() {
    if (isEdit === 0 || isEdit) {
      const newListStudent = listStudent;

      newListStudent[isEdit] = person;

      setListStudent([...newListStudent]);
      setIsEdit(null);
      updatePerson(initValue);
    } else {
      setListStudent([...listStudent, person]);
      updatePerson(initValue);
    }
  }
  return (
    <div>
      <h2>Add new student</h2>
      <label>Name:</label>
      <input
        name="name"
        onChange={(e) => {
          updatePerson((draft) => {
            draft.name = e.target.value;
          });
          // updatePerson({ ...person, name: e.target.value });
        }}
        value={person.name}
      />
      <br />
      <label>Age:</label>
      <input
        name="age"
        onChange={(e) => {
          updatePerson((draft) => {
            draft.age = e.target.value;
          });
          //   updatePerson({ ...person, age: e.target.value });
        }}
        value={person.age}
      />
      <br />
      <label>City:</label>
      <input
        name="city"
        onChange={(e) => {
          updatePerson((draft) => {
            draft.city = e.target.value;
          });
          //   updatePerson({ ...person, city: e.target.value });
        }}
        value={person.city}
      />
      <br />
      <label>Phone:</label>
      <input
        name="phone"
        onChange={(e) => {
          updatePerson((draft) => {
            draft.info.phone = e.target.value;
          });
          //   setPerson({
          //     ...person,
          //     info: { ...person.info, phone: e.target.value },
          //   });
        }}
        value={person.info.phone}
      />
      <br />
      <button onClick={addHandler}>
        {isEdit === 0 || isEdit ? "Edit" : "Add"}
      </button>
      <h2>List</h2>
      <table border={1}>
        {" "}
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
          <th>Action</th>
        </tr>
        {listStudent.map((student, index) => {
          return (
            <tr key={student.name}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.city}</td>
              <td>
                <button onClick={() => onDeleteStudent(index)}>Delete</button>
                <button onClick={() => onEditStudent(index)}>Edit</button>
              </td>
            </tr>
          );
        })}
      </table>

      {/* {listStudent.map((student, index) => (
        <li key={index}>{student.name}</li>
      ))} */}
    </div>
  );
}
