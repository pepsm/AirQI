import React from "react";
import { Switch, Route } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";

/* Styling */
import { makeStyles } from "@material-ui/core/styles";

/* Components */
import Map from "../map/map";
import Register from "../_pages/register";
import Login from "../_pages/login";
import Profile from "../_pages/profile";
import Dashboard from "../_pages/dashboard";
import AdminBoard from "../_pages/admin/adminboard";
import Messages from "../_pages/messages";

const Main = () => {
  const classes = useStyles();

  /* Routing the components */
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/messages" component={Messages} />
        <Route path="/user" component={Drawer} />
        <Route path="/mod" component={Drawer} />
        <Route path="/admin" component={AdminBoard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/map" component={Map} />
      </Switch>
    </main>
  );
};

export default Main;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
