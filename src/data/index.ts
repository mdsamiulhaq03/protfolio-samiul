// ================= NAV TYPES =================
export type NavLink = {
  id: number;
  name: string;
  type: string;
};

export type NavIcon = {
  id: number;
  img: string;
};

// ================= NAV DATA =================
export const navLinks: NavLink[] = [
  { id: 1, name: "Projects", type: "finder" },
  { id: 3, name: "Contact", type: "contact" },
  { id: 4, name: "Resume", type: "resume" },
];

export const navIcons: NavIcon[] = [
  { id: 1, img: "/icons/wifi.svg" },
  { id: 2, img: "/icons/search.svg" },
  { id: 3, img: "/icons/user.svg" },
  { id: 4, img: "/icons/mode.svg" },
];

// ================= DOCK =================
export type DockApp = {
  id: string;
  name: string;
  icon: string;
  canOpen: boolean;
};

export const dockApps: DockApp[] = [
  { id: "finder", name: "Portfolio", icon: "finder.png", canOpen: true },
  { id: "safari", name: "Articles", icon: "safari.png", canOpen: true },
  { id: "photos", name: "Gallery", icon: "photos.png", canOpen: true },
  { id: "contact", name: "Contact", icon: "contact.png", canOpen: true },
  { id: "terminal", name: "Skills", icon: "terminal.png", canOpen: true },
  { id: "trash", name: "Archive", icon: "trash.png", canOpen: false },
];

// ================= BLOG =================
export type BlogPost = {
  id: number;
  date: string;
  title: string;
  image: string;
  link: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title: "TypeScript Explained...",
    image: "/images/blog1.png",
    link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "Three.js Guide",
    image: "/images/blog2.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "GSAP Animations",
    image: "/images/blog3.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
  },
];

// ================= TECH STACK =================
export type TechStack = {
  category: string;
  items: string[];
};

export const techStack: TechStack[] = [
  {
    category: "Programming Languages",
    items: ["HTML5", "CSS3", "JavaScript", "Python"],
  },
  {
    category: "Backend Development",
    items: ["Node.js", "Express.js"],
  },
  {
    category: "Authentication",
    items: ["JWT", "bcrypt"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "VS Code", "Postman", "Jupyter Notebook", "Figma"],
  },
  {
    category: "Operating Systems",
    items: ["Windows", "Linux", "Android"],
  },
  {
    category: "Machine Learning & Deep Learning",
    items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn"],
  },
  {
    category: "Data Analysis & Visualization",
    items: ["Pandas", "NumPy"],
  },
  {
    category: "Frontend Development",
    items: ["React.js", "Tailwind CSS", "Bootstrap", "Responsive Web Design"],
  },
  {
    category: "Databases",
    items: ["MySQL", "MongoDB", "Firebase Firestore", "SQLite"],
  },
  {
    category: "Cloud & Deployment",
    items: ["Vercel", "GitHub Pages"],
  },
  {
    category: "Professional Skills",
    items: ["Problem Solving", "Team Collaboration"],
  },
];

// ================= SOCIALS =================
export type Social = {
  id: number;
  text: string;
  icon: string;
  bg: string;
  link: string;
};

export const socials: Social[] = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/JavaScript-Mastery-Pro",
  },
  {
    id: 2,
    text: "Platform",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "https://jsmastery.com/",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/jsmasterypro",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all",
  },
];

// ================= GALLERY =================
export type GalleryItem = {
  id: number;
  img: string;
};

export const gallery: GalleryItem[] = [
  { id: 1, img: "/images/gal1.png" },
  { id: 2, img: "/images/gal2.png" },
  { id: 3, img: "/images/gal3.png" },
  { id: 4, img: "/images/gal4.png" },
];

// ================= WINDOW CONFIG =================
export type WindowConfigItem = {
  isOpen: boolean;
  zIndex: number;
  data: unknown;
};

export const INITIAL_Z_INDEX = 1000;

export const WINDOW_CONFIG: Record<string, WindowConfigItem> = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};
