import { Button, Typography } from "antd";

import { PRODUCTION_TELEGRAM_BOT_URL } from "constants/general-constants";

import styles from "./Forbidden.module.scss";

export const Forbidden = () => {
  return (
    <div className={styles.forbiddenWrapper}>
      <Typography.Title className={styles.forbiddenTitle}>
        Недостаточно прав для просмотра страницы. Отсутствует подписка.
      </Typography.Title>

      <Button
        className={styles.forbiddenButton}
        type="primary"
        href={PRODUCTION_TELEGRAM_BOT_URL}
      >
        Вернуться в BlissCodeBase
      </Button>
    </div>
  );
};
