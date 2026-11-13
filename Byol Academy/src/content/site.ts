import logoImage from "@/assets/image.png";

export type Approvable<T> = T & {
  approved: boolean;
  note?: string;
};

export type Platform = Approvable<{
  id: "medicoplasma" | "schools" | "colleges";
  name: string;
  audience: string;
  summary: string;
  features: string[];
  href: string;
  ctaLabel: string;
}>;

export const brand = {
  name: "BYOL Academy",
  tagline: "Educate · Uplift · Empower",
  logo: logoImage,
  logoWidth: 160,
  logoHeight: 100,

  description:
    "An AI-powered learning platform for medicine, schools and colleges. Learning that responds to you.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://byolacademy.com",
  announcement:
    "Launched: Medicoplasma — NEET-PG, UKMLE and USMLE exam preparation",
} as const;

export const copy = {
  navigation: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    requestDemo: "Request a demo",
    learnMore: "Learn more",
  },
  hero: {
    eyebrow: "AI-powered learning platform",
    title: "Learning that responds to you.",
    description:
      "The BYOL Adaptive Engine meets every learner where they are and helps decide what to practise next, across medicine, schools and colleges.",
    explore: "Explore platforms",
    proof: "Used by 20 institutions and 13k+ learners.",
    features: [
      "Personalized learning paths",
      "Real-time progress insights",
      "Built for every learner",
    ],
    visualLabel: "Illustrative learning map",
  },
  audience: {
    eyebrow: "A path for every learner",
    title: "Where are you on your learning journey?",
    intro:
      "Start with the platform built around your goals.",
  },
  platformSection: {
    eyebrow: "Three platforms, one learning vision",
    title: "Learning for the next step.",
    intro:
      "Purpose-built learning experiences for different stages, powered by an adaptive-learning approach.",
  },
  benefitsSection: {
    eyebrow: "The BYOL approach",
    title: "Learning That Responds — Not Just Records",
    intro:
      "A learning experience should do more than record a score. It should help reveal what to focus on next.",
  },
  engineSection: {
    eyebrow: "A learning loop",
    title: "The engine learns from every step.",
    intro:
      "A conceptual view of how evidence can shape a more personal learning path.",
    disclaimer:
      "Conceptual architecture. Implementation details evolve through research and product validation.",
  },
  trustSection: {
    eyebrow: "Responsible by design",
    title: "AI should support learning, not define it.",
    doesTitle: "What our AI does",
    does: [
      "Estimates understanding from learner responses",
      "Suggests what to practise next",
      "Shows progress over time",
    ],
    doesNotTitle: "What our AI does not do",
    doesNot: [
      "Replace teachers, mentors, or subject experts",
      "Make final decisions about a learner",
      "Guarantee an outcome",
    ],
    principlesTitle: "Principles we design toward",
    disclaimer:
      "These are principles we design toward. They are not claims of regulatory compliance or certification.",
    aboutLink: "Read our principles",
  },
  institutions: {
    eyebrow: "For schools and institutions",
    title: "A clearer picture of what to learn next.",
    description:
      "Explore real-time progress insights, concept-level visibility, and adaptive testing for your learning community.",
    cta: "Request a demo",
  },
  demoSection: {
    eyebrow: "A hands-on example",
    title: "Adaptivity, made visible.",
    description:
      "Answer three sample questions and see how a learning estimate can shift with new evidence.",
  },
  proofSection: {
    eyebrow: "Learning in practice",
    title: "Growing with learners and institutions.",
    description:
      "A learning platform shaped for the people and communities it serves.",
    statsCaption: "Figures as published by BYOL Academy.",
  },
  closing: {
    eyebrow: "Your next step starts here",
    title: "The future of learning adapts to you.",
    learner: "Explore platforms",
    institution: "Talk with our team",
  },
  about: {
    eyebrow: "About BYOL Academy",
    title: "Be Your Own Light.",
    description:
      "BYOL Academy builds learning experiences around the idea that the next step should respond to the learner.",
    engineTitle: "A learning engine, thoughtfully designed.",
    engineDescription:
      "The BYOL Adaptive Engine is a conceptual design for learning that responds to evidence. The loop below describes the approach, not a claim about deployed models.",
    researchEyebrow: "Research",
    researchTitle: "Evidence before assumptions.",
    researchDescription:
      "Adaptive-learning research spans psychometric models, knowledge tracing, practice scheduling, and newer machine-learning approaches. Each brings trade-offs in interpretability, data needs, and confidence. A responsible system should be evaluated over time and explain uncertainty rather than treating a small number of answers as a complete picture.",
    responsibleTitle: "Responsible AI principles",
    responsibleDescription:
      "These principles guide the way we think about learning technology. They describe intent, not a claim of certification or regulatory compliance.",
  },
  contact: {
    eyebrow: "Let’s talk",
    title: "Find the right next step.",
    description:
      "Tell us a little about what you’re looking for. Our team can help you find the right BYOL platform.",
    institutionDescription:
      "Tell us about your learning community and what you’re exploring.",
  },
  legal: {
    eyebrow: "Legal",
    pending: "Content pending legal review",
    description:
      "The BYOL Academy team must provide and approve this legal document before the website launches.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },
  blog: {
    eyebrow: "Notes from BYOL Academy",
    title: "Ideas for learning that adapts.",
    description:
      "Articles will appear here as they are approved for publication.",
    empty: "No articles have been published yet.",
  },
  footer: {
    description:
      "Learning that responds to every learner, from medicine to schools and colleges.",
    platforms: "Platforms",
    company: "Company",
    legal: "Legal",
    copyright: "© 2026 BYOL Academy",
  },
} as const;

export const navigation = [
  { label: "Platforms", href: "/#platforms", id: "platforms" },
  { label: "How it works", href: "/#how-it-works", id: "how_it_works" },
  { label: "Research", href: "/about#research", id: "research" },
  { label: "Blog", href: "/blog", id: "blog" },
  { label: "About", href: "/about", id: "about" },
  { label: "Contact", href: "/contact", id: "contact" },
] as const;

export const platforms: Platform[] = [
  {
    id: "medicoplasma",
    name: "Medicoplasma",
    audience: "For medical learners",
    summary:
      "Adaptive assessment and preparation for medical students and professionals.",
    features: [
      "Adaptive assessment",
      "Structured learning and practice",
      "Domain-specific knowledge development",
    ],
    href: "https://medicoplasma.com",
    ctaLabel: "Explore Medicoplasma",
    approved: true,
  },
  {
    id: "schools",
    name: "BYOL Schools",
    audience: "For Class 6–12",
    summary: "Personalized learning for every student, from Class 6 to 12.",
    features: [
      "AI-powered doubt-solving",
      "Adaptive testing",
      "Progress across subjects",
    ],
    href: "https://schools.byolacademy.online",
    ctaLabel: "Explore BYOL Schools",
    approved: true,
  },
  {
    id: "colleges",
    name: "BYOL Colleges",
    audience: "For college learners",
    summary:
      "Adaptive preparation for degrees, diplomas, and the exams that follow them.",
    features: [
      "Learning shaped around your course and goals",
      "Focus on what to study next",
      "Doubt support",
    ],
    href: "https://schools.byolacademy.online/college",
    ctaLabel: "Explore BYOL Colleges",
    approved: true,
  },
];

export const audiences = [
  {
    id: "medical",
    title: "Medical aspirant",
    detail: "Prepare for the next step in your medical journey.",
    href: "https://medicoplasma.com",
  },
  {
    id: "school",
    title: "Student or parent",
    detail: "Explore personalized learning for Classes 6–12.",
    href: "https://schools.byolacademy.online",
  },
  {
    id: "college",
    title: "College or exam aspirant",
    detail: "Find support for your degree, diploma, or exam goals.",
    href: "https://schools.byolacademy.online/college",
  },
  {
    id: "institution",
    title: "School or institution",
    detail: "Talk with our team about learning for your community.",
    href: "/contact?intent=institution",
  },
] as const;

export const benefits = [
  {
    number: "01",
    title: "Understands the learner",
    description:
      "A learning path can respond to what a learner knows and where they need more practice.",
    icon: "◌",
  },
  {
    number: "02",
    title: "Precision over repetition",
    description:
      "Make the next learning step more relevant, instead of repeating the same path for everyone.",
    icon: "↗",
  },
  {
    number: "03",
    title: "Insight in real time",
    description:
      "Progress insights help learners and educators see what to focus on next.",
    icon: "⌁",
  },
  {
    number: "04",
    title: "Built for every stage",
    description:
      "One adaptive-learning vision across medicine, schools, and colleges.",
    icon: "✳",
  },
] as const;

export const engineSteps = [
  {
    title: "Learner evidence",
    description: "Responses and learning activity provide signals.",
  },
  {
    title: "Knowledge estimation",
    description: "Evidence can inform an estimate of understanding.",
  },
  {
    title: "Personalized intervention",
    description: "A suitable practice or learning step is suggested.",
  },
  {
    title: "New evidence",
    description: "The learner responds, adding to the picture.",
  },
  {
    title: "Updated learning path",
    description: "The next step can change as understanding grows.",
  },
] as const;

export const principles = [
  "Adaptation over standardization",
  "Evidence over assumptions",
  "Domain-specific intelligence",
  "Transparency by design",
  "Privacy and responsible data use",
  "Continuous evaluation",
] as const;

export const stats: Approvable<{
  id: string;
  value: string;
  label: string;
}>[] = [
  { id: "institutions", value: "20", label: "institutions", approved: true },
  { id: "learners", value: "13k+", label: "learners", approved: true },
];

export const demoCopy = {
  label: "Illustrative simulation with sample questions. Not your real results and not the production engine.",
  title: "See it adapt",
  description:
    "Try a short sample. Your answers update an illustrative mastery map and suggest a next step.",
  start: "Start the simulation",
  restart: "Try another subject",
  subjects: ["Medicine", "School maths", "College aptitude"] as const,
  questions: "Three sample questions",
  questionLabel: "Question",
  next: "Next question",
  results: "See your sample map",
  correct: "That’s right.",
  incorrect: "Not quite.",
  resultTitle: "A sample learning snapshot",
  nextStep: "A suggested next step",
  nextStepText:
    "Try one more practice question on the topic that felt least familiar.",
  tableCaption: "Illustrative concept estimates after your sample answers",
  tableHeaders: ["Concept", "Sample estimate", "Signal"] as const,
  answerPrompt: "Choose one answer.",
} as const;

export function shippable<T extends { approved: boolean }>(
  items: readonly T[],
): T[] {
  return process.env.NODE_ENV === "production"
    ? items.filter((item) => item.approved)
    : [...items];
}
