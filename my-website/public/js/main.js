(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", function() {
    if (typeof mermaid !== "undefined") {
      const mermaidCodeBlocks = document.querySelectorAll("code.language-mermaid");
      const mermaidData = [];
      mermaidCodeBlocks.forEach(function(block) {
        const pre = block.parentElement;
        const mermaidDiv = document.createElement("div");
        mermaidDiv.className = "mermaid";
        const originalCode = block.textContent;
        mermaidDiv.textContent = originalCode;
        mermaidData.push({
          element: mermaidDiv,
          code: originalCode
        });
        pre.parentElement.replaceChild(mermaidDiv, pre);
      });
      mermaid.initialize({
        startOnLoad: true,
        theme: "default",
        themeVariables: {
          // Customize pie chart colors
          pie1: "#FF6B6B",
          // Red
          pie2: "#4ECDC4",
          // Teal
          pie3: "#45B7D1",
          // Blue
          pie4: "#FFA07A",
          // Light Salmon
          pie5: "#98D8C8",
          // Mint
          pie6: "#F7DC6F",
          // Yellow
          pie7: "#BB8FCE",
          // Purple
          pie8: "#85C1E2",
          // Sky Blue
          pie9: "#F8B739",
          // Orange
          pie10: "#52BE80",
          // Green
          pie11: "#EC7063",
          // Coral
          pie12: "#5DADE2"
          // Light Blue
        }
      });
      setTimeout(function() {
        mermaidData.forEach(function(data) {
          const mermaidDiv = data.element;
          const mermaidCode = data.code;
          const svg = mermaidDiv.querySelector("svg");
          if (svg) {
            const pieMatch = mermaidCode.match(/pie\s+title[^\n]*\n([\s\S]*?)(?:\n```|$)/);
            if (pieMatch) {
              const dataLines = pieMatch[1].trim().split("\n");
              const labels = [];
              dataLines.forEach(function(line) {
                const trimmedLine = line.trim();
                if (trimmedLine) {
                  const match = trimmedLine.match(/"([^"]+)"\s*:\s*([\d.]+)/);
                  if (match) {
                    labels.push({
                      label: match[1].trim(),
                      value: parseFloat(match[2])
                    });
                  }
                }
              });
              const allTexts = Array.from(svg.querySelectorAll("text"));
              const legendLabels = [];
              allTexts.forEach(function(text) {
                const textContent = text.textContent.trim();
                if (textContent && !textContent.match(/^\d+\.?\d*%$/)) {
                  const matchingLabel = labels.find(function(l) {
                    return textContent === l.label || textContent.includes(l.label) || l.label.includes(textContent);
                  });
                  if (matchingLabel && legendLabels.indexOf(matchingLabel) === -1) {
                    legendLabels.push(matchingLabel);
                  }
                }
              });
              const finalLabels = legendLabels.length === labels.length ? legendLabels : labels;
              const allPaths = Array.from(svg.querySelectorAll("path[fill]"));
              const piePaths = allPaths.filter(function(path) {
                const pathLength = path.getTotalLength();
                return pathLength > 100;
              });
              piePaths.forEach(function(path, index) {
                if (index < finalLabels.length) {
                  const label = finalLabels[index].label;
                  const value = finalLabels[index].value;
                  const tooltipText = label + ": " + value + "%";
                  path.setAttribute("title", tooltipText);
                }
              });
            }
          }
        });
      }, 1e3);
    }
  });
})();
