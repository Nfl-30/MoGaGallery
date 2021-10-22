import React from "react";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import Navigation from "./navigation";
import { Layout } from 'antd';
import { ThemeChangeBGProvider } from "../context/ThemeContext";
import { ListContentProviderNav } from "../context/ContextNav";
import { UserProvider } from "../context/UserContext";
import { ListContentProviderMovie } from "../context/ContentContextMovie";

export default function Routing() {

    return (
    
    <Layout className="layout">
      <ListContentProviderMovie>
      <UserProvider>
      <ListContentProviderNav>
      <ThemeChangeBGProvider>
      <Router>
      <Navigation/>
      </Router>
      </ThemeChangeBGProvider>
      </ListContentProviderNav>
      </UserProvider>
      </ListContentProviderMovie>
    </Layout>
    );
  }