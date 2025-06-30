import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';

// A simple text wrapper function for PDF generation
async function wrapText(text: string, font: PDFFont, maxWidth: number, fontSize: number): Promise<string[]> {
    const lines: string[] = [];
    const paragraphs = text.split('\n');

    for (const paragraph of paragraphs) {
        if (paragraph.trim() === '') {
            lines.push('');
            continue;
        }
        let currentLine = '';
        const words = paragraph.split(' ');
        for (const word of words) {
            const testLine = currentLine === '' ? word : `${currentLine} ${word}`;
            const width = font.widthOfTextAtSize(testLine, fontSize);
            if (width < maxWidth) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
    }
    return lines;
}

export const genPdf = async (policyHtml: string): Promise<Uint8Array> => {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    // Add a blank page to the document
    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    const boldFontSize = 16;
    const margin = 50;
    const maxWidth = width - 2 * margin;
    let y = height - margin;

    // Convert basic HTML to plain text for PDF
    const plainText = policyHtml
        .replace(/<style>[\s\S]*?<\/style>/gi, '') // Remove style blocks
        .replace(/<body.*?>/gi, '')
        .replace(/<\/body>/gi, '')
        .replace(/<h1.*?>/gi, 'H1_START')
        .replace(/<\/h1>/gi, 'H1_END\n')
        .replace(/<h2.*?>/gi, 'H2_START')
        .replace(/<\/h2>/gi, 'H2_END\n')
        .replace(/<p.*?>/gi, '')
        .replace(/<\/p>/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&copy;/gi, '©')
        .replace(/&bull;/gi, '•')
        .replace(/<[^>]*>/g, '') // Strip remaining tags
        .trim();

    const lines = plainText.split('\n');

    for (let line of lines) {
        const isH1 = line.startsWith('H1_START');
        const isH2 = line.startsWith('H2_START');
        
        let font = timesRomanFont;
        let size = fontSize;
        let lineHeight = fontSize * 1.5;

        if (isH1) {
            line = line.replace('H1_START', '').replace('H1_END', '').trim();
            font = timesRomanBoldFont;
            size = boldFontSize * 1.2;
            lineHeight = size * 1.8;
        } else if (isH2) {
            line = line.replace('H2_START', '').replace('H2_END', '').trim();
            font = timesRomanBoldFont;
            size = boldFontSize;
            lineHeight = size * 1.5;
        }

        const wrappedLines = await wrapText(line, font, maxWidth, size);

        for (const wrappedLine of wrappedLines) {
            if (y < margin + lineHeight) {
                page = pdfDoc.addPage();
                y = height - margin;
            }
            page.drawText(wrappedLine, {
                x: margin,
                y,
                font,
                size,
                color: rgb(0, 0, 0),
            });
            y -= lineHeight;
        }
        
        // Add extra space after headings
        if (isH1 || isH2) {
            y -= lineHeight / 2;
        }
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
};