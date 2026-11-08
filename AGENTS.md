# Agent Instructions

## Project Overview

Knowledge Garden is a collection of notes, exercises, experiments, and projects across different fields of knowledge.

The project focuses on learning, understanding, practical experimentation, and knowledge organization.

## Repository Structure

- `README.md` — Repository overview.
- `docs/index.md` — Website homepage.
- `docs/_config.yml` — Jekyll configuration.
- `docs/project/` — Project development and maintenance documentation.
- `docs/topics/` — Knowledge articles organized by subject.
- `.github/` — GitHub collaboration and automation configuration.

Planned directories, when introduced:

- `exercises/` — Runnable exercises, implementations, and tests.
- `projects/` — Larger integrated projects.

Knowledge pages may combine explanations, code examples, diagrams, and interactive demonstrations on the same page. Supporting source files may be maintained separately.

## Project Rules

Before making changes:

1. Read `README.md` and relevant project documentation.
2. Follow `docs/project/development-workflow.md`.
3. Inspect the relevant files and existing conventions.
4. Keep changes focused on the requested task.

Do not commit, push, merge, delete branches, or modify unrelated files without explicit authorization.

## Content Guidelines

- Prioritize accuracy, clarity, and maintainability.
- Preserve the author's intended meaning.
- Distinguish verified facts, assumptions, and experimental observations.
- Do not invent references, test results, or implementation details.
- Avoid reproducing third-party copyrighted material without an appropriate legal basis.

## Implementation and Verification

For code changes:

- Review generated code for correctness and maintainability.
- Run applicable build and test commands when available.
- Consider relevant edge cases and error handling.
- Do not remove or weaken existing tests merely to obtain a passing result.
- Identify any unverified behavior or potential risks.

For documentation changes:

- Check technical accuracy and terminology.
- Check relevant links, references, and formatting.
- Verify interactive examples when applicable.

Verification requirements depend on the nature of the change.

## AI Contribution Reporting

When AI tools substantially contribute to code, content, or project changes:

- Identify the affected files or components.
- Describe the nature of AI assistance.
- Report the actual verification performed and its results.
- Clearly state any tests that were not executed.
- Highlight assumptions, uncertainties, or areas requiring human review.

Do not claim that unperformed checks have passed.

If preparing a Pull Request, include this information in its description.

AI-generated changes must remain subject to human review before acceptance.

## Completion Report

After completing a task, provide a concise report containing:

1. Summary of changes.
2. Affected files.
3. Verification performed and results.
4. Remaining issues or limitations.

Do not report a task as fully verified if required checks have not been completed.