
<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>
Online Voting System Backend API
</h1>
<h3>◦ Make your own Polls whenever</h3>
<h3>◦ Developed with the software and tools listed below.</h3>

<p align="center">
   
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/esbuild-FFCF00.svg?style&logo=esbuild&logoColor=black" alt="esbuild" />
 
<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style&logo=Prettier&logoColor=black" alt="Prettier" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style&logo=HTML5&logoColor=white" alt="HTML5" />
 
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style&logo=Nodemon&logoColor=white" alt="Nodemon" />
 


<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" /> 
<img src="https://img.shields.io/badge/Markdown-000000.svg?style&logo=Markdown&logoColor=white" alt="Markdown" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />
 

 
</p>

![GitHub top language](https://img.shields.io/github/languages/top/Leave-it-blank/online-voting-system-backend?style&color=5D6D7E)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Leave-it-blank/online-voting-system-backend?style&color=5D6D7E)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/Leave-it-blank/online-voting-system-backend?style&color=5D6D7E)
![GitHub license](https://img.shields.io/github/license/Leave-it-blank/online-voting-system-backend?style&color=5D6D7E)
</div>

---

## 📒 Table of Contents
- [📒 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [⚙️ Features](#-features)
- [📂 Project Structure](#project-structure)
- [🧩 Modules](#modules)
- [🚀 Getting Started](#-getting-started)
- [🗺 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---


## 📍 Overview

The project is an Online Voting System / Poll Voting System backend based on TypeScript (TS). It provides a robust and secure backend infrastructure for conducting online voting or polling activities. The codebase includes components for managing user authentication, handling voting processes, storing data securely, and providing an API interface for interacting with the system. The project aims to ensure the integrity and confidentiality of voting data while allowing authorized users to participate in the voting process conveniently and efficiently. It leverages TypeScript's strong typing and scalability to create a reliable and scalable backend solution for online voting or polling systems.

---

## ⚙️ Features

| Feature                | Description                           |
| ---------------------- | ------------------------------------- |
| **⚙️ Architecture**    | The codebase follows a modular architecture, with separate folders for different components and functionalities such as background, popup, content, and components. The background script listens to events, while the popup and content scripts handle UI interactions. The communication between these components is done through the messaging system provided by Chrome extensions.
| **📖 Documentation**   | The repository lacks comprehensive documentation. While some files have brief comments and explanations, there is no dedicated documentation detailing the system's usage, design patterns, or architectural decisions.
| **🔗 Dependencies**    | The codebase relies on various external packages, including React, ReactDOM, Sass, esbuild, archiver, and react-toggle. These libraries provide support for UI rendering, CSS styling, package bundling, and toggle functionality. The OpenAI API is used for the ChatGPT integration.
| **🧩 Modularity**      | The system is organized into smaller, interchangeable components, making it easier to understand and maintain. Each component has a specific responsibility, such as handling background events, rendering UI, managing settings, and communicating with third-party APIs.
| **✔️ Testing**         | There is no explicit mention of testing in the repository. The absence of testing files or scripts indicates that testing may not be practiced extensively in this codebase.
| **⚡️ Performance**     | Performance cannot be fully assessed without analyzing the entire codebase. However, based on the provided summaries, the codebase seems to handle speech recognition, speech synthesis, and chat interactions efficiently using Web Speech API and OpenAI's ChatGPT.
| **🔐 Security**        | The codebase does not explicitly detail security measures, but it handles authentication with the OpenAI API. It's important to ensure that user data is handled securely, especially for a chat assistant that may process sensitive information.
| **🔀 Version Control** | The codebase is hosted on GitHub, suggesting the use of Git for version control. However, further analysis is required to evaluate the specific version control strategies or practices implemented.
| **🔌 Integrations**    | The codebase interacts with Chrome extensions' APIs for browser events and UI rendering. It also integrates with the OpenAI API for natural language processing and the Web Speech API for speech recognition and synthesis.
| **📶 Scalability**     | Scalability cannot be determined without a more detailed analysis. However, the use of modular components and external APIs allows for flexibility and potential scalability in handling additional features or expanding the system's functionality.

---


## 📂 Project Structure


```bash
  repo
    ├── controllers
    │   ├── postController.ts
    │   └── AuthController.ts
    ├── libs
    │   └── mongo_client.ts
    ├── middleware
    │   └── auth.ts
    ├── routes
    │   ├── auth
    │   │    └── authenticate.ts
    │   └── index.ts
    ├── package.json
    ├── package-lock.json
    ├── LICENSE
    ├── .env
    ├── readme.md
    └── server.ts

3 directories
```

---

## 🚀 Getting Started

### ✔️ Prerequisites

Before you begin, ensure that you have the following prerequisites installed:
> - `ℹ️ Nodejs 18+`
> - `ℹ️ Npm`
> - `ℹ️ Docker`

### 💻 Installation

1. Clone the assistant-chat-gpt repository:
```sh
git clone https://github.com/Leave-it-blank/online-voting-system-backend
```

2. Change to the project directory:
```sh
cd online-voting-system-backend
```

3. Install the dependencies:
```sh
npm install
```

### 🎮 Using assistant-chat-gpt

```sh
npm run dev
```

### 🧪 Running Tests
```sh
npm test
```

---


## 🗺 Roadmap

> - [X] `ℹ️  Task 1: Implemented User Auth using Jwt`
> - [X] `ℹ️  Task 2: Implemented Poll System`
> - [ ] `ℹ️  Task 3: Implement & Refactor using Hashing`


---

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:
1. Fork the project repository. This creates a copy of the project on your account that you can modify without affecting the original project.
2. Clone the forked repository to your local machine using a Git client like Git or GitHub Desktop.
3. Create a new branch with a descriptive name (e.g., `new-feature-branch` or `bugfix-issue-123`).
```sh
git checkout -b new-feature-branch
```
4. Make changes to the project's codebase.
5. Commit your changes to your local branch with a clear commit message that explains the changes you've made.
```sh
git commit -m 'Implemented new feature.'
```
6. Push your changes to your forked repository on GitHub using the following command
```sh
git push origin new-feature-branch
```
7. Create a new pull request to the original project repository. In the pull request, describe the changes you've made and why they're necessary.
The project maintainers will review your changes and provide feedback or merge them into the main branch.

---

## 📄 License

This project is licensed under the `ℹ️  INSERT-LICENSE-TYPE` License. See the [LICENSE](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository) file for additional info.

---

## 👏 Acknowledgments

> - `Made By Leaveitblank`

---
