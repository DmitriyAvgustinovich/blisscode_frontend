import { Typography } from "antd";
import { useGetSearchParams } from "hooks";
import { Link } from "react-router-dom";

import { LoadingOutlined } from "@ant-design/icons";

import { TextWithLine } from "components/TextWithLine/TextWithLine";

import { useGetGptApiUsageLimitsByHashedTelegramIdQuery } from "store/api/gpt_api_usage/gpt-api-usage-api";

import { PRODUCTION_TELEGRAM_BOT_URL } from "constants/general-constants";

import styles from "./UsageGptLimits.module.scss";

export const UsageGptLimits = () => {
  const { authUserId } = useGetSearchParams();

  const {
    data: gptApiUsageLimitsData,
    isLoading: isGptApiUsageLimitsDataLoading,
  } = useGetGptApiUsageLimitsByHashedTelegramIdQuery({
    hashedTelegramId: authUserId,
  });

  return (
    <>
      <Typography.Text className={styles.usageGptLimitsText}>
        В этом разделе можно ознакомиться с лимитами использования ИИ в боте{" "}
        <Link
          className={styles.usageGptLimitsBotLink}
          to={PRODUCTION_TELEGRAM_BOT_URL}
          target="_blank"
        >
          BlissCodeBase
        </Link>
      </Typography.Text>

      {isGptApiUsageLimitsDataLoading ? (
        <Typography.Text className={styles.usageGptLimitsText}>
          <LoadingOutlined /> Загрузка...
        </Typography.Text>
      ) : (
        <div className={styles.usageGptLimitsWrapper}>
          {gptApiUsageLimitsData?.map((gptApiUsageLimit) => (
            <div
              key={gptApiUsageLimit.gptApiType}
              className={styles.usageGptLimitItemWrapper}
            >
              <TextWithLine elements={[gptApiUsageLimit.label]} />

              <Typography.Text className={styles.usageGptLimitsTextA}>
                Осталось использований: <b>{gptApiUsageLimit.remaining}</b> из{" "}
                <b>{gptApiUsageLimit.limit}</b>
              </Typography.Text>

              <Typography.Text className={styles.usageGptLimitsTextA}>
                Использовано сегодня: <b>{gptApiUsageLimit.usedToday}</b>
              </Typography.Text>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
