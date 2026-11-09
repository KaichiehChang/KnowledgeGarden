---
layout: default
title: Development Workflow
permalink: /project/development-workflow/
---

# Development Workflow

This document describes the development and maintenance workflow used in Knowledge Garden.

## 1. Overview

Knowledge Garden currently follows a simplified GitHub Flow.

The `main` branch maintains the stable version of the project. Changes are developed in separate working branches and integrated through Pull Requests.

## 2. Workflow

### Step 1: Update the local main branch

```bash
git switch main
git pull --ff-only origin main
```

### Step 2: Create a working branch

Create a new branch from the updated `main` branch.

```bash
git switch -c <type>/<short-description>
```

**Naming Convention**

Branch names follow the format `<type>/<short-description>`.

| Type | Purpose | Example |
|---|---|---|
| `feat` | Website functionality, reusable tools, and independent software features | `feat/site-search` |
| `docs` | Knowledge articles, learning materials, examples, and project documentation | `docs/cpp-lower-bound` |
| `fix` | Fix bugs or incorrect software behavior | `fix/broken-navigation` |
| `refactor` | Restructure code without changing its intended behavior | `refactor/search-component` |
| `test` | Independent additions or improvements to tests | `test/binary-search` |
| `chore` | Configuration, dependencies, build tooling, and maintenance | `chore/update-dependencies` |

### Step 3: Make changes and commit

```bash
git status
git add <files>
git diff --cached
git commit -m "<type>: <short-description>"
```

Use the same types defined in Step 2. The commit type describes the purpose of that specific change.

A working branch may contain multiple commits. Each commit should represent a meaningful, logically related change.


### Step 4: Push and create a Pull Request

```bash
git push -u origin <branch-name>
gh pr create --base main --head <branch-name>
```

Review the changed files and verify the results before merging.

### Step 5: Merge the Pull Request

After reviewing and verifying the changes, merge the Pull Request into `main`.

### Step 6: Synchronize and clean up

```bash
git switch main
git pull --ff-only origin main
git branch -d <branch-name>
```

The remote working branch can also be deleted after a successful merge.


## 3. Change Scope and Classification

Each working branch and Pull Request should have one primary objective.

### Classification Rules

- Determine the branch type based on its primary objective, not file types or programming languages.
- A knowledge article may include explanations, executable examples, tests, and interactive demonstrations within the same Pull Request.
- Commit types describe individual changes and may differ from the branch type.

### Change Scope

- Keep related changes together when they contribute to the same deliverable.
- Separate unrelated, substantial changes into different Pull Requests.
- Do not split a cohesive deliverable solely because it uses different technologies.
- Keep Pull Requests focused and independently reviewable.

### Small Changes

- Include small fixes in the current branch when they directly relate to its objective.
- Minor, unrelated, low-risk changes may be included when clearly documented in the Pull Request.
- Group other low-risk maintenance changes into a small maintenance Pull Request when appropriate.
- Handle significant or high-risk bugs in separate Pull Requests.
- Use a Pull Request by default, including for documentation changes.
- Avoid direct commits to `main` unless an explicit exception has been established.


## 4. Rationale

Establish a consistent and reviewable process for updating and maintaining the project.

This workflow aims to reduce the risk of incomplete or unverified changes affecting the `main` branch.

## 5. Advantages and Limitations

### Advantages

1. **Change isolation:** Working branches isolate incomplete changes from the stable main branch.
2. **Collaboration:** Multiple contributors can work on separate changes independently.
3. **Reviewability:** Pull Requests make it easier to review modifications before merging.

### Limitations

1. **Additional steps:** Creating, synchronizing, and merging branches requires extra work.
2. **Merge conflicts:** Long-lived branches may increase the likelihood of merge conflicts.
3. **Workflow overhead:** Small changes may not always justify the complete Pull Request process.

## 6. Future Improvements

The workflow may evolve as Knowledge Garden grows, including automated testing, CI/CD, and additional review requirements.


## Home
- [Back to Home]({{ '/' | relative_url }})