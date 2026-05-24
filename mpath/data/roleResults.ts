// data/roleResults.ts — Personalized result data for all 11 career roles

import type { RoleResultMap } from "@/types";

export const ROLE_RESULTS: RoleResultMap = {
  "Software Engineer": {
    icon: "⚙️",
    summary:
      "Your responses reveal a mind fundamentally wired for systems. You approach problems by decomposing them into components, value logical rigor above most other qualities, and are deeply energized by the challenge of building things that work reliably and elegantly. You think in abstractions, pursue root causes instinctively, and find profound satisfaction in clean, maintainable solutions. Your persistence when encountering difficult problems, combined with your preference for understanding tools internally rather than treating them as black boxes, marks you as a natural systems thinker.",
    strengths: [
      "Systems thinking and decomposition",
      "Debugging and root-cause analysis",
      "Abstract problem-solving",
      "Logical reasoning and precision",
      "Technical persistence and curiosity",
    ],
    areasToImprove: [
      "Stakeholder communication and non-technical explanation",
      "User empathy and experience thinking",
      "Project scoping and timeline estimation",
      "Cross-functional collaboration beyond engineering",
    ],
    responsibilities: [
      "Design and implement scalable backend, frontend, or full-stack systems",
      "Debug complex production issues and perform thorough root-cause analysis",
      "Contribute to technical architecture and system design decisions",
      "Write, review, and refactor clean, well-documented, maintainable code",
      "Collaborate with product and design teams to deliver working, tested features",
    ],
    skills: [
      "Data structures and algorithms",
      "System design principles",
      "Version control (Git) and branching strategies",
      "Testing methodologies and CI/CD",
      "API design and third-party integration",
    ],
    tools: [
      "VS Code / JetBrains IDEs",
      "Git, GitHub / GitLab",
      "Docker, Kubernetes",
      "AWS / GCP / Azure",
      "PostgreSQL, Redis, MongoDB",
    ],
    roadmap: [
      {
        phase: "Months 1–3",
        description:
          "Master a primary language deeply (Python, JavaScript, or Java). Build 3 complete projects from scratch, including one with a database.",
      },
      {
        phase: "Months 4–6",
        description:
          "Study data structures, algorithms, and system design fundamentals. Contribute to one open source project. Practice LeetCode-style problems.",
      },
      {
        phase: "Months 7–12",
        description:
          "Learn cloud infrastructure basics, CI/CD pipelines, and automated testing. Build a production-grade portfolio project with real deployment.",
      },
      {
        phase: "Year 2+",
        description:
          "Specialize in backend, frontend, or full-stack engineering. Begin exploring distributed systems, platform engineering, or a domain like ML systems.",
      },
    ],
    growthPath:
      "Junior Software Engineer → Mid-Level Engineer → Senior Engineer → Staff / Principal Engineer → Engineering Manager or CTO track. Software engineering offers one of the broadest and most rewarding career ladders in the technology industry, with specialization opportunities in virtually every domain.",
  },

  "QA Tester": {
    icon: "🔍",
    summary:
      "Your assessment profile reveals a quality-first mindset that is genuinely rare. You notice inconsistencies that others overlook, think naturally about failure modes and edge cases, and find authentic satisfaction in the validation process. You are the person who asks 'but what happens when...?' before anyone else has even considered the question. Your patience with rigorous, methodical processes — combined with your instinctive skepticism toward systems that haven't been fully verified — makes you an invaluable safeguard in any technology team.",
    strengths: [
      "Exceptional attention to detail",
      "Edge-case and boundary thinking",
      "Structured, methodical execution",
      "Patience with rigorous validation processes",
      "Inconsistency and anomaly detection",
    ],
    areasToImprove: [
      "Test automation and scripting proficiency",
      "Performance and security testing techniques",
      "Communicating findings persuasively to developers",
      "Learning to prioritize defects by business severity",
    ],
    responsibilities: [
      "Design comprehensive test cases covering functional and non-functional requirements",
      "Execute manual and automated test suites across platforms, browsers, and environments",
      "Document bugs with clear reproduction steps, severity, and expected vs. actual behavior",
      "Collaborate closely with developers to verify fixes and execute regression testing",
      "Champion quality standards and advocate for testing throughout the development lifecycle",
    ],
    skills: [
      "Manual and exploratory testing techniques",
      "Test case and test plan design",
      "Bug tracking and severity classification",
      "Scripting basics for test automation",
      "Regression testing methodology and management",
    ],
    tools: [
      "Jira, TestRail, Zephyr Scale",
      "Selenium, Cypress, Playwright",
      "Postman (API testing)",
      "BrowserStack / Sauce Labs",
      "Git and version control basics",
    ],
    roadmap: [
      {
        phase: "Months 1–3",
        description:
          "Learn software testing fundamentals, test case design principles, and bug reporting best practices. Study the ISTQB foundation curriculum.",
      },
      {
        phase: "Months 4–6",
        description:
          "Master a test management platform (TestRail or Jira). Learn API testing with Postman. Build and execute a complete test plan for a real application.",
      },
      {
        phase: "Months 7–12",
        description:
          "Learn test automation with Selenium or Cypress. Build an automated regression suite. Explore performance testing with k6 or JMeter.",
      },
      {
        phase: "Year 2+",
        description:
          "Specialize in performance testing, security testing, or SDET (Software Development Engineer in Test) roles. Pursue ISTQB Advanced certification.",
      },
    ],
    growthPath:
      "Junior QA Tester → QA Engineer → Senior QA Engineer → QA Lead → SDET → QA Architect / Quality Engineering Manager. High demand in fintech, healthcare technology, and enterprise software where defects carry significant consequences.",
  },

  "Data Analyst": {
    icon: "📊",
    summary:
      "Your analytical tendencies emerged clearly throughout this assessment. You are drawn to patterns, instinctively question the causality behind statistics, and find measurable outcomes far more compelling than qualitative impressions. You think in distributions and trends, and find the process of transforming raw, messy data into a coherent, persuasive story genuinely satisfying. Your combination of statistical sensibility and communication ability positions you well for a role that sits at the nexus of data and decision-making.",
    strengths: [
      "Statistical and quantitative reasoning",
      "Pattern recognition and trend analysis",
      "Data visualization and dashboard design",
      "Analytical decision-making under uncertainty",
      "Communicating findings to non-technical audiences",
    ],
    areasToImprove: [
      "Advanced statistical modeling and machine learning basics",
      "Data engineering and pipeline management",
      "Executive-level presentation of complex findings",
      "Storytelling when data is ambiguous or contradictory",
    ],
    responsibilities: [
      "Query, clean, and prepare datasets for rigorous analysis",
      "Identify trends, anomalies, and actionable insights from business data",
      "Build interactive dashboards and automated reports for stakeholder consumption",
      "Collaborate with business teams to define KPIs and measurable success metrics",
      "Present analytical findings clearly to both technical and non-technical audiences",
    ],
    skills: [
      "SQL (advanced querying, CTEs, window functions)",
      "Python with pandas, numpy, and matplotlib",
      "Data visualization principles and tools",
      "Statistical thinking and hypothesis testing",
      "Business acumen and domain knowledge",
    ],
    tools: [
      "Python, R",
      "SQL (PostgreSQL, BigQuery, Snowflake)",
      "Tableau, Power BI, Looker",
      "Excel / Google Sheets",
      "dbt, Apache Airflow",
    ],
    roadmap: [
      {
        phase: "Months 1–3",
        description:
          "Master SQL fundamentals and intermediate querying. Learn Python basics with pandas and matplotlib. Complete real dataset exercises daily.",
      },
      {
        phase: "Months 4–6",
        description:
          "Build 3–5 end-to-end analysis projects with real business questions. Learn Tableau or Power BI for professional visualization.",
      },
      {
        phase: "Months 7–12",
        description:
          "Study statistics formally (probability, regression, significance testing). Build a portfolio with documented analytical case studies.",
      },
      {
        phase: "Year 2+",
        description:
          "Specialize in a business domain (marketing, product, finance analytics). Explore dbt for data modeling. Consider transitioning toward data science.",
      },
    ],
    growthPath:
      "Data Analyst → Senior Data Analyst → Analytics Manager → Director of Analytics → Chief Data Officer track. Also a natural pivot point toward Data Science, ML Engineering, or Product Analytics leadership.",
  },

  "Business Analyst": {
    icon: "📋",
    summary:
      "Your thinking naturally bridges the gap between organizational goals and technical execution. You listen carefully, synthesize competing perspectives into structured specifications, and find the process of translating ambiguous business needs into precise, actionable documentation genuinely compelling. You are a natural connector — someone who makes teams more effective by ensuring that what gets built is actually what was needed. Your comfort with complexity and stakeholder management is a significant professional asset.",
    strengths: [
      "Stakeholder communication and active listening",
      "Requirements elicitation and structured documentation",
      "Process mapping and workflow optimization",
      "Translating business needs into technical specifications",
      "Facilitation, consensus-building, and meeting management",
    ],
    areasToImprove: [
      "Technical depth in software systems and databases",
      "Data modeling and SQL query basics",
      "Advanced Agile methodology and sprint management",
      "Formal business case writing and financial justification",
    ],
    responsibilities: [
      "Elicit, analyze, and document functional and non-functional business requirements",
      "Facilitate stakeholder workshops and interviews to surface and align business needs",
      "Create process maps, user stories, use cases, and acceptance criteria",
      "Validate that delivered software meets original business objectives and success criteria",
      "Serve as the primary liaison between business stakeholders and technical delivery teams",
    ],
    skills: [
      "Requirements documentation and management",
      "Process modeling (BPMN, flowcharts, swimlanes)",
      "Agile / Scrum methodology",
      "User story and acceptance criteria writing",
      "Stakeholder management and communication",
    ],
    tools: [
      "Confluence, Jira",
      "Lucidchart, Miro, draw.io",
      "Microsoft Visio",
      "Excel / Google Sheets",
      "Figma (for wireframing validation)",
    ],
    roadmap: [
      {
        phase: "Months 1–3",
        description:
          "Study business analysis fundamentals (BABOK). Learn user story writing, process mapping, and basic Agile ceremonies.",
      },
      {
        phase: "Months 4–6",
        description:
          "Get certified in Agile/Scrum (CSM or PMI-ACP). Practice eliciting requirements through informational interviews with domain experts.",
      },
      {
        phase: "Months 7–12",
        description:
          "Build a portfolio of documented requirements packages, process maps, and business cases for real or volunteer projects.",
      },
      {
        phase: "Year 2+",
        description:
          "Pursue CBAP certification. Specialize in a domain (finance, healthcare, logistics). Consider pivoting toward Product Management.",
      },
    ],
    growthPath:
      "Business Analyst → Senior BA → Lead BA / BA Manager → Product Manager → Senior PM → Director of Product. High demand in management consulting, banking, insurance, and enterprise technology.",
  },

  "UI/UX Designer": {
    icon: "🎨",
    summary:
      "Your empathy-driven thinking and user-first instincts define your professional DNA. You experience software as a human encounter, not a technical artifact, and you feel a genuine pull toward understanding why users struggle and how to systematically eliminate that friction. Your design thinking is rooted in observation, iteration, and a deep respect for the people who will ultimately use the products you create. This combination of intellectual empathy and design rigor is the foundation of exceptional product design.",
    strengths: [
      "Deep user empathy and perspective-taking",
      "Usability analysis and heuristic evaluation",
      "Interaction and information architecture design",
      "User research facilitation and synthesis",
      "Accessibility advocacy and inclusive design",
    ],
    areasToImprove: [
      "High-fidelity visual design craft and polish",
      "Advanced prototyping and animation",
      "Understanding technical constraints of implementation",
      "Design system architecture and component management",
    ],
    responsibilities: [
      "Plan and conduct user research, interviews, and moderated usability testing sessions",
      "Create wireframes, information architectures, user flows, and interactive prototypes",
      "Design and maintain consistent UI component libraries and design systems",
      "Collaborate closely with product managers and engineers on user-centered features",
      "Present design decisions grounded in user research and usability principles",
    ],
    skills: [
      "User research methods (interviews, surveys, usability tests)",
      "Information architecture and user flow design",
      "Interaction design and microinteraction patterns",
      "Figma and prototyping tool mastery",
      "Nielsen's usability heuristics and WCAG accessibility guidelines",
    ],
    tools: [
      "Figma (primary design tool)",
      "Maze, UserTesting, Lookback",
      "Miro, FigJam (collaboration)",
      "Notion (research documentation)",
      "Hotjar, FullStory, Mixpanel",
    ],
    roadmap: [
      {
        phase: "Months 1–3",
        description:
          "Learn the UX design process end-to-end: Empathize, Define, Ideate, Prototype, Test. Study Nielsen's heuristics and WCAG guidelines.",
      },
      {
        phase: "Months 4–6",
        description:
          "Master Figma deeply, including components, auto-layout, and prototyping. Build 3 UX case studies solving real user problems with documented research.",
      },
      {
        phase: "Months 7–12",
        description:
          "Conduct 5+ moderated usability tests. Contribute to or create a complete design system. Learn interaction animation with Figma or ProtoPie.",
      },
      {
        phase: "Year 2+",
        description:
          "Specialize in product design, UX research, or design systems engineering. Build a case-study-heavy portfolio targeting specific company types.",
      },
    ],
    growthPath:
      "Junior UX Designer → Product Designer → Senior Product Designer → Principal Designer / Design Lead → Head of Design → VP / Chief Design Officer.",
  },

  "Cybersecurity Specialist": {
    icon: "🛡️",
    summary:
      "Your naturally adversarial thinking, instinct for risk identification, and deep comfort with anomaly detection make you exceptionally well-suited for cybersecurity work. You do not simply trust systems — you interrogate them. You are energized by understanding exactly how things can fail, how sophisticated attackers think, and how to construct defenses that are technically rigorous without becoming operationally burdensome. This mindset — skeptical, methodical, adversarially aware — is the defining characteristic of great security practitioners.",
    strengths: [
      "Risk and threat modeling",
      "Adversarial thinking and attacker mindset",
      "Anomaly detection and pattern recognition",
      "Security-first evaluation of systems and processes",
      "Careful, methodical, evidence-based analysis",
    ],
    areasToImprove: [
      "Formal networking and operating systems depth",
      "Security automation scripting (Python, Bash)",
      "Regulatory and compliance frameworks (SOC2, GDPR, HIPAA)",
      "Communicating risk in business terms to non-technical executives",
    ],
    responsibilities: [
      "Conduct vulnerability assessments, penetration tests, and comprehensive security audits",
      "Monitor systems, endpoints, and networks for indicators of compromise or unusual activity",
      "Design and implement security policies, access control frameworks, and incident response procedures",
      "Educate teams on security hygiene, phishing awareness, and safe operational practices",
      "Research emerging threat intelligence and advise on proactive mitigation strategies",
    ],
    skills: [
      "Network and operating systems security fundamentals",
      "Penetration testing methodology and tooling",
      "Log analysis, SIEM configuration, and alert tuning",
      "Scripting for security automation (Python, Bash)",
      "Threat intelligence analysis and attribution",
    ],
    tools: [
      "Kali Linux, Metasploit Framework",
      "Wireshark, Nmap, Burp Suite",
      "Splunk, Elastic SIEM, Microsoft Sentinel",
      "CrowdStrike, SentinelOne (EDR)",
      "AWS / Azure Security Center",
    ],
    roadmap: [
      {
        phase: "Months 1–3",
        description:
          "Study networking fundamentals (TCP/IP, DNS, HTTP, TLS). Become fluent in Linux CLI. Set up a personal home lab environment.",
      },
      {
        phase: "Months 4–6",
        description:
          "Pursue CompTIA Security+ or Google Cybersecurity Certificate. Begin practicing CTF challenges on TryHackMe or HackTheBox.",
      },
      {
        phase: "Months 7–12",
        description:
          "Study OWASP Top 10 web vulnerabilities. Learn Wireshark for traffic analysis and Splunk for log analysis. Practice basic penetration testing.",
      },
      {
        phase: "Year 2+",
        description:
          "Specialize in red team, blue team, cloud security, or GRC. Pursue CEH, OSCP, or CISSP certifications depending on chosen specialization.",
      },
    ],
    growthPath:
      "Security Analyst → Security Engineer → Senior Security Engineer → Security Architect → Director of Security → CISO. Extremely high demand globally with compensation well above industry averages.",
  },

  "AI/Data Specialist": {
    icon: "🤖",
    summary:
      "Your comfort with probabilistic systems, enthusiasm for rigorous experimentation, and analytical depth reveal a strong natural fit for AI and machine learning work. You are drawn to systems that learn and adapt from data, find feature engineering and model evaluation genuinely creative processes, and are energized by the frontier-like nature of AI research and applied development. Your ability to operate productively in ambiguous problem spaces — where even the success metric is uncertain — is a rare and critical capability in AI work.",
    strengths: [
      "Experimental thinking and rigorous iteration",
      "Statistical and probabilistic reasoning",
      "AI system design and evaluation",
      "Automation-first problem framing",
      "Research-oriented intellectual curiosity",
    ],
    areasToImprove: [
      "Software engineering best practices for ML in production environments",
      "Communicating model limitations clearly to business stakeholders",
      "Ethics, fairness, and bias mitigation in AI systems",
      "Large-scale data infrastructure and distributed computing",
    ],
    responsibilities: [
      "Design, train, evaluate, and iterate on machine learning models for production use",
      "Build and maintain data pipelines for model training, evaluation, and inference",
      "Conduct rigorous experiments and performance evaluation across multiple model configurations",
      "Collaborate with domain experts to frame business problems as well-defined ML tasks",
      "Monitor deployed model performance in production and detect and respond to model drift",
    ],
    skills: [
      "Python (scikit-learn, PyTorch, TensorFlow, Hugging Face)",
      "Machine learning fundamentals (supervised, unsupervised, reinforcement)",
      "Statistical modeling and experiment design",
      "Data pipeline engineering (ETL, feature stores)",
      "MLOps and model deployment practices",
    ],
    tools: [
      "Python, Jupyter Notebooks",
      "PyTorch, TensorFlow, Hugging Face Transformers",
      "MLflow, Weights & Biases (experiment tracking)",
      "Apache Spark, dbt (data pipelines)",
      "AWS SageMaker / GCP Vertex AI / Azure ML",
    ],
    roadmap: [
      {
        phase: "Months 1–3",
        description:
          "Master Python, linear algebra, and statistics fundamentals. Complete Andrew Ng's Machine Learning course on Coursera in full.",
      },
      {
        phase: "Months 4–6",
        description:
          "Build end-to-end ML projects: classification, regression, NLP text classification. Learn scikit-learn and pandas at an advanced level.",
      },
      {
        phase: "Months 7–12",
        description:
          "Study deep learning with PyTorch or TensorFlow. Participate in 2–3 Kaggle competitions. Learn MLflow for experiment tracking.",
      },
      {
        phase: "Year 2+",
        description:
          "Specialize in NLP / LLMs, computer vision, or MLOps engineering. Pursue research roles or applied ML engineering at product companies.",
      },
    ],
    growthPath:
      "ML Engineer → Senior ML Engineer → Staff ML Engineer → ML Architect → Head of AI / Principal Research Scientist. One of the highest-compensation career tracks in the technology industry.",
  },

  "Prompt Engineer": {
    icon: "💬",
    summary:
      "Your profile reveals a distinctive and highly contemporary combination: you are both analytically precise and creatively intuitive, and you are genuinely fascinated by the way language shapes machine behavior. You approach AI systems as engineering artifacts to be optimized through systematic experimentation, not merely as tools to be used. You find prompt design to be a technical discipline worthy of rigor, iteration, and benchmarking — and you are energized by the challenge of extracting reliable, structured intelligence from inherently probabilistic systems.",
    strengths: [
      "Linguistic precision and creative expression",
      "Systematic experimentation and iteration",
      "Critical evaluation of AI outputs",
      "Instruction design and framework architecture",
      "Analytical curiosity about AI system behavior",
    ],
    areasToImprove: [
      "Formal ML and NLP theoretical background",
      "Software engineering skills for AI API integration",
      "Evaluation methodology, benchmarking, and metric design",
      "Keeping pace with the rapidly evolving capabilities of AI systems",
    ],
    responsibilities: [
      "Design, test, and systematically optimize prompts for LLM-powered production applications",
      "Build reusable prompt libraries and evaluation frameworks for quality assurance",
      "Diagnose and improve AI output quality through structured iteration and experimentation",
      "Collaborate with product, engineering, and content teams on AI feature design and validation",
      "Research emerging prompting techniques and benchmark their effectiveness against baselines",
    ],
    skills: [
      "Advanced prompting patterns (chain-of-thought, few-shot, RAG, ReAct)",
      "Prompt evaluation and automated benchmarking methodology",
      "Python basics for AI API integration and automation",
      "Technical writing and instructional design",
      "Understanding of LLM architecture, context windows, and behavioral limitations",
    ],
    tools: [
      "OpenAI API, Anthropic API, Google Gemini API",
      "LangChain, LlamaIndex (orchestration frameworks)",
      "PromptFlow, Guidance, DSPY",
      "Python (primary integration language)",
      "Notion / Confluence (prompt library documentation)",
    ],
    roadmap: [
      {
        phase: "Months 1–3",
        description:
          "Study LLM fundamentals and core prompting techniques. Experiment extensively with 3+ major AI APIs. Build a personal prompt experiment log.",
      },
      {
        phase: "Months 4–6",
        description:
          "Build a prompt library for a real-world use case. Learn Python API integration. Study chain-of-thought, few-shot, and RAG architectures.",
      },
      {
        phase: "Months 7–12",
        description:
          "Build an automated evaluation framework for prompt quality. Contribute to AI product development at a company or via open source.",
      },
      {
        phase: "Year 2+",
        description:
          "Deepen into agentic AI, fine-tuning, and retrieval-augmented generation. Move toward AI Product Management or ML Engineering specialization.",
      },
    ],
    growthPath:
      "Prompt Engineer → AI Product Specialist → AI Product Manager → Head of AI Product or transition to ML Engineering / LLM Research. A rapidly emerging field with significant career optionality.",
  },

  "Web Designer": {
    icon: "🌐",
    summary:
      "Your visual sensibility, aesthetic attentiveness, and brand-oriented intuition mark you as a natural web designer. You care deeply about how things look and feel, and you hold the genuine conviction that visual craft is a form of communication that carries real meaning. You are energized by creative direction, meticulous visual execution, and the challenge of making complexity look effortless. You see digital design not as decoration layered on top of functionality, but as a primary channel for brand expression and audience connection.",
    strengths: [
      "Visual hierarchy and spatial composition",
      "Typography systems and color theory",
      "Brand identity and aesthetic intuition",
      "Creative direction and visual concept development",
      "Visual consistency across platforms and touchpoints",
    ],
    areasToImprove: [
      "User research and empirical usability validation",
      "Responsive and accessible design implementation",
      "CSS and HTML technical depth for closer developer collaboration",
      "Bridging aesthetic decisions with measurable UX outcomes",
    ],
    responsibilities: [
      "Create visually compelling website layouts, landing pages, and digital marketing assets",
      "Define and maintain visual design systems, brand guidelines, and component libraries",
      "Collaborate with developers to ensure pixel-accurate implementation of designs",
      "Design fully responsive layouts optimized for all device sizes and contexts",
      "Translate brand strategy and narrative into a cohesive, differentiated visual direction",
    ],
    skills: [
      "Visual design principles (hierarchy, contrast, alignment, proximity, repetition)",
      "Typography systems, type pairing, and variable fonts",
      "Color theory, palette construction, and brand color systems",
      "Responsive and adaptive layout design",
      "Basic HTML and CSS for design implementation and developer handoff",
    ],
    tools: [
      "Figma (primary design and handoff tool)",
      "Adobe Photoshop, Illustrator, InDesign",
      "Webflow (visual web development)",
      "Framer (interactive design and prototyping)",
      "Coolors, Google Fonts, Adobe Fonts",
    ],
    roadmap: [
      {
        phase: "Months 1–3",
        description:
          "Study graphic design fundamentals: typography, color theory, composition, and visual hierarchy. Practice daily by redesigning existing websites.",
      },
      {
        phase: "Months 4–6",
        description:
          "Master Figma comprehensively. Redesign 3 real websites with full design rationale documentation. Begin learning HTML/CSS basics.",
      },
      {
        phase: "Months 7–12",
        description:
          "Learn Webflow or Framer for no-code web development. Study responsive design and grid systems. Build a polished client-ready portfolio.",
      },
      {
        phase: "Year 2+",
        description:
          "Specialize in SaaS product design, landing page optimization, or brand identity systems. Build a client portfolio and consider freelance work.",
      },
    ],
    growthPath:
      "Web Designer → Senior Web Designer → Art Director → Creative Director → Chief Creative Officer. Also a strong foundation for a UI/UX or product design career pivot.",
  },

  Animator: {
    icon: "🎬",
    summary:
      "Your assessment responses reveal a creative consciousness that thinks natively in time, motion, and narrative. You are patient with long, iterative creative processes, energized by the intersection of artistic vision and demanding technical execution, and find the challenge of giving life and genuine emotion to inanimate visuals deeply compelling. You see motion not as decoration, but as a language with its own grammar — one that can communicate feelings and ideas that static images simply cannot.",
    strengths: [
      "Visual narrative and sequential storytelling",
      "Motion timing, easing, and rhythmic intuition",
      "Patience with iterative creative refinement",
      "Artistic vision and expressive range",
      "Understanding of animation physics and motion feel",
    ],
    areasToImprove: [
      "3D software technical depth (rigging, rendering pipelines)",
      "Client communication and constructive feedback management",
      "Production pipeline optimization and render time management",
      "Adapting quickly to different animation styles on client demand",
    ],
    responsibilities: [
      "Create 2D and 3D animations for digital products, films, broadcast, games, or marketing",
      "Develop motion guidelines and animation style guides for product design systems",
      "Collaborate with creative directors, visual designers, and sound designers",
      "Storyboard and produce animatics before committing to full production",
      "Iterate on animation quality based on director and client creative feedback",
    ],
    skills: [
      "12 principles of animation (squash & stretch, anticipation, follow-through, etc.)",
      "Keyframe animation, graph editor, and motion curve manipulation",
      "Storyboarding and pre-production planning",
      "Motion design for UI, marketing, and explainer content",
      "Audio synchronization and sound design basics",
    ],
    tools: [
      "Adobe After Effects (motion graphics and compositing)",
      "Blender, Cinema 4D, Maya (3D animation)",
      "Adobe Premiere Pro, DaVinci Resolve",
      "Frame.io (review and collaboration)",
      "Lottie / Rive (UI animation for web and mobile)",
    ],
    roadmap: [
      {
        phase: "Months 1–3",
        description:
          "Study and practice all 12 principles of animation with simple exercises. Begin with After Effects motion graphics or Blender 3D fundamentals.",
      },
      {
        phase: "Months 4–6",
        description:
          "Complete 3 full animation projects with integrated audio. Learn the client review and revision workflow. Begin building your showreel.",
      },
      {
        phase: "Months 7–12",
        description:
          "Specialize in 2D, 3D, or motion graphics. Master your primary software at an advanced level. Publish your showreel publicly.",
      },
      {
        phase: "Year 2+",
        description:
          "Build domain expertise in games, film VFX, broadcast, or UI animation. Join a studio, agency, or establish a freelance client base.",
      },
    ],
    growthPath:
      "Junior Animator → Animator → Senior Animator → Animation Director → Creative Director. Specialty tracks include VFX Artist, Technical Animator, and Motion Design Director.",
  },

  "Project Manager": {
    icon: "📌",
    summary:
      "Your responses consistently reveal a coordination-first mindset: you are genuinely energized by bringing structure to complexity, keeping people aligned, and translating organizational ambitions into executable, trackable plans. You think naturally in dependencies and timelines, communicate fluidly across all levels of an organization, and find the role of orchestrator — the person who makes everyone else's work possible — more fulfilling than individual technical contribution. This is the rare and valuable disposition at the heart of effective project leadership.",
    strengths: [
      "Strategic planning and project coordination",
      "Stakeholder management and expectation-setting",
      "Risk identification and proactive mitigation",
      "Decision-making under ambiguity and time pressure",
      "Team facilitation, alignment, and morale maintenance",
    ],
    areasToImprove: [
      "Technical depth in the domain being managed",
      "Data-driven forecasting and project analytics",
      "Formal conflict resolution frameworks",
      "Managing distributed, cross-cultural, or remote teams effectively",
    ],
    responsibilities: [
      "Own end-to-end project delivery from initiation and scoping through execution and closure",
      "Define project scope, milestones, resource requirements, risk registers, and success criteria",
      "Coordinate cross-functional teams and proactively manage stakeholder expectations",
      "Run sprint ceremonies, retrospectives, status reporting, and escalation management",
      "Identify and resolve blockers and risks before they impact delivery timelines or quality",
    ],
    skills: [
      "Project planning, scheduling, and critical path analysis",
      "Agile (Scrum, Kanban) and waterfall / hybrid methodologies",
      "Risk management and contingency planning",
      "Executive stakeholder communication and status reporting",
      "Budget tracking and resource allocation",
    ],
    tools: [
      "Jira, Asana, Monday.com, Linear",
      "Confluence (documentation and knowledge management)",
      "Microsoft Project, Smartsheet",
      "Slack, Zoom (team communication)",
      "Google Workspace / Microsoft 365",
    ],
    roadmap: [
      {
        phase: "Months 1–3",
        description:
          "Study Agile (Scrum, Kanban) and traditional waterfall fundamentals. Get comfortable with Jira and project planning tools through hands-on practice.",
      },
      {
        phase: "Months 4–6",
        description:
          "Pursue PMP, PMI-ACP, or Certified ScrumMaster (CSM) certification. Practice managing a real volunteer project from planning to delivery.",
      },
      {
        phase: "Months 7–12",
        description:
          "Lead a cross-functional project with real stakeholders. Document the full lifecycle as a portfolio case study. Focus on stakeholder communication.",
      },
      {
        phase: "Year 2+",
        description:
          "Specialize in a domain (tech, healthcare, construction, consulting). Progress toward Senior PM, Program Manager, or Portfolio Director roles.",
      },
    ],
    growthPath:
      "Project Manager → Senior PM → Program Manager → Portfolio Manager → VP of Delivery → COO track. Exceptionally broad applicability across every industry and company size.",
  },
};
