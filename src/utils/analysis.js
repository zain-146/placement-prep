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
    roundMapping: generateRoundMapping(extractedSkills),
    checklist: generateChecklist(extractedSkills),
    plan7Days: generate7DayPlan(extractedSkills),
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

const generateRoundMapping = (skills) => [
  { roundTitle: "Online Assessment", focusAreas: ["Aptitude", "Core CS", "Coding"], whyItMatters: "First hurdle to filter candidates." },
  { roundTitle: "Technical Interview 1", focusAreas: skills.languages.slice(0, 2).concat(skills.coreCS.slice(0, 2)), whyItMatters: "Checks fundamental technical depth." }
]

const generateChecklist = (skills) => [
  { roundTitle: "Preparation", items: ["Review Resume", "Brush up on " + (skills.languages[0] || "Coding"), "Mock Interviews"] }
]

const generate7DayPlan = (skills) => [
  { day: 1, focus: "Fundamentals", tasks: ["Revise " + (skills.coreCS[0] || "Data Structures"), "Practice 2 LC Easy"] },
  { day: 7, focus: "Final Review", tasks: ["Mock Interview", "Company Research"] }
]

const generateQuestions = (skills) => [
  "Explain one of your major projects.",
  "What is the time complexity of your favorite sorting algorithm?",
  `How do you handle ${skills.web[0] || 'difficult requirements'} in a project?`
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
