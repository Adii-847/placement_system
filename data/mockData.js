const COMPANIES = [
  { id: 1, name: "Google", emoji: "🔵", role: "SDE - II", package: "₹45 LPA", location: "Bangalore", deadline: "Jul 15", match: 92, skills: ["React", "Node.js", "System Design", "DSA"], missing: ["Kubernetes"], branch: "CSE/IT", logo: "#4285F4" },
  { id: 2, name: "Microsoft", emoji: "⬛", role: "Software Engineer", package: "₹38 LPA", location: "Hyderabad", deadline: "Jul 22", match: 87, skills: ["C#/.NET", "Azure", "React", "SQL"], missing: ["Azure DevOps"], branch: "CSE/ECE/IT", logo: "#00A4EF" },
  { id: 3, name: "Amazon", emoji: "🟠", role: "SDE-1", package: "₹32 LPA", location: "Pune", deadline: "Aug 5", match: 78, skills: ["Java", "AWS", "Microservices", "DSA"], missing: ["AWS Lambda", "DynamoDB"], branch: "CSE/IT", logo: "#FF9900" },
  { id: 4, name: "Flipkart", emoji: "🟡", role: "SDE-1", package: "₹28 LPA", location: "Bangalore", deadline: "Aug 12", match: 95, skills: ["Java", "Spring Boot", "MySQL"], missing: [], branch: "CSE/IT/ECE", logo: "#F74D00" },
  { id: 5, name: "Infosys", emoji: "🔷", role: "Systems Engineer", package: "₹8 LPA", location: "Multiple", deadline: "Sep 1", match: 99, skills: ["Java", "SQL", "Python"], missing: [], branch: "All Branches", logo: "#007CC3" },
  { id: 6, name: "Goldman Sachs", emoji: "💙", role: "Analyst - Tech", package: "₹22 LPA", location: "Bangalore", deadline: "Jul 30", match: 71, skills: ["Python", "C++", "Finance Basics", "SQL"], missing: ["Quant Finance", "VBA"], branch: "CSE/Maths", logo: "#6699CC" },
];

const NOTIFICATIONS = [
  { id: 1, type: "placement", title: "Google Drive Open!", body: "Google has opened placement registrations for SDE-2. Deadline: Jul 15. You're 92% eligible.", time: "2m ago", read: false, color: "var(--blue)" },
  { id: 2, type: "ai", title: "AI Resume Insight", body: "Your resume ATS score improved to 78 after adding the 'System Design' keyword. Add 'Kubernetes' to hit 85+.", time: "1h ago", read: false, color: "var(--purple)" },
  { id: 3, type: "interview", title: "Interview Scheduled", body: "Your Microsoft technical interview is confirmed for July 18 at 2:00 PM IST. Check interview prep resources.", time: "3h ago", read: false, color: "var(--indigo)" },
  { id: 4, type: "deadline", title: "Application Deadline Approaching", body: "Amazon placement application closes in 3 days (Aug 5). Complete your application now.", time: "5h ago", read: true, color: "var(--orange)" },
  { id: 5, type: "general", title: "Pre-Placement Talk by Flipkart", body: "Flipkart will hold an online PPT session tomorrow at 4 PM. Attendance is mandatory for registered students.", time: "1d ago", read: true, color: "var(--green)" },
  { id: 6, type: "placement", title: "Shortlisted by Microsoft!", body: "Congratulations! You've been shortlisted for the Microsoft interview round. Check your schedule.", time: "2d ago", read: true, color: "var(--blue)" },
];

const APP_STATUS = [
  { label: "Applied", status: "done" },
  { label: "Under Review", status: "done" },
  { label: "Shortlisted", status: "done" },
  { label: "Online Assessment", status: "active" },
  { label: "Technical", status: "pending" },
  { label: "HR Round", status: "pending" },
  { label: "Selected", status: "pending" },
];

const AI_CHAT_INIT = [
  { role: "ai", text: "Hey! 👋 I'm your AI Career Assistant. I can help you with resume tips, interview prep, career roadmaps, company-specific guidance, and more. What would you like to work on today?" },
];

const AI_RESPONSES = {
  resume: "Based on your profile, here are the top improvements for your resume:\n\n**1. Add Quantified Impact** — Change 'Worked on backend APIs' to 'Built 12 REST APIs handling 10K+ daily requests, reducing latency by 35%.'\n\n**2. ATS Keywords Missing** — Add these terms: Kubernetes, CI/CD, System Design, Microservices\n\n**3. Project Descriptions** — Your CGPA project section lacks tech stack tags. Recruiters scan these first.\n\n**4. Header Section** — Add your GitHub and LinkedIn URLs. Google recruiters specifically look for this.",
  google: "🔵 **Google SDE-2 Preparation Roadmap:**\n\n**Round 1 — Phone Screen (45 min)**\n• 2 LeetCode Medium problems\n• Focus: Arrays, HashMaps, Sliding Window\n\n**Round 2-4 — Onsite Coding**\n• 1 Medium + 1 Hard per round\n• Think aloud — Google values communication\n\n**Round 5 — System Design**\n• Design YouTube, Google Drive, or URL Shortener\n• Study: CAP theorem, consistent hashing, sharding\n\n**Round 6 — Googliness + Leadership**\n• STAR format answers\n• Prepare: failure story, cross-team collaboration\n\n**Estimated Prep Time:** 6-8 weeks at 3-4 hrs/day",
  default: "That's a great question! Let me pull the most relevant guidance for your current placement stage...\n\nBased on your profile showing **78% resume strength**, **3 active applications**, and **1 interview scheduled**, here's what I recommend focusing on this week:\n\n1. **Priority:** Finish the Amazon Online Assessment mock tests\n2. **Resume:** Add Kubernetes to your skills section\n3. **Practice:** Solve 2 Graph problems daily for Microsoft\n4. **Schedule:** Block 4 PM tomorrow for Flipkart PPT\n\nWant me to go deeper into any of these?"
};

module.exports = {
  COMPANIES,
  NOTIFICATIONS,
  APP_STATUS,
  AI_CHAT_INIT,
  AI_RESPONSES
};
