import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.jsx';
import List from '../List/list.jsx';
import { v4 as uuid } from 'uuid';
import { SettingContext } from '../../context/Settings/settings.jsx';
import PaginationSettings from '../pagination/pagination.jsx';
import { LoginContext } from '../auth/context.jsx';
import Auth from '../auth/auth.jsx';
import "../../app.css"
import axios from 'axios';
import './todo.css';

const ToDo = () => {
  const settings = useContext(SettingContext);
  const [defaultValues] = useState({
    difficulty: 4,
  });

  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);

  const login = useContext(LoginContext);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    const updatedList = [...list, item];
    setList(updatedList);
    login.addItem(item);
    console.log(item);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://midproject.onrender.com/api/v1/todo`;
        const response = await axios.get(url);
        setList(response.data);
      } catch (error) {
        console.error("AxiosError:", error);
      
      }
    };

    fetchData();
  }, []); 

  async function deleteItem(id) {
    try {
      await axios.delete(`https://midproject.onrender.com/api/v1/todo/${id}`);
      const url = `https://midproject.onrender.com/api/v1/todo`;
      const response = await axios.get(url);
      setList(response.data);
    } catch (error) {
      console.error("AxiosError:", error);

    }
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
        const url = `https://midproject.onrender.com/api/v1/todo/${id}`;
        axios.put(url, item).then((res) => {
          setList([res.data]);
        });
      }
      return item;
    });
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  const filteredList = !settings.complete
    ? list.filter((item) => !item.complete)
    : list;

  const paginatedList = filteredList.slice(
    (currentPage - 1) * settings.maxItemsPerPage,
    currentPage * settings.maxItemsPerPage
  );

  return (
    <>
    <div className="ToDoContainer">
      {login.loggedIn && (
        <div className="ToDo">
          <h1 className="ToDo-header">To Do List: {incomplete} items pending</h1>

          <form onSubmit={handleSubmit} className="ToDo-form">
            <h2>Add To Do Item</h2>
            <Auth capability="create">
              <label className="ToDo-label">
                <span>To Do Item</span>
                <input
                  onChange={handleChange}
                  name="text"
                  type="text"
                  placeholder="Item Details"
                  className="ToDo-input"
                />
              </label>
              <label className="ToDo-label">
                <span>Assigned To</span>
                <input
                  onChange={handleChange}
                  name="assigned"
                  type="text"
                  placeholder="Assignee Name"
                  className="ToDo-input"
                />
              </label>
              <label className="ToDo-label">
                <span>Difficulty</span>
                <input
                  onChange={handleChange}
                  defaultValue={defaultValues.difficulty}
                  type="range"
                  min={1}
                  max={5}
                  name="difficulty"
                  className="ToDo-input"
                />
              </label>
              <label>
                <button type="submit" className="ToDo-button">Add Item</button>
              </label>
            </Auth>
          </form>
          <List deleteItem={deleteItem} list={paginatedList} toggleComplete={toggleComplete} />
          <PaginationSettings
            setCurrentPage={setCurrentPage}
            itemsPerPage={settings.maxItemsPerPage}
            total={filteredList.length / settings.maxItemsPerPage + 2}
          />
        </div>
      )}
    </div>
  </>
  );
};

export default ToDo;
