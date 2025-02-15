import React from "react";

import { Typography } from "antd";

import styles from "./TextWithLine.module.scss";

interface ITextWithLineProps {
  elements: React.ReactNode[];
  isColumn?: boolean;
  className?: string;
}

export const TextWithLine = (props: ITextWithLineProps) => {
  const { elements, className, isColumn = true } = props;

  const inlineElements = elements.map((element, index) => (
    <Typography.Text
      key={index}
      className={`${styles.textWithLine} ${className}`}
    >
      {element}
    </Typography.Text>
  ));

  return isColumn ? (
    <div className={styles.textWithLineColumn}>{inlineElements}</div>
  ) : (
    <>{inlineElements}</>
  );
};
