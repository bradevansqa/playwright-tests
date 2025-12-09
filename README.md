# 🤖🎭  Playwright Tests for Sauce Demo

## ✅ Overview

This repository contains Playwright end-to-end tests for the Sauce Demo website. It demonstrates both:

- ✅ **Traditional hand-written UI automation**
- ✅ **AI-assisted test authoring using GitHub Copilot & prompt-driven workflows**

The project showcases a modern Playwright automation framework with:

- Login & logout validation  
- Product sorting  
- Add-to-cart & checkout flows  
- Cart badge updates  
- UI validations  

It also highlights:

- ✅ Clean automation architecture (POM + fixtures)
- ✅ Parallel execution using Playwright’s **multi-process, multi-context execution model (MCP)**
- ✅ HTML reporting, screenshots, video, and trace viewer
- ✅ CI execution using GitHub Actions
- ✅ AI-assisted test generation with full human code review

---

## 🚀 Tech Stack

- **Playwright** – browser automation  
- **TypeScript** – test scripting  
- **Page Object Model (POM)** – maintainable automation architecture  
- **Custom Fixtures** – reusable test setup  
- **GitHub Actions** – CI/CD execution  
- **GitHub Copilot + ChatGPT** – AI-assisted test authoring  
- **Playwright MCP (Multi-Process / Multi-Context)** – fast, isolated parallel execution  
- **HTML Reports + Trace Viewer** – debugging & reporting  

---

## 📂 Project Structure

```text
e2e/                   → Hand-written Playwright test cases  
e2e/ai-generated/      → AI-assisted generated tests (reviewed & refactored)  
pages/                → Page Objects  
fixtures/             → Custom Playwright fixtures  
prompts/              → AI prompt templates for test generation  
playwright.config.ts  → Test runner configuration  
.github/workflows/    → GitHub Actions CI pipelines  
