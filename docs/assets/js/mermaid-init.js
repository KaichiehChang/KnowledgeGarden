
// Support Mermaid fences with a wrapper class or a class on the code element.
const codeBlocks = document.querySelectorAll(
  "div.language-mermaid pre > code, pre > code.language-mermaid"
);

if (codeBlocks.length > 0) {
  for (const code of codeBlocks) {
    // Replace the full wrapper so code-highlighting markup does not surround the diagram.
    const container =
      code.closest("div.language-mermaid") ??
      code.closest("pre");

    const diagram = document.createElement("pre");
    diagram.className = "mermaid";
    diagram.textContent = code.textContent;

    container.replaceWith(diagram);
  }

  // Load Mermaid only on pages that contain diagrams.
  const { default: mermaid } = await import(
    "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"
  );

  // Render explicitly after converting the Markdown code blocks into diagram containers.
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict"
  });

  await mermaid.run({
    querySelector: "pre.mermaid"
  });
}
