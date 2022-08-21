import React, { Component } from "react";
import ComparisonChart from "app/views/charts/echarts/ComparisonChart";
import PieChart from "app/views/charts/echarts/PieChart";
import LineChart3 from "app/views/charts/echarts/LineChart3";
import LineChart1 from "app/views/charts/echarts/LineChart1";
import LineChart2 from "app/views/charts/echarts/LineChart2";
import { Breadcrumb } from "@gull";
import SimpleCard from "@gull/components/cards/SimpleCard";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Responsive, WidthProvider } from "react-grid-layout";
import { connect } from "react-redux";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Dashboard1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList1: [
        {
          icon: "i-Add-User",
          title: "205",
          subtitle: "new leads"
        },
        {
          icon: "i-Financial",
          title: "4021",
          subtitle: "sales"
        },
        {
          icon: "i-Checkout-Basket",
          title: "80",
          subtitle: "checkout"
        },
        {
          icon: "i-Money-2",
          title: "120",
          subtitle: "expense"
        }
      ],
      topSellingProduct: [
        {
          title: "Wireless Headphone E23",
          description: "Lorem ipsum dolor sit amet consectetur.",
          prevPrice: 500,
          currentPrice: 450,
          imgUrl: "/assets/images/products/headphone-4.jpg"
        },
        {
          title: "Wireless Headphone Y902",
          description: "Lorem ipsum dolor sit amet consectetur.",
          prevPrice: 500,
          currentPrice: 200,
          imgUrl: "/assets/images/products/headphone-3.jpg"
        },
        {
          title: "Wireless Headphone E09",
          description: "Lorem ipsum dolor sit amet consectetur.",
          prevPrice: 500,
          currentPrice: 600,
          imgUrl: "/assets/images/products/headphone-2.jpg"
        },
        {
          title: "Wireless Headphone X89",
          description: "Lorem ipsum dolor sit amet consectetur.",
          prevPrice: 500,
          currentPrice: 350,
          imgUrl: "/assets/images/products/headphone-4.jpg"
        }
      ],
      newUserList: [
        {
          name: "Smith Doe",
          email: "Smith@gmail.com",
          status: "active",
          photoUrl: "/assets/images/faces/1.jpg"
        },
        {
          name: "Jhon Doe",
          email: "Jhon@gmail.com",
          status: "pending",
          photoUrl: "/assets/images/faces/2.jpg"
        },
        {
          name: "Alex",
          email: "Otttio@gmail.com",
          status: "inactive",
          photoUrl: "/assets/images/faces/3.jpg"
        },
        {
          name: "Mathew Doe",
          email: "matheo@gmail.com",
          status: "active",
          photoUrl: "/assets/images/faces/4.jpg"
        }
      ],
      userActivity: [
        {
          activitylist: [
            {
              title: "Pages / Visit",
              count: 2065
            },
            {
              title: "New user",
              count: 465
            },
            {
              title: "Last week",
              count: 23456
            }
          ]
        },
        {
          activitylist: [
            {
              title: "Pages / Visit",
              count: 435
            },
            {
              title: "New user",
              count: 5435643
            },
            {
              title: "Last week",
              count: 45435
            }
          ]
        },
        {
          activitylist: [
            {
              title: "Pages / Visit",
              count: 545
            },
            {
              title: "New user",
              count: 54353
            },
            {
              title: "Last week",
              count: 4643
            }
          ]
        }
      ],
      currentBreakpoint: "lg",
      compactType: "horizontal",
      mounted: false,
      rowHeight: 110,
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      layouts: {
        lg: [
          {i: 'key_0', x: 0, y: 0, w: 3, h: 1},
          {i: 'key_1', x: 3, y: 0, w: 3, h: 1},
          {i: 'key_2', x: 6, y: 0, w: 3, h: 1},
          {i: 'key_3', x: 9, y: 0, w: 3, h: 1},
          {i: 'key_4', x: 0, y: 1, w: 8, h: 3},
          {i: 'key_5', x: 8, y: 1, w: 4, h: 3},
          {i: 'key_6', x: 0, y: 4, w: 3, h: 3.15},
          {i: 'key_7', x: 3, y: 4, w: 3, h: 3.15},
          {i: 'key_8', x: 6, y: 4, w: 6, h: 2.6},
          {i: 'key_9', x: 0, y: 7.15, w: 6, h: 4},
          {i: 'key_10', x: 6, y: 7.15, w: 6, h: 4},
          {i: 'key_11', x: 0, y: 11.15, w: 12, h: 3.65},
        ]
      },
      addLayouts: {
        key_12: {i: 'key_12', x: 0, y: 14.8, w: 6, h: 1}
      }
    };

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  componentDidUpdate(prevProps) {
    const handleState = this.props.widget.handleState;
    const index = this.props.widget.widgetIndex;
    let layouts = this.state.layouts.lg;

    if(prevProps.widget.handleState !== handleState ||
      prevProps.widget.widgetIndex !== index) {
      if(handleState) {
        layouts.push(this.state.addLayouts[`key_${index}`]);
      } else {
        for(let i = 0; i < layouts.length; i++) {
          if(layouts[i].i == `key_${index}`) {
            layouts.splice(i, 1);
            break;
          }
        }
      }
      this.setState({layouts: {lg: layouts}});
    }
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  onCompactTypeChange() {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
          ? null
          : "horizontal";
    this.setState({ compactType });
  }

  getUserStatusClass = status => {
    switch (status) {
      case "active":
        return "badge-success";
      case "inactive":
        return "badge-warning";
      case "pending":
        return "badge-primary";
      default:
        break;
    }
  };

  render() {
    let {
      cardList1 = [],
      topSellingProduct = [],
      newUserList = [],
      userActivity = [],
      currentBreakpoint = "",
      compactType = "",
      mounted = false,
      rowHeight = 0,
      cols = {},
      layouts = {},
    } = this.state;
  
    const {widget} = this.props;
    let extraWidget;

    if(widget.handleState)
      extraWidget = 
        <div key="key_12">
          <div className="grid-item card o-hidden mb-4">
            <div className="card-body text-center">
              <div className="content">
                <p className="lead text-primary text-24 mb-2 text-capitalize">
                  New Widget - 1
                </p>
              </div>
            </div>
          </div>
        </div>;
    else
      extraWidget = <></>;

    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Dashboard", path: "/dashboard" },
            { name: "Version 1" }
          ]}
        ></Breadcrumb>
        <ResponsiveReactGridLayout
          rowHeight={rowHeight}
          cols={cols}
          layouts={layouts}
          onBreakpointChange={this.onBreakpointChange}
          measureBeforeMount={false}
          useCSSTransforms={mounted}
          compactType={compactType}
          preventCollision={!compactType}
        >
          {cardList1.map((card, index) => (
            <div key={`key_${index}`}>
              <div className="grid-item card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                <div className="card-body text-center">
                  <i className={card.icon}></i>
                  <div className="content">
                    <p className="text-muted mt-2 mb-0 text-capitalize">
                      {card.subtitle}
                    </p>
                    <p className="lead text-primary text-24 mb-2 text-capitalize">
                      {card.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div key="key_4" className="grid-item">
            <SimpleCard title="This Year Sales" className="grid-item mb-4">
              <ComparisonChart height="260px"></ComparisonChart>
            </SimpleCard>
          </div>
          <div key="key_5">
            <SimpleCard title="Sales by Countries" className="grid-item mb-4">
              <PieChart height="260px"></PieChart>
            </SimpleCard>
          </div>
          <div key="key_6">
            <div className="grid-item card mb-4">
              <div className="card-title card-body mb-0 pb-0">
                <h3 className="mb-4">Last Month Sales</h3>
                <p className="text-primary mb-0 text-24">$40250</p>
              </div>
              <LineChart1 height="260px"></LineChart1>
            </div>
          </div>

          <div key="key_7">
            <div className="grid-item card mb-4">
              <div className="card-title card-body mb-0 pb-0">
                <h3 className="mb-4">Last Week Sales</h3>
                <p className="text-primary mb-0 text-24">$10250</p>
              </div>
              <LineChart2 height="260px"></LineChart2>
            </div>
          </div>
          <div key="key_8">
            <div className="grid-item card mb-4">
              <div className="card-header card-title mb-0 d-flex align-items-center justify-content-between border-0">
                <h3 className="w-50 float-left card-title m-0">
                  New Users
                </h3>
                <Dropdown alignRight>
                  <Dropdown.Toggle
                    as="span"
                    className="toggle-hidden cursor-pointer"
                  >
                    <i className="nav-icon i-Gear-2"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Add new user</Dropdown.Item>
                    <Dropdown.Item>View All users</Dropdown.Item>
                    <Dropdown.Item>Something else here</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="">
                <div className="table-responsive">
                  <table id="user_table" className="table  text-center">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newUserList.map((user, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.name}</td>
                          <td>
                            <img
                              className="rounded-circle m-0 avatar-sm-table "
                              src={user.photoUrl}
                              alt=""
                            />
                          </td>

                          <td>{user.email}</td>
                          <td>
                            <span
                              className={`badge ${this.getUserStatusClass(
                                user.status
                              )}`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td>
                            <span className="cursor-pointer text-success mr-2">
                              <i className="nav-icon i-Pen-2 font-weight-bold"></i>
                            </span>
                            <span className="cursor-pointer text-danger mr-2">
                              <i className="nav-icon i-Close-Window font-weight-bold"></i>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div key="key_9">
            <SimpleCard title="Top selling products" className="grid-item mb-4">
              {topSellingProduct.map((item, index) => (
                <div
                  key={index}
                  className="d-flex flex-column flex-sm-row align-items-sm-center mb-3"
                >
                  <img
                    className="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3"
                    src={item.imgUrl}
                    alt=""
                  />
                  <div className="flex-grow-1">
                    <h5 className="">
                      <Link to="/">{item.title}</Link>
                    </h5>
                    <p className="m-0 text-small text-muted">
                      {item.description}
                    </p>
                    <p className="text-small text-danger m-0">
                      ${item.currentPrice}
                      <del className="text-muted">${item.prevPrice}</del>
                    </p>
                  </div>
                  <div>
                    <button className="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </SimpleCard>
          </div>

          <div key="key_10" className="card mb-4">
            <div className="grid-item card-body p-0">
              <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                <h3 className="mb-0">User activity</h3>
                <span className="flex-grow-1"></span>
                <span className="badge badge-pill badge-warning">
                  Updated daily
                </span>
              </div>
              {userActivity.map(({ activitylist = [] }, index) => (
                <div
                  key={index}
                  className="d-flex border-bottom justify-content-between p-3"
                >
                  {activitylist.map((item, i) => (
                    <div key={i} className="flex-grow-1">
                      <span className="text-small text-muted">
                        {item.title}
                      </span>
                      <h5 className="m-0">{item.count}</h5>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div key="key_11">
            <div className="grid-item card mb-4">
              <div className="card-body card-title mb-0">
                <h3 className="m-0">Last 20 Day Leads</h3>
              </div>
              <LineChart3 height="360px"></LineChart3>
            </div>
          </div>
        
          {extraWidget}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  widget: state.widget
});

export default connect(mapStateToProps, null)(Dashboard1);
