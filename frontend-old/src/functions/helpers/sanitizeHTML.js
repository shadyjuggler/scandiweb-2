import DOMPurify from 'dompurify';

const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html);
}

export default sanitizeHtml;