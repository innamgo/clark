document.addEventListener('DOMContentLoaded', () => {
    // Initialize Mermaid
    mermaid.initialize({ 
        startOnLoad: false, 
        theme: 'default',
        securityLevel: 'loose',
    });

    const fileUpload = document.getElementById('file-upload');
    const fileNameDisplay = document.getElementById('file-name');
    const contentDisplay = document.getElementById('content-display');

    fileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) {
            fileNameDisplay.textContent = 'No file selected';
            return;
        }

        fileNameDisplay.textContent = file.name;

        // Show loading state
        contentDisplay.innerHTML = `
            <div class="placeholder">
                <div class="placeholder-content">
                    <svg class="placeholder-icon" style="animation: spin 1s linear infinite;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    <p>Processing Markdown...</p>
                </div>
            </div>
            <style>@keyframes spin { 100% { transform: rotate(360deg); } }</style>
        `;

        const reader = new FileReader();
        reader.onload = function(e) {
            const markdownContent = e.target.result;
            // Add a small delay for UI responsiveness
            setTimeout(() => renderContent(markdownContent), 100);
        };
        reader.readAsText(file);
    });

    async function renderContent(markdown) {
        try {
            // Render markdown to HTML using Marked.js
            const htmlContent = marked.parse(markdown);
            contentDisplay.innerHTML = htmlContent;
            
            // Find all Mermaid code blocks
            // marked generates: <pre><code class="language-mermaid">...</code></pre>
            const mermaidBlocks = contentDisplay.querySelectorAll('code.language-mermaid');
            
            if (mermaidBlocks.length === 0) {
                return; // No mermaid diagrams found
            }

            // Replace each code block with a mermaid div
            Array.from(mermaidBlocks).forEach((block, index) => {
                const pre = block.parentElement;
                const mermaidCode = block.textContent;
                
                // Create wrapper and mermaid div
                const wrapper = document.createElement('div');
                wrapper.className = 'mermaid-wrapper';
                
                const mermaidDiv = document.createElement('div');
                mermaidDiv.className = 'mermaid';
                mermaidDiv.id = `mermaid-${index}`;
                mermaidDiv.textContent = mermaidCode;
                
                wrapper.appendChild(mermaidDiv);
                
                // Replace the <pre> tag with our new wrapper
                pre.parentNode.replaceChild(wrapper, pre);
            });
            
            // Re-run mermaid to render all the newly added divs
            await mermaid.run({
                nodes: document.querySelectorAll('.mermaid'),
            });
            
            // Add pan and zoom feature to the rendered SVGs
            const svgs = document.querySelectorAll('.mermaid svg');
            svgs.forEach((svg) => {
                // Remove absolute max-width to let svg-pan-zoom handle scaling
                svg.style.maxWidth = '100%';
                svg.style.height = '100%'; 
                
                svgPanZoom(svg, {
                    zoomEnabled: true,
                    controlIconsEnabled: true,
                    fit: true,
                    center: true,
                    minZoom: 0.1,
                    maxZoom: 20
                });
            });
            
        } catch (error) {
            console.error("Error rendering content:", error);
            contentDisplay.innerHTML = `
                <div style="background-color: #fee2e2; color: #991b1b; padding: 1.5rem; border: 1px solid #f87171; border-radius: 8px; margin-bottom: 2rem;">
                    <h3 style="margin-top:0; color:#b91c1c; display:flex; align-items:center; gap:0.5rem;">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Error Document Rendering
                    </h3>
                    <p style="margin-bottom:0; font-family:monospace; background:#fff; padding:1rem; border-radius:4px; border:1px solid #fca5a5;">${error.message}</p>
                </div>
                <div class="markdown-body">
                    ${marked.parse(markdown)}
                </div>
            `;
        }
    }
});
