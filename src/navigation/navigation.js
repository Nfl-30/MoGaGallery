import React , {useContext} from "react";
import { Link } from "react-router-dom"
import { ThemeChangeBGContext } from "../context/ThemeContext";
import SwitchColor from "../content/ButtonSwitchColor"
import { Layout, Menu } from "antd"
import { Header } from "antd/lib/layout/layout";
import logo from "../img/logo3.png"
import {
    DesktopOutlined,
    VideoCameraOutlined,
    ProjectOutlined,
    SettingOutlined,
  } from '@ant-design/icons';
  import {
    Switch,
    Route,
} from "react-router-dom";
import { ListContentContextNav } from "../context/ContextNav";
import AboutSection from "../content/About";
import { ContentListMovie } from "../content/ListMovieContent";
import { ContentFormMovie } from "../content/FormMovieContent";
import { ContentListGames } from "../content/ListGamesContent";
import ContentCardMovie from "../content/MovieFrontPage";
import { LoginContent } from "../content/Login";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router";
import { RegisterContent } from "../content/register";
import ContentCardGame from "../content/GamesFrontPage";
import ChangePassword from "../content/Changepassword";
import { ContentFormGames } from "../content/FormGamesContent";
import ContentCardMovieDescription from "../content/CardContent";
import HomeData from "../content/Home";

  
// const {Theme}= useContext(ThemeChangeBGContext);
// const navChange = Theme

const { Sider } = Layout;
const { SubMenu } = Menu;

const Navigation = () =>{
    const { setLoginStatus } = useContext(UserContext)
    const {functions} = useContext(ListContentContextNav)
    const {Theme} = useContext(ThemeChangeBGContext)    
    const {functionsCollapse} = functions
    const navChange = Theme

    const OnCollapse = collapsed => {
        functionsCollapse(collapsed)
    };

  const handleLogout = () => {
    setLoginStatus(false)
    Cookies.remove('token')
    Cookies.remove('username')
    Cookies.remove('email')
    window.location = '/Login'
  }

  const RouteLogin = ({...props}) => {
    if(Cookies.get('token') === undefined){
      return <Route {...props}/>
    }else if(Cookies.get('token') !== undefined){
      return <Redirect to="/"/>
    }
  }

  const RouteRequiredLogin = ({...props}) => {
    if(Cookies.get('token') !== undefined){
      return <Route {...props}/>
    }else if(Cookies.get('token') === undefined){
      return <Redirect to="/login"/>
    }
  }
    
    return(
        <>
        <Layout>
              <Header className={`${navChange}`}>
                {/* width="100%" length="100%" */}
                <div className="logo"><img src={logo} alt="Logo" className="logo-pic" /></div>
                <Menu className="menu" theme={navChange} mode="horizontal" style={{ float: 'right', width: "35%"  }}>
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/ListGalleryMovie">Movie</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/ListGalleryGame">Games</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/About">About</Link></Menu.Item>
                {Cookies.get('token') === undefined &&
                <SubMenu key="sub1" title="Account">
                <Menu.Item key="5"><Link to="/Login">Login</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/Register">Register</Link></Menu.Item>
                </SubMenu>
                }
                { Cookies.get('token') !== undefined &&
                <Menu.Item key="5"><span onClick={handleLogout}>Logout</span></Menu.Item>
                }
                </Menu>
                <div className="switchplace" style={{marginRight:"14px"}}>
                  <SwitchColor/>
                </div>
              </Header>
            <Layout>
              { Cookies.get('token') !== undefined &&
              <Sider collapsible onCollapse={OnCollapse} style={{ minHeight: '100vh' }} className={`site-layout-background ${navChange}`}>
                <Menu theme={navChange} mode="inline">
                <Menu.Item key="1" icon={<ProjectOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<VideoCameraOutlined />} title="Movie">
                    <Menu.Item key="2"><Link to="/ListMovie">Movie List</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/ListMovie/create">Create New Entry</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<DesktopOutlined />} title="Games">
                    <Menu.Item key="4"><Link to="/ListGames">Games List</Link></Menu.Item>
                    <Menu.Item key="5"><Link to="/ListGames/create">Create New Entry</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="6" icon={<SettingOutlined />}>
                    <Link to="/Change-password">Change Password</Link>
                </Menu.Item>
              </Menu>
              </Sider>
            }
            <Layout>
            <Switch>
              <Route path="/" exact component={HomeData}/>              
              <Route path="/ListGalleryMovie" exact component={ContentCardMovie}/>
              <Route path="/ListGalleryGame" exact component={ContentCardGame}/>
              <Route path="/ListGallery:datasource/details/:value" exact component={ContentCardMovieDescription}/>
              <RouteRequiredLogin path="/ListMovie" exact component={ContentListMovie}/>
              <RouteRequiredLogin path="/ListMovie/create" exact component={ContentFormMovie}/>
              <RouteRequiredLogin path="/ListMovie/edit/:value" exact component={ContentFormMovie}/>
              <RouteRequiredLogin path="/ListGames" exact component={ContentListGames}/>
              <RouteRequiredLogin path="/ListGames/create" exact component={ContentFormGames}/>
              <RouteRequiredLogin path="/ListGames/edit/:value" exact component={ContentFormGames}/>
              <Route path="/About" exact component={AboutSection}/>
              <RouteLogin path="/Login" exact component={LoginContent}/>
              <RouteLogin path="/Register" exact component={RegisterContent}/>
              <RouteRequiredLogin path="/Change-password" exact component={ChangePassword}/>
            </Switch>
            </Layout>
            </Layout>
            </Layout>
        </>
    );
}

export default Navigation