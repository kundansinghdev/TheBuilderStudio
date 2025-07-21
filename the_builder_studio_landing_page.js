// thebuilderstudio.com - Landing Page Context File (Advanced Version)

export const siteMetadata = {
  title: "The Builder Studio",
  description:
    "From Idea to Launched App in Just 4 Weeks. Learn everything you need to build your SaaS or online business—even as a complete beginner.",
  siteUrl: "https://thebuilderstudio.co",
};

export const navLinks = [
  { title: "Our Process", href: "#process" },
  { title: "MVPs Built", href: "#mvp-list" },
  { title: "Founder Reviews", href: "#reviews" },
  { title: "Connect", href: "#contact" },
];

export const heroSection = {
  heading: "Let’s Build",
  subheading:
    "From Idea to Launched App in Just 4 Weeks.\nYour Complete Building Journey.\nLearn everything you need to build your SaaS or online business—even as a complete beginner.",
  ctaPrimary: { label: "Start Your Journey", href: "#contact" },
};

export const videoSection = {
  title: "Building the App",
  description: "Watch how we build real MVPs, fast.",
  videoUrl: "your-uploaded-video-url",
};

export const process = {
  title: "Our Process",
  stages: [
    {
      number: "01",
      title: "Idea",
      text: "We help you refine and clarify your concept with founder-minded precision.",
    },
    {
      number: "02",
      title: "Validation",
      text: "Run lean experiments to test assumptions and gain real market feedback.",
    },
    {
      number: "03",
      title: "Planning",
      text: "Create your roadmap, align resources, and architect a fast, scalable MVP.",
    },
    {
      number: "04",
      title: "Execution",
      text: "Build, launch, and learn — we ship the MVP or even your full product.",
    },
  ],
};

export const mvpList = {
  title: "MVPs We've Built",
  items: [
    { name: "VaultMind", description: "Encrypted digital vault for capturing and organizing content.", imageUrl: "vaultmind-preview.png" },
    { name: "LaunchPilot", description: "Startup toolkit for validating and launching ideas.", imageUrl: "launchpilot-preview.png" },
  ],
};

export const testimonials = {
  title: "Hear What Founders Are Saying",
  reviews: [
    {
      name: "Arjun Patel",
      company: "HealthTech AI",
      quote: "The Builder Studio helped us go from napkin sketch to MVP in record time. Truly founder-first.",
      avatarUrl: "arjun-avatar.png",
    },
    {
      name: "Sara Malik",
      company: "EduGrow",
      quote: "Not just developers — they're co-builders. Best MVP partners we've ever had.",
      avatarUrl: "sara-avatar.png",
    },
  ],
};

export const contact = {
  title: "Ready to Build Your Idea for Real?",
  description:
    "Let’s connect and take the first step toward your product launch.",
  fields: ["Name", "Email", "Startup Idea"],
  buttonLabel: "Let’s Connect Now!",
};

export const footer = {
  text: "© 2025 The Builder Studio. Built by builders, for builders.",
  links: ["Privacy Policy", "Terms of Service"],
};
