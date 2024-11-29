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
          },
          Input: {
            algorithm: true,
            activeBorderColor: "var(--folders-bg-color)",
            hoverBorderColor: "var(--folders-bg-color)",
            activeShadow: "var(--folders-bg-color)",
          },
          Modal: {
            algorithm: true,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
