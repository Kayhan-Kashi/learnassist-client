import { cilBell, cilContrast, cilMenu, cilMoon, cilSun } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
  useColorModes,
} from "@coreui/react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../services/authService.js";

import { NavLink } from "react-router-dom";
import AppBreadcrumb from "../AppBreadcrumb/AppBreadcrumb.jsx";
import AppHeaderDropdown from "../AppHeaderDropdown/AppHeaderDropdown.jsx";
import { setSideBarState } from "../../../redux/slices/elearningSlice.js";

const AppHeader = () => {
  const headerRef = useRef();
  const { colorMode, setColorMode } = useColorModes("learnAssist_theme");

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => {
    return state.elearningState.setSideBarState;
  });
  const unfoldable = useSelector((state) => {
    return state.elearningState.sidebarUnfoldable;
  });

  const firstname = getUserInfo().firstname;

  useEffect(() => {
    document.addEventListener("scroll", () => {
      headerRef.current &&
        headerRef.current.classList.toggle(
          "shadow-sm",
          document.documentElement.scrollTop > 0
        );
    });
    setColorMode("light");
  }, []);

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => {
            dispatch(
              setSideBarState({ type: "set", sidebarShow: !sidebarShow })
            );
            // dispatch(
            //   setSideBarState({ type: "set", sidebarUnfoldable: unfoldable })
            // );
          }}
          style={{ marginInlineStart: "-14px" }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          {/* <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem> */}
          {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav>
          {/* <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li> */}
          <CDropdown variant="nav-item" placement="bottom-end">
            {/* <CDropdownToggle caret={false}>
              {colorMode === "dark" ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === "auto" ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle> */}
            <CDropdownMenu>
              {/* <CDropdownItem
                active={colorMode === "light"}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode("light")}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === "dark"}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode("dark")}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === "auto"}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode("auto")}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem> */}
            </CDropdownMenu>
          </CDropdown>

          <h5 className="flex flex-row text-right mt-2 mr-10 text-cyan-700">
            <span className="pr-1 text-sm sm:text-lg"> خوش آمدی</span>
            <span className="pr-1 hidden sm:inline sm:text-lg" > LearnAssist </span>
            <span className="pr-1 hidden sm:inline sm:text-lg"> به </span>
            <span className="pr-1 text-sm sm:text-lg"> {firstname} </span>
          </h5>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75 mb-2"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        {/* <p className="flex flex-row text-right">
          <span className="pr-1"> خوش آمدی</span>
          <span className="pr-1"> LearnAssist </span>
          <span className="pr-1"> به </span>
          <span className="pr-1"> {firstname} </span>
        </p> */}
        {/* <AppBreadcrumb /> */}
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
