import * as React from "react";
import Svg, { Defs, G, Path, Rect, ClipPath, SvgProps } from "react-native-svg";

type Props = SvgProps & { size?: number };

const BASE_SIZE = 32;

export function P2P({ size = BASE_SIZE, ...props }: Props): JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <Rect width="32" height="32" rx="8" fill="#1540DC" />
      <Rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="white" strokeOpacity="0.05" />
      <G>
        <Rect width="19.2" height="19.2" rx="9.6" x="6.4" y="6.4" fill="white" opacity="0" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.46999 14C6.43131 14 6.39999 14.0336 6.39999 14.075V16.325C6.39999 16.3664 6.43131 16.4 6.46999 16.4H11.93C11.9687 16.4 12 16.3664 12 16.325V14.075C12 14.0336 11.9687 14 11.93 14H6.46999ZM11.265 15.65C11.2843 15.65 11.3 15.6332 11.3 15.6125V14.7875C11.3 14.7668 11.2843 14.75 11.265 14.75H7.13499C7.11567 14.75 7.09999 14.7668 7.09999 14.7875V15.6125C7.09999 15.6332 7.11567 15.65 7.13499 15.65H11.265Z"
          fill="#D9EDED"
        />
        <Path
          d="M7.19999 17.28C7.19999 17.2358 7.16419 17.2 7.11999 17.2H6.47999C6.43579 17.2 6.39999 17.2358 6.39999 17.28V17.92C6.39999 17.9642 6.43579 18 6.47999 18H7.11999C7.16419 18 7.19999 17.9642 7.19999 17.92V17.28Z"
          fill="#D9EDED"
        />
        <Path
          d="M20.8 17.28C20.8 17.2358 20.7642 17.2 20.72 17.2H20.08C20.0358 17.2 20 17.2358 20 17.28V17.92C20 17.9642 20.0358 18 20.08 18H20.72C20.7642 18 20.8 17.9642 20.8 17.92V17.28Z"
          fill="#D9EDED"
        />
        <Path
          d="M12.8 17.28C12.8 17.2358 12.8358 17.2 12.88 17.2H19.12C19.1642 17.2 19.2 17.2358 19.2 17.28V17.92C19.2 17.9642 19.1642 18 19.12 18H12.88C12.8358 18 12.8 17.9642 12.8 17.92V17.28Z"
          fill="#D9EDED"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 14.075C20 14.0336 20.0313 14 20.07 14H25.53C25.5687 14 25.6 14.0336 25.6 14.075V16.325C25.6 16.3664 25.5687 16.4 25.53 16.4H20.07C20.0313 16.4 20 16.3664 20 16.325V14.075ZM24.865 14.75C24.8843 14.75 24.9 14.7668 24.9 14.7875V15.6125C24.9 15.6332 24.8843 15.65 24.865 15.65H20.735C20.7157 15.65 20.7 15.6332 20.7 15.6125V14.7875C20.7 14.7668 20.7157 14.75 20.735 14.75H24.865Z"
          fill="#D9EDED"
        />
        <Path
          d="M12.88 14C12.8358 14 12.8 14.0336 12.8 14.075V14.675C12.8 14.7164 12.8358 14.75 12.88 14.75H18.36C18.3821 14.75 18.4 14.7668 18.4 14.7875V15.6125C18.4 15.6332 18.3821 15.65 18.36 15.65H12.88C12.8358 15.65 12.8 15.6836 12.8 15.725V16.325C12.8 16.3664 12.8358 16.4 12.88 16.4H19.12C19.1642 16.4 19.2 16.3664 19.2 16.325V14.075C19.2 14.0336 19.1642 14 19.12 14H12.88Z"
          fill="#D9EDED"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2938_1971">
          <Rect width="19.2" height="19.2" fill="white" transform="translate(6.39999 6.3999)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default P2P;
