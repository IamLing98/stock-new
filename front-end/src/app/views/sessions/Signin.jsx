import React, { Component, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { loginWithEmailAndPassword } from "app/redux/actions/LoginActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import constants from "app/utils/constants";

const SigninSchema = yup.object().shape({
  username: yup.string().required("Dữ liệu chưa được nhập"),
  password: yup.string().required("Dữ liệu chưa được nhập"),
});

const Signin = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    event.persist();
    setState({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (value, { isSubmitting }) => {
    props.loginWithEmailAndPassword(value);
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
            <div className="col-md-6">
              <div className="p-4">
                <div className="auth-logo text-center mb-4">
                  <img src="/assets/images/logo.png" alt="" />
                </div>
                <h1 className="mb-3 text-18">Đăng nhập</h1>
                <Formik initialValues={state} validationSchema={SigninSchema} onSubmit={handleSubmit}>
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="username">Tài khoản</label>
                        <input
                          className="form-control form-control-rounded position-relative"
                          type="text"
                          name="username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                        />
                        {errors.username && <div className="text-danger mt-1 ml-2">{errors.username}</div>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                          className="form-control form-control-rounded"
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {errors.password && <div className="text-danger mt-1 ml-2">{errors.password}</div>}
                      </div>
                      <button className="btn btn-rounded btn-primary btn-block mt-2" type="submit">
                        Đăng nhập
                      </button>
                    </form>
                  )}
                </Formik>

                <div className="mt-3 text-center">
                  <Link to="/session/signup" className="text-muted">
                    <u>Đăng ký</u>
                  </Link>{" "}
                  <Link to="/session/forgot-password" className="text-muted">
                    <u>Quên mật khẩu?</u>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 text-center "
              style={{
                backgroundSize: "cover",
                backgroundImage: "url(/assets/images/photo-long-3.jpg)",
              }}
            >
              <div className="pr-3 auth-right">
                <Link
                  to="/session/signup"
                  className="btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text"
                >
                  <i className="i-Mail-with-At-Sign"></i> Đăng nhập bằng email
                </Link>

                <GoogleLogin
                  clientId={constants.GOOGLE_OAUTH.web.client_id}
                  render={(renderProps) => (
                    <Button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="btn btn-rounded btn-outline-google btn-block btn-icon-text"
                    >
                      <i className="i-Google-Plus"></i> Đăng nhập với Google
                    </Button>
                  )}
                  isSignedIn={false}
                  buttonText="Login"
                  onSuccess={(res) => {
                    console.log("google", res);
                  }}
                  onFailure={(errors) => {
                    console.log("errors", errors);
                  }}
                  cookiePolicy={"single_host_origin"}
                  ux_mode={"popup"}
                />

                <FacebookLogin
                  appId="1442245872960083"
                  autoLoad={false}
                  callback={(res) => {
                    console.log("Facebook", res);
                  }}
                  render={(renderProps) => (
                    <Button
                      onClick={renderProps.onClick}
                      className="btn btn-rounded btn-block btn-icon-text btn-outline-facebook"
                    >
                      <i className="i-Facebook-2"></i> Đăng nhập với Facebook
                    </Button>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  user: state.user,
});

export default connect(mapStateToProps, {
  loginWithEmailAndPassword,
})(Signin);
