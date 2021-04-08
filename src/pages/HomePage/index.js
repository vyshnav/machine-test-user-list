import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { fetchUsers } from "redux/users/usersSlice";
import { logOut } from "redux/auth/authSlice";
import { Field, Form, Formik } from "formik";
import styles from "./index.module.css";

function HomePage() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const initialRequest = localStorage.getItem("initialRequest")
    ? localStorage.getItem("initialRequest")
    : false;

  if (initialRequest === false) {
    dispatch(fetchUsers());
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterData = users.filter(function (item) {
    return item?.user?.name?.first?.toLowerCase().indexOf(search) !== -1; // returns true or false
  });

  const userData = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  setTimeout(() => {
    setUsers(userData);
  }, 1000);

  return (
    <div className={styles.form}>
      <Formik
        initialValues={{ first: "", password: "" }}
        onSubmit={(values) => {
          console.log(users);
          setUsers([
            ...users,
            {
              user: {
                name: {
                  first: values?.first,
                  last: values?.last,
                },
                email: values?.email,
                password: values?.password,
              },
            },
          ]);
          localStorage.setItem(
            "users",
            JSON.stringify([
              ...users,
              {
                user: {
                  name: {
                    first: values?.first,
                    last: values?.last,
                  },
                  email: values?.email,
                  password: values?.password,
                },
              },
            ])
          );
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              className={styles.input}
              type="text"
              name="first"
              placeholder="First Name"
            />
            {errors.name && touched.first ? <div>{errors.first}</div> : null}
            <Field
              className={styles.input}
              type="text"
              name="last"
              placeholder="Last Name"
            />
            {errors.last && touched.last ? <div>{errors.last}</div> : null}
            <Field
              className={styles.input}
              type="text"
              name="email"
              placeholder="Email"
            />
            {errors.username && touched.email ? (
              <div>{errors.email}</div>
            ) : null}
            <Field
              className={styles.input}
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit" className={styles.add_user_btn}>
              Add user
            </button>
          </Form>
        )}
      </Formik>
      <button className={styles.logout} onClick={() => dispatch(logOut())}>
        Logout
      </button>
      <input
        className={styles.input}
        type="text"
        name="Search"
        placeholder="Search"
        onChange={(e) => handleSearch(e)}
      />
      <ul>
        {filterData?.map((userItem, index) => (
          <li>
            {userItem?.user?.name?.first} {userItem?.user?.name?.last}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
