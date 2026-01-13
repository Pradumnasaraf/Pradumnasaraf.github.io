'use client';

import { useEffect } from 'react';

const COPY_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

const CHECK_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

export default function CodeBlockCopy() {
  useEffect(() => {
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('.blog-post-content pre');

      codeBlocks.forEach((preElement) => {
        if (preElement.querySelector('.code-copy-button')) {
          return;
        }

        const codeElement = preElement.querySelector('code');
        if (!codeElement) return;

        const copyButton = document.createElement('button');
        copyButton.className = 'code-copy-button';
        copyButton.setAttribute('aria-label', 'Copy code');
        copyButton.setAttribute('type', 'button');

        copyButton.innerHTML = `<span class="code-copy-icon">${COPY_ICON}</span><span class="code-copy-text">Copy</span>`;

        const showCopied = () => {
          copyButton.innerHTML = `<span class="code-copy-icon">${CHECK_ICON}</span><span class="code-copy-text">Copied!</span>`;
          copyButton.classList.add('copied');
          setTimeout(() => {
            copyButton.innerHTML = `<span class="code-copy-icon">${COPY_ICON}</span><span class="code-copy-text">Copy</span>`;
            copyButton.classList.remove('copied');
          }, 2000);
        };

        const handleCopy = async (e) => {
          e.preventDefault();
          e.stopPropagation();

          const codeText = codeElement.textContent || '';

          try {
            await navigator.clipboard.writeText(codeText);
            showCopied();
          } catch {
            const textArea = document.createElement('textarea');
            textArea.value = codeText;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
              const successful = document.execCommand('copy');
              if (successful) {
                showCopied();
              }
            } catch {
              // Clipboard not supported
            }
            document.body.removeChild(textArea);
          }
        };

        copyButton.addEventListener('click', handleCopy);

        preElement.style.position = 'relative';
        preElement.appendChild(copyButton);
      });
    };

    addCopyButtons();

    const observer = new MutationObserver(() => {
      addCopyButtons();
    });

    const blogContent = document.querySelector('.blog-post-content');
    if (blogContent) {
      observer.observe(blogContent, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
