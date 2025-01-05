import { Typography } from "antd";

import styles from "./Main.module.scss";

export const Main = () => {
  return (
    <div className={styles.mainWrapper}>
      <Typography.Title className={styles.mainTitle}>
        👋 Привет!
      </Typography.Title>

      <Typography.Text className={styles.mainGreetingText}>
        Добро пожаловать в <b>BlissCodeBase</b> — помощник на пути в мир IT!
      </Typography.Text>

      <Typography.Title className={styles.mainSubTitle} level={2}>
        🔍 Что ты получишь?
      </Typography.Title>

      <Typography.Text className={styles.mainDescriptionText}>
        - Готовые решения из реальных проектов;
        <br />
        - Разнообразные задачи для практики навыков программирования;
        <br />
        - Ревью своего резюме;
        <br />
        - Достижения для резюме, которые увеличат конверсию приглашений на
        интервью с HR;
        <br />
        - Подписку на ежедневные задачи по программированию на любую тему;
        <br />- Доступ к базе знаний.
      </Typography.Text>

      <Typography.Title className={styles.mainSubTitle} level={2}>
        💻 Как это работает?
      </Typography.Title>

      <Typography.Text className={styles.mainDescriptionText}>
        1. Подпишись на наш{" "}
        <a
          className={styles.mainDescriptionTextLink}
          href="https://t.me/blisscodehub"
          target="_blank"
          rel="noopener noreferrer"
        >
          канал
        </a>
        ;
        <br />
        2. Выбери интересующее тебя направление;
        <br />
        3. Оплати подписку по одному из представленных тарифов;
        <br />
        4. Используй доступные инструменты для обучения и развития.
      </Typography.Text>

      <Typography.Title className={styles.mainSubTitle} level={2}>
        ❓ Зачем нужно?
      </Typography.Title>

      <Typography.Text className={styles.mainDescriptionText}>
        - Экономия времени ⏱️ - используй готовые best-practices решения;
        <br />
        - Улучшение навыков 💡 - практикуйся на задачах по темам, получай
        обратную связь;
        <br />
        - Карьерный рост 💪 - повышай шансы на трудоустройство, общайся с
        единомышленниками;
        <br />- Постоянное развитие 🎯 - решай новые задачи каждый день, изучай
        материалы для собеседований.
      </Typography.Text>

      <br />
      <br />
      <Typography.Text className={styles.mainDescriptionText}>
        🚀 Начни прямо сейчас! Перейди в Telegram бот{" "}
        <a
          className={styles.mainDescriptionTextLink}
          // todo: вписать продакшн версию
          href="https://t.me/BlissCodeBaseTest_bot"
          target="_blank"
          rel="noopener noreferrer"
        >
          BlissCodeBase
        </a>{" "}
        и выбери интересующее тебя направление.
      </Typography.Text>
    </div>
  );
};
