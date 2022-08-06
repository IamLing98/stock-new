import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "app/appContext";
import GullLayout from "app/GullLayout/GullLayout";
import { flatMap } from "lodash";
import swal from "sweetalert2";
import { logoutUser } from "app/redux/actions/UserActions";
import Axios from "axios";

class AuthGuard extends Component {
  constructor(props, context) {
    super(props);
    let { routes } = context;

    this.state = {
      authenticated: true,
      routes,
    };
  }

  componentDidMount() {
    this.setState({
      routes: flatMap(this.state.routes, (item) => {
        if (item.routes) {
          return [...item.routes];
        }
        return [item];
      }),
    });

    if (!this.state.authenticated) {
      this.redirectRoute(this.props);
    }
  }

  componentDidUpdate() {
    if (!this.state.authenticated) {
      this.redirectRoute(this.props);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.authenticated !== this.state.authenticated ||
      JSON.stringify(nextProps.user) !== JSON.stringify(this.props.user)
    );
  }

  static getDerivedStateFromProps(props, state) {
    const { location, user } = props;
    console.log("User: ", user);
    const { pathname } = location;
    const matched = state.routes.find((r) => r.path === pathname);
    const authenticated =
      matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;

    return {
      authenticated,
    };
  }

  redirectRoute(props) {
    const { location, history } = props;
    const { pathname } = location;

    history.push({
      pathname: "/session/signin",
      state: { redirectUrl: pathname },
    });
  }

  render() {
    let { route, user } = this.props;
    const { authenticated } = this.state;

    return authenticated ? (
      user?.status === 2 ? (
        <Fragment>
          <GullLayout route={route}></GullLayout>
        </Fragment>
      ) : (
        <GullLayout route={[]}>
          {swal
            .fire({
              title: "Nhập mã kích hoạt tài khoản",
              input: "text",
              inputAttributes: {
                autocapitalize: "off",
              },
              showCancelButton: true,
              confirmButtonText: "Xác nhận",
              cancelButtonText: "Đóng",
              backdrop: true,
              showLoaderOnConfirm: true,
              onClose: (popop) => {
                this.props.logoutUser();
              },
              preConfirm: (login) => {
                return Axios.post(`auth/verify`, {
                  otp: login,
                })
                  .then((response) => {
                    return response;
                  })
                  .catch((error) => {
                    swal.showValidationMessage(`Kích hoạt không thành công`);
                  });
              },

              allowOutsideClick: false,
            })
            .then((response) => {
              if (response.data?.messageCode !== "00") {
                throw new Error(response.statusText);
              }
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            })
            .catch((err) => {
              swal.showValidationMessage(`Kích hoạt không thành công`);
            })}
        </GullLayout>
      )
    ) : null;
  }
}

AuthGuard.contextType = AppContext;

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(
  connect(mapStateToProps, {
    logoutUser,
  })(AuthGuard)
);
