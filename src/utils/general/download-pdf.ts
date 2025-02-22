import html2pdf from "html2pdf.js";

const ELEMENT_STYLES = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
  },
  paragraph: {
    marginBottom: "10px",
    fontSize: "16px",
    lineHeight: "1.5",
  },
};

interface IHtml2PdfOptions {
  margin?: number | number[];
  filename?: string;
  image?: {
    type?: string;
    quality?: number;
  };
  html2canvas?: {
    scale?: number;
    useCORS?: boolean;
    letterRendering?: boolean;
  };
  jsPDF?: {
    unit?: string;
    format?: string;
    orientation?: string;
  };
  pagebreak?: {
    mode?: string;
    before?: string;
    after?: string[];
    avoid?: string[];
  };
}

interface IDownloadPdfArgs {
  dataStringForPdf: string;
  fileNameText: string;
}

export const downloadPdf = (args: IDownloadPdfArgs) => {
  const { dataStringForPdf, fileNameText } = args;

  const element = document.createElement("div");
  Object.assign(element.style, ELEMENT_STYLES.container);

  const content = dataStringForPdf
    // Удаляем заголовки Markdown (например, # Заголовок, ## Подзаголовок)
    .replace(/^#+ /gm, "")
    // Заменяем элементы списка Markdown на маркеры
    .replace(/^- /gm, "• ")
    // Преобразуем синтаксис жирного шрифта Markdown в HTML-теги strong
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Удаляем квадратные скобки
    .replace(/\[|\]/g, "")
    // Заменяем горизонтальные линии Markdown на HTML-элементы hr
    .replace(/---/g, '<hr style="border-top: 1px solid #000; margin: 10px 0;">')
    // Добавляем поддержку символа кавычек >
    .replace(
      /^> (.+)$/gm,
      '<blockquote style="border-left: 2px solid #000; padding-left: 10px; margin-left: 0;">$1</blockquote>'
    );

  const sections = content.split("\n").filter((line: string) => line.trim());

  sections.forEach((section: string) => {
    const p = document.createElement("p");
    Object.assign(p.style, ELEMENT_STYLES.paragraph);
    p.innerHTML = section;
    element.appendChild(p);
  });

  const options: IHtml2PdfOptions = {
    margin: [10, 10],
    filename: `${fileNameText}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: "avoid-all", before: "#page-break" },
  };

  html2pdf().from(element).set(options).save();
};
