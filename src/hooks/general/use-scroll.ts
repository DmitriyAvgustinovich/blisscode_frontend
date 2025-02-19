import React from "react";

interface IUseScrollArgs {
  pageThreshold: number;
}

export const useScroll = (props: IUseScrollArgs) => {
  const { pageThreshold } = props;

  const [isShowScrollButton, setIsShowScrollButton] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollPercentage = (scrollTop / pageHeight) * 100;

      setIsShowScrollButton(scrollPercentage >= pageThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageThreshold]);

  const handleScrollToTop = React.useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return { isShowScrollButton, handleScrollToTop };
};
