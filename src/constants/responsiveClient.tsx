export const device = {
  mobile: "480px",
  tablet: "820px",
  desktop: "1024px",
};

export const min = (size: string) => `@media screen and (min-width: ${size})`;

export const max = (size: string) => `@media screen and (max-width: ${size})`;
