const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const themeToggle = document.getElementById("theme-toggle");
const themeToggleIcon = document.getElementById("theme-toggle-icon");
const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

document.body.setAttribute("data-theme", initialTheme);

function updateThemeIcon(theme) {
  if (themeToggleIcon) {
    themeToggleIcon.textContent = theme === "dark" ? "☀" : "🌙";
  }
}

updateThemeIcon(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    updateThemeIcon(nextTheme);
  });
}

const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("primary-nav");
const sectionIds = navLinks
  .map((link) => link.getAttribute("href"))
  .filter((href) => href && href.startsWith("#"))
  .map((href) => href.slice(1));
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function setActiveNav(id) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
  });
}

function closeMobileMenu() {
  if (navMenu) {
    navMenu.classList.remove("open");
  }
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });
}

if (sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries.length > 0) {
        setActiveNav(visibleEntries[0].target.id);
      }
    },
    {
      root: null,
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0.15, 0.35, 0.55],
    }
  );

  sections.forEach((section) => observer.observe(section));

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = (link.getAttribute("href") || "").replace("#", "");
      if (targetId) {
        setActiveNav(targetId);
      }
      if (window.innerWidth <= 700) {
        closeMobileMenu();
      }
    });
  });

  setActiveNav(sections[0].id);
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    closeMobileMenu();
  }
});

const chatToggle = document.getElementById("chat-toggle");
const chatWidget = document.getElementById("chat-widget");
const chatClose = document.getElementById("chat-close");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const chatHistory = [];

const localProjectNames = [
  "Mashreq Audit Platform",
  "TAP-DAP Test Automation Platform",
  "Profile Trading Platform",
  "Plutas.AI Insurance Claims Platform",
  "Alpha Tree Stock Analysis Platform",
  "Diwas Video-KYC Digital Onboarding",
  "Grid Scaled Foundations Robotics Control UI",
  "Profile Management Portal",
  "Oneshield Industrial Management",
];

const projectData = [
  { name: "Mashreq Audit Platform", start: "2024-05-01", end: null, skills: ["python", "fastapi"] },
  { name: "TAP-DAP Test Automation Platform", start: "2024-05-01", end: null, skills: ["python", "fastapi"] },
  {
    name: "Profile Trading Platform",
    start: "2024-05-01",
    end: null,
    skills: ["node.js", "react", "redux", "jwt", "oauth", "javascript"],
  },
  {
    name: "Plutas.AI Insurance Claims Platform",
    start: "2025-01-01",
    end: "2025-04-30",
    skills: ["react", "typescript", "javascript", "rest api"],
  },
  {
    name: "Alpha Tree Stock Analysis Platform",
    start: "2024-11-01",
    end: "2025-01-31",
    skills: ["react", "javascript"],
  },
  {
    name: "Diwas Video-KYC Digital Onboarding",
    start: "2024-03-01",
    end: "2024-11-30",
    skills: ["react", "typescript", "redux", "webrtc", "node.js"],
  },
  {
    name: "Grid Scaled Foundations Robotics Control UI",
    start: "2023-05-01",
    end: "2024-03-31",
    skills: ["react", "websocket", "material ui", "javascript"],
  },
  {
    name: "Oneshield Industrial Management",
    start: "2022-01-01",
    end: "2022-10-31",
    skills: ["angular", "typescript"],
  },
];

const skillAliases = {
  react: ["react", "reactjs", "react.js"],
  angular: ["angular"],
  python: ["python"],
  fastapi: ["fastapi"],
  "node.js": ["node", "nodejs", "node.js"],
  typescript: ["typescript", "ts"],
  javascript: ["javascript", "js"],
  redux: ["redux", "redux toolkit"],
  webrtc: ["webrtc"],
  websocket: ["websocket", "web socket", "socket"],
  jwt: ["jwt"],
  oauth: ["oauth", "oauth2", "oauth 2.0"],
  "rest api": ["rest api", "restful"],
};

const localFaq = [
  {
    keywords: ["python", "fastapi"],
    answer:
      "Rohit has hands-on backend experience with Python and FastAPI in enterprise projects like Mashreq Audit Platform and TAP-DAP, including API design, auth integration, and scalable service development.",
  },
  {
    keywords: ["react", "reactjs", "react.js"],
    answer:
      "Rohit has strong React experience across multiple enterprise products, including React 19 implementation, Redux Toolkit state management, routing, performance optimization, and reusable UI architecture.",
  },
  {
    keywords: ["angular"],
    answer:
      "Rohit has professional Angular experience, including work on Oneshield Industrial Management, where he contributed to scalable frontend architecture and enterprise UI delivery.",
  },
  {
    keywords: ["node", "nodejs", "node.js"],
    answer:
      "Rohit has practical Node.js experience in full-stack delivery, especially for API integration workflows and backend-connected React platforms.",
  },
  {
    keywords: ["postgresql", "mysql", "mongodb", "database", "db"],
    answer:
      "Rohit has production experience with PostgreSQL, MySQL, and MongoDB, including schema design, API-layer integration, and performance-focused data access in enterprise applications.",
  },
  {
    keywords: ["docker", "kubernetes", "ci/cd", "jenkins", "azure devops", "helm", "devops"],
    answer:
      "Rohit works with modern DevOps practices using Docker, Kubernetes, Azure DevOps, Jenkins, Helm, and CI/CD pipelines to improve deployment reliability and delivery speed.",
  },
  {
    keywords: ["jwt", "rbac", "oauth", "keycloak", "msal", "azure msal", "sso", "security", "auth"],
    answer:
      "Rohit has strong security implementation experience: enterprise SSO with Azure MSAL/OAuth 2.0, JWT-based authorization, and RBAC controls across enterprise applications.",
  },
  {
    keywords: ["websocket", "sse", "webrtc", "real-time", "realtime"],
    answer:
      "Rohit has delivered real-time systems using WebSocket, SSE, and WebRTC for use cases like audit streaming, live dashboards, and video-KYC workflows.",
  },
  {
    keywords: ["testing", "jest", "rtl", "react testing library", "junit", "cucumber", "robot framework"],
    answer:
      "Rohit has worked with Jest, React Testing Library, JUnit, Cucumber, and Robot Framework, including AI-assisted test generation workflows in TAP-DAP.",
  },
  {
    keywords: ["mashreq", "audit platform", "cbuae"],
    answer:
      "Mashreq Audit Platform: Rohit led a React 19 + FastAPI solution with Azure MSAL SSO, JWT-based RBAC, PostgreSQL, and real-time SSE streaming for banking compliance workflows.",
  },
  {
    keywords: ["tap-dap", "test automation", "langchain", "langgraph"],
    answer:
      "TAP-DAP: Rohit led an AI-driven test automation platform generating JUnit, Cucumber, and Robot test cases, reducing manual QA effort by about 60%.",
  },
  {
    keywords: ["profile trading", "trading platform"],
    answer:
      "Profile Trading Platform: Rohit contributed as Tech Lead to a secure data marketplace using React, Redux, Node.js, JWT, and OAuth 2.0 for authorization.",
  },
  {
    keywords: ["plutas", "insurance claims"],
    answer:
      "Plutas.AI Insurance Claims Platform: Rohit improved claim workflow UX and processing efficiency, helping reduce processing time by around 50%.",
  },
  {
    keywords: ["alpha tree", "stock analysis"],
    answer:
      "Alpha Tree Stock Analysis Platform: Rohit worked on high-performance real-time visual interfaces and helped improve decision speed and frontend performance.",
  },
  {
    keywords: ["diwas", "video-kyc", "webrtc"],
    answer:
      "Diwas Video-KYC: Rohit contributed to onboarding optimization from 15 to 5 minutes and reduced identity validation costs by 45% using WebRTC-based verification.",
  },
  {
    keywords: ["grid scaled", "robotics", "control ui"],
    answer:
      "Grid Scaled Foundations Robotics Control UI: Rohit worked on real-time React/WebSocket interfaces that improved response speed and reduced configuration errors.",
  },
  {
    keywords: ["profile management portal", "recruitment portal"],
    answer:
      "Profile Management Portal: Rohit built recruitment workflows with automated screening and improved candidate matching through better frontend and API integration.",
  },
  {
    keywords: ["oneshield", "industrial management"],
    answer:
      "Oneshield Industrial Management: Rohit worked with Angular and TypeScript to deliver enterprise industrial interfaces with improved engagement and reduced implementation errors.",
  },
  {
    keywords: ["skill", "stack", "technology", "tech"],
    answer:
      "Rohit's core stack includes React, Angular, TypeScript, Python, FastAPI, Node.js, PostgreSQL, MySQL, MongoDB, Docker, Kubernetes, and CI/CD tooling.",
  },
  {
    keywords: ["experience", "year", "worked", "career"],
    answer:
      "Rohit has 5+ years of experience and currently works as a Senior Software Engineer at WalkingTree Technologies.",
  },
  {
    keywords: ["contact", "email", "phone", "linkedin", "hire", "available"],
    answer:
      "You can contact Rohit at rohitparihar9758@gmail.com, +91-8791458460, or via LinkedIn: linkedin.com/in/-rohitparihar. He is open to full-time and freelance opportunities.",
  },
  {
    keywords: ["impact", "result", "achievement", "metrics", "performance"],
    answer:
      "Key outcomes include 67% onboarding time reduction, 45% verification cost reduction, and 40% UI performance improvement.",
  },
  {
    keywords: ["hi", "hello", "hey"],
    answer:
      "Hi! You can ask me about Rohit's skills, projects, experience, impact metrics, or contact details.",
  },
];

function appendChatMessage(role, text) {
  if (!chatMessages) {
    return;
  }
  const message = document.createElement("article");
  message.className = `chat-message ${role}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendChatMessage(userMessage) {
  appendChatMessage("user", userMessage);
  const normalizedMessage = userMessage.toLowerCase();
  const asksExperience =
    /experience|exp|hands-on|worked|work|time|duration|how many|project|projects|count/.test(
      normalizedMessage
    );

  const requestedSkill = detectRequestedSkill(normalizedMessage);
  if (requestedSkill && asksExperience) {
    const answer = buildSkillExperienceAnswer(requestedSkill);
    chatHistory.push({ role: "user", content: userMessage });
    chatHistory.push({ role: "assistant", content: answer });
    appendChatMessage("bot", answer);
    return;
  }

  const matchedFaq = findBestFaqMatch(normalizedMessage);

  let answer = "";
  if (matchedFaq) {
    answer = matchedFaq.answer;
  } else {
    const projectMentioned = /project|case study|client work|product/.test(normalizedMessage);
    if (projectMentioned) {
      answer =
        "I can only answer using Rohit's portfolio data. If you mean one of his listed projects, ask about: " +
        localProjectNames.join(", ") +
        ". For any other project, please contact Rohit directly for details.";
    } else {
      answer =
        "I can help with Rohit's portfolio topics: skills, projects, experience, impact metrics, and contact details.";
    }
  }

  chatHistory.push({ role: "user", content: userMessage });
  chatHistory.push({ role: "assistant", content: answer });
  appendChatMessage("bot", answer);
}

function findBestFaqMatch(normalizedMessage) {
  const scored = localFaq
    .map((item) => {
      const matches = item.keywords.filter((word) => normalizedMessage.includes(word));
      const score = matches.reduce((total, keyword) => total + keyword.length, 0);
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.length > 0 ? scored[0].item : null;
}

function monthsBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return 0;
  }
  const yearDiff = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();
  const dayAdjust = end.getDate() >= start.getDate() ? 0 : -1;
  return Math.max(0, yearDiff * 12 + monthDiff + dayAdjust + 1);
}

function formatDuration(totalMonths) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years > 0 && months > 0) {
    return `${years} year${years > 1 ? "s" : ""} ${months} month${months > 1 ? "s" : ""}`;
  }
  if (years > 0) {
    return `${years}+ year${years > 1 ? "s" : ""}`;
  }
  return `${months} month${months > 1 ? "s" : ""}`;
}

function buildSkillExperienceAnswer(canonicalSkill) {
  const key = canonicalSkill.toLowerCase();
  const displayName = key
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const matchedProjects = projectData.filter((project) => project.skills.includes(key));

  if (matchedProjects.length === 0) {
    return `I do not see any ${displayName} project entries in the current portfolio dataset.`;
  }

  const totalMonths = matchedProjects.reduce(
    (sum, project) => sum + monthsBetween(project.start, project.end),
    0
  );
  const durationText = formatDuration(totalMonths);
  const projectNames = matchedProjects.map((project) => project.name).join(", ");

  return `Based on Rohit's portfolio data, ${displayName} experience includes ${matchedProjects.length} project(s): ${projectNames}. Estimated hands-on duration is about ${durationText}.`;
}

function detectRequestedSkill(normalizedMessage) {
  for (const [canonical, aliases] of Object.entries(skillAliases)) {
    if (aliases.some((alias) => normalizedMessage.includes(alias))) {
      return canonical;
    }
  }
  return null;
}

if (chatToggle && chatWidget) {
  chatToggle.addEventListener("click", () => {
    chatWidget.classList.toggle("open");
    if (chatWidget.classList.contains("open") && chatInput) {
      chatInput.focus();
    }
  });
}

if (chatClose && chatWidget) {
  chatClose.addEventListener("click", () => {
    chatWidget.classList.remove("open");
  });
}

if (chatForm && chatInput) {
  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) {
      return;
    }
    chatInput.value = "";
    await sendChatMessage(userMessage);
  });
}
