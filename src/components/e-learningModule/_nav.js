import {
  cilMonitor,
  cilPencil,
  cilPuzzle,
  cibCodepen,
  cilSpeedometer,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import React from "react";

const _nav = [
  {
    component: CNavItem,
    name: "مهندسی پرسش",
    to: "/elearning/prompt-engineering",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    role: "learnassist_admin",
    // badge: {
    //   color: "info",
    //   text: "NEW",
    // },
  },
  // {
  //   component: CNavItem,
  //   name: "داشبورد",
  //   to: "/elearning/dashboard",
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   role: "all",
  //   // badge: {
  //   //   color: "info",
  //   //   text: "NEW",
  //   // },
  // },
  {
    component: CNavTitle,
    name: "یادگیری آنلاین",
  },

  // {
  //   component: CNavItem,
  //   name: "مشاهده دوره",
  //   to: "/elearning/watch-course/52ac170f-3b38-486b-aba3-f63b20d44ea9",
  //   icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />,
  //   role: "all",
  // },
  {
    component: CNavGroup,
    name: "مشاهده جلسات",
    to: "/base",
    icon: <CIcon icon={cibCodepen} customClassName="nav-icon" />,
    role: "all",
    items: [
      {
        component: CNavItem,
        name: "جلسه صفر ( آمادگی )",
        to: "/elearning/watch-course/52ac170f-3b38-486b-aba3-f63b20d44ea9",
      },
      {
        component: CNavItem,
        name: "جلسه اول",
        to: "/elearning/watch-course/52ac170f-3b38-486b-aba3-f63b20d44ea9",
      },
      {
        component: CNavItem,
        name: "جلسه دوم",
        to: "/elearning/watch-course/f468bc34-d72c-4e3b-b478-4874832eea8a",
      },
      {
        component: CNavItem,
        name: "جلسه سوم",
        to: "/elearning/watch-course/9025c918-ae7d-4134-ae85-7f2ac082926a",
      },
      {
        component: CNavItem,
        name: "جلسه چهارم",
        to: "/elearning/watch-course/7bb0ab77-d947-4c76-8641-9ffd47e06f33",
      },
      {
        component: CNavItem,
        name: "جلسه پنجم",
        to: "/elearning/watch-course/ae50d14e-bbd4-4a29-9f14-bb22a2127e8a",
      },
      {
        component: CNavItem,
        name: "جلسه ششم",
        to: "/elearning/watch-course/99e16ea8-6327-4cf4-a292-a7d171e0d2c7",
      },
    ],
  },

  {
    component: CNavItem,
    name: "ارزیابی دوره جاری",
    to: "/elearning/user-course-assessment/922a1b8f-803a-48d1-bc75-310514a1856d",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    role: "all",
  },
  {
    component: CNavTitle,
    name: "دوره های آموزشی",
  },
  {
    component: CNavGroup,
    name: "دوره های ثبت نام شده",
    to: "/base",
    icon: <CIcon icon={cibCodepen} customClassName="nav-icon" />,
    role: "all",
    items: [
      {
        component: CNavItem,
        name: "دوره مبانی مقدماتی موسیقی",
        to: "/elearning/watch-course/52ac170f-3b38-486b-aba3-f63b20d44ea9",
      },
      // {
      //   component: CNavItem,
      //   name: "Breadcrumb",
      //   to: "/base/breadcrumbs",
      // },
      // {
      //   component: CNavItem,
      //   name: (
      //     <React.Fragment>
      //       {"Calendar"}
      //       <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
      //     </React.Fragment>
      //   ),
      //   href: "https://coreui.io/react/docs/components/calendar/",
      //   badge: {
      //     color: "danger",
      //     text: "PRO",
      //   },
      // },
      // {
      //   component: CNavItem,
      //   name: "Cards",
      //   to: "/base/cards",
      // },
      // {
      //   component: CNavItem,
      //   name: "Carousel",
      //   to: "/base/carousels",
      // },
      // {
      //   component: CNavItem,
      //   name: "Collapse",
      //   to: "/base/collapses",
      // },
      // {
      //   component: CNavItem,
      //   name: "List group",
      //   to: "/base/list-groups",
      // },
      // {
      //   component: CNavItem,
      //   name: "Navs & Tabs",
      //   to: "/base/navs",
      // },
      // {
      //   component: CNavItem,
      //   name: "Pagination",
      //   to: "/base/paginations",
      // },
      // {
      //   component: CNavItem,
      //   name: "Placeholders",
      //   to: "/base/placeholders",
      // },
      // {
      //   component: CNavItem,
      //   name: "Popovers",
      //   to: "/base/popovers",
      // },
      // {
      //   component: CNavItem,
      //   name: "Progress",
      //   to: "/base/progress",
      // },
      // {
      //   component: CNavItem,
      //   name: "Smart Pagination",
      //   href: "https://coreui.io/react/docs/components/smart-pagination/",
      //   badge: {
      //     color: "danger",
      //     text: "PRO",
      //   },
      // },
      // {
      //   component: CNavItem,
      //   name: (
      //     <React.Fragment>
      //       {"Smart Table"}
      //       <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
      //     </React.Fragment>
      //   ),
      //   href: "https://coreui.io/react/docs/components/smart-table/",
      //   badge: {
      //     color: "danger",
      //     text: "PRO",
      //   },
      // },
      // {
      //   component: CNavItem,
      //   name: "Spinners",
      //   to: "/base/spinners",
      // },
      // {
      //   component: CNavItem,
      //   name: "Tables",
      //   to: "/base/tables",
      // },
      // {
      //   component: CNavItem,
      //   name: "Tabs",
      //   to: "/base/tabs",
      // },
      // {
      //   component: CNavItem,
      //   name: "Tooltips",
      //   to: "/base/tooltips",
      // },
      // {
      //   component: CNavItem,
      //   name: (
      //     <React.Fragment>
      //       {"Virtual Scroller"}
      //       <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
      //     </React.Fragment>
      //   ),
      //   href: "https://coreui.io/react/docs/components/virtual-scroller/",
      //   badge: {
      //     color: "danger",
      //     text: "PRO",
      //   },
      // },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: "Buttons",
  //   to: "/buttons",
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Buttons",
  //       to: "/buttons/buttons",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Buttons groups",
  //       to: "/buttons/button-groups",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Dropdowns",
  //       to: "/buttons/dropdowns",
  //     },
  //     {
  //       component: CNavItem,
  //       name: (
  //         <React.Fragment>
  //           {"Loading Button"}
  //           <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
  //         </React.Fragment>
  //       ),
  //       href: "https://coreui.io/react/docs/components/loading-button/",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: "Forms",
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Form Control",
  //       to: "/forms/form-control",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Select",
  //       to: "/forms/select",
  //     },
  //     {
  //       component: CNavItem,
  //       name: (
  //         <React.Fragment>
  //           {"Multi Select"}
  //           <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
  //         </React.Fragment>
  //       ),
  //       href: "https://coreui.io/react/docs/forms/multi-select/",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Checks & Radios",
  //       to: "/forms/checks-radios",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Range",
  //       to: "/forms/range",
  //     },
  //     {
  //       component: CNavItem,
  //       name: (
  //         <React.Fragment>
  //           {"Range Slider"}
  //           <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
  //         </React.Fragment>
  //       ),
  //       href: "https://coreui.io/react/docs/forms/range-slider/",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: (
  //         <React.Fragment>
  //           {"Rating"}
  //           <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
  //         </React.Fragment>
  //       ),
  //       href: "https://coreui.io/react/docs/forms/rating/",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Input Group",
  //       to: "/forms/input-group",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Floating Labels",
  //       to: "/forms/floating-labels",
  //     },
  //     {
  //       component: CNavItem,
  //       name: (
  //         <React.Fragment>
  //           {"Date Picker"}
  //           <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
  //         </React.Fragment>
  //       ),
  //       href: "https://coreui.io/react/docs/forms/date-picker/",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Date Range Picker",
  //       href: "https://coreui.io/react/docs/forms/date-range-picker/",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: (
  //         <React.Fragment>
  //           {"Time Picker"}
  //           <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
  //         </React.Fragment>
  //       ),
  //       href: "https://coreui.io/react/docs/forms/time-picker/",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Layout",
  //       to: "/forms/layout",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Validation",
  //       to: "/forms/validation",
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: "Charts",
  //   to: "/charts",
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: "Icons",
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "CoreUI Free",
  //       to: "/icons/coreui-icons",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "CoreUI Flags",
  //       to: "/icons/flags",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "CoreUI Brands",
  //       to: "/icons/brands",
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: "Notifications",
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Alerts",
  //       to: "/notifications/alerts",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Badges",
  //       to: "/notifications/badges",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Modal",
  //       to: "/notifications/modals",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Toasts",
  //       to: "/notifications/toasts",
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: "Widgets",
  //   to: "/widgets",
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: "info",
  //     text: "NEW",
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: "Extras",
  // },
  // {
  //   component: CNavGroup,
  //   name: "Pages",
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Login",
  //       to: "/login",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Register",
  //       to: "/register",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Error 404",
  //       to: "/404",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Error 500",
  //       to: "/500",
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: "Docs",
  //   href: "https://coreui.io/react/docs/templates/installation/",
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
];

export default _nav;
