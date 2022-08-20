import React, { Component } from "react";
import LineChart3 from "app/views/charts/echarts/LineChart3";
import { Breadcrumb } from "@gull";
import SimpleCard from "@gull/components/cards/SimpleCard";
import { Dropdown, Row, Col, Tab, Tabs, Button, TabContent, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Responsive, WidthProvider } from "react-grid-layout";
import { connect } from "react-redux";

//Chart
import TopBuyAndSell from "app/views/charts/dashboard/TopBuyAndSell";
// import MultilevelTreeMap from "app/views/charts/dashboard/MultilevelTreeMap";
import Top10Stocks from "app/views/charts/dashboard/Top10Stock";
import HNIndexChartTop from "app/views/charts/dashboard/HNIndexChartTop";
import TopMarketInfluence from "app/views/charts/dashboard/TopMarketInfluence";
import TabMultiLevelTreeMap from "../../charts/dashboard/MultiLevelTreeMap/TabMultiLevelTreeMap"

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
          {i: 'key_4', x: 0, y: 1, w: 6, h: 3},
          {i: 'key_5', x: 6, y: 1, w: 6, h: 3},
          {i: 'key_6', x: 6, y: 7.15, w: 12, h: 4.5},
          {i: 'key_7', x: 3, y: 4, w: 3, h: 3.15},
          {i: 'key_8', x: 6, y: 4, w: 6, h: 2.6},
          {i: 'key_9', x: 0, y: 7.15, w: 6, h: 4},
          {i: 'key_10', x: 6, y: 7.15, w: 12, h: 3.65},
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
            // { name: "Version 1" }
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
          <div key="key_4">
            <div className="grid-item card mb-4">
              <div className="card-body card-title mb-0">
                <h3 className="m-0">Top 10</h3>
              </div>
            </div>
          </div>
          <div key="key_5">
            <div className="grid-item card mb-4">
              <div className="card-body card-title mb-0">
                <h3 className="m-0">Top 10</h3>
              </div>
            </div>
          </div>
          

          <div key="key_6">
            <div className="grid-item card mb-4">
              <div className="card-body card-title mb-0">
                <h3 className="m-0">Bản đồ thị trường</h3>
              </div>
                <TabMultiLevelTreeMap/>
            </div>
          </div>
          <div key="key_11">
            <div className="grid-item card mb-4">
              <div className="card-body card-title mb-0">
                <h3 className="m-0">Top ảnh hưởng thị trường</h3>
              </div>
              <TopMarketInfluence chartID='VNINDEX' height="350px"/>
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
