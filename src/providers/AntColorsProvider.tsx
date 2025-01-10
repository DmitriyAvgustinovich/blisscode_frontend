import { ConfigProvider } from "antd";

interface IAntColorsProviderProps {
  children: React.ReactNode;
}

export const AntColorsProvider = (props: IAntColorsProviderProps) => {
  const { children } = props;

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            algorithm: true,
            colorPrimary: "#715fde",
          },
          Input: {
            algorithm: true,
            colorPrimary: "#715fde",
            activeBorderColor: "var(--black-bg-color)",
            hoverBorderColor: "var(--black-bg-color)",
            activeShadow: "var(--black-bg-color)",
            colorBgContainerDisabled: "var(--white-bg-color)",
            colorTextDisabled: "var(--black-text-color)",
          },
          Tabs: {
            algorithm: true,
            colorPrimary: "#715fde",
            colorText: "var(--white-text-color)",
          },
          Modal: {
            algorithm: true,
            headerBg: "#333333",
            contentBg: "#333333",
            titleColor: "var(--white-text-color)",
            colorIcon: "var(--white-text-color)",
            colorIconHover: "var(--white-text-color)",
          },
          Table: {
            algorithm: true,
            colorBgContainer: "#333333",
            colorText: "var(--white-text-color)",
          },
          Pagination: {
            algorithm: true,
            colorBgContainer: "#333333",
            colorText: "#ffffff !important",
          },
          Form: {
            algorithm: true,
            colorText: "var(--white-text-color)",
          },
          Upload: {
            algorithm: true,
            colorText: "var(--white-text-color)",
          },
          Card: {
            algorithm: true,
            colorBgContainer: "var(--gray-bg-color)",
            colorText: "var(--white-text-color)",
            colorTextDescription: "var(--white-text-color)",
          },
          Collapse: {
            algorithm: true,
            colorText: "var(--white-text-color)",
            contentBg: "var(--gray-bg-color)",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
