<div align="center">

# 🔒 Security Policy

**Security is a core priority at Ideathonix AI.**

</div>

We appreciate responsible security research and encourage the community to report vulnerabilities that could affect the confidentiality, integrity, or availability of the platform.

---

## 📋 Table of Contents

- [Supported Versions](#-supported-versions)
- [Reporting a Vulnerability](#-reporting-a-vulnerability)
- [Response Timeline](#-response-timeline)
- [Severity Levels](#-severity-levels)
- [Security Scope](#-security-scope)
- [Out of Scope](#-out-of-scope)
- [Security Practices](#-security-practices)
- [Secrets Management](#-secrets-management)
- [Security Verification](#-security-verification)
- [Dependency Management](#-dependency-management)
- [Supported Browsers](#-supported-browsers)
- [Responsible Disclosure & Safe Harbor](#-responsible-disclosure--safe-harbor)
- [Acknowledgements](#️-acknowledgements)

---

## 🛡 Supported Versions

| Version | Supported |
|---|---|
| Latest Release | ✅ Yes |
| Development Branch | ✅ Yes |
| Older Versions | ❌ No |

Please ensure you are using the latest version before reporting a security issue.

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability, **please do not disclose it publicly** — do not open a public GitHub issue, discussion, or pull request describing the vulnerability.

Instead, report it privately using one of the following channels:

- 📧 **Email:** `security@ideathonix.ai` *(replace with your actual security contact)*
- 🔒 **GitHub Security Advisories:** Use the **"Report a vulnerability"** button under the repository's **Security** tab.

Your report should include:

- Vulnerability description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Potential impact
- Proof of concept (if available)
- Your suggested severity (see [Severity Levels](#-severity-levels)), if you have one

We will review all valid reports responsibly and work toward a timely resolution.

---

## ⏱ Response Timeline

We aim to follow this timeline for every report received:

| Stage | Target Time |
|---|---|
| Initial acknowledgement | Within 48 hours |
| Triage & severity assessment | Within 5 business days |
| Status update to reporter | Every 7–10 days until resolved |
| Fix released (Critical/High) | As soon as possible, typically within 30 days |
| Fix released (Medium/Low) | Within the next scheduled release cycle |
| Public disclosure | Coordinated with the reporter, after a fix is released |

These are targets, not guarantees — complex issues may take longer, and we'll keep you informed throughout.

---

## 📊 Severity Levels

We use the following rough guide to triage reports. Final severity is determined by maintainers based on real-world impact.

| Severity | Description | Examples |
|---|---|---|
| 🔴 **Critical** | Full compromise of data, accounts, or infrastructure | Auth bypass, remote code execution, full data exposure |
| 🟠 **High** | Significant impact to a subset of users or data | Privilege escalation, sensitive data exposure, stored XSS |
| 🟡 **Medium** | Limited impact, requires specific conditions | Reflected XSS, session issues, misconfigurations |
| 🟢 **Low** | Minimal impact, hard to exploit | Information disclosure with low sensitivity, minor CSRF |

---

## 🔍 Security Scope

Examples of security issues **in scope**:

- Authentication or authorization bypass
- Cross-Site Scripting (XSS)
- Injection attacks (SQL, NoSQL, command injection, etc.)
- Sensitive data exposure
- Firebase or Firestore misconfiguration
- API key exposure
- Insecure API communication
- Session management issues
- Dependency vulnerabilities with demonstrable impact
- Privilege escalation
- Information disclosure
- Server-Side Request Forgery (SSRF)
- Insecure direct object references (IDOR)

---

## 🚫 Out of Scope

The following are generally **not considered security vulnerabilities**:

- UI or styling issues
- Typographical errors
- Browser compatibility issues
- Feature requests
- Minor performance suggestions without a security impact
- Reports generated purely by automated scanners without a demonstrated, working exploit
- Missing security headers without a demonstrated exploit path
- Social engineering or phishing attempts targeting maintainers or users
- Denial-of-service attacks requiring excessive traffic/resources to demonstrate
- Vulnerabilities in third-party services not controlled by this project (e.g. Firebase/Google infrastructure itself — please report those directly to the vendor)

If you're unsure whether something is in scope, report it anyway — we'd rather review and decline than miss a real issue.

---

## 🔐 Security Practices

Ideathonix AI follows modern security best practices, including:

- Secure Firebase Authentication
- Firestore Security Rules
- Protected Routes
- Input validation and sanitization
- Secure API communication (HTTPS-only)
- Environment variable management
- Least-privilege access
- Graceful error handling (no sensitive data in error messages)
- Regular dependency updates and vulnerability scanning

---

## 🔑 Secrets Management

Never commit sensitive information such as:

- API Keys
- Firebase Service Account Keys
- Access Tokens
- Private Keys
- Passwords
- `.env` files
- Database Credentials

Store all secrets securely using environment variables, and reference `.env.example` for the required (empty) keys.

If a secret is accidentally committed:

1. Rotate/revoke the exposed credential immediately.
2. Remove it from the codebase and history if necessary.
3. Notify the maintainers privately so any related access can be reviewed.

---

## 🧪 Security Verification

Before every release, we verify:

- Authentication flow
- Authorization rules
- Firestore access control
- Input validation
- API security
- Error handling
- Dependency vulnerabilities
- Environment configuration

---

## 📦 Dependency Management

All third-party dependencies should:

- Be from trusted, well-maintained sources
- Be actively maintained
- Be updated regularly
- Be reviewed before adoption

Avoid unnecessary packages to reduce the attack surface. Dependency updates that address known vulnerabilities are prioritized over feature-driven updates.

---

## 🌐 Supported Browsers

Security is tested on the latest versions of:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

---

## 🤝 Responsible Disclosure & Safe Harbor

We kindly ask security researchers to:

- Report vulnerabilities privately, and give us reasonable time to respond before any public disclosure.
- Avoid accessing, modifying, or deleting user data beyond what's necessary to demonstrate the vulnerability.
- Avoid disrupting the availability of the platform (no denial-of-service testing).
- Respect user privacy and confidentiality at all times.
- Only test against accounts and data you own or have explicit permission to use.

**Safe Harbor:** Provided you act in good faith and follow the guidelines above, we will not pursue legal action against you for your research. We consider security research conducted under this policy to be authorized.

Responsible disclosure helps us protect all users — thank you for acting in good faith.

---

## ❤️ Acknowledgements

We sincerely thank the security researchers, contributors, and community members who help improve the security and reliability of **Ideathonix AI**.

Your responsible disclosures help us build a safer and more trustworthy platform for everyone.

Thank you for helping secure **Ideathonix AI**! 🛡️
