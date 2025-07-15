declare module "react-input-mask" {
  import * as React from "react";

  interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string | null;
    alwaysShowMask?: boolean;
    beforeMaskedValueChange?: (
      newState: {
        value: string;
        selection: { start: number; end: number };
      },
      oldState: {
        value: string;
        selection: { start: number; end: number };
      },
      userInput: string,
      maskOptions: any
    ) => {
      value: string;
      selection: { start: number; end: number };
    };
    children?: (
      props: React.InputHTMLAttributes<HTMLInputElement>
    ) => React.ReactElement;
  }

  const InputMask: React.FC<InputMaskProps>;

  export default InputMask;
}
