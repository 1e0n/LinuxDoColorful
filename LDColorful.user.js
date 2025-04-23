// ==UserScript==
// @name         LDColorful
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Color-code topics on linux.do based on category level (Lv1, Lv2, Lv3) with customizable colors via menu.
// @author       Cascade via User Request
// @match        https://linux.do/
// @match        https://linux.do
// @downloadURL  https://raw.githubusercontent.com/1e0n/LinuxDoColorful/main/LDColorful.user.js
// @updateURL    https://raw.githubusercontent.com/1e0n/LinuxDoColorful/main/LDColorful.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // --- Configuration ---
    const defaultColors = {
        lv3: '#FF8C00', // Changed to DarkOrange (bright orange)
        lv2: '#87CEFA', // Changed from 'blue' to LightSkyBlue
        lv1: 'inherit', // 'inherit' means keep the default forum style
        lv0: 'inherit'
    };

    // --- Helper Functions ---
    function getColor(level) {
        // Ensure level key matches the keys in defaultColors
        const levelKey = `lv${level}`;
        return GM_getValue(`color_${levelKey}`, defaultColors[levelKey] || 'inherit');
    }

    function setColor(level, color) {
        const levelKey = `lv${level}`;
        GM_setValue(`color_${levelKey}`, color);
    }

    // --- Core Logic ---
    function applyColors() {
        // console.log('LDColorful: Applying colors...');
        const topics = document.querySelectorAll('tr.topic-list-item');

        topics.forEach(topic => {
            const categoryBadge = topic.querySelector('.badge-category__name');
            const titleLink = topic.querySelector('a.raw-topic-link'); // More specific selector for the title link

            if (categoryBadge && titleLink) {
                const categoryText = categoryBadge.textContent.trim();
                let level = 0; // Default level

                if (categoryText.includes('Lv3')) {
                    level = 3;
                } else if (categoryText.includes('Lv2')) {
                    level = 2;
                } else if (categoryText.includes('Lv1')) {
                    level = 1;
                }
                // else level remains 0

                const color = getColor(level);
                // console.log(`LDColorful: Topic "${titleLink.textContent.trim()}", Category "${categoryText}", Level ${level}, Color ${color}`);

                // Apply or reset color
                if (color && color !== 'inherit') {
                    titleLink.style.color = color;
                } else {
                    // Reset to default style by removing the inline style
                    titleLink.style.color = '';
                }
            } else {
                 // Optional: Log if elements are missing for debugging
                 // if (!categoryBadge) console.log('LDColorful: Missing category badge for a topic.');
                 // if (!titleLink) console.log('LDColorful: Missing title link for a topic.');
            }
        });
        // console.log('LDColorful: Finished applying colors.');
    }

    // --- Menu Commands ---
    function createColorChangeCommand(level, levelName) {
        GM_registerMenuCommand(`设置 ${levelName} 颜色`, () => {
            const current_color = getColor(level);
            const promptMessage = `请输入 ${levelName} 帖子的颜色 (例如: red, #FF0000, inherit):
当前颜色: ${current_color}`;
            const newColorInput = prompt(promptMessage, current_color);

            // 用户取消
            if (newColorInput === null) {
                return;
            }

            const newColor = newColorInput.trim();

            // 设置新颜色或在输入为空或 'inherit' 时重置为默认值
            if (newColor === '' || newColor.toLowerCase() === 'inherit') {
                setColor(level, defaultColors[`lv${level}`]);
                 alert(`${levelName} 颜色已重置为默认 (${defaultColors[`lv${level}`]})。请刷新页面查看效果。`);
            } else {
                setColor(level, newColor);
                alert(`${levelName} 颜色已设置为 ${newColor}。请刷新页面查看效果。`);
            }
            // 立即重新应用颜色以尽可能看到效果（可能需要刷新才能完全生效）
            applyColors();
        });
    }

    // 创建各级别菜单项
    createColorChangeCommand(3, 'Lv3');
    createColorChangeCommand(2, 'Lv2');
    createColorChangeCommand(1, 'Lv1');
    createColorChangeCommand(0, '其他 (Lv0)');

    // --- Dynamic Content Handling ---
    // Observe the main topic list container for changes
    // Adjust selector based on actual Discourse structure if needed
    const targetNode = document.querySelector('div#main-outlet') || document.body; // More robust target
    if (!targetNode) {
        console.error("LDColorful: Could not find target node for MutationObserver.");
        return; // Exit if target isn't found
    }

    const observerConfig = { childList: true, subtree: true };

    const observerCallback = function(mutationsList, observer) {
        let needsReapply = false;
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Check if added nodes contain topic lists or relevant elements
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the node itself or its descendants match the topic rows
                        if (node.matches && (node.matches('tr.topic-list-item') || node.querySelector('tr.topic-list-item'))) {
                            needsReapply = true;
                        }
                         // Also check for common Discourse container updates
                        else if (node.matches && (node.matches('.topic-list') || node.querySelector('.topic-list'))) {
                           needsReapply = true;
                        }
                    }
                });
            }
            // If we need to reapply, no need to check further mutations in this batch
            if (needsReapply) break;
        }

        if (needsReapply) {
            // console.log('LDColorful: Detected changes, re-applying colors.');
            // Use a small delay to allow the DOM to settle after changes
            setTimeout(applyColors, 100);
        }
    };

    const observer = new MutationObserver(observerCallback);

    // --- Initialization ---
    // Run initial application
    applyColors();
    // Start observing for dynamic changes
    observer.observe(targetNode, observerConfig);

    // Optional: Add listener for specific Discourse events if known (more efficient)
    // document.addEventListener('discourse-topic-list-updated', applyColors);

})();