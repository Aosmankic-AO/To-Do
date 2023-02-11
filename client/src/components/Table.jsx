import React, {useEffect, useState} from 'react';
import './components.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

export const fetchData = async() => {
  const response = await fetch('http://localhost:3001/todos/');
  const data = await  response.json();
  return data;
}

const Table = ({ data }) => {
  //Table data, list of items
  const [topTableData, setTopTableData] = useState([]);
  const [bottomTableData, setBottomTableData] = useState([]);

  // Data from MongoDB
  useEffect(() => {
    // load data here and set it using setData
    async function loadData() {
      const data = await fetchData();
      console.log('Fetching Data...');
      setTopTableData(data);
    }
    loadData();
  },[]);


  // Handling the delete button
  const handleDelete = async (index) => {
    console.log(topTableData[index]._id)
    // send a DELETE request to API
    const response = await fetch(`http://localhost:3001/todos/${encodeURIComponent(topTableData[index]._id)}`, {

      method: 'DELETE',
    })

    if(response.ok) {
      const newTopTableData = [...topTableData];
      newTopTableData.splice(index, 1);
      setTopTableData(newTopTableData);
    } 

  };


  // Handling Checkbox / Complete Task
  const handleCheckBox = (index) => {
    const newTopTableData = [...topTableData];
    const [row] = newTopTableData.splice(index, 1);
    setTopTableData(newTopTableData);
    setBottomTableData([...bottomTableData, row]);
  }

  // Convert the timestamp data to a more readable format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toDateString();
  }

  return (
    <div>
    <table>
    <thead>
      {<tr>
  <th></th>
  <th>title</th>
  <th>description</th>
  <th>completed</th>
  <th>created</th>
</tr>}
    </thead>
    <tbody>
      {topTableData.map((row, index) => (
        <tr key={row._id}>
        <td><button className='delete-btn' onClick={() => handleDelete(index)}><FontAwesomeIcon icon={faTrash} /></button></td>
        <td>{row.title}</td>
        <td>{row.description}</td>
        <td><input
              type="checkbox" 
              checked={false}
              onChange={() => handleCheckBox(index)}/>
              </td>
        <td>{formatDate(row.createdAt)}</td>
      </tr>
      ))}
    </tbody>
  </table>

  <hr />
  <table>
  <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>completed</th>
          </tr>
        </thead>
        <tbody>
          {bottomTableData.map((row) => (
            <tr key={row._id}>
              <td>{row.title}</td>
              <td>{row.description}</td>
              <td><input
                    type="checkbox" 
                    checked={true} 
                    disabled/>
              </td>
            </tr>
          ))}
        </tbody>



  </table>




  </div>
  );
};

export default Table;
