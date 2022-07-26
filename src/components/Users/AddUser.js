import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import UsersList from "./UsersList";

let usersList = [];

const AddUser = () => {
  const blankUser = {
    username: "",
    age: "",
  };

  const [user, setUser] = useState(blankUser);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidAge, setInvalidAge] = useState(false);

  const handleUsernameInputChange = (e) => {
    setUser({ ...user, username: e.target.value });
  };

  const handleAgeInputChange = (e) => {
    setUser({ ...user, age: e.target.value });
  };

  const nameIsValid = (name) => {
    if (typeof name === "string" && name.replace(/\s+/g, "") !== "")
      return true;
    else {
      setInvalidName(true);
      return false;
    }
  };

  const ageIsValid = (age) => {
    if (age >= 0) {
      return true;
    } else {
      setInvalidAge(true);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validInputs = true;

    let values = { id: usersList.length, username: "", age: 0 };

    const name = user.username;
    if (nameIsValid(name)) {
      values.username = name;
    } else validInputs = false;

    const age = parseInt(user.age);
    if (ageIsValid(age)) {
      values.age = age;
    } else validInputs = false;

    if (validInputs) {
      usersList.push(values);
      setInvalidName(false);
      setInvalidAge(false);
      setUser(blankUser);
    }
  };

  return (
    <div>
      <Card className={classes.card}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={user.username}
            onChange={handleUsernameInputChange}
          />
          {invalidName && <span>Please enter a valid user name</span>}
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={user.age}
            onChange={handleAgeInputChange}
          />
          {invalidAge && <span>Please enter a valid user name</span>}
          <Button type="submit" className={classes.submit}>
            Add User
          </Button>
        </form>
      </Card>
      <UsersList users={usersList} />
    </div>
  );
};

export default AddUser;
