import React from "react";
import { useDispatch, useSelector } from "react-redux";
import pic from "../../../assets/logo-boys2-transparent.png";
import { sideBarState } from "../../../redux/slices/elearningSlice";

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from "@coreui/react";

import { AppSidebarNav } from "../AppSidebarNav/AppSidebarNav";

// sidebar nav config
import navigation from "../_nav";
import { Link } from "react-router-dom";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => {
    return state.sideBarState.sidebarUnfoldable;
  });
  const sidebarShow = useSelector((state) => state.sideBarState.sidebarShow);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(sideBarState({ type: "set", sidebarShow: visible }));
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className="sidebar-brand-full" to="/">
          {/* <h4>دستیار آموزشی</h4> */}
          <h4 className="text-center ml-7 text-">
            <Link to={"/"}>LearnAssist.ir</Link>
          </h4>
          <img src={pic} className="sm:w-36 ml-7" />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: "set", sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => {
            dispatch(
              sideBarState({ type: "set", sidebarUnfoldable: !unfoldable })
            );
          }}
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
