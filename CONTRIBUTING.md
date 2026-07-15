<div align="center">

# 🤝 Contributing to Ideathonix AI

**Thank you for your interest in contributing to Ideathonix AI! 🚀**

</div>

We're building an AI-powered platform that helps founders, innovators, students, and hackathon teams transform ideas into production-ready product blueprints. Every contribution — big or small — helps make the platform smarter, faster, and more valuable.

---

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Ways to Contribute](#-ways-to-contribute)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Create a New Branch](#-create-a-new-branch)
- [Development Guidelines](#-development-guidelines)
- [Before Submitting](#-before-submitting)
- [Commit Message Format](#-commit-message-format)
- [Pull Requests](#-pull-requests)
- [Reporting Issues](#-reporting-issues)
- [Requesting Features](#-requesting-features)
- [Community & Support](#-community--support)
- [Thank You](#️-thank-you)

---

## 📜 Code of Conduct

By participating in this project, you agree to keep this a welcoming, harassment-free space for everyone, regardless of experience level, background, or identity.

- Be respectful and constructive in discussions and reviews.
- Assume good intent — everyone is here to make the project better.
- No harassment, discrimination, or personal attacks.
- Disagreements are fine; disrespect isn't.

Violations can be reported by opening a private issue or contacting the maintainers directly.

---

## 🌟 Ways to Contribute

You can contribute by:

| Area | Examples |
|---|---|
| ✨ Features | New generator modes, export formats, AI capabilities |
| 🐛 Bug Fixes | Fixing broken flows, edge cases, incorrect outputs |
| 🎨 UI/UX | Improving layouts, visuals, and interaction design |
| ⚡ Performance | Reducing load times, optimizing renders |
| 🔒 Security | Hardening auth, Firestore rules, API handling |
| ♿ Accessibility | Keyboard nav, ARIA labels, contrast, screen readers |
| 🧪 Testing | Unit, integration, and end-to-end tests |
| 📖 Documentation | README, guides, code comments, examples |
| 🤖 AI/Prompts | Improving prompt engineering and Gemini workflows |

Not sure where to start? Look for issues tagged **`good first issue`** or **`help wanted`**.

---

## 🚀 Getting Started

### 1. Fork the Repository

Fork this repository to your GitHub account using the **Fork** button at the top of the page.

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/ideathonix-ai.git
cd ideathonix-ai
```

### 3. Add the Upstream Remote

Keep your fork in sync with the main repository.

```bash
git remote add upstream https://github.com/original-owner/ideathonix-ai.git
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Set Up Environment Variables

Copy the example environment file and fill in your own credentials (see [Environment Variables](#-environment-variables) below).

```bash
cp .env.example .env
```

### 6. Start the Development Server

```bash
npm run dev
```

The app should now be running locally, typically at `http://localhost:5173` or `http://localhost:3000` depending on your setup.

---

## 📂 Project Structure

A rough overview of how the codebase is organized. Follow this structure when adding new code so the project stays consistent.

```
ideathonix-ai/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route-level views (Landing, Dashboard, Auth, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── services/       # Firebase, Gemini API, and other integrations
│   ├── context/        # App-wide state/providers
│   ├── utils/          # Helper functions and formatters
│   ├── types/          # TypeScript types and interfaces
│   └── assets/         # Images, icons, static files
├── public/              # Static public assets
├── tests/               # Unit and integration tests
├── .env.example         # Example environment variables
└── package.json
```

---

## 🔑 Environment Variables

Ideathonix AI requires API keys for Firebase and Google Gemini. Never commit real credentials — always use `.env` (already git-ignored).

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Google Gemini / AI Studio
VITE_GEMINI_API_KEY=
```

> ⚠️ If you're contributing a feature that needs new environment variables, add a placeholder entry to `.env.example` in your PR.

---

## 🌿 Create a New Branch

Always create a feature branch before making changes — never commit directly to `main`.

```bash
git checkout -b feature/your-feature-name
```

Use a prefix that matches the type of change:

| Prefix | Use Case |
|---|---|
| `feature/` | New functionality |
| `fix/` | Bug fixes |
| `refactor/` | Code improvements with no behavior change |
| `docs/` | Documentation-only changes |
| `test/` | Adding or updating tests |
| `style/` | UI/styling changes |

Example:

```bash
git checkout -b feature/improve-ai-generator
```

---

## 💻 Development Guidelines

Please follow these best practices:

- Write clean and readable code.
- Follow the existing project structure.
- Create reusable components.
- Avoid duplicate logic.
- Use meaningful variable and function names.
- Keep components modular and maintainable.
- Preserve responsive design across breakpoints.
- Follow accessibility standards (semantic HTML, ARIA, keyboard support).
- Maintain production-ready code quality — no leftover `console.log`s, dead code, or TODOs without context.
- Keep AI prompt logic isolated in `services/` so it's easy to test and tune independently of the UI.
- Prefer TypeScript types/interfaces over `any`.

### Code Style

- Run the linter and formatter before committing:

```bash
npm run lint
npm run format
```

- Follow the existing naming conventions (`camelCase` for variables/functions, `PascalCase` for components).

---

## 🧪 Before Submitting

Before opening a Pull Request, ensure:

- ✅ The project builds successfully (`npm run build`).
- ✅ No console errors or warnings.
- ✅ All tests pass (`npm run test`).
- ✅ Linting passes with no errors (`npm run lint`).
- ✅ Responsive design works correctly across mobile, tablet, and desktop.
- ✅ Accessibility is maintained (keyboard navigation, contrast, ARIA labels).
- ✅ Existing functionality remains unaffected.
- ✅ New features are documented if required (README, code comments, or `/docs`).
- ✅ No secrets, API keys, or `.env` values are committed.

---

## 📝 Commit Message Format

Use clear, meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: add startup blueprint generator
fix: resolve Firebase authentication issue
refactor: improve AI generation workflow
docs: update project documentation
test: add unit tests for prompt generator
style: improve responsive dashboard
chore: update dependencies
perf: reduce blueprint generation latency
```

**Format:** `<type>: <short, present-tense description>`

| Type | Purpose |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `docs` | Documentation-only changes |
| `test` | Adding or correcting tests |
| `style` | Formatting, UI, or styling changes (no logic change) |
| `perf` | Performance improvements |
| `chore` | Maintenance tasks, dependency updates, tooling |

---

## 🔀 Pull Requests

### Before Opening a PR

1. Sync your fork with upstream:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. Rebase your feature branch if needed:

```bash
git checkout feature/your-feature-name
git rebase main
```

3. Push your branch:

```bash
git push origin feature/your-feature-name
```

### What to Include in Your PR

When creating a Pull Request, please include:

- A clear description of the changes.
- The purpose of the update and the problem it solves.
- Screenshots or screen recordings (if UI changes were made).
- Steps to test the implementation.
- Any related issue numbers (e.g. `Closes #42`).
- Any additional notes for reviewers.

### Review Process

- A maintainer will review your PR as soon as possible.
- You may be asked to make changes — please respond to review comments and push updates to the same branch.
- Once approved, your PR will be merged by a maintainer.
- Please be patient; this is a community-driven project and review times may vary.

---

## 🐞 Reporting Issues

If you encounter a bug, please open an issue and include:

- **Operating System** (e.g. Windows 11, macOS Sonoma)
- **Browser** (e.g. Chrome 126, Safari 17)
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Console errors**, if any

Clear, reproducible bug reports get fixed faster. 🙏

---

## 💡 Requesting Features

Feature requests and enhancement ideas are always welcome! When suggesting a feature, please include:

- The problem it solves or the value it adds.
- A proposed solution or approach (if you have one).
- Any relevant examples, mockups, or references.

---

## 💬 Community & Support

- Have a question? Open a **Discussion** or an **Issue** with the `question` label.
- Found a security issue? Please follow the process in **[SECURITY.md](./SECURITY.md)** instead of opening a public issue.
- Want to discuss a bigger change before building it? Open an issue first so we can align on direction before you invest time.

---

## ❤️ Thank You

Every contribution helps improve **Ideathonix AI** and empowers builders to transform ideas into production-ready solutions.

Thank you for contributing and being part of the journey! 🚀
