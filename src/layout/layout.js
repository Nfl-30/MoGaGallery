import React from 'react';
import { Layout } from 'antd';

const { Footer, Content } = Layout;

const LayOutWeb = (props) => {

return(
  <>
    <Content style={{ padding: '0 50px', margin: '30px 0' }}>
      <div className="site-layout-content">
        {props.content}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </>
);
}

export default LayOutWeb