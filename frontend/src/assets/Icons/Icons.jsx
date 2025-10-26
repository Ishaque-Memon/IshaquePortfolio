// src/assets/Icons/Icons.jsx
import React from "react";

// --- React Icons imports (many families) ---
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

// --- Feather icons (fi) ---
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
  FiCode as FiCodeRaw,
  FiBriefcase as FiBriefcaseRaw,
  FiAward as FiAwardRaw,
  FiBookOpen,
  FiMessageSquare,
  FiBarChart,
  FiLogOut,
  FiMenu,
  FiX as FiXRaw,
  FiChevronLeft as FiChevLeft,
  FiChevronRight as FiChevRight,
  FiSun,
  FiMoon,
  FiServer as FiServerRaw,
  FiCpu as FiCpuRaw,
  FiPlus as FiPlusRaw,
  FiEdit2 as FiEdit2Raw,
  FiTrash2 as FiTrash2Raw,
  FiSearch as FiSearchRaw,
  FiSave as FiSaveRaw,
  FiDatabase as FiDatabaseRaw,
  FiLayers as FiLayersRaw,
  FiTool as FiToolRaw,
  FiCloud as FiCloudRaw,
  FiGlobe as FiGlobeRaw,
  FiGithub as FiGithub,
  FiLinkedin as FiLinkedin,
} from "react-icons/fi";

// --- Simple Icons (Si) for technologies ---
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiHtml5,
  SiCss3,
  SiMongodb,
  SiTailwindcss,
  SiMysql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiExpress,
  SiFigma,
  SiPostman,
  SiDocker,
  SiRedis,
  SiPostgresql,
  SiGraphql,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiFlutter,
  SiDart,
  SiBootstrap,
  SiSass,
  SiWebpack,
  SiVite,
  SiLinux,
  SiNginx,
  SiGitlab,
  SiVercel,
  SiNetlify,
  SiHeroku,
  SiPhp,
  SiGo,
  SiJest
} from "react-icons/si";

/**
 * ==========================================
 * FILL ICONS (Solid/Illustrative)
 * ==========================================
 */
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
  Income: <FiTrendingUp />,
  Recurring: <FiRepeat />,
  Report: <FiFileText />,
  Download: <FaDownload />,
  Chart: <FaChartPie />
};

/**
 * ==========================================
 * OUTLINE ICONS (UI/Interface)
 * ==========================================
 */
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
  github: <FiGithub />,
  linkedin: <FiLinkedin />,
  mail: <FaEnvelope />,
  envelope: <FaEnvelope />,
  phoneAlt: <FiPhone />,
  globe: <FaGlobe />,
  link: <FaLink />,
  briefcase: <FaBriefcase />,
  trophy: <FaTrophy />,
  lightbulb: <FaBolt />,
  rocket: <FaRocket />,
  shield: <FaShieldAlt />,
  download: <FaDownload />,
  chart: <FaChartPie />,
  lock: <FaLock />
};

/**
 * ==========================================
 * SIDEBAR ICONS (Navigation Components)
 * ==========================================
 */
export const SidebarIcons = {
  FiHome,
  FiUser: FiUserAlt,
  FiCode: FiCodeRaw,
  FiBriefcase: FiBriefcaseRaw,
  FiAward: FiAwardRaw,
  FiBookOpen,
  FiMessageSquare,
  FiBarChart,
  FiLogOut,
  FiMenu,
  FiX: FiXRaw,
  FiChevronLeft: FiChevLeft,
  FiChevronRight: FiChevRight,
  FiSun,
  FiMoon
};

/**
 * ==========================================
 * SKILL ICONS (Technology & Tool Icons)
 * Organized by category for better management
 * ==========================================
 */
export const SkillIcons = {
  // Frontend Technologies
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiBootstrap,
  SiSass,

  // Backend Technologies
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiGo,
  SiPhp,

  // Mobile Development
  SiFlutter,
  SiDart,

  // Databases
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiGraphql,

  // DevOps & Cloud
  SiDocker,
  SiLinux,
  SiNginx,

  // Version Control & Tools
  SiGit,
  SiGithub,
  SiGitlab,
  SiPostman,
  SiFigma,

  // Build Tools
  SiWebpack,
  SiVite,
  SiJest,

  // Platforms & Deployment
  SiVercel,
  SiNetlify,
  SiHeroku,

  // Generic Icons (Feather mapped to names)
  FiCode: FiCodeRaw,
  FiDatabase: FiDatabaseRaw,
  FiLayers: FiLayersRaw,
  FiTool: FiToolRaw,
  FiCloud: FiCloudRaw,
  FiGlobe: FiGlobeRaw,
  FiServer: FiServerRaw,
  FiCpu: FiCpuRaw
};

// Export individual icons for backward compatibility
export {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiBootstrap,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiGo,
  SiPhp,
  SiFlutter,
  SiDart,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiGraphql,
  SiDocker,
  SiLinux,
  SiNginx,
  SiGit,
  SiGithub,
  SiGitlab,
  SiPostman,
  SiFigma,
  SiWebpack,
  SiVite,
  SiVercel,
  SiNetlify,
  SiHeroku,
  SiJest
};

/**
 * ==========================================
 * MERGED EXPORTS FOR COMPATIBILITY
 * ==========================================
 */
// Backwards-compatible merged export
export const Icons = {
  ...fillIcon,
  ...outlineIcon
};

// Default export
export default Icons;

/**
 * ==========================================
 * NAMED EXPORTS (Action & UI Icons)
 * ==========================================
 */
export {
  FiPlusRaw as FiPlus,
  FiEdit2Raw as FiEdit2,
  FiTrash2Raw as FiTrash2,
  FiSearchRaw as FiSearch,
  FiXRaw as FiX,
  FiSaveRaw as FiSave,
  FiCodeRaw as FiCode,
  FiDatabaseRaw as FiDatabase,
  FiLayersRaw as FiLayers,
  FiToolRaw as FiTool,
  FiCloudRaw as FiCloud,
  FiGlobeRaw as FiGlobe,
  FiServerRaw as FiServer,
  FiCpuRaw as FiCpu
};
