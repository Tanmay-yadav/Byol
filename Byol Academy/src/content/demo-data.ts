export type DemoQuestion = {
  concept: string;
  prompt: string;
  options: readonly string[];
  answer: number;
  explanation: string;
};

export const demoQuestions: Record<string, readonly DemoQuestion[]> = {
  Medicine: [
    {
      concept: "Cell biology",
      prompt: "Which structure is primarily responsible for ATP production?",
      options: ["Ribosome", "Mitochondrion", "Golgi apparatus", "Lysosome"],
      answer: 1,
      explanation:
        "Mitochondria generate most cellular ATP through oxidative phosphorylation.",
    },
    {
      concept: "Physiology",
      prompt: "Which ion initiates skeletal muscle contraction?",
      options: ["Sodium", "Potassium", "Calcium", "Chloride"],
      answer: 2,
      explanation:
        "Calcium binds to troponin, enabling actin and myosin to interact.",
    },
    {
      concept: "Pharmacology",
      prompt: "A drug’s half-life is the time required for its plasma concentration to:",
      options: [
        "Double",
        "Fall by half",
        "Reach peak concentration",
        "Become therapeutically active",
      ],
      answer: 1,
      explanation:
        "Half-life describes the time for plasma concentration to decrease by 50%.",
    },
  ],
  "School maths": [
    {
      concept: "Fractions",
      prompt: "What is ¾ of 20?",
      options: ["12", "15", "16", "18"],
      answer: 1,
      explanation: "Three quarters of 20 is 3 × (20 ÷ 4), which equals 15.",
    },
    {
      concept: "Algebra",
      prompt: "If 2x + 5 = 17, what is x?",
      options: ["5", "6", "7", "11"],
      answer: 1,
      explanation: "Subtract 5 from both sides, then divide 12 by 2.",
    },
    {
      concept: "Geometry",
      prompt: "What is the sum of angles in a triangle?",
      options: ["90°", "180°", "270°", "360°"],
      answer: 1,
      explanation: "The interior angles of a Euclidean triangle total 180°.",
    },
  ],
  "College aptitude": [
    {
      concept: "Ratios",
      prompt: "A ratio of 2:3 has a total of 25 parts. What is the larger share?",
      options: ["10", "12", "15", "18"],
      answer: 2,
      explanation: "The larger share is 3 of 5 equal parts: 3 × 5 = 15.",
    },
    {
      concept: "Percentages",
      prompt: "What is 20% of 250?",
      options: ["25", "40", "50", "60"],
      answer: 2,
      explanation: "One fifth of 250 is 50.",
    },
    {
      concept: "Sequences",
      prompt: "What comes next: 3, 6, 12, 24, …?",
      options: ["30", "36", "42", "48"],
      answer: 3,
      explanation: "Each term doubles, so the next term is 48.",
    },
  ],
};
