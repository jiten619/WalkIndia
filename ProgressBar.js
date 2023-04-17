import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';


const HalfCurveProgressBar = ({ progress }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const progressAnimation = useRef(null);

  useEffect(() => {
    progressAnimation.current = Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    });

    progressAnimation.current.start();

    return () => {
      progressAnimation.current.stop();
    };
  }, [animatedValue, progress]);

  const outerRadius = 100;
  const innerRadius = 80;
  const thickness = outerRadius - innerRadius;
  const circumference = 2 * Math.PI * innerRadius;
  const halfCircumference = circumference / 2;
  const progressLength = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circumference],
  });

  return (
    <View style={styles.container}>
      <Svg width={outerRadius * 2} height={outerRadius}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor="#fff" />
            <Stop offset="1" stopColor="#fff" />
          </LinearGradient>
        </Defs>
        <Circle
          stroke="#FFF"
          strokeWidth={thickness}
          cx={outerRadius}
          cy={outerRadius}
          r={innerRadius}
        />
        <Circle
          stroke="url(#grad)"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${halfCircumference}, ${circumference}`}
          cx={outerRadius}
          cy={outerRadius}
          r={innerRadius}
          transform={`rotate(-90 ${outerRadius} ${outerRadius})`}
          style={{ strokeDashoffset: progressLength }}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 40,
  },
});

export default HalfCurveProgressBar;