import * as React from "react";
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
  SvgProps,
} from "react-native-svg";

type Props = SvgProps & { size?: number };

export function RocketPool({ size = 32, ...props }: Props): JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <Rect width="32" height="32" rx="8" fill="url(#paint0_linear_2938_2011)" />
      <Rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="white" strokeOpacity="0.05" />
      <G clipPath="url(#clip0_2938_2011)">
        <Rect
          x="6.39999"
          y="6.3999"
          width="19.2"
          height="19.2"
          rx="9.6"
          fill="url(#paint1_radial_2938_2011)"
        />
        <Path
          opacity="0.2"
          d="M6.51477 11.8573C6.51477 11.653 6.67987 11.4873 6.88353 11.4873H11.9233C12.1269 11.4873 12.292 11.653 12.292 11.8573V20.4587C12.292 20.663 12.1269 20.8286 11.9233 20.8286H6.88353C6.67987 20.8286 6.51477 20.663 6.51477 20.4587V11.8573Z"
          fill="#D9EDED"
        />
        <Path
          opacity="0.2"
          d="M17.9543 19.3008C17.9543 19.0969 18.1197 18.9316 18.3238 18.9316H24.9141C25.1182 18.9316 25.2836 19.0969 25.2836 19.3008V22.5002C25.2836 22.7041 25.1182 22.8694 24.9141 22.8694H18.3238C18.1197 22.8694 17.9543 22.7041 17.9543 22.5002V19.3008Z"
          fill="#E74310"
        />
        <Path
          opacity="0.2"
          d="M22.2422 20.2827C22.4456 20.2827 22.6106 20.4481 22.6106 20.652V26.8691C22.6106 27.073 22.4456 27.2384 22.2422 27.2384H19.8172C19.6138 27.2384 19.4489 27.073 19.4489 26.8691V20.652C19.4489 20.4481 19.6138 20.2827 19.8172 20.2827H22.2422Z"
          fill="#DF3600"
        />
        <Path
          opacity="0.1"
          d="M14.3083 12.7808C14.5123 12.7808 14.6776 12.946 14.6776 13.1499V18.1026C14.6776 18.3065 14.5123 18.4718 14.3083 18.4718H11.5691C11.3652 18.4718 11.1998 18.3065 11.1998 18.1026V13.1499C11.1998 12.946 11.3652 12.7808 11.5691 12.7808H14.3083Z"
          fill="url(#paint2_linear_2938_2011)"
        />
        <Path
          opacity="0.1"
          d="M8.58423 14.2701C8.58423 14.0668 8.74955 13.9019 8.95349 13.9019H13.4461C13.65 13.9019 13.8154 14.0668 13.8154 14.2701V18.9659C13.8154 19.1693 13.65 19.3342 13.4461 19.3342H8.95349C8.74955 19.3342 8.58423 19.1693 8.58423 18.9659V14.2701Z"
          fill="url(#paint3_linear_2938_2011)"
        />
        <Path
          opacity="0.2"
          d="M25.2877 9.30273C25.4918 9.30273 25.6573 9.46809 25.6573 9.67206V15.8891C25.6573 16.0931 25.4918 16.2584 25.2877 16.2584H19.5598C19.3557 16.2584 19.1902 16.0931 19.1902 15.8891V9.67206C19.1902 9.46809 19.3557 9.30273 19.5598 9.30273H25.2877Z"
          fill="#FF9776"
        />
        <Path
          opacity="0.2"
          d="M21.8103 5.19287C22.0141 5.19287 22.1794 5.35796 22.1794 5.56162V12.3834C22.1794 12.587 22.0141 12.7522 21.8103 12.7522H18.6109C18.407 12.7522 18.2417 12.587 18.2417 12.3834V5.56162C18.2417 5.35796 18.407 5.19287 18.6109 5.19287H21.8103Z"
          fill="#FFCA8C"
        />
        <Path
          opacity="0.2"
          d="M23.4768 6.42871C23.6809 6.42871 23.8465 6.59396 23.8465 6.7978V14.3949C23.8465 14.5988 23.6809 14.764 23.4768 14.764H16.5133C16.3091 14.764 16.1435 14.5988 16.1435 14.3949V6.7978C16.1435 6.59396 16.3091 6.42871 16.5133 6.42871H23.4768Z"
          fill="url(#paint4_linear_2938_2011)"
        />
        <Path
          opacity="0.1"
          d="M13.3574 4.27295C13.5627 4.27295 13.7291 4.43794 13.7291 4.64146V9.73917C13.7291 9.94268 13.5627 10.1077 13.3574 10.1077H10.9104C10.7052 10.1077 10.5387 9.94268 10.5387 9.73917V4.64146C10.5387 4.43794 10.7052 4.27295 10.9104 4.27295H13.3574Z"
          fill="#DF3600"
        />
        <Path
          opacity="0.1"
          d="M13.6199 20.1099C13.8231 20.1099 13.9878 20.2754 13.9878 20.4796V24.8851C13.9878 25.0892 13.8231 25.2548 13.6199 25.2548H7.45753C7.25435 25.2548 7.08963 25.0892 7.08963 24.8851V20.4796C7.08963 20.2754 7.25435 20.1099 7.45753 20.1099H13.6199Z"
          fill="#DF3600"
        />
        <Path
          opacity="0.1"
          d="M19.0795 17.6382C19.2835 17.6382 19.4489 17.8039 19.4489 18.0082V24.8849C19.4489 25.0893 19.2835 25.2549 19.0795 25.2549H12.0003C11.7963 25.2549 11.6309 25.0893 11.6309 24.8849V18.0082C11.6309 17.8039 11.7963 17.6382 12.0003 17.6382H19.0795Z"
          fill="#FFD494"
        />
        <Path
          opacity="0.2"
          d="M16.7235 6.80225C16.9269 6.80225 17.0919 6.96608 17.0919 7.16819V8.9369C17.0919 9.13901 16.9269 9.30284 16.7235 9.30284H9.35494C9.15146 9.30284 8.98651 9.13901 8.98651 8.9369V7.16819C8.98651 6.96608 9.15146 6.80225 9.35494 6.80225L16.7235 6.80225Z"
          fill="#FFD494"
        />
        <Path
          opacity="0.1"
          d="M10.9143 25.0661L24.7392 11.2412L24.2651 10.7671L10.4402 24.592L10.9143 25.0661Z"
          fill="#DF3600"
        />
        <Path
          opacity="0.1"
          d="M9.87725 24.0598L23.7022 10.2349L23.0849 9.61754L9.25993 23.4425L9.87725 24.0598Z"
          fill="#DF3600"
        />
        <Path
          opacity="0.1"
          d="M9.2937 23.4148L23.1186 9.58984L22.5013 8.97252L8.67638 22.7975L9.2937 23.4148Z"
          fill="#F45C2C"
        />
        <Path
          opacity="0.2"
          d="M8.73999 22.738L22.5649 8.91309L22.0569 8.40502L8.23192 22.2299L8.73999 22.738Z"
          fill="#F45C2C"
        />
        <Path
          opacity="0.1"
          d="M8.23082 22.2287L22.0558 8.40381L21.5477 7.89574L7.72275 21.7207L8.23082 22.2287Z"
          fill="#FFBC6E"
        />
        <Path
          opacity="0.1"
          d="M7.89244 21.552L21.7174 7.72705L21.2093 7.21898L7.38437 21.0439L7.89244 21.552Z"
          fill="#DF3600"
        />
        <Path
          opacity="0.09"
          d="M6.26203 17.4914L17.1631 6.59033L16.655 6.08226L5.75396 16.9834L6.26203 17.4914Z"
          fill="#FFD5A4"
        />
        <Path
          opacity="0.08"
          d="M5.67742 16.8747L16.5785 5.97363L16.0704 5.46556L5.16935 16.3667L5.67742 16.8747Z"
          fill="#FFD5A4"
        />
        <Path
          opacity="0.05"
          d="M5.15458 16.1672L16.0557 5.26611L15.5476 4.75804L4.64651 15.6591L5.15458 16.1672Z"
          fill="#FFD5A4"
        />
        <Path
          opacity="0.2"
          d="M7.12337 18.973L19.7843 6.31201L19.2763 5.80394L6.6153 18.4649L7.12337 18.973Z"
          fill="#FFD5A4"
        />
        <Path
          opacity="0.2"
          d="M7.46175 19.7728L20.1227 7.11182L19.6146 6.60375L6.95368 19.2647L7.46175 19.7728Z"
          fill="#FFD5A4"
        />
        <Path
          opacity="0.1"
          d="M6.90804 18.0451L18.1451 6.80811L17.637 6.30004L6.39997 17.537L6.90804 18.0451Z"
          fill="#FFD5A4"
        />
        <Path
          opacity="0.1"
          d="M10.8938 25.0764L24.7188 11.2515L23.7051 10.2378L9.88019 24.0628L10.8938 25.0764Z"
          fill="#DF3600"
        />
        <Path
          opacity="0.1"
          d="M10.8938 25.0764L24.7188 11.2515L23.7 10.2327L9.87503 24.0576L10.8938 25.0764Z"
          fill="#DF3600"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.0887 18.3754L13.6105 17.8972L14.1058 17.402C13.9976 17.3166 13.8086 17.057 13.9179 16.7017L12.4833 16.326L13.7642 15.0451L14.9255 14.7719C15.6678 13.8031 17.7373 11.8767 20.1006 11.8854C20.1092 14.2486 18.1829 16.3182 17.214 17.0604L16.9408 18.2217L15.6599 19.5026L15.2842 18.068C14.929 18.1773 14.6694 17.9883 14.584 17.8802L14.0887 18.3754ZM16.4968 15.4892C16.7892 15.7816 17.2632 15.7816 17.5556 15.4892C17.848 15.1968 17.848 14.7227 17.5556 14.4303C17.2632 14.1379 16.7892 14.1379 16.4968 14.4303C16.2044 14.7227 16.2044 15.1968 16.4968 15.4892Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.75079 22.1327C9.71306 22.0949 9.71306 22.0338 9.75079 21.996L13.2006 18.5462C13.2384 18.5085 13.2995 18.5085 13.3373 18.5462L13.4397 18.6487C13.4775 18.6864 13.4775 18.7476 13.4397 18.7853L9.98989 22.2351C9.95216 22.2729 9.89099 22.2729 9.85326 22.2351L9.75079 22.1327Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.69956 23.2428C9.66183 23.205 9.66183 23.1439 9.69956 23.1061L13.1494 19.6563C13.1871 19.6186 13.2483 19.6186 13.286 19.6563L13.3885 19.7588C13.4262 19.7965 13.4262 19.8577 13.3885 19.8954L9.93865 23.3452C9.90092 23.383 9.83975 23.383 9.80203 23.3452L9.69956 23.2428Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.53823 22.2864C8.5005 22.2487 8.5005 22.1875 8.53823 22.1498L11.9881 18.6999C12.0258 18.6622 12.087 18.6622 12.1247 18.6999L12.2272 18.8024C12.2649 18.8401 12.2649 18.9013 12.2272 18.939L8.77732 22.3889C8.73959 22.4266 8.67842 22.4266 8.6407 22.3889L8.53823 22.2864Z"
          fill="white"
        />
      </G>
      <Rect
        x="6.89999"
        y="6.8999"
        width="18.2"
        height="18.2"
        rx="9.1"
        stroke="black"
        strokeOpacity="0.05"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2938_2011"
          x1="16"
          y1="0"
          x2="16"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FDB67D" />
          <Stop offset="1" stopColor="#FA805F" />
        </LinearGradient>
        <RadialGradient
          id="paint1_radial_2938_2011"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12.672 10.9919) rotate(54.1675) scale(15.9066)"
        >
          <Stop stopColor="#FFD794" />
          <Stop offset="1" stopColor="#ED5A37" />
        </RadialGradient>
        <LinearGradient
          id="paint2_linear_2938_2011"
          x1="12.9233"
          y1="12.7808"
          x2="12.9233"
          y2="18.0411"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DF3600" />
          <Stop offset="1" stopColor="#DF3600" stopOpacity="0" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_2938_2011"
          x1="8.58423"
          y1="16.6421"
          x2="13.4195"
          y2="16.6421"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DF3600" />
          <Stop offset="1" stopColor="#DF3600" stopOpacity="0" />
        </LinearGradient>
        <LinearGradient
          id="paint4_linear_2938_2011"
          x1="19.995"
          y1="6.42871"
          x2="19.995"
          y2="14.764"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DF3600" />
          <Stop offset="1" stopColor="#DF3600" stopOpacity="0" />
        </LinearGradient>
        <ClipPath id="clip0_2938_2011">
          <Rect x="6.39999" y="6.3999" width="19.2" height="19.2" rx="9.6" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default RocketPool;
