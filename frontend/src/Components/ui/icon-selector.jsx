// src/Components/ui/icon-selector.jsx
import React, { useState, useMemo } from "react";
import { SkillIcons, FiSearch, FiX } from "@/assets/Icons/Icons";

/**
 * ICON CATEGORIES CONFIGURATION
 */
const ICON_CATEGORIES = {
  frontend: {
    label: "Frontend",
    color: "blue",
    icons: [
      { value: "SiReact", label: "React", icon: SkillIcons.SiReact },
      { value: "SiJavascript", label: "JavaScript", icon: SkillIcons.SiJavascript },
      { value: "FTypescript", label: "TypeScript", icon: SkillIcons.SiTypescript },
      { value: "SiHtml5", label: "HTML5", icon: SkillIcons.SiHtml5 },
      { value: "SiCss3", label: "CSS3", icon: SkillIcons.SiCss3 },
      { value: "FTailwindcss", label: "Tailwind", icon: SkillIcons.SiTailwindcss },
      { value: "SiNextdotjs", label: "Next.js", icon: SkillIcons.SiNextdotjs },
      { value: "SiVuedotjs", label: "Vue.js", icon: SkillIcons.SiVuedotjs },
      { value: "SiAngular", label: "Angular", icon: SkillIcons.SiAngular },
      { value: "SiBootstrap", label: "Bootstrap", icon: SkillIcons.SiBootstrap },
      { value: "SiSass", label: "Sass", icon: SkillIcons.SiSass }
    ]
  },
  backend: {
    label: "Backend",
    color: "green",
    icons: [
      { value: "SiNodedotjs", label: "Node.js", icon: SkillIcons.SiNodedotjs },
      { value: "BTypescript", label: "TypeScript", icon: SkillIcons.SiTypescript},
      { value: "SiExpress", label: "Express", icon: SkillIcons.SiExpress },
      { value: "SiPython", label: "Python", icon: SkillIcons.SiPython },
      { value: "SiGo", label: "Go", icon: SkillIcons.SiGo },
      { value: "SiPhp", label: "PHP", icon: SkillIcons.SiPhp }
    ]
  },
  mobile: {
    label: "Mobile",
    color: "purple",
    icons: [
      { value: "SiFlutter", label: "Flutter", icon: SkillIcons.SiFlutter },
      { value: "SiDart", label: "Dart", icon: SkillIcons.SiDart }
    ]
  },
  database: {
    label: "Database",
    color: "pink",
    icons: [
      { value: "SiMongodb", label: "MongoDB", icon: SkillIcons.SiMongodb },
      { value: "SiMysql", label: "MySQL", icon: SkillIcons.SiMysql },
      { value: "SiPostgresql", label: "PostgreSQL", icon: SkillIcons.SiPostgresql },
      { value: "SiRedis", label: "Redis", icon: SkillIcons.SiRedis },
      { value: "SiFirebase", label: "Firebase", icon: SkillIcons.SiFirebase },
      { value: "SiGraphql", label: "GraphQL", icon: SkillIcons.SiGraphql },
      { value: "FiDatabase", label: "Database", icon: SkillIcons.FiDatabase }
    ]
  },
  cloud: {
    label: "Cloud & DevOps",
    color: "sky",
    icons: [
      { value: "SiDocker", label: "Docker", icon: SkillIcons.SiDocker },
      { value: "SiLinux", label: "Linux", icon: SkillIcons.SiLinux },
      { value: "SiNginx", label: "Nginx", icon: SkillIcons.SiNginx },
      { value: "FiCloud", label: "Cloud", icon: SkillIcons.FiCloud },
      { value: "FiServer", label: "Server", icon: SkillIcons.FiServer }
    ]
  },
  tools: {
    label: "Tools & Version Control",
    color: "orange",
    icons: [
      { value: "SiGit", label: "Git", icon: SkillIcons.SiGit },
      { value: "SiGithub", label: "GitHub", icon: SkillIcons.SiGithub },
      { value: "SiGitlab", label: "GitLab", icon: SkillIcons.SiGitlab },
      { value: "SiPostman", label: "Postman", icon: SkillIcons.SiPostman },
      { value: "SiFigma", label: "Figma", icon: SkillIcons.SiFigma },
      { value: "SiWebpack", label: "Webpack", icon: SkillIcons.SiWebpack },
      { value: "SiVite", label: "Vite", icon: SkillIcons.SiVite },
      { value: "SiJest", label: "Jest", icon: SkillIcons.SiJest },
      { value: "FiTool", label: "Tool", icon: SkillIcons.FiTool }
    ]
  },
  platforms: {
    label: "Platforms",
    color: "indigo",
    icons: [
      { value: "SiVercel", label: "Vercel", icon: SkillIcons.SiVercel },
      { value: "SiNetlify", label: "Netlify", icon: SkillIcons.SiNetlify },
      { value: "SiHeroku", label: "Heroku", icon: SkillIcons.SiHeroku },
      { value: "FiGlobe", label: "Web", icon: SkillIcons.FiGlobe }
    ]
  },
  generic: {
    label: "Generic",
    color: "gray",
    icons: [
      { value: "FiCode", label: "Code", icon: SkillIcons.FiCode },
      { value: "FiLayers", label: "Layers", icon: SkillIcons.FiLayers },
      { value: "FiCpu", label: "CPU", icon: SkillIcons.FiCpu }
    ]
  }
};

/**
 * Helper function to get category colors
 */
const getCategoryColors = (color, isDarkMode) => {
  const colorMap = {
    blue: {
      bg: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50',
      border: isDarkMode ? 'border-blue-500/30' : 'border-blue-200',
      text: isDarkMode ? 'text-blue-400' : 'text-blue-600',
      hover: isDarkMode ? 'hover:bg-blue-500/20' : 'hover:bg-blue-100',
      ring: 'ring-blue-500/50'
    },
    green: {
      bg: isDarkMode ? 'bg-green-500/10' : 'bg-green-50',
      border: isDarkMode ? 'border-green-500/30' : 'border-green-200',
      text: isDarkMode ? 'text-green-400' : 'text-green-600',
      hover: isDarkMode ? 'hover:bg-green-500/20' : 'hover:bg-green-100',
      ring: 'ring-green-500/50'
    },
    purple: {
      bg: isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50',
      border: isDarkMode ? 'border-purple-500/30' : 'border-purple-200',
      text: isDarkMode ? 'text-purple-400' : 'text-purple-600',
      hover: isDarkMode ? 'hover:bg-purple-500/20' : 'hover:bg-purple-100',
      ring: 'ring-purple-500/50'
    },
    pink: {
      bg: isDarkMode ? 'bg-pink-500/10' : 'bg-pink-50',
      border: isDarkMode ? 'border-pink-500/30' : 'border-pink-200',
      text: isDarkMode ? 'text-pink-400' : 'text-pink-600',
      hover: isDarkMode ? 'hover:bg-pink-500/20' : 'hover:bg-pink-100',
      ring: 'ring-pink-500/50'
    },
    sky: {
      bg: isDarkMode ? 'bg-sky-500/10' : 'bg-sky-50',
      border: isDarkMode ? 'border-sky-500/30' : 'border-sky-200',
      text: isDarkMode ? 'text-sky-400' : 'text-sky-600',
      hover: isDarkMode ? 'hover:bg-sky-500/20' : 'hover:bg-sky-100',
      ring: 'ring-sky-500/50'
    },
    orange: {
      bg: isDarkMode ? 'bg-orange-500/10' : 'bg-orange-50',
      border: isDarkMode ? 'border-orange-500/30' : 'border-orange-200',
      text: isDarkMode ? 'text-orange-400' : 'text-orange-600',
      hover: isDarkMode ? 'hover:bg-orange-500/20' : 'hover:bg-orange-100',
      ring: 'ring-orange-500/50'
    },
    indigo: {
      bg: isDarkMode ? 'bg-indigo-500/10' : 'bg-indigo-50',
      border: isDarkMode ? 'border-indigo-500/30' : 'border-indigo-200',
      text: isDarkMode ? 'text-indigo-400' : 'text-indigo-600',
      hover: isDarkMode ? 'hover:bg-indigo-500/20' : 'hover:bg-indigo-100',
      ring: 'ring-indigo-500/50'
    },
    gray: {
      bg: isDarkMode ? 'bg-gray-500/10' : 'bg-gray-50',
      border: isDarkMode ? 'border-gray-500/30' : 'border-gray-200',
      text: isDarkMode ? 'text-gray-400' : 'text-gray-600',
      hover: isDarkMode ? 'hover:bg-gray-500/20' : 'hover:bg-gray-100',
      ring: 'ring-gray-500/50'
    }
  };
  return colorMap[color] || colorMap.gray;
};

/**
 * ICON BUTTON
 */
const IconButton = ({ icon, isSelected, onClick, isDarkMode, categoryColor }) => {
  const IconComponent = icon.icon;
  const colors = getCategoryColors(categoryColor, isDarkMode);

  // Defensive: if icon component is undefined, avoid throwing
  if (!IconComponent) {
    // eslint-disable-next-line no-console
    console.error("IconComponent is undefined for", icon);
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => onClick(icon.value)}
      className={`
        flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200
        ${isSelected 
          ? `${colors.bg} ${colors.border} ring-2 ${colors.ring}` 
          : `${isDarkMode ? 'border-neutral-700 hover:border-neutral-600' : 'border-neutral-200 hover:border-neutral-300'} ${colors.hover}`
        }
      `}
      title={icon.label}
    >
      <IconComponent className={`w-6 h-6 ${isSelected ? colors.text : (isDarkMode ? 'text-neutral-400' : 'text-neutral-600')}`} />
      <span className={`text-xs mt-1 text-center leading-tight ${
        isSelected ? colors.text : (isDarkMode ? 'text-neutral-500' : 'text-neutral-600')
      }`}>
        {icon.label}
      </span>
    </button>
  );
};

/**
 * CATEGORY SECTION
 */
const CategorySection = ({ category, selectedValue, onChange, isDarkMode }) => {
  const colors = getCategoryColors(category.color, isDarkMode);

  return (
    <div className="space-y-3">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${colors.bg} ${colors.border} border`}>
        <h3 className={`text-sm font-semibold ${colors.text}`}>{category.label}</h3>
        <span className={`text-xs ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
          ({category.icons.length})
        </span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
        {category.icons.map((icon) => (
          <IconButton
            key={icon.value}
            icon={icon}
            isSelected={selectedValue === icon.value}
            onClick={onChange}
            isDarkMode={isDarkMode}
            categoryColor={category.color}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * SEARCH BAR
 */
const SearchBar = ({ searchQuery, setSearchQuery, isDarkMode }) => {
  return (
    <div className="relative">
      <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
      <input
        type="text"
        placeholder="Search icons..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`w-full pl-10 pr-10 py-2 rounded-lg border transition-colors ${
          isDarkMode
            ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:border-primary-500'
            : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-primary-500'
        } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-400 hover:text-neutral-600'}`}
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

/**
 * SELECTED ICON DISPLAY
 */
const SelectedIconDisplay = ({ value, isDarkMode }) => {
  if (!value) return null;

  let selectedIcon = null;
  let categoryColor = 'gray';

  Object.entries(ICON_CATEGORIES).forEach(([key, category]) => {
    const found = category.icons.find(icon => icon.value === value);
    if (found) {
      selectedIcon = found;
      categoryColor = category.color;
    }
  });

  if (!selectedIcon) return null;

  const IconComponent = selectedIcon.icon;
  const colors = getCategoryColors(categoryColor, isDarkMode);
  if (!IconComponent) return null;

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
      <div className={`p-2 rounded-lg ${colors.bg} ${colors.border} border`}>
        <IconComponent className={`w-5 h-5 ${colors.text}`} />
      </div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${isDarkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>Selected Icon</p>
        <p className={`text-xs ${colors.text}`}>{selectedIcon.label}</p>
      </div>
    </div>
  );
};

/**
 * MAIN ICON SELECTOR
 */
const IconSelector = ({
  value,
  onChange,
  isDarkMode = false,
  placeholder = "Select an icon",
  className = ""
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return ICON_CATEGORIES;

    const query = searchQuery.toLowerCase();
    const filtered = {};

    Object.entries(ICON_CATEGORIES).forEach(([key, category]) => {
      const matchingIcons = category.icons.filter(icon =>
        icon.label.toLowerCase().includes(query) ||
        icon.value.toLowerCase().includes(query)
      );

      if (matchingIcons.length > 0) {
        filtered[key] = {
          ...category,
          icons: matchingIcons
        };
      }
    });

    return filtered;
  }, [searchQuery]);

  const hasResults = Object.keys(filteredCategories).length > 0;

  return (
    <div className={`space-y-4 ${className}`}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} isDarkMode={isDarkMode} />

      <SelectedIconDisplay value={value} isDarkMode={isDarkMode} />

      <div className={`border rounded-lg p-4 max-h-96 overflow-y-auto space-y-6 ${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
        {hasResults ? (
          Object.entries(filteredCategories).map(([key, category]) => (
            <CategorySection
              key={key}
              category={category}
              selectedValue={value}
              onChange={onChange}
              isDarkMode={isDarkMode}
            />
          ))
        ) : (
          <div className={`text-center py-8 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
            <FiSearch className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No icons found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IconSelector;
export { ICON_CATEGORIES, SkillIcons };
