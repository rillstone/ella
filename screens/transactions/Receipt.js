import React from "react";
import { Dimensions } from "react-native";
import Svg, {
  Image,
  Defs,
  RadialGradient,
  Polygon,
  Circle,
  Ellipse,
  G,
  ClipPath,
  Rect,
  Text,
  Stop,
  Mask,
  Use,
  Line
} from "react-native-svg";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const Receipt = props => (
  <Svg height={viewportWidth*1.2} width={viewportWidth * 0.6}>
    <Defs>

      <ClipPath id="clip">
        <G>
          <Rect
            x="0"
            y="0"
            height={viewportWidth*1.2}
            width={viewportWidth * 0.6}
            r="60"
          />

          <Circle cx="0" cy={viewportWidth*1.2 -50} r="10" />
          <Circle cx={viewportWidth * 0.6} cy={viewportWidth*1.2 - 50} r="10" />
        </G>
      </ClipPath>
    </Defs>

    <Rect

      x="0"
      y="0"
      height={viewportWidth*1.2}
      width={viewportWidth}
      fill="white"
      clipPath="url(#clip)"
    />
        <Line
        x1="10"
        y1={viewportWidth*1.2- 50}
        x2={viewportWidth * 0.6-10}
        y2={viewportWidth*1.2 - 50}
        stroke="#cccccc"
        strokeWidth="1"
        strokeDasharray="3"
    />
  </Svg>
);

export default Receipt;
