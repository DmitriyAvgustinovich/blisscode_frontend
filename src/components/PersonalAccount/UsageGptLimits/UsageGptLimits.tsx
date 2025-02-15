import { Typography } from "antd";
import { useGetSearchParams } from "hooks";
import { Link } from "react-router-dom";

import { LoadingOutlined } from "@ant-design/icons";

import { TextWithLine } from "components/TextWithLine/TextWithLine";

import { useGetGptApiUsageLimitsByHashedTelegramIdQuery } from "store/api/gpt_api_usage/gpt-api-usage-api";

import { PRODUCTION_TELEGRAM_BOT_URL } from "constants/general-constants";

import { getCurrentDate } from "utils";

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
      <Typography.Text className={styles.usageGptLimitsTitle}>
        В этом разделе можно ознакомиться с лимитами использования ИИ в боте{" "}
        <Link
          className={styles.usageGptLimitsBotLink}
          to={PRODUCTION_TELEGRAM_BOT_URL}
        >
          BlissCodeBase
        </Link>
      </Typography.Text>

      {isGptApiUsageLimitsDataLoading ? (
        <Typography.Text className={styles.usageGptLimitsTitle}>
          <LoadingOutlined /> Загрузка...
        </Typography.Text>
      ) : (
        <div className={styles.usageGptLimitsWrapper}>
          <div className={styles.usageGptLimitsDateWrapper}>
            <TextWithLine
              elements={[
                <>
                  Сегодняшняя дата: <b>{getCurrentDate()}</b>
                </>,
              ]}
            />
          </div>

          <div className={styles.usageGptLimitItemsWrapper}>
            {gptApiUsageLimitsData?.map((gptApiUsageLimit) => (
              <div
                key={gptApiUsageLimit.gptApiType}
                className={styles.usageGptLimitItemWrapper}
              >
                <TextWithLine
                  elements={[
                    <>{gptApiUsageLimit.label}</>,
                    <>
                      Осталось использований:{" "}
                      <b>{gptApiUsageLimit.remaining}</b> из{" "}
                      <b>{gptApiUsageLimit.limit}</b>
                    </>,
                    <>
                      Использовано сегодня: <b>{gptApiUsageLimit.usedToday}</b>
                    </>,
                  ]}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
