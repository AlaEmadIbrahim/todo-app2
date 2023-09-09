import React, { useContext, useState } from 'react';
import { SettingContext } from '../../context/Settings/settings';
import { Form } from 'react-bootstrap';
import { When } from 'react-if';
import { LoginContext } from '../auth/context';
import './usersettings.css'; 

function UserSettings() {
  const login = useContext(LoginContext);
  const settings = useContext(SettingContext);

  const handleToggleChange = () => {
    settings.setComplete(!settings.complete);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    settings.setMaxItemsPerPage(e.target.items.value);
    e.target.reset();
  };

  return (
    <div className="user-settings-container">
      <When condition={login.loggedIn}>
        <h2>User Settings</h2>

        <form onSubmit={handleSubmit}>
          <label>Items per page</label>
          <input type="number" name="items" />
          <div>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Show completed tasks"
                checked={settings.complete}
                onChange={handleToggleChange}
              />
            </Form>
          </div>
          <button type="submit">Save Settings</button>
        </form>

        <div className="updated-settings">
          <h3>Updated settings:</h3>
          <h4>{settings.complete ? "Show completed Todos" : "Hide Completed Todos"}</h4>
          <h4>Max items per page: {settings.maxItemsPerPage}</h4>
        </div>
      </When>
    </div>
  );
}

export default UserSettings;
