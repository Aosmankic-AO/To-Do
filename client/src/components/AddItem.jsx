import React, { useState} from 'react';
import './AddItem.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquarePlus} from '@fortawesome/free-solid-svg-icons'

const AddItem = ({ addItemToTable }) => {
   
  const [title, setTitle] = useState('Title');
  const [description, setDescription] = useState('Description');

    /** Handle the submission */ 
    const handleSubmit = async (e) => {
      e.preventDefault();
      // send a POST request to the API
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      console.log(title, description)
      // If successful then execute code
      if (response.ok) {
        setTitle('');
        setDescription('');
        window.location.reload();
      }
    }

  
    
  return (
    <form className='form' onSubmit={handleSubmit}>
      <input className="input"
       type="text"
       value={title}
       onChange={(e) => setTitle(e.target.value)}
      />
      <input className="input"
       type="text"
       value={description}
       onChange={(e) => setDescription(e.target.value)}  
      />
      <button className='add-btn' type='submit'><FontAwesomeIcon icon={faSquarePlus} /></button>
    </form>
  );
};

export default AddItem;
