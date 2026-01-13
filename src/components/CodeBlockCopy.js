'use client';

import { useEffect } from 'react';

export default function CodeBlockCopy() {
  useEffect(() => {
    // Find all code blocks (pre elements containing code)
    const codeBlocks = document.querySelectorAll('.blog-post-content pre');

    codeBlocks.forEach((preElement) => {
      // Skip if already has a copy button
      if (preElement.querySelector('.code-copy-button')) {
        return;
      }

      // Get the code content
      const codeElement = preElement.querySelector('code');
      if (!codeElement) return;

      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-button';
      copyButton.setAttribute('aria-label', 'Copy code');
      copyButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

      // Add click handler
      copyButton.addEventListener('click', async () => {
        const codeText = codeElement.textContent || '';

        try {
          await navigator.clipboard.writeText(codeText);

          // Show success state
          copyButton.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          copyButton.classList.add('copied');

          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
            copyButton.classList.remove('copied');
          }, 2000);
        } catch {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = codeText;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            copyButton.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            copyButton.classList.add('copied');
            setTimeout(() => {
              copyButton.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
              copyButton.classList.remove('copied');
            }, 2000);
          } catch (fallbackErr) {
            console.error('Failed to copy:', fallbackErr);
          }
          document.body.removeChild(textArea);
        }
      });

      // Position the button
      preElement.style.position = 'relative';
      preElement.appendChild(copyButton);
    });

    // Cleanup function
    return () => {
      // Remove event listeners if needed
      codeBlocks.forEach((preElement) => {
        const button = preElement.querySelector('.code-copy-button');
        if (button) {
          button.replaceWith(button.cloneNode(true));
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
}
