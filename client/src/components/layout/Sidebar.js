import React from "react";
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";
import Grid from "@material-ui/core/Grid";

const SidebarComp = props => (
  <Grid container>
    <Grid item sm={3}>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
      >
        <Menu.Item as="a">
          <Icon name="calendar" />
          Schedule
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="user md" />
          Patients
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="log out" />
          Log Out
        </Menu.Item>
      </Sidebar>
    </Grid>
    <Grid item sm={9}>
      {props.children}
    </Grid>
  </Grid>
);

export default SidebarComp;
