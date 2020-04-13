import React from "react";
import { Icon, Menu, Sidebar, Dropdown } from "semantic-ui-react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { Link } from "react-router-dom";
import swal from "sweetalert";
const SidebarComp = ({ children, logout }) => {
  const logOut = () => {
    swal({
      title: "Log Out",
      text: `You are about to Log Out, confirm?`,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(confirm => {
      if (confirm) {
        logout();
      }
    });
  };
  return (
    <Grid container>
      <Grid item sm={3}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible
          width="very wide"
          style={{ overflow: "visible !important", transition: "overlay" }}
        >
          <Menu.Item as={Link} to="/dashboard">
            <Icon name="calendar" />
            Schedule
          </Menu.Item>
          <Menu.Item as={Link} to="/patients">
            <Icon name="user md" />
            Patients
          </Menu.Item>
          <Menu.Item as="a" onClick={() => logOut()}>
            <Icon name="log out" />
            Log Out
          </Menu.Item>
        </Sidebar>
      </Grid>
      <Grid item sm={9}>
        {children}
      </Grid>
    </Grid>
  );
};

export default connect(null, { logout })(SidebarComp);
