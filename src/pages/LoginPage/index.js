import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { logIn } from "redux/auth/authSlice";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import styles from "./index.module.css";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Please enter Username"),
  password: Yup.string().required("Please enter Password"),
});

function LoginPage() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <div className={styles.form}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          dispatch(logIn(values));
        }}
        validationSchema={LoginSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Field className={styles.input} type="text" name="username" />
            {errors.username && touched.username ? (
              <div>{errors.username}</div>
            ) : null}
            <Field className={styles.input} type="password" name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit" className={styles.login_btn}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginPage;
