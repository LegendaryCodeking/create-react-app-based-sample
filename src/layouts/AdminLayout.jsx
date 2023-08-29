import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "../components/Admin/NavBar/NavBar";
import Sidebar from "../components/Admin/Sidebar/Sidebar";
import Dashboard from "../views/Admin/Dashboard";
import Models from "../views/Admin/Models";
import Organisations from "../views/Admin/Organisations";
import Users from "../views/Admin/Users";

class AdminLayout extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="flex h-screen bg-darkblue" style={{ height: "100vh" }}>
          <Sidebar />
          <div className="flex-1 h-screen overflow-y-auto">
            <div className="container">
              <NavBar />
              <div className="p-4 bg-darkblue">
                <Switch>
                  <Route
                    path="/admin/dashboard"
                    component={() => <Dashboard />}
                  />
                  <Route path="/admin/users" component={() => <Users />} />
                  <Route
                    path="/admin/organisations"
                    component={() => <Organisations />}
                  />
                  <Route path="/admin/models" component={() => <Models />} />
                  <Redirect from="/admin" to="/admin/dashboard" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminLayout;
