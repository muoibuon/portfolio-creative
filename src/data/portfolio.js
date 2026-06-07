export const personalInfo = {
  name: "Trần Ngô Tiến Đạt",
  title: "Full Stack Developer",
  taglines: [
    "Building Digital Experiences",
    "Crafting Clean Code",
    "Designing the Future",
    "Solving Complex Problems",
  ],
  bio: "I'm a passionate full-stack developer with 3+ years of experience creating beautiful, performant web applications. I love turning complex problems into elegant solutions and bringing ideas to life through code.",
  location: "Ho Chi Minh City, Vietnam",
  email: "alex.nguyen@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  resume: "#",
};

export const skills = [
  { name: "React", level: 92, category: "Frontend", icon: "⚛️" },
  { name: "TypeScript", level: 88, category: "Frontend", icon: "🔷" },
  { name: "Vue.js", level: 78, category: "Frontend", icon: "💚" },
  { name: "CSS / Tailwind", level: 95, category: "Frontend", icon: "🎨" },
  { name: "Node.js", level: 85, category: "Backend", icon: "🟢" },
  { name: "Python", level: 80, category: "Backend", icon: "🐍" },
  { name: "PostgreSQL", level: 75, category: "Backend", icon: "🐘" },
  { name: "MongoDB", level: 82, category: "Backend", icon: "🍃" },
  { name: "Docker", level: 70, category: "DevOps", icon: "🐳" },
  { name: "AWS", level: 68, category: "DevOps", icon: "☁️" },
  { name: "Git", level: 90, category: "DevOps", icon: "📦" },
  { name: "Figma", level: 72, category: "Design", icon: "✏️" },
];

export const projects = [
  {
    id: 1,
    title: "EcoTrack Platform",
    description:
      "A real-time environmental monitoring platform helping organizations track and reduce their carbon footprint with beautiful data visualizations.",
    tags: ["React", "Node.js", "D3.js", "PostgreSQL"],
    image: "🌱",
    color: "#10b981",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    id: 2,
    title: "NeuraChat AI",
    description:
      "An intelligent conversational AI interface built with cutting-edge NLP, featuring real-time responses and multi-modal interactions.",
    tags: ["Vue.js", "Python", "OpenAI", "WebSocket"],
    image: "🤖",
    color: "#6366f1",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    id: 3,
    title: "PixelForge Studio",
    description:
      "A browser-based creative studio for designers — layer management, filters, and collaborative editing in real-time.",
    tags: ["React", "Canvas API", "WebRTC", "Firebase"],
    image: "🎨",
    color: "#f59e0b",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Momentum Finance",
    description:
      "Personal finance tracker with ML-powered insights, budget forecasting, and beautiful spending analytics dashboards.",
    tags: ["Next.js", "Python", "TensorFlow", "MongoDB"],
    image: "💰",
    color: "#3b82f6",
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    id: 5,
    title: "SwiftDeliver API",
    description:
      "High-performance REST & GraphQL API for logistics management, handling 10k+ requests/second with 99.9% uptime.",
    tags: ["Node.js", "GraphQL", "Redis", "Docker"],
    image: "🚀",
    color: "#ec4899",
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    id: 6,
    title: "AuraUI Library",
    description:
      "Open-source React component library with 50+ accessible, animated components. 2k+ GitHub stars.",
    tags: ["React", "TypeScript", "Storybook", "Radix"],
    image: "✨",
    color: "#8b5cf6",
    github: "#",
    demo: "#",
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "TechVision Corp",
    period: "2023 – Present",
    description:
      "Led frontend architecture for a SaaS platform serving 50k+ users. Improved performance by 40% through code splitting and lazy loading.",
    achievements: [
      "Architected micro-frontend system",
      "Mentored 4 junior developers",
      "Reduced bundle size by 35%",
    ],
    color: "#6366f1",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "StartupHub Vietnam",
    period: "2022 – 2023",
    description:
      "Built and shipped 3 products from 0 to production in fast-paced startup environment. Collaborated closely with design and product teams.",
    achievements: [
      "Launched 3 products in 12 months",
      "Built CI/CD pipeline from scratch",
      "Integrated 10+ third-party APIs",
    ],
    color: "#10b981",
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "Digital Agency Pro",
    period: "2021 – 2022",
    description:
      "Developed responsive websites and web apps for 20+ clients. Gained strong foundations in modern web technologies.",
    achievements: [
      "Delivered 20+ client projects",
      "Learned React & Node.js stack",
      "Improved client satisfaction 95%",
    ],
    color: "#f59e0b",
  },
  {
    id: 4,
    role: "CS Student & Freelancer",
    company: "VJU University",
    period: "2019 – 2021",
    description:
      "Pursued Computer Science degree while freelancing. Built portfolio through personal projects and open-source contributions.",
    achievements: [
      "GPA 3.8/4.0",
      "5+ freelance projects",
      "Open source contributor",
    ],
    color: "#ec4899",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager @ TechVision",
    avatar: "👩‍💼",
    content:
      "Alex is one of the most talented developers I've worked with. Their ability to translate complex requirements into clean, performant code is remarkable. They always deliver on time.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Kim",
    role: "CTO @ StartupHub",
    avatar: "👨‍💻",
    content:
      "Working with Alex was a game changer for our startup. They brought not just technical skills but genuine product thinking. Our users love the interfaces they built.",
    rating: 5,
  },
  {
    id: 3,
    name: "Maria Santos",
    role: "Design Lead @ PixelStudio",
    avatar: "👩‍🎨",
    content:
      "As a designer, I appreciate developers who care about details. Alex bridges the gap between design and code beautifully — pixel-perfect implementations every time.",
    rating: 5,
  },
];

export const stats = [
  { label: "Projects Shipped", value: 35, suffix: "+" },
  { label: "Happy Clients", value: 28, suffix: "" },
  { label: "GitHub Stars", value: 2100, suffix: "+" },
  { label: "Cups of Coffee", value: 1847, suffix: "" },
];
