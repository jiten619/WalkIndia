import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Circle, Rect } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Progress = ({ progress }) => {
  const r = 50;
  const cx = 60;
  const cy = 60;

  const circumference = r * 2 * Math.PI;

  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View>
      <Svg height="120" width="120">
        <G rotate="-90" origin={`${cx},${cy}`}>
          <Circle cx={cx} cy={cy} r={r} stroke="#3740FE" strokeWidth="10" fill="none" />
          <AnimatedCircle
            cx={cx}
            cy={cy}
            r={r}
            stroke="#FFC107"
            strokeWidth="10"
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            fill="none"
          />
        </G>
        <Rect x="10" y="0" width="100" height="120" fill="white" />
      </Svg>
    </View>
  );
};

export default Progress;