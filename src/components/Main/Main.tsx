import { Typography } from "antd";

import styles from "./Main.module.scss";

export const Main = () => {
  return (
    <div className={styles.mainWrapper}>
      <Typography.Title className={styles.mainTitle}>
        👋 Привет!
      </Typography.Title>

      <Typography.Text className={styles.mainGreetingText}>
        Добро пожаловать в наш бот <b>BlissCodeBase</b> — помощник на пути в мир
        IT!
      </Typography.Text>

      <Typography.Title className={styles.mainSubTitle} level={2}>
        🔍 Какие возможности ты получаешь?
      </Typography.Title>

      <Typography.Text className={styles.mainDescriptionText}>
        - Искать готовые решения задач из реальных проектов;
        <br />
        - Решать разнообразные задачи для практики навыков программирования;
        <br />
        - Получить ревью своего резюме;
        <br />
        - Генерировать с помощью ИИ достижения для резюме, которые увеличат
        конверсию приглашений на интервью с HR;
        <br />- Подписка на ежедневные задачи по программированию по заданной
        теме.
      </Typography.Text>

      <Typography.Title className={styles.mainSubTitle} level={2}>
        💻 Как это работает?
      </Typography.Title>

      <Typography.Text className={styles.mainDescriptionText}>
        1) Подпишись на наш канал;
        <br />
        2) Выбери интересующее тебя направление разработки;
        <br />
        3) Используй доступные инструменты для обучения и развития.
      </Typography.Text>

      <Typography.Title className={styles.mainSubTitle} level={2}>
        🔥 Зачем это нужно?
      </Typography.Title>

      <Typography.Text className={styles.mainDescriptionText}>
        - <b>Экономия времени</b> ⏱️ — используй готовые best-practices решения;
        <br />- <b>Улучшение навыков</b> 💡 — практикуйся на задачах по темам,
        получай обратную связь по резюме и роадмапу;
        <br />- <b>Карьерный рост</b> 💪 — повышай шансы на трудоустройство,
        общайся с заряженными на успех единомышленниками;
        <br />- <b>Постоянное развитие</b> 🎯 — решай новые задачи каждый день,
        изучай материалы для собеседований, чтобы получить свой лучший оффер.
      </Typography.Text>

      <br />
      <br />
      <Typography.Text className={styles.mainDescriptionText}>
        🚀 Начни прямо сейчас! Перейди в{" "}
        <a
          className={styles.mainDescriptionTextLink}
          // todo: вписать продакшн версию
          href="https://t.me/BlissCodeBaseTest_bot"
        >
          BlissCodeBase
        </a>{" "}
        и выбери интерисующее тебя направление.
      </Typography.Text>
    </div>
  );
};
