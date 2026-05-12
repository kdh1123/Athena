import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

export default function LogoMark({ size = 96 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="folder" x1="16" y1="30" x2="98" y2="100">
          <Stop offset="0" stopColor="#58b8ff" />
          <Stop offset="0.62" stopColor="#2f62f2" />
          <Stop offset="1" stopColor="#2544d8" />
        </LinearGradient>
        <LinearGradient id="paper" x1="42" y1="12" x2="70" y2="58">
          <Stop offset="0" stopColor="#eef4ff" />
          <Stop offset="1" stopColor="#b7cbf4" />
        </LinearGradient>
        <LinearGradient id="mint" x1="78" y1="28" x2="104" y2="64">
          <Stop offset="0" stopColor="#45dcc7" />
          <Stop offset="1" stopColor="#22bda8" />
        </LinearGradient>
      </Defs>

      <G>
        <Rect x="42" y="18" width="36" height="50" rx="8" fill="url(#paper)" opacity="0.9" />
        <Rect x="51" y="31" width="19" height="3.8" rx="1.9" fill="#8fb0ee" />
        <Rect x="51" y="42" width="21" height="3.8" rx="1.9" fill="#9bb8ed" />
        <Rect x="51" y="53" width="13" height="3.8" rx="1.9" fill="#a8c0ee" />

        <Path d="M25 41 L51 35 C56 34 60 37 62 42 L68 59 L28 62 Z" fill="#3c87f7" />
        <Circle cx="36" cy="48" r="4" fill="#ffffff" opacity="0.95" />
        <Path d="M28 59 L42 51 L55 62 Z" fill="#d9e7ff" opacity="0.95" />

        <Path d="M78 33 L102 40 C105 41 108 44 109 48 L104 70 L75 66 L72 43 C72 38 74 34 78 33 Z" fill="url(#mint)" />
        <Rect x="82" y="45" width="10" height="10" rx="2" fill="#b9f6e7" opacity="0.8" />
        <Rect x="96" y="48" width="10" height="10" rx="2" fill="#c7f9ec" opacity="0.8" />
        <Rect x="80" y="59" width="11" height="10" rx="2" fill="#aaf0e0" opacity="0.8" />
        <Rect x="94" y="61" width="10" height="10" rx="2" fill="#bbf4e8" opacity="0.8" />

        <Rect x="22" y="57" width="75" height="42" rx="10" fill="url(#folder)" />
        <Path d="M22 61 C22 56 26 53 31 53 H59 C64 53 66 59 70 62 H91 C96 62 100 66 100 71 V73 H22 Z" fill="#4aa5ff" />
        <Path d="M58 66 C60 76 64 80 74 82 C64 84 60 88 58 99 C56 88 52 84 42 82 C52 80 56 76 58 66 Z" fill="#ffffff" />
        <Path d="M76 79 C77 83 79 85 83 86 C79 87 77 89 76 94 C75 89 73 87 69 86 C73 85 75 83 76 79 Z" fill="#ffffff" />
        <Circle cx="79" cy="72" r="3" fill="#ffffff" opacity="0.95" />

        <Ellipse cx="61" cy="81" rx="48" ry="13" fill="none" stroke="#48d7e0" strokeWidth="4" transform="rotate(-8 61 81)" opacity="0.9" />
        <Circle cx="100" cy="81" r="7" fill="#4386f6" stroke="#ffffff" strokeWidth="4" />
      </G>
    </Svg>
  );
}
