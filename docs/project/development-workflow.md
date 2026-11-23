---
layout: default
title: Development Workflow
permalink: /project/development-workflow/
---

# Development Workflow

This document describes the development and maintenance workflow used in Knowledge Garden, including branch management, Pull Request reviews, automated verification, and Preview deployment.

## 1. Overview

Knowledge Garden follows a simplified GitHub Flow with CI/CD automation.
GitHub Actions handles automated site validation and Cloudflare Preview deployments, while GitHub Pages manages production publishing from the main branch.

The `main` branch maintains the stable version of the project. Changes are developed in separate working branches and integrated through Pull Requests.

GitHub Actions provides automated site validation and Cloudflare Preview deployment. These processes support code review and help detect problems before changes are integrated into `main`.

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

Branch classification follows the primary objective of the work. Preview deployment eligibility is defined separately in Section 3.

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

Pushing an eligible branch triggers the Cloudflare Preview Deployment workflow.

Opening or updating a Pull Request targeting `main` triggers Site CI.

Complete the Pull Request template, including:

- Summary of changes and related Issues.
- AI assistance disclosure.
- Verification results and unverified items.
- Review notes and applicable checklist items.

### Step 5: Review, verify, and merge

Before merging:

1. Review the changed files and confirm that they match the intended scope.
2. Check the applicable GitHub Actions results.
3. Review the Preview website when deployment is applicable.
4. Record verification results, limitations, and unresolved issues in the Pull Request.
5. Confirm that applicable branch protection and review requirements are satisfied.

After reviewing and verifying the changes, merge the Pull Request into `main`.

Additional post-merge validation may be performed when behavior cannot be fully verified before merging. Record the results in the merged Pull Request.

### Step 6: Synchronize and clean up

```bash
git switch main
git pull --ff-only origin main
git branch -d <branch-name>
```

The remote working branch can also be deleted after a successful merge.

The Preview Cleanup workflow handles applicable Preview resources when a Pull Request is closed or a branch is deleted.

## 3. CI/CD and Deployment

Knowledge Garden uses GitHub Actions to automate website validation and manage Cloudflare Preview deployments.

### 3.1 Site CI

**Workflow:** `.github/workflows/site-ci.yml`

Site CI runs for Pull Requests targeting `main`.

The workflow runs `bundle exec rake verify` to build the Jekyll website and validate generated HTML, including internal links.

Site CI is independent of Preview deployment eligibility. Branches excluded from automatic Preview deployment can still receive Site CI checks through their Pull Requests.

### 3.2 Cloudflare Preview Deployment

**Workflow:** `.github/workflows/cloudflare-preview.yml`

Automatic Preview deployment is triggered by pushes to these branch patterns:

| Branch Pattern | Automatic Preview |
|---|---|
| `docs/*` | Enabled |
| `feat/*` | Enabled |
| `fix/*` | Enabled |
| `test/*` | Enabled |
| `refactor/*` | Enabled |
| Other patterns, including `chore/*` | Disabled |

The deployment policy uses branch classifications rather than inspecting individual changes to determine whether they affect website behavior.

The workflow builds the Jekyll site and deploys it through Cloudflare Wrangler. When an open Pull Request is associated with the branch, the workflow creates or updates a Preview URL comment.

**Environment Protection**

The deployment is controlled by two separate configurations:

1. **GitHub Actions:** The `push.branches` filter in `cloudflare-preview.yml` determines which branch pushes trigger automatic Preview deployment.
2. **GitHub Environment:** `Settings → Environments → cloudflare-preview → Deployment branches and tags` determines which branches are permitted to deploy.

Both configurations must use consistent allowed branch patterns. When changing the deployment policy, review and update both.

Manual execution through `workflow_dispatch` remains available but is still subject to Environment protection rules.

Cloudflare's independent automatic Preview Builds should be disabled when GitHub Actions manages Preview deployments, to avoid duplicate deployment pipelines.

### 3.3 Preview Cleanup

**Workflow:** `.github/workflows/cloudflare-preview-cleanup.yml`

Preview Cleanup is triggered by Pull Request closure or branch deletion.

It removes the associated Preview when appropriate and updates an existing Preview comment after successful cleanup.

Cleanup uses separate event-based conditions rather than the Preview Deployment branch filter. This allows previously created Preview resources to be cleaned up even if their branches are no longer eligible for automatic deployment.

### 3.4 Verification and Records

Pull Requests serve as the primary record of changes, reviews, and verification results.

The Verification section should distinguish between:

- **Checks performed and results:** Tests or checks that were actually executed and their outcomes.
- **Not tested / Not verified:** Checks that were not performed, incomplete validation, or known limitations.

The required depth of verification depends on the change scope and risk.

When post-merge validation is necessary, record its results in the original Pull Request. Related Issues track the overall work and can reference the Pull Request without duplicating its verification records.

## 4. Change Scope and Classification

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

## 5. Rationale

Establish a consistent and reviewable process for updating and maintaining the project.

This workflow aims to reduce the risk of incomplete or unverified changes affecting the `main` branch.

Automated checks provide repeatable validation, while Preview deployments support visual and functional review before integration.

Pull Requests and Issues preserve development decisions, verification results, and the history of project improvements.

## 6. Advantages and Limitations

### Advantages

1. **Change isolation:** Working branches isolate incomplete changes from the stable main branch.
2. **Collaboration:** Multiple contributors can work on separate changes independently.
3. **Reviewability:** Pull Requests make it easier to review modifications before merging.
4. **Automated verification:** Site CI provides consistent build and link validation.
5. **Preview deployment:** Eligible branches can be reviewed in a deployed environment before merging.
6. **Traceability:** Issues, Pull Requests, and verification records document the development process.

### Limitations

1. **Additional steps:** Creating, synchronizing, and merging branches requires extra work.
2. **Merge conflicts:** Long-lived branches may increase the likelihood of merge conflicts.
3. **Workflow overhead:** Small changes may not always justify the complete Pull Request process.
4. **Incomplete validation:** Automated checks cannot guarantee that all functionality and behavior are correct.
5. **Configuration maintenance:** GitHub Actions and external Environment settings must remain consistent.
6. **Branch-based deployment:** Deployment eligibility does not necessarily reflect whether a change affects the website.

## 7. Future Improvements

The workflow may evolve as Knowledge Garden grows, with broader automated testing, improved deployment verification, and additional review requirements when justified by project complexity and maintenance needs.

## Home

- [Back to Home]({{ '/' | relative_url }})