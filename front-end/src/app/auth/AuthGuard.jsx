import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "app/appContext";
import GullLayout from "app/GullLayout/GullLayout";
import { flatMap } from "lodash";
import swal from "sweetalert2";
import { logoutUser } from "app/redux/actions/UserActions";

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
    return nextState.authenticated !== this.state.authenticated;
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
              title: "Nhập mã kích hoạt tài khoản được gửi về email",
              input: "text",
              inputAttributes: {
                autocapitalize: "off",
              },
              showCancelButton: true,
              confirmButtonText: "Xác nhận",
              cancelButtonText: "Thoát",
              backdrop: true,
              showLoaderOnConfirm: true,
              preConfirm: (login) => {
                return fetch(`//api.github.com/users/${login}`)
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error(response.statusText);
                    }
                    return response.json();
                  })
                  .catch((error) => {
                    swal.showValidationMessage(`Request failed: ${error}`);
                  });
              },
              onClose: (popup) => {
                this.props.logoutUser();
                swal.close();
              },
              allowOutsideClick: false,
            })
            .then((result) => {
              if (result.value) {
                swal.fire({
                  title: `${result.value.login}'s avatar`,
                  imageUrl: result.value.avatar_url,
                });
              }
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
