import { findComponent, hasComponent } from '@/store'
import { morphIsland } from '@/morph'
import { on } from '@/hooks'

on('stream', (payload) => {
    if (payload.type !== 'island') return

    let { id, name, content } = payload

    if (! hasComponent(id)) return

    let component = findComponent(id)

    streamIsland(component, name, content)
})

export function streamIsland(component, name, content) {
    renderIsland(component, name, content)
}

on('effect', ({ component, effects }) => {
    let islands = effects.islands || []

    islands.forEach(island => {
        let { name, key, content } = island

        // Wrapping this in a double queueMicrotask. The first one puts it after all
        // other "effect" hooks, and the second one puts it after all reactive
        // Alpine effects (that are processed via flushJobs in scheduler).
        queueMicrotask(() => {
            queueMicrotask(() => {
                renderIsland(component, name, key, content)
            })
        })
    })
})

export function renderIsland(component, name, key, content) {
    let { startNode, endNode } = findIslandComments(component.el, name, key)

    if (!startNode || !endNode) return

    let { content: strippedContent, mode } = stripIslandCommentsAndExtractMode(content, name, key)

    let parentElement = startNode.parentElement
    let parentElementTag = parentElement ? parentElement.tagName.toLowerCase() : 'div'

    if (mode === 'append') {
        let container = document.createElement(parentElementTag)

        container.innerHTML = strippedContent

        // Insert each child node before the end node
        Array.from(container.childNodes).forEach(node => {
            endNode.parentNode.insertBefore(node, endNode)
        })

    } else if (mode === 'prepend') {
        let container = document.createElement(parentElementTag)

        container.innerHTML = strippedContent

        // Insert each child node after the start node in reverse order
        // to maintain correct ordering
        Array.from(container.childNodes)
            .reverse()
            .forEach(node => {
                startNode.parentNode.insertBefore(node, startNode.nextSibling)
            })
    } else if (mode === 'skip') {
        // console.log('skipping island', name)
    } else {
        morphIsland(component, startNode, endNode, strippedContent)
    }
}

export function skipIslandContents(el, toEl, skipUntil) {
    if (isStartMarker(el) && isStartMarker(toEl)) {
        let mode = extractIslandMode(toEl)

        if (['skip', 'once'].includes(mode)) {
            skipUntil(node => isEndMarker(node))
        } else if (mode === 'prepend') {
            // Collect all siblings until end marker
            let sibling = toEl.nextSibling
            let siblings = []
            while (sibling && !isEndMarker(sibling)) {
                siblings.push(sibling)
                sibling = sibling.nextSibling
            }

            // Insert collected siblings after the start marker
            siblings.forEach(node => {
                el.parentNode.insertBefore(node.cloneNode(true), el.nextSibling)
            })

            skipUntil(node => isEndMarker(node))
        } else if (mode === 'append') {
            // Find end marker of fromEl
            let endMarker = el.nextSibling
            while (endMarker && !isEndMarker(endMarker)) {
                endMarker = endMarker.nextSibling
            }

            // Collect all siblings until end marker
            let sibling = toEl.nextSibling
            let siblings = []
            while (sibling && !isEndMarker(sibling)) {
                siblings.push(sibling)
                sibling = sibling.nextSibling
            }

            // Insert collected siblings before the end marker
            siblings.forEach(node => {
                endMarker.parentNode.insertBefore(node.cloneNode(true), endMarker)
            })

            skipUntil(node => isEndMarker(node))
        }
    }
}

export function closestIslandName(el) {
    let current = el;

    while (current) {
        // Check previous siblings
        let sibling = current.previousSibling;

        let foundEndMarker = []
        while (sibling) {
            if (isEndMarker(sibling)) {
                // Keep iterating up until we find the start marker and skip it...
                foundEndMarker.push('a')
            }

            if (isStartMarker(sibling)) {
                if (foundEndMarker.length > 0) {
                    foundEndMarker.pop()
                } else {
                    return extractIslandName(sibling);
                }
            }

            sibling = sibling.previousSibling;
        }

        // No start marker found at this level or found end marker
        // Go up to parent unless we've hit the component root
        current = current.parentElement;

        if (current && current.hasAttribute('wire:id')) {
            break; // Stop at component root
        }
    }

    return null;
}

function isStartMarker(el) {
    return el.nodeType === 8 && el.textContent.startsWith('[if ISLAND')
}

function isEndMarker(el) {
    return el.nodeType === 8 && el.textContent.startsWith('[if ENDISLAND')
}

function extractIslandMode(el) {
    let mode = el.textContent.match(/\[if ISLAND:.*?:.*?:(\w+)\]/)?.[1]

    return mode || 'replace'
}

function extractIslandName(el) {
    let name = el.textContent.match(/\[if ISLAND:(\w+):.*?:.*?\]/)?.[1]

    return name || 'default'
}

function extractIslandKey(el) {
    let key = el.textContent.match(/\[if ISLAND:.*?:(\w+):.*?\]/)?.[1]

    return key || 'default'
}

function stripIslandCommentsAndExtractMode(content, islandName, islandKey) {
    // Extract mode from start comment if present
    let mode = 'replace'
    const modeMatch = content.match(new RegExp(`\\[if ISLAND:${islandName}:${islandKey}:(\\w+)\\]><\\!\\[endif\\]`))
    if (modeMatch) {
        mode = modeMatch[1]
    }

    // Remove the start and end comment markers
    let startComment = new RegExp(`<!--\\[if ISLAND:${islandName}:${islandKey}(?::\\w+)?\\]><\\!\\[endif\\]-->`)
    let endComment = new RegExp(`<!--\\[if ENDISLAND:${islandName}:${islandKey}(?::\\w+)?\\]><\\!\\[endif\\]-->`)

    // Strip out the comments from the content
    let stripped = content
        .replace(startComment, '')
        .replace(endComment, '')

    return {
        content: stripped.trim(),
        mode
    }
}

function findIslandComments(rootEl, islandName, islandKey) {
    let startNode = null
    let endNode = null

    walkElements(rootEl, (el, skip) => {
        // Skip nested Livewire components
        if (el.hasAttribute && el.hasAttribute('wire:id') && el !== rootEl) {
            return skip()
        }

        // Check all child nodes (including text and comment nodes)
        Array.from(el.childNodes).forEach(node => {
            if (node.nodeType === Node.COMMENT_NODE) {
                if (node.textContent.match(new RegExp(`\\[if ISLAND:${islandName}:${islandKey}(?::\\w+)?\\]><\\!\\[endif\\]`))) {
                    startNode = node
                }

                if (node.textContent.match(new RegExp(`\\[if ENDISLAND:${islandName}:${islandKey}(?::\\w+)?\\]><\\!\\[endif\\]`))) {
                    endNode = node
                }
            }
        })
    })

    return { startNode, endNode }
}

function walkElements(el, callback) {
    let skip = false
    callback(el, () => skip = true)

    if (skip) return

    Array.from(el.children).forEach(child => {
        walkElements(child, callback)
    })
}
