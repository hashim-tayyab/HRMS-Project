import React from 'react';
import {Link} from 'react-router-dom'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import './Sidebar.css'

const SideNavBar = () => {
  return (
      <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          Quick Access
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
          <Link to="/applyleave" relative="path">
            <CDBSidebarMenuItem className='sideMenu' icon="th-large"><div className='menuItem'>Apply For Leave</div></CDBSidebarMenuItem>
            </Link>
            <Link to="/fellowemployees" relative="path">
            <CDBSidebarMenuItem className='sideMenu' icon="sticky-note"><div className='menuItem'>View Employees</div></CDBSidebarMenuItem>
            </Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{padding: '20px 5px'}}
          >
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
  );
};

export default SideNavBar;