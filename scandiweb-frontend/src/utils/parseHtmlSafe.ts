import DOMPurify from "dompurify";
import parse from "html-react-parser";

/**
 * Safely parses an HTML string and returns React elements.
 *
 * @param htmlString - The raw HTML string to sanitize and parse.
 * @returns React nodes created from the sanitized HTML.
 *
 * @example
 * const html = "<h1>Be</h1><script>alert('you hacked by shadyjuggler!')</script><p>aware!</p>";
 * const safeContent = parseHtmlSafe(html);
 * //Renders: <h1>Be</h1><p>aware!</p>
 */
export function parseHtmlSafe(htmlString: string) {
    const cleanHtml = DOMPurify.sanitize(htmlString, {
        ALLOWED_TAGS: ["h1", "h2", "p"]
    });

    return parse(cleanHtml);
}
