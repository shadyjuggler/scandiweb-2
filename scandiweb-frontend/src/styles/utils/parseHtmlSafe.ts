import DOMPurify from "dompurify";
import parse from "html-react-parser";

export function parseHtmlSafe(htmlString: string) {
    const cleanHtml = DOMPurify.sanitize(htmlString, {
        ALLOWED_TAGS: ["h1", "h2", "p"],
    });

    return parse(cleanHtml);
}
