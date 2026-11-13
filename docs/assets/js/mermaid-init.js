
const codeBlocks = document.querySelectorAll(
  "div.language-mermaid pre > code, pre > code.language-mermaid"
);

if (codeBlocks.length > 0) {
  for (const code of codeBlocks) {
    const container =
      code.closest("div.language-mermaid") ??
      code.closest("pre");

    const diagram = document.createElement("pre");
    diagram.className = "mermaid";
    diagram.textContent = code.textContent;

    container.replaceWith(diagram);
  }

  const { default: mermaid } = await import(
    "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"
  );

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict"
  });

  await mermaid.run({
    querySelector: "pre.mermaid"
  });
}
