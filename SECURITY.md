# Security Policy for FortressOS 🛡️

## Our Commitment

The FortressOS team and community are deeply committed to the security of our open-source risk management platform. We value the work of security researchers and the broader community in helping us maintain a high standard of security. This document outlines our security policy, including how to report vulnerabilities and what you can expect from us.

We aim to address any security issues promptly and transparently.

## Supported Versions

Security updates and support are provided for the following versions of FortressOS:

| Version | Supported          |
| ------- | ------------------ |
| `1.x.x` (Latest Stable Release) | ✅                 |
| `develop` branch (Unstable) | ⚠️ (Best effort, intended for testing) |
| `< 1.0.0` (Pre-releases/Alphas/Betas) | ❌ (Not recommended for production, use with caution) |

We encourage all users to run the latest stable version of FortressOS to ensure they have the most recent security patches and features.

## Reporting a Security Vulnerability

We take all security vulnerability reports seriously. If you believe you have found a security vulnerability in FortressOS, please help us by reporting it privately. **Please do not report security vulnerabilities through public GitHub issues, discussions, or other public forums.**

### How to Report

To ensure vulnerabilities are handled discreetly and effectively, please report them through one of the following private channels:

1. **GitHub Private Vulnerability Reporting (Recommended):**
    If enabled for the repository, use GitHub's private vulnerability reporting feature. This is often available via the "Security" tab on the GitHub repository page, under "Report a vulnerability." This method allows for secure communication and tracking.

2. **Dedicated Security Email:**
    Send an email to `security@fortressos.oscar.co.tz` (Please replace `fortressos.oscar.co.tz` with your actual domain if you set one up, or use a specific maintainer's email for initial stages if a dedicated address isn't available). Please use a clear subject line, such as "Security Vulnerability Report: [Brief Description]".

    *If you wish to encrypt your email, please state this in your initial (unencrypted) email, and we can arrange a secure communication channel (e.g., using PGP/GPG keys. Our public key will be provided upon request or listed here if available).*

### What to Include

To help us understand and address the issue quickly, please include the following information in your report:

* **Clear Description:** A detailed description of the vulnerability.
* **Affected Component(s):** Specify which part of FortressOS is affected (e.g., frontend, backend API, specific feature).
* **Version(s) Affected:** The version(s) of FortressOS you found the vulnerability in.
* **Steps to Reproduce:** Precise steps to reproduce the vulnerability. This is crucial for us to verify and fix the issue.
* **Proof of Concept (PoC):** If possible, provide a PoC (code, screenshots, videos) demonstrating the vulnerability.
* **Potential Impact:** Your assessment of the potential impact of the vulnerability.
* **Your Contact Information:** So we can follow up with you.
* **(Optional) Suggested Mitigation:** If you have ideas on how to fix the vulnerability.

### What to Expect

When you report a security vulnerability through a private channel:

1. **Acknowledgment:** We will aim to acknowledge receipt of your report within 48-72 hours.
2. **Initial Assessment:** Our team will investigate the reported vulnerability to validate its existence and assess its impact. We may ask for additional information during this phase.
3. **Updates:** We will strive to keep you informed of our progress in addressing the vulnerability.
4. **Resolution:** Once the vulnerability is confirmed and a fix is developed, we will schedule its release. The timeline for a fix can vary depending on the complexity of the vulnerability and the release cycle.
5. **Public Disclosure:** After a fix is released, we may publicly disclose the vulnerability (e.g., through GitHub Security Advisories, release notes). We will coordinate with you on the nature and timing of the public disclosure and aim to credit you for your discovery unless you prefer to remain anonymous.

### Private Disclosure

We kindly request that you follow responsible disclosure practices and **do not disclose the vulnerability publicly until a fix has been released and we have coordinated on public disclosure.**

## Security Advisories and Updates

* **Security Advisories:** Confirmed vulnerabilities and their fixes will be announced via [GitHub Security Advisories](https://github.com/yourusername/fortressos/security/advisories) (replace with your actual repository link).
* **Release Notes:** Security fixes will also be documented in the release notes for the relevant FortressOS versions.
* **Patching:** We strongly recommend users update to the latest patched version of FortressOS as soon as it becomes available.

## Development Security Practices

While FortressOS is a community-driven open-source project, we aim to incorporate security best practices into our development lifecycle:

* **Code Reviews:** Pull requests are reviewed for potential security issues before merging, especially those affecting sensitive areas.
* **Dependency Management:** We strive to keep dependencies up-to-date and monitor them for known vulnerabilities (e.g., using GitHub Dependabot or similar tools).
* **Secure Coding Guidelines:** We encourage contributors to follow secure coding practices (e.g., mitigating OWASP Top 10 risks).
* **Container Security:** Official Docker images are built with security in mind (e.g., using non-root users, minimal base images).
* **Static Analysis (Future):** We plan to incorporate static application security testing (SAST) tools into our CI/CD pipeline.

## Scope of this Policy

This security policy applies to:

* The core FortressOS application codebase (frontend and backend).
* Official Docker images provided by the FortressOS project.
* Official documentation related to FortressOS security.

## Out of Scope Vulnerabilities

The following are generally considered out of scope for our security vulnerability program:

* Vulnerabilities in third-party dependencies that should be reported to the upstream maintainers of those dependencies. (However, if FortressOS uses a dependency in an insecure way, that *is* in scope).
* Self-XSS (Cross-Site Scripting that requires the user to manually inject a payload into their own browser).
* Missing security headers that do not directly lead to a vulnerability.
* Disclosure of public files or directories (e.g., `robots.txt`).
* CSRF vulnerabilities on anonymous or logout actions.
* Social engineering attacks against users or contributors.
* Denial of Service (DoS) attacks that require significant resources, unless a small request can cause disproportionate impact.
* Issues related to outdated browsers or operating systems.
* Vulnerabilities in user-deployed environments that are due to misconfiguration of the host, network, or database, rather than a flaw in FortressOS itself (see "Your Responsibilities").

If you are unsure whether an issue is in scope, please report it privately, and we will assess it.

## Your Responsibilities (for Self-Hosted Instances)

As FortressOS is a self-hosted application, users are responsible for securing their own instances. This includes, but is not limited to:

* **Secure Hosting Environment:** Securing the underlying operating system, network infrastructure, and Docker environment.
* **Strong Credentials:** Using strong, unique passwords for database access, application administrator accounts, and any integrated services.
* **Secrets Management:** Properly managing sensitive environment variables and secrets.
* **Regular Updates:** Keeping FortressOS and all its dependencies (including the host OS and Docker) updated to the latest secure versions.
* **Network Security:** Implementing appropriate firewall rules and network segmentation.
* **Backups:** Regularly backing up FortressOS data.
* **Monitoring & Logging:** Monitoring application logs and system activity for suspicious behavior.

## Questions

If you have any questions about this security policy or FortressOS security in general that are not related to reporting a specific vulnerability, please feel free to:

* Open a discussion on our [GitHub Discussions](https://github.com/yourusername/fortressos/discussions) (if enabled).
* Join our [Discord Community](https://discord.gg/YOUR_DISCORD_INVITE_CODE) (replace with your actual link).

Thank you for helping keep FortressOS secure!
