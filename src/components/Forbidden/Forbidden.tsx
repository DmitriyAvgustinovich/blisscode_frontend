import { Button, Typography } from "antd";

import styles from "./Forbidden.module.scss";

export const Forbidden = () => {
  return (
    <div className={styles.forbiddenWrapper}>
      <Typography.Title className={styles.forbiddenTitle}>
        Недостаточно прав для просмотра страницы
      </Typography.Title>

      <Button
        className={styles.forbiddenButton}
        type="primary"
        // todo: вписать продакшн версию
        href="https://t.me/BlissCodeBaseTest_bot"
      >
        Вернуться в BlissCodeBase
      </Button>
    </div>
  );
};
