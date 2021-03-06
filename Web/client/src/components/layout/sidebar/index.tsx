import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { connect } from "react-redux";
import { Item } from "./item";
import "./global.css";

import {
  faTools,
  faBell,
  faMapMarked,
  faUserShield,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { fetchNotifications } from "../../../actions/notificationActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = (props: any) => {
  const classes = useStyles();
  const { user } = props;
  const [adminBoard, showAdminBoard] = useState(false);

  /* Gets notifications from DB */
  useEffect(() => {
    props.dispatch(fetchNotifications());
  }, []);

  useEffect(() => {
    showAdminBoard(user && user.userRole === "Admin");
  }, []);

  return (
    <div>
      {user ? (
        <nav className={classes.navbar}>
          <ul className={classes.navList}>
            <li className={classes.logo}>
              <a href="#" className={classes.navLink}>
                <span className={classes.brand}>AirQI</span>
                <div className={classes.fontIcon}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </a>
            </li>

            <Item
              title={"Profile"}
              reference={"/profile"}
              fontIcon={faTools}
              classes={classes}
              animation={""}
            />

            <li className={classes.navItem}>
              <a href={"/notifications"} className={classes.navLink}>
                {props.items.length != 0 ? (
                  <div className={classes.fontIcon + " " + "blob"}>
                    <FontAwesomeIcon className={""} icon={faBell} />
                    <span className={classes.notificationItem}>
                      {props.items.length}
                    </span>
                  </div>
                ) : (
                  <div className={classes.fontIcon }>
                    <FontAwesomeIcon className={""} icon={faBell} />
                  </div>
                )}
                <span className={classes.linkText}>{"Notifications"}</span>
              </a>
            </li>

            <Item
              title={"Dashboard"}
              reference={"/dashboard"}
              fontIcon={faMapMarked}
              classes={classes}
              animation={""}
            />
            {adminBoard && (
              <Item
                title={"Admin"}
                reference={"/admin"}
                fontIcon={faUserShield}
                classes={classes}
                animation={""}
              />
            )}
            <li className={classes.navItem}></li>
          </ul>
        </nav>
      ) : (
        " "
      )}
    </div>
  );
};

function mapStateToProps(state: any) {
  const { user } = state.auth;
  const { items } = state.notifications;
  return {
    user,
    items,
  };
}

export default connect(mapStateToProps)(Sidebar);

/* Custom sidebar style */

const useStyles = createUseStyles({
  navbar: {
    position: "fixed",
    zIndex: 2,
    transition: "width 100ms ease",
    backgroundColor: "var(--bg-primary)",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  linkText: {
    display: "none",
    width: "300px",
    marginLeft: "1rem",
  },
  brand: {
    composes: ["$logoText", "$linkText"],
  },
  fontIcon: {
    fontSize: "1.1rem",
    width: "40px",
    height: "40px",
    minWidth: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    textTransform: "uppercase",
    marginBottom: "1rem",
    color: "var(--text-secondary)",
    background: "var(--bg-secondary)",
    fontSize: "1.2rem",
    letterSpacing: "0.3ch",
    width: "100%",
    "& $fontIcon": {
      transform: "rotate(0deg)",
    },
  },
  logoText: {
    display: "inline",
    position: "absolute",
    left: "-400px",
  },
  notificationItem: {
    position: "absolute",
    borderRadius: "50%",
    display: "flex",
    padding: "1px",
    textAlign: "center",
    top: "-2px",
    right: "-3px",
    fontSize: "13px",
    justifyContent: "center",
    color: "white",
    width: "20px",
    height: "20px",
    background: "#f46f",
  },
  navItem: {
    width: "100%",
    "&:last-child": {
      marginTop: "auto",
    },
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    height: "5rem",
    color: "var(--text-primary)",
    textDecoration: "none",
    filter: "grayscale(100%) opacity(0.7)",
    "& $fontIcon": {
      width: "40px",
      minWidth: "40px",
      margin: "1.2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "200ms",
    },
    "&:hover": {
      textDecoration: "none",
      filter: "grayscale(0%) opacity(1)",
      color: "var(--text-secondary)",
      background: "var(--bg-hover)",
    },
  },

  [`@media only screen and (min-width: 600px)`]: {
    navbar: {
      top: 0,
      width: "5rem",
      height: "100vh",
      "&:hover": {
        width: "16rem",
      },
      "&:hover $fontIcon": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      "&:hover $linkText": {
        transition: "400ms ease",
        display: "inline",
      },
      "&:hover $logo $fontIcon": {
        transform: "rotate(-180deg)",
        marginLeft: "11rem",
      },
      "&:hover $logoText": {
        left: "1.3rem",
      },
    },
  },
});
