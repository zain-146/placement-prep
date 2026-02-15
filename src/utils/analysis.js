export const SKILL_CATEGORIES = {
  coreCS: ["Data Structures", "Algorithms", "Operating Systems", "DBMS", "Computer Networks", "System Design"],
  languages: ["JavaScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin", "TypeScript"],
  web: ["React", "Angular", "Vue", "Node.js", "Express", "Django", "Flask", "Spring Boot", "ASP.NET", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  data: ["SQL", "NoSQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "Hadoop", "Spark", "Pandas", "NumPy", "TensorFlow", "PyTorch"],
  cloud: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Terraform", "Serverless"],
  testing: ["Jest", "Cypress", "Selenium", "JUnit", "Pytest", "Mocha", "Manual Testing", "Automation Testing"],
}

export const analyzeJD = (jdText, company = "", role = "") => {
  const normalizedJD = jdText.toLowerCase()
  const extractedSkills = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
    other: []
  }

  let totalSkillsFound = 0

  Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
    skills.forEach(skill => {
      if (normalizedJD.includes(skill.toLowerCase())) {
        extractedSkills[category].push(skill)
        totalSkillsFound++
      }
    })
  })

  // Rule 3: Default behavior if no skills detected
  if (totalSkillsFound === 0) {
    extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"]
  }

  const baseScore = calculateScore(extractedSkills)

  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    company,
    role,
    jdText,
    extractedSkills,
    roundMapping: generateRoundMapping(extractedSkills, company),
    checklist: generateChecklist(extractedSkills),
    plan7Days: generate7DayPlan(extractedSkills, company),
    questions: generateQuestions(extractedSkills),
    baseScore,
    skillConfidenceMap: {}, // Empty initially
    finalScore: baseScore
  }

  // Initialize confidence map as all "practice" initially
  Object.values(extractedSkills).flat().forEach(skill => {
    entry.skillConfidenceMap[skill] = "practice"
  })

  return entry
}

const calculateScore = (skills) => {
  const total = Object.values(skills).flat().length
  if (total === 0) return 0
  // Basic heuristic: 10 points per skill, max 100
  return Math.min(100, total * 8)
}

export const updateFinalScore = (entry) => {
  const skills = Object.values(entry.extractedSkills).flat()
  if (skills.length === 0) return 0

  const knownCount = skills.filter(s => entry.skillConfidenceMap[s] === "know").length
  const ratio = knownCount / skills.length

  // finalScore changes based on skillConfidenceMap
  // We keep it proportional to baseScore but boosted by confidence
  const confidenceBoost = ratio * 20 // Max 20 points boost
  return Math.min(100, entry.baseScore + confidenceBoost)
}

const generateRoundMapping = (skills, company = "") => {
  const comp = company || "Target Company"
  return [
    {
      roundTitle: "Online Assessment",
      focusAreas: ["Aptitude", "Core CS", "Coding"],
      whyItMatters: `Standard first-level filter for ${comp}.`
    },
    {
      roundTitle: `${comp} Technical Interview 1`,
      focusAreas: [...skills.languages.slice(0, 2), ...skills.coreCS.slice(0, 2)],
      whyItMatters: "Verifies technical depth in core technologies mentioned in the JD."
    },
    {
      roundTitle: `${comp} System Design`,
      focusAreas: ["Hld/Lld", ...skills.data.slice(0, 1)],
      whyItMatters: "Checks scalability and architectural thinking."
    }
  ]
}

const generateChecklist = (skills) => [
  { roundTitle: "Resume & Portfolio", items: ["Update Projects section", "Highlight " + (skills.web[0] || "relevant") + " experience", "Check GitHub links"] },
  { roundTitle: "Technical Prep", items: ["Brush up on " + (skills.languages[0] || "Coding"), "Practice Mock Interviews", "Review Core CS Fundamentals"] }
]

const generate7DayPlan = (skills, company = "") => {
  const comp = company || "Target Company"
  return [
    { day: 1, focus: "Day 1: Fundamentals", tasks: ["Revise " + (skills.coreCS[0] || "Data Structures"), "Practice 2 Easy LeetCode"] },
    { day: 3, focus: `Day 3: ${comp} Specifics`, tasks: ["Research " + comp + " recent interview patterns", "Deep dive into " + (skills.web[0] || "relevant tech")] },
    { day: 7, focus: "Day 7: Mock & Review", tasks: ["Full length mock interview", "Company research & values"] }
  ]
}

const generateQuestions = (skills) => [
  "Explain one of your major projects in detail.",
  "How would you optimize a slow database query in " + (skills.data[0] || "SQL") + "?",
  `Describe your experience working with ${skills.web[0] || 'Frontend frameworks'}.`,
  "Tell me about a time you handled a difficult technical challenge.",
  "Which design patterns are you most comfortable with?"
]

export const saveHistory = (entry) => {
  const history = getHistory()
  localStorage.setItem("placement_prep_history", JSON.stringify([entry, ...history]))
}

export const getHistory = () => {
  const raw = localStorage.getItem("placement_prep_history")
  if (!raw) return []
  try {
    const history = JSON.parse(raw)
    // Rule 5: Robustness
    return history.filter(entry => {
      try {
        validateEntry(entry)
        return true
      } catch (e) {
        console.error("Corrupted entry found and skipped", e)
        return false
      }
    })
  } catch (e) {
    console.error("History corrupted, clearing...", e)
    return []
  }
}

const validateEntry = (e) => {
  const required = ["id", "createdAt", "jdText", "extractedSkills", "baseScore", "finalScore"]
  required.forEach(field => {
    if (!e[field]) throw new Error(`Missing ${field}`)
  })
}
