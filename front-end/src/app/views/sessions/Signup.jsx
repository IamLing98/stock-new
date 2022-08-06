import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  let history = useHistory();

  const state = {
    username: "",
    password: "",
    repassword: "",
    email: "",
    phoneNumber: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    axios
      .post("/auth/signup", values)
      .then((res) => {
        if (res?.data?.messageCode === "00") {
          history.push("/session/signin");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="auth-layout-wrap"
      style={{
        backgroundImage: "url(/assets/images/photo-wide-4.jpg)",
      }}
    >
      <div className="auth-content">
        <div className="card o-hidden">
          <div className="row">
            <div
              className="col-md-6 text-center "
              style={{
                backgroundSize: "cover",
                backgroundImage: "url(/assets/images/photo-long-3.jpg)",
              }}
            >
              <div className="pl-3 auth-right">
                <div className="auth-logo text-center mt-4">
                  <img src="assets/images/logo.png" alt="" />
                </div>
                <div className="flex-grow-1"></div>

                <div className="flex-grow-1"></div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-4">
                <h1 className="mb-3 text-18">Đăng ký</h1>
                <Formik initialValues={state} validationSchema={SignupSchema} onSubmit={handleSubmit}>
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                          className="form-control form-control-rounded"
                          name="username"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                        />
                        {errors.username && touched.username && (
                          <div className="text-danger mt-1 ml-2">{errors.username}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Địa chỉ email</label>
                        <input
                          name="email"
                          className="form-control form-control-rounded"
                          type="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && touched.email && (
                          <div className="text-danger mt-1 ml-2">{errors.email}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="phoneNumber">Số điện thoại</label>
                        <input
                          name="phoneNumber"
                          className="form-control form-control-rounded"
                          type="phoneNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                        />
                        {errors.phoneNumber && touched.phoneNumber && (
                          <div className="text-danger mt-1 ml-2">{errors.phoneNumber}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                          name="password"
                          className="form-control form-control-rounded"
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {errors.password && touched.password && (
                          <div className="text-danger mt-1 ml-2">{errors.password}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="repassword">Nhập lại mật khẩu</label>
                        <input
                          name="repassword"
                          className="form-control form-control-rounded"
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.repassword}
                        />
                        {errors.repassword && touched.repassword && (
                          <div className="text-danger mt-1 ml-2">{errors.repassword}</div>
                        )}
                      </div>
                      <button className="btn btn-primary btn-block btn-rounded mt-3" type="submit">
                        Đăng ký
                      </button>
                    </form>
                  )}
                </Formik>
                <div className="mt-3 text-center">
                  <Link to="/session/signin" className="text-muted">
                    <u>Đăng nhập</u>
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignupSchema = yup.object().shape({
  username: yup.string().required("Dữ liệu chưa được nhập"),
  email: yup.string().email("Invalid email").required("Dữ liệu chưa được nhập"),
  phoneNumber: yup.number().required("Dữ liệu chưa được nhập"),
  password: yup.string().min(8, "Mật khẩu phải 8 ký tự").required("Dữ liệu chưa được nhập"),
  repassword: yup
    .string()
    .required("Dữ liệu chưa được nhập")
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(Signup);
