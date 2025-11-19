// Initialize Mermaid charts after page loads
document.addEventListener('DOMContentLoaded', function () {
    if (typeof mermaid !== 'undefined') {
        // Convert code blocks with language-mermaid to mermaid divs
        // Store original code for later tooltip extraction
        const mermaidCodeBlocks = document.querySelectorAll('code.language-mermaid');
        const mermaidData = [];
        mermaidCodeBlocks.forEach(function (block) {
            const pre = block.parentElement;
            const mermaidDiv = document.createElement('div');
            mermaidDiv.className = 'mermaid';
            const originalCode = block.textContent;
            mermaidDiv.textContent = originalCode;

            // Store the code for later tooltip extraction
            mermaidData.push({
                element: mermaidDiv,
                code: originalCode
            });

            pre.parentElement.replaceChild(mermaidDiv, pre);
        });

        // Initialize Mermaid with custom theme and colors
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            themeVariables: {
                // Customize pie chart colors
                pie1: '#FF6B6B',      // Red
                pie2: '#4ECDC4',     // Teal
                pie3: '#45B7D1',     // Blue
                pie4: '#FFA07A',     // Light Salmon
                pie5: '#98D8C8',     // Mint
                pie6: '#F7DC6F',     // Yellow
                pie7: '#BB8FCE',     // Purple
                pie8: '#85C1E2',     // Sky Blue
                pie9: '#F8B739',     // Orange
                pie10: '#52BE80',    // Green
                pie11: '#EC7063',    // Coral
                pie12: '#5DADE2'     // Light Blue
            }
        });

        // Add tooltips to pie chart slices after rendering
        setTimeout(function () {
            mermaidData.forEach(function (data) {
                const mermaidDiv = data.element;
                const mermaidCode = data.code;
                const svg = mermaidDiv.querySelector('svg');

                if (svg) {
                    // Parse pie chart data to extract labels and values
                    const pieMatch = mermaidCode.match(/pie\s+title[^\n]*\n([\s\S]*?)(?:\n```|$)/);
                    if (pieMatch) {
                        const dataLines = pieMatch[1].trim().split('\n');
                        const labels = [];

                        dataLines.forEach(function (line) {
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

                        // Get all text elements from the SVG (legend labels)
                        const allTexts = Array.from(svg.querySelectorAll('text'));
                        const legendLabels = [];

                        // Filter out percentage texts and get only label texts
                        allTexts.forEach(function (text) {
                            const textContent = text.textContent.trim();
                            if (textContent && !textContent.match(/^\d+\.?\d*%$/)) {
                                // Try to match with our parsed labels
                                const matchingLabel = labels.find(function (l) {
                                    return textContent === l.label ||
                                        textContent.includes(l.label) ||
                                        l.label.includes(textContent);
                                });
                                if (matchingLabel && legendLabels.indexOf(matchingLabel) === -1) {
                                    legendLabels.push(matchingLabel);
                                }
                            }
                        });

                        // Use parsed labels if we couldn't extract from legend
                        const finalLabels = legendLabels.length === labels.length ? legendLabels : labels;

                        // Find pie slice paths (large paths, not legend rectangles)
                        const allPaths = Array.from(svg.querySelectorAll('path[fill]'));
                        const piePaths = allPaths.filter(function (path) {
                            const pathLength = path.getTotalLength();
                            return pathLength > 100; // Pie slices are much larger than legend items
                        });

                        // Match paths with labels by order and add tooltips
                        piePaths.forEach(function (path, index) {
                            if (index < finalLabels.length) {
                                const label = finalLabels[index].label;
                                const value = finalLabels[index].value;
                                const tooltipText = label + ': ' + value + '%';

                                // Set title attribute for native browser tooltip
                                path.setAttribute('title', tooltipText);
                            }
                        });
                    }
                }
            });
        }, 1000); // Wait for Mermaid to finish rendering
    }
});
