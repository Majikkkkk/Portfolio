function readStorageJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || fallback);
  } catch {
    return JSON.parse(fallback);
  }
}

const gameState = {
  score: Number(localStorage.getItem("projectMScore") || 0),
  threat: "Low",
  mission: 0,
  progress: readStorageJson("projectMProgress", "[0,0,0]"),
  missionScores: readStorageJson("projectMMissionScores", "[0,0,0]"),
  logs: readStorageJson("projectMLogs", "[]")
};

const QUESTION_COUNT = 200;
const MISSION_PASSING_SCORE = 175;
const TOTAL_PASSING_SCORE = 525;

function makeQuestionBank(prefix, subjects, situations) {
  const questions = [];

  subjects.forEach((subject) => {
    situations.forEach((situation) => {
      const questionIndex = questions.length;

      questions.push({
        number: questionIndex + 1,
        prompt: `${prefix}-${code(questionIndex)}: ${subject} ${situation.prompt}`,
        choices: rotateChoices(situation.choices, questionIndex)
      });
    });
  });

  return questions.slice(0, QUESTION_COUNT);
}

function rotateChoices(choices, questionIndex) {
  const offset = questionIndex % choices.length;
  return [...choices.slice(offset), ...choices.slice(0, offset)];
}

function code(index) {
  return String(index + 1).padStart(3, "0");
}

const phishingSubjects = [
  "Payroll inbox",
  "HR portal notice",
  "Finance approval email",
  "Cloud storage alert",
  "School account message",
  "Company VPN warning",
  "Shipping update",
  "Bank verification email",
  "IT helpdesk ticket",
  "Social media security alert"
];

const phishingSituations = [
  {
    prompt: "asks you to sign in through a shortened link before noon.",
    choices: [
      { text: "Report it and use the official site only", correct: true },
      { text: "Click the shortened link", correct: false },
      { text: "Reply with your login details", correct: false }
    ]
  },
  {
    prompt: "comes from a look-alike domain with one missing letter.",
    choices: [
      { text: "Treat the sender domain as suspicious", correct: true },
      { text: "Trust it because the logo looks correct", correct: false },
      { text: "Forward it to classmates for checking", correct: false }
    ]
  },
  {
    prompt: "contains an unexpected ZIP attachment from an unknown sender.",
    choices: [
      { text: "Scan and report it before opening", correct: true },
      { text: "Extract the ZIP immediately", correct: false },
      { text: "Disable antivirus to open it faster", correct: false }
    ]
  },
  {
    prompt: "claims your account will be deleted unless you verify your password.",
    choices: [
      { text: "Verify through the official support channel", correct: true },
      { text: "Send your current password", correct: false },
      { text: "Click the first button in the email", correct: false }
    ]
  },
  {
    prompt: "uses urgent language and asks for gift card codes.",
    choices: [
      { text: "Flag it as a social engineering attempt", correct: true },
      { text: "Buy the cards to avoid trouble", correct: false },
      { text: "Send the codes then ask later", correct: false }
    ]
  },
  {
    prompt: "has a link preview that does not match the displayed URL.",
    choices: [
      { text: "Do not click; report the mismatch", correct: true },
      { text: "Click because the visible text looks safe", correct: false },
      { text: "Copy the link into a team chat", correct: false }
    ]
  },
  {
    prompt: "requests a one-time passcode over email.",
    choices: [
      { text: "Never share the one-time passcode", correct: true },
      { text: "Share it if the email says urgent", correct: false },
      { text: "Send half of the code first", correct: false }
    ]
  },
  {
    prompt: "has grammar errors and a suspicious invoice number.",
    choices: [
      { text: "Confirm with the vendor using known contact info", correct: true },
      { text: "Pay the invoice immediately", correct: false },
      { text: "Open all links to investigate", correct: false }
    ]
  },
  {
    prompt: "says you won a prize you never joined.",
    choices: [
      { text: "Ignore/report the message", correct: true },
      { text: "Enter personal data to claim it", correct: false },
      { text: "Pay a small release fee", correct: false }
    ]
  },
  {
    prompt: "asks you to enable macros in a document.",
    choices: [
      { text: "Keep macros disabled and report it", correct: true },
      { text: "Enable macros to view content", correct: false },
      { text: "Send the file to a friend", correct: false }
    ]
  },
  {
    prompt: "uses a fake login page that is not HTTPS.",
    choices: [
      { text: "Close it and navigate manually to the real site", correct: true },
      { text: "Log in because the page looks familiar", correct: false },
      { text: "Reuse an old password there", correct: false }
    ]
  },
  {
    prompt: "pretends to be your manager but asks for unusual payment approval.",
    choices: [
      { text: "Verify by phone or official chat first", correct: true },
      { text: "Approve to avoid delay", correct: false },
      { text: "Send bank details in reply", correct: false }
    ]
  },
  {
    prompt: "contains a QR code for account verification.",
    choices: [
      { text: "Verify the request before scanning", correct: true },
      { text: "Scan it with your main phone immediately", correct: false },
      { text: "Post the QR code publicly", correct: false }
    ]
  },
  {
    prompt: "asks you to install a browser extension to continue.",
    choices: [
      { text: "Do not install unverified extensions", correct: true },
      { text: "Install it from the email link", correct: false },
      { text: "Grant all permissions", correct: false }
    ]
  },
  {
    prompt: "offers a security update from a random download site.",
    choices: [
      { text: "Update only from the official vendor", correct: true },
      { text: "Run the downloaded installer", correct: false },
      { text: "Turn off warnings to install it", correct: false }
    ]
  },
  {
    prompt: "asks for personal data to unlock a fake delivery.",
    choices: [
      { text: "Check delivery status from the courier app/site", correct: true },
      { text: "Enter your ID number in the email form", correct: false },
      { text: "Pay the random customs fee", correct: false }
    ]
  },
  {
    prompt: "uses a sender name you know but the email address is unrelated.",
    choices: [
      { text: "Trust the address, not just the display name", correct: true },
      { text: "Trust the display name only", correct: false },
      { text: "Download attachments without checking", correct: false }
    ]
  },
  {
    prompt: "threatens punishment if you do not act in five minutes.",
    choices: [
      { text: "Slow down and verify the claim", correct: true },
      { text: "Rush to follow all instructions", correct: false },
      { text: "Share your recovery codes", correct: false }
    ]
  },
  {
    prompt: "requests confidential files through a personal email address.",
    choices: [
      { text: "Refuse and use approved sharing channels", correct: true },
      { text: "Send the files as attachments", correct: false },
      { text: "Upload them to a public folder", correct: false }
    ]
  },
  {
    prompt: "asks you to reset MFA using a link from an unknown domain.",
    choices: [
      { text: "Contact IT through the official helpdesk", correct: true },
      { text: "Reset MFA from the unknown link", correct: false },
      { text: "Disable MFA completely", correct: false }
    ]
  }
];

const passwordSubjects = [
  "Admin account",
  "Student portal",
  "Email mailbox",
  "Payroll profile",
  "VPN login",
  "Database user",
  "Cloud drive",
  "Source control",
  "Helpdesk agent",
  "Wi-Fi console"
];

const passwordSituations = [
  {
    prompt: "needs a password that avoids names and birthdays.",
    choices: [
      { text: "Marjinel2004", correct: false },
      { text: "River!Vault#72", correct: true },
      { text: "birthday123", correct: false }
    ]
  },
  {
    prompt: "was found in a breach database.",
    choices: [
      { text: "Create a unique password and enable MFA", correct: true },
      { text: "Reuse it with one extra digit", correct: false },
      { text: "Share it with teammates", correct: false }
    ]
  },
  {
    prompt: "requires safe storage after recovery.",
    choices: [
      { text: "Save it in a password manager", correct: true },
      { text: "Write it on the monitor", correct: false },
      { text: "Keep it in passwords.txt", correct: false }
    ]
  },
  {
    prompt: "needs a strong passphrase.",
    choices: [
      { text: "Blue-Lantern!Market-51", correct: true },
      { text: "qwerty2026", correct: false },
      { text: "letmein", correct: false }
    ]
  },
  {
    prompt: "has password recovery questions enabled.",
    choices: [
      { text: "Use answers that are not public facts", correct: true },
      { text: "Use your real birthday", correct: false },
      { text: "Use your school name only", correct: false }
    ]
  },
  {
    prompt: "requires a temporary password for a user.",
    choices: [
      { text: "Force password change at next login", correct: true },
      { text: "Let the temporary password stay forever", correct: false },
      { text: "Send it to a public group chat", correct: false }
    ]
  },
  {
    prompt: "has many failed login attempts.",
    choices: [
      { text: "Lock the account and review activity", correct: true },
      { text: "Remove the password requirement", correct: false },
      { text: "Ignore the failed attempts", correct: false }
    ]
  },
  {
    prompt: "must follow least privilege.",
    choices: [
      { text: "Give only the needed access level", correct: true },
      { text: "Make every user an admin", correct: false },
      { text: "Share one admin password", correct: false }
    ]
  },
  {
    prompt: "needs protection against password spraying.",
    choices: [
      { text: "Use MFA and rate limiting", correct: true },
      { text: "Allow unlimited attempts", correct: false },
      { text: "Publish usernames online", correct: false }
    ]
  },
  {
    prompt: "uses a default vendor password.",
    choices: [
      { text: "Change the default password immediately", correct: true },
      { text: "Keep it because it is easy", correct: false },
      { text: "Email it to everyone", correct: false }
    ]
  },
  {
    prompt: "needs a password reset link.",
    choices: [
      { text: "Send a time-limited reset link", correct: true },
      { text: "Send the old password back", correct: false },
      { text: "Disable verification", correct: false }
    ]
  },
  {
    prompt: "has an employee leaving the company.",
    choices: [
      { text: "Revoke access and rotate shared secrets", correct: true },
      { text: "Keep access open for convenience", correct: false },
      { text: "Reuse the account for another person", correct: false }
    ]
  },
  {
    prompt: "uses the same password across services.",
    choices: [
      { text: "Replace each one with a unique password", correct: true },
      { text: "Keep reuse to remember it easily", correct: false },
      { text: "Use the same password for admin too", correct: false }
    ]
  },
  {
    prompt: "requires authentication for remote access.",
    choices: [
      { text: "Use MFA plus a strong password", correct: true },
      { text: "Use password only: 123456", correct: false },
      { text: "Allow anonymous login", correct: false }
    ]
  },
  {
    prompt: "needs a password rotation after suspected compromise.",
    choices: [
      { text: "Rotate credentials and review logs", correct: true },
      { text: "Wait until next year", correct: false },
      { text: "Only change the username", correct: false }
    ]
  },
  {
    prompt: "has a password shared between two users.",
    choices: [
      { text: "Create separate accounts and passwords", correct: true },
      { text: "Keep sharing to save time", correct: false },
      { text: "Post it in a spreadsheet", correct: false }
    ]
  },
  {
    prompt: "is being recovered after a phishing incident.",
    choices: [
      { text: "Reset password, revoke sessions, enable MFA", correct: true },
      { text: "Only close the browser tab", correct: false },
      { text: "Ask the attacker to stop", correct: false }
    ]
  },
  {
    prompt: "needs a password policy.",
    choices: [
      { text: "Require length, uniqueness, and MFA", correct: true },
      { text: "Require everyone to use Password1", correct: false },
      { text: "Ban password managers", correct: false }
    ]
  },
  {
    prompt: "has recovery codes generated.",
    choices: [
      { text: "Store recovery codes securely", correct: true },
      { text: "Screenshot and post them", correct: false },
      { text: "Email them to strangers", correct: false }
    ]
  },
  {
    prompt: "needs a secure handoff to the account owner.",
    choices: [
      { text: "Use a verified secure channel", correct: true },
      { text: "Send credentials in public comments", correct: false },
      { text: "Leave credentials on a desk", correct: false }
    ]
  }
];

const firewallSubjects = [
  "Web server",
  "Admin panel",
  "Database host",
  "VPN gateway",
  "File server",
  "Student portal",
  "Email server",
  "Payment API",
  "Cloud instance",
  "Office workstation"
];

const firewallSituations = [
  {
    prompt: "shows repeated failed logins from one unknown IP.",
    choices: [
      { text: "Block the IP and review logs", correct: true },
      { text: "Disable all monitoring", correct: false },
      { text: "Ignore it until next week", correct: false }
    ]
  },
  {
    prompt: "receives traffic from a country your company does not serve.",
    choices: [
      { text: "Restrict the source and investigate", correct: true },
      { text: "Open all ports globally", correct: false },
      { text: "Publish admin credentials", correct: false }
    ]
  },
  {
    prompt: "is sending unusual outbound traffic at midnight.",
    choices: [
      { text: "Isolate the host and check for compromise", correct: true },
      { text: "Turn off logs", correct: false },
      { text: "Give the host more permissions", correct: false }
    ]
  },
  {
    prompt: "needs remote admin access.",
    choices: [
      { text: "Allow approved IPs with MFA only", correct: true },
      { text: "Allow the whole internet", correct: false },
      { text: "Disable authentication", correct: false }
    ]
  },
  {
    prompt: "detects a port scan across many services.",
    choices: [
      { text: "Rate limit, block, and monitor", correct: true },
      { text: "Open every scanned port", correct: false },
      { text: "Delete firewall rules", correct: false }
    ]
  },
  {
    prompt: "has an unused service exposed publicly.",
    choices: [
      { text: "Close the unused port", correct: true },
      { text: "Leave it open for fun", correct: false },
      { text: "Advertise the port number", correct: false }
    ]
  },
  {
    prompt: "needs access between two internal systems.",
    choices: [
      { text: "Allow only the required source, destination, and port", correct: true },
      { text: "Allow all internal traffic forever", correct: false },
      { text: "Use no rule review", correct: false }
    ]
  },
  {
    prompt: "receives a spike of requests that looks like DDoS.",
    choices: [
      { text: "Enable rate limits and upstream protection", correct: true },
      { text: "Restart randomly without checking", correct: false },
      { text: "Disable firewall filtering", correct: false }
    ]
  },
  {
    prompt: "has logs showing blocked malware callbacks.",
    choices: [
      { text: "Investigate the affected endpoint", correct: true },
      { text: "Whitelist the callback domain", correct: false },
      { text: "Erase the logs immediately", correct: false }
    ]
  },
  {
    prompt: "requires a new allow rule requested by a user.",
    choices: [
      { text: "Validate business need before approving", correct: true },
      { text: "Approve all requests automatically", correct: false },
      { text: "Allow any source IP", correct: false }
    ]
  },
  {
    prompt: "has an expired temporary firewall exception.",
    choices: [
      { text: "Remove or revalidate the exception", correct: true },
      { text: "Make it permanent without review", correct: false },
      { text: "Duplicate it for all servers", correct: false }
    ]
  },
  {
    prompt: "must protect SSH access.",
    choices: [
      { text: "Limit SSH to admin IPs and keys", correct: true },
      { text: "Allow password SSH from everywhere", correct: false },
      { text: "Use root login for everyone", correct: false }
    ]
  },
  {
    prompt: "must protect a database port.",
    choices: [
      { text: "Expose it only to the application server", correct: true },
      { text: "Expose it to the public internet", correct: false },
      { text: "Remove database authentication", correct: false }
    ]
  },
  {
    prompt: "shows repeated denied access from one workstation.",
    choices: [
      { text: "Check the workstation for malware", correct: true },
      { text: "Whitelist it without checking", correct: false },
      { text: "Disable endpoint security", correct: false }
    ]
  },
  {
    prompt: "has rules that nobody owns anymore.",
    choices: [
      { text: "Review and remove unnecessary rules", correct: true },
      { text: "Keep every old rule forever", correct: false },
      { text: "Copy them to production blindly", correct: false }
    ]
  },
  {
    prompt: "needs a rule for a vendor integration.",
    choices: [
      { text: "Allow only the vendor's documented IP range", correct: true },
      { text: "Allow all vendor traffic from anywhere", correct: false },
      { text: "Give the vendor admin login", correct: false }
    ]
  },
  {
    prompt: "detects traffic to a known malicious domain.",
    choices: [
      { text: "Block the domain and investigate the source", correct: true },
      { text: "Allow it because it is already active", correct: false },
      { text: "Turn off DNS filtering", correct: false }
    ]
  },
  {
    prompt: "needs segmentation between student and admin networks.",
    choices: [
      { text: "Separate networks and allow only required traffic", correct: true },
      { text: "Bridge both networks completely", correct: false },
      { text: "Share admin network passwords", correct: false }
    ]
  },
  {
    prompt: "is receiving suspicious uploads to a public app.",
    choices: [
      { text: "Restrict uploads and inspect logs", correct: true },
      { text: "Allow every file type", correct: false },
      { text: "Disable file scanning", correct: false }
    ]
  },
  {
    prompt: "must be hardened after an incident.",
    choices: [
      { text: "Apply least privilege rules and monitor", correct: true },
      { text: "Restore all old open rules", correct: false },
      { text: "Stop reviewing alerts", correct: false }
    ]
  }
];

const missions = [
  {
    title: "Phishing Detection",
    threat: "Medium",
    questions: makeQuestionBank("PHISH", phishingSubjects, phishingSituations)
  },
  {
    title: "Password Recovery",
    threat: "Medium",
    questions: makeQuestionBank("PASS", passwordSubjects, passwordSituations)
  },
  {
    title: "Firewall Maze",
    threat: "High",
    questions: makeQuestionBank("WALL", firewallSubjects, firewallSituations)
  }
];

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => Array.from(document.querySelectorAll(selector));

gameState.progress = missions.map((mission, index) => {
  const savedProgress = Number(gameState.progress[index]) || 0;
  return Math.min(Math.max(savedProgress, 0), mission.questions.length);
});

gameState.missionScores = missions.map((mission, index) => {
  const savedScore = Number(gameState.missionScores[index]) || 0;
  return Math.min(Math.max(savedScore, 0), mission.questions.length);
});
gameState.score = gameState.missionScores.reduce((total, score) => total + score, 0);

function saveState() {
  localStorage.setItem("projectMScore", String(gameState.score));
  localStorage.setItem("projectMProgress", JSON.stringify(gameState.progress));
  localStorage.setItem("projectMMissionScores", JSON.stringify(gameState.missionScores));
  localStorage.setItem("projectMLogs", JSON.stringify(gameState.logs));
}

function updateNav() {
  const stats = qsa(".nav-stat span:last-child");
  if (stats[0]) stats[0].textContent = gameState.threat;
}

function showToast(message, type = "info") {
  let container = qs(".toast-container");

  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === "success" ? "✓" : type === "error" ? "!" : "i"}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-out");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  }, 2200);
}

function openModal(content) {
  closeModal();

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal">
      ${content}
    </div>
  `;

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeModal();
  });

  document.body.appendChild(overlay);
}

function closeModal() {
  qs(".modal-overlay")?.remove();
}

function startGame() {
  gameState.score = 0;
  gameState.threat = "Low";
  gameState.mission = 0;
  gameState.progress = missions.map(() => 0);
  gameState.missionScores = missions.map(() => 0);
  gameState.logs = [];
  localStorage.removeItem("projectMOrders");
  saveState();
  updateNav();
  showMission(0);
}

function continueGame() {
  if (!gameState.logs.length && gameState.score === 0 && gameState.progress.every((count) => count === 0)) {
    showToast("No saved mission yet. Starting a new game.", "info");
    startGame();
    return;
  }

  const nextMission = missions.findIndex((mission, index) => gameState.progress[index] < mission.questions.length);
  showMission(nextMission === -1 ? missions.length : nextMission);
}

function showMission(index) {
  const mission = missions[index];

  if (!mission) {
    showCompletion();
    return;
  }

  gameState.mission = index;
  gameState.threat = mission.threat;
  gameState.progress[index] ||= 0;
  updateNav();

  const questionIndex = gameState.progress[index];
  if (questionIndex >= mission.questions.length) {
    showMission(index + 1);
    return;
  }

  const question = mission.questions[questionIndex];

  openModal(`
    <div class="section-label">MISSION ${String(index + 1).padStart(2, "0")} • QUESTION ${questionIndex + 1}/${mission.questions.length}</div>
    <h2 class="section-title">${mission.title}</h2>
    <div class="progress-bar" style="margin-bottom: 1.5rem;">
      <div class="progress-fill" style="width: ${(questionIndex / mission.questions.length) * 100}%;"></div>
    </div>
    <p class="section-subtitle" style="margin-bottom: 1.5rem;">${question.prompt}</p>
    <div class="flex-col gap-3">
      ${question.choices.map((choice, choiceIndex) => `
        <button class="btn btn-secondary w-full mission-choice" data-choice="${choiceIndex}">
          ${choice.text}
        </button>
      `).join("")}
    </div>
    <div class="clue-card" style="margin-top: 1.25rem;">
      Mission Score: ${gameState.missionScores[index]}/200 • Passing Score: ${MISSION_PASSING_SCORE}/200
    </div>
    <button class="btn btn-secondary btn-sm" style="margin-top: 1.25rem;" data-close-modal>
      Back
    </button>
  `);

  qsa(".mission-choice").forEach((button) => {
    button.addEventListener("click", () => answerMission(index, Number(button.dataset.choice)));
  });

  qs("[data-close-modal]")?.addEventListener("click", closeModal);
}

function answerMission(missionIndex, choiceIndex) {
  const mission = missions[missionIndex];
  const questionIndex = gameState.progress[missionIndex];
  const question = mission.questions[questionIndex];
  const choice = question.choices[choiceIndex];

  if (choice.correct) {
    gameState.missionScores[missionIndex] += 1;
  } else {
    gameState.threat = "High";
  }

  gameState.score = gameState.missionScores.reduce((total, score) => total + score, 0);
  gameState.progress[missionIndex] += 1;

  const missionDone = gameState.progress[missionIndex] >= mission.questions.length;
  if (missionDone) {
    const missionPassed = gameState.missionScores[missionIndex] >= MISSION_PASSING_SCORE;
    gameState.logs.push(
      `Mission ${missionIndex + 1}: ${mission.title} ${missionPassed ? "passed" : "not passed"} (${gameState.missionScores[missionIndex]}/200)`
    );
    gameState.threat = missionIndex === missions.length - 1 ? "Low" : missions[missionIndex + 1].threat;
    gameState.mission = missionIndex + 1;
  }

  saveState();
  updateNav();
  showToast(
    missionDone
      ? "Mission complete."
      : choice.correct
        ? "Correct. Next question unlocked."
        : "Wrong move. Next question loaded.",
    choice.correct ? "success" : "error"
  );
  showMission(missionDone ? missionIndex + 1 : missionIndex);
}

function showCompletion() {
  gameState.threat = "Low";
  saveState();
  updateNav();

  const missionResults = missions.map((mission, index) => {
    const score = gameState.missionScores[index] || 0;
    const passed = score >= MISSION_PASSING_SCORE;
    return `<li class="clue-card">${mission.title}: ${score}/200 • ${passed ? "Passed" : "Needs Retake"}</li>`;
  }).join("");
  const allMissionsPassed = gameState.missionScores.every((score) => score >= MISSION_PASSING_SCORE);
  const overallPassed = allMissionsPassed && gameState.score >= TOTAL_PASSING_SCORE;

  openModal(`
    <div class="section-label">Simulation Complete</div>
    <h2 class="section-title">${overallPassed ? "Congratulations, You Saved the Company" : "Company Still at Risk"}</h2>
    <div class="final-score-display">${gameState.score}/600</div>
    <p class="section-subtitle" style="margin-top: 1rem;">
      Overall passing score: ${TOTAL_PASSING_SCORE}/600. Each mission must reach ${MISSION_PASSING_SCORE}/200.
    </p>
    <ul class="flex-col gap-3" style="margin-top: 1.25rem;">${missionResults}</ul>
    <button class="btn btn-primary" style="margin-top: 1.5rem;" data-close-modal>
      Finish
    </button>
  `);

  qs("[data-close-modal]")?.addEventListener("click", closeModal);
}

function showMissionLogs() {
  const progressItems = missions.map((mission, index) => (
    `<li class="clue-card">${mission.title}: ${gameState.missionScores[index] || 0}/200 score • ${gameState.progress[index] || 0}/${mission.questions.length} answered • Passing ${MISSION_PASSING_SCORE}/200</li>`
  )).join("");
  const logItems = gameState.logs.length
    ? gameState.logs.map((log) => `<li class="clue-card">${log}</li>`).join("")
    : `<li class="clue-card">No mission logs yet.</li>`;

  openModal(`
    <div class="section-label">Archive</div>
    <h2 class="section-title">Mission Logs</h2>
    <ul class="flex-col gap-3" style="margin-bottom: 1rem;">${progressItems}</ul>
    <ul class="flex-col gap-3">${logItems}</ul>
    <button class="btn btn-secondary btn-sm" style="margin-top: 1.25rem;" data-close-modal>
      Close
    </button>
  `);

  qs("[data-close-modal]")?.addEventListener("click", closeModal);
}

function bindHomeButtons() {
  const buttons = qsa(".btn");

  buttons.find((button) => button.textContent.trim() === "New Game")
    ?.addEventListener("click", startGame);

  buttons.find((button) => button.textContent.trim() === "Continue")
    ?.addEventListener("click", continueGame);

  buttons.find((button) => button.textContent.trim() === "Mission Logs")
    ?.addEventListener("click", showMissionLogs);

  qsa(".mission-card").forEach((card, index) => {
    card.addEventListener("click", () => showMission(index));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateNav();
  bindHomeButtons();
  showToast("Project M is ready.", "success");
});
