export const getSyntaxLanguageName = (fileExtension?: string) => {
  switch (fileExtension) {
    case "py":
      return "python";
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "jsx":
      return "javascript";
    case "tsx":
      return "typescript";
    case "html":
      return "html";
    case "css":
      return "css";
    case "scss":
      return "scss";
    case "json":
      return "json";
    case "c":
      return "c";
    case "cpp":
      return "cpp";
    case "java":
      return "java";
    case "kt":
      return "kotlin";
    case "cs":
      return "csharp";
    case "rs":
      return "rust";
    case "go":
      return "go";
    case "rb":
      return "ruby";
    case "php":
      return "php";
    case "yaml":
      return "yaml";
    case "yml":
      return "yaml";
  }
};
