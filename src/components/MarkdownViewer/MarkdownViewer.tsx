import MDEditor from "@uiw/react-md-editor";

import styles from "./MarkdownViewer.module.scss";

interface IMarkdownViewerProps {
  markdownContent: string;
}

export const MarkdownViewer = (props: IMarkdownViewerProps) => {
  const { markdownContent } = props;

  return (
    <div className={styles.markdownViewerWrapper}>
      <MDEditor.Markdown
        source={markdownContent}
        components={{
          a: ({ children, ...restProps }) => (
            <a {...restProps} target="_blank">
              {children}
            </a>
          ),
        }}
      />
    </div>
  );
};
