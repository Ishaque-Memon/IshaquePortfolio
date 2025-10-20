// src/assets/Icons/Icons.jsx
import React from "react";

// React Icons Imports
import { BiCategory, BiSolidCategory } from "react-icons/bi";
import {
  FaRegUser,
  FaUser,
  FaUsers,
  FaRegSave,
  FaSave,
  FaFontAwesomeFlag,
  FaSearch,
  FaRegEye,
  FaRegEyeSlash,
  FaAngleLeft,
  FaAngleRight,
  FaChevronRight,
  FaChevronLeft,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGlobe,
  FaLink,
  FaBriefcase,
  FaTrophy,
  FaRocket,
  FaShieldAlt,
  FaBolt,
  FaDownload,
  FaChartPie,
  FaLock
} from "react-icons/fa";
import { HiOutlineUsers, HiOutlineUserGroup } from "react-icons/hi";
import { IoBookOutline, IoClose, IoLibrary, IoNewspaperOutline } from "react-icons/io5";
import { GoHomeFill, GoDownload } from "react-icons/go";
import { GiArcheryTarget, GiRibbonMedal, GiCheckMark } from "react-icons/gi";
import { BsCamera } from "react-icons/bs";
import {
  MdOutlineSchool,
  MdOutlineZoomOutMap,
  MdZoomInMap,
  MdKeyboardBackspace,
  MdOutlineHideImage,
  MdOutlineDeleteSweep,
  MdFileUpload
} from "react-icons/md";
import { PiPlusBold, PiStudentBold } from "react-icons/pi";
import { ImCross } from "react-icons/im";
import { GrFormSubtract, GrScorecard, GrRefresh } from "react-icons/gr";
import { TbLogout, TbListDetails } from "react-icons/tb";
import { CiCircleMinus } from "react-icons/ci";
import { TiEdit } from "react-icons/ti";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { VscLayoutSidebarLeft, VscLayoutSidebarRight } from "react-icons/vsc";

// Feather Icons (Fi) - including Sidebar specific icons
import {
  FiHome,
  FiDollarSign,
  FiPieChart,
  FiCalendar,
  FiSettings,
  FiCreditCard,
  FiTag,
  FiTrendingUp,
  FiRepeat,
  FiFileText,
  FiBell,
  FiUser as FiUserAlt,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCode,
  FiBriefcase,
  FiAward,
  FiBookOpen,
  FiMessageSquare,
  FiBarChart,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronLeft as FiChevLeft,
  FiChevronRight as FiChevRight,
  FiSun,
  FiMoon
} from "react-icons/fi";

/**
 * fillIcon and outlineIcon contain React elements (JSX) as values.
 * We also export a merged `Icons` object (and default) for compatibility.
 */

// Fill Icons (solid)
export const fillIcon = {
  ProgramIcon: <BiSolidCategory />,
  UserIcon: <FaUser />,
  TeamIcon: <FaUsers />,
  HomeIcon: <GoHomeFill />,
  AddIcon: <PiPlusBold />,
  SubtractIcon: <GrFormSubtract />,
  CancelIcon: <ImCross />,
  ZoomOut: <MdOutlineZoomOutMap />,
  ZoomIn: <MdZoomInMap />,
  Back: <MdKeyboardBackspace />,
  Save: <FaSave />,
  target: <GiArcheryTarget />,
  flag: <FaFontAwesomeFlag />,
  Hide: <MdOutlineHideImage />,
  Search: <FaSearch />,
  // Expense Tracker specific
  Income: <FiTrendingUp />,
  Recurring: <FiRepeat />,
  Report: <FiFileText />,
  Download: <FaDownload />,
  Chart: <FaChartPie />
};

// Outline / UI Icons
export const outlineIcon = {
  DeleteIcon: <MdOutlineDeleteSweep />,
  EditIcon: <TiEdit />,
  CircleCancelIcon: <CiCircleMinus />,
  ViewIcon: <FaRegEye />,
  HideIcon: <FaRegEyeSlash />,
  CancelIcon: <IoClose />,
  RefreshIcon: <GrRefresh />,
  LeftIcon: <FaAngleLeft />,
  RightIcon: <FaAngleRight />,
  UploadFileIcon: <MdFileUpload />,
  CameraIcon: <BsCamera />,
  LogoutIcon: <TbLogout />,
  UserIcon: <FaRegUser />,
  StudentIcon: <PiStudentBold />,
  BatchIcon: <GiRibbonMedal />,
  DetailIcon: <TbListDetails />,
  ReportIcon: <IoNewspaperOutline />,
  AssessmentIcon: <GrScorecard />,
  CoursesIcon: <IoLibrary />,
  DownloadIcon: <GoDownload />,
  CheckMark: <GiCheckMark />,
  LeftSidebar: <VscLayoutSidebarLeft />,
  RightSidebar: <VscLayoutSidebarRight />,
  CircleLeft: <FaCircleChevronLeft />,
  CircleRight: <FaCircleChevronRight />,

  ProgramIcon: <BiCategory />,
  TeamIcon: <HiOutlineUsers />,
  CourseIcon: <IoBookOutline />,
  HomeIcon: <FiHome />,
  AddIcon: <PiPlusBold />,
  SubtractIcon: <GrFormSubtract />,
  ZoomOut: <MdOutlineZoomOutMap />,
  ZoomIn: <MdZoomInMap />,
  Back: <MdKeyboardBackspace />,
  Save: <FaRegSave />,
  target: <GiArcheryTarget />,
  flag: <FaFontAwesomeFlag />,
  Hide: <MdOutlineHideImage />,
  Search: <FaSearch />,
  Faculty: <HiOutlineUserGroup />,
  Programs: <MdOutlineSchool />,
  Bell: <FiBell />,

  // Expense Tracker specific icons
  Dashboard: <FiHome />,
  Expenses: <FiDollarSign />,
  Categories: <FiTag />,
  Recurring: <FiRepeat />,
  Income: <FiTrendingUp />,
  Budgets: <FiCreditCard />,
  PieChart: <FiPieChart />,
  Calendar: <FiCalendar />,
  Settings: <FiSettings />,
  Export: <FiFileText />,
  ChevronLeft: <FaChevronLeft />,
  ChevronRight: <FaChevronRight />,
  User: <FiUserAlt />,
  Mail: <FiMail />,
  Phone: <FiPhone />,
  Lock: <FiLock />,
  OpenEye: <FiEye />,
  CloseEye: <FiEyeOff />,
  ArrowRight: <FiArrowRight />,

  // social & contact — ensure these exist
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  mail: <FaEnvelope />,
  envelope: <FaEnvelope />,
  phoneAlt: <FiPhone />,
  globe: <FaGlobe />,
  link: <FaLink />,
  briefcase: <FaBriefcase />,

  // achievements / misc
  trophy: <FaTrophy />,
  lightbulb: <FaBolt />, // idea / innovation
  rocket: <FaRocket />,
  shield: <FaShieldAlt />,
  download: <FaDownload />,
  chart: <FaChartPie />,
  lock: <FaLock />
};

// Sidebar specific icon components (exported as components, not JSX)
export const SidebarIcons = {
  FiHome,
  FiUser: FiUserAlt,
  FiCode,
  FiBriefcase,
  FiAward,
  FiBookOpen,
  FiMessageSquare,
  FiBarChart,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronLeft: FiChevLeft,
  FiChevronRight: FiChevRight,
  FiSun,
  FiMoon
};

// Backwards-compatible merged export: merges fillIcon and outlineIcon
export const Icons = {
  ...fillIcon,
  ...outlineIcon
};

// default export (optional)
export default Icons;