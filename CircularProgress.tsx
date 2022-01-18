import React, {FC} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg';

type CircularProgressProps = {
  strokeWidth: number;
  radius: number;
  backgroundColor: string;
  percentageComplete: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgress: FC<CircularProgressProps> = ({
  radius,
  strokeWidth,
  backgroundColor,
  percentageComplete,
}) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumfrence = 2 * Math.PI * innerRadius;
  const invertedCompletion = (100 - percentageComplete) / 100;

  const theta = useSharedValue(2 * Math.PI * 1.001);
  const animateTo = useDerivedValue(() => 2 * Math.PI * invertedCompletion);
  const textOpacity = useSharedValue(0);

  const FADE_DELAY = 1500;

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(theta.value * innerRadius, {
        duration: FADE_DELAY,
      }),
    };
  });

  const powerTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(textOpacity.value, {
        duration: FADE_DELAY,
      }),
    };
  });

  const powerPercentTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(textOpacity.value, {
        duration: FADE_DELAY,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={radius}
          cy={radius}
          fill={'transparent'}
          r={innerRadius}
          stroke={backgroundColor}
          strokeDasharray={`${circumfrence} ${circumfrence}`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </Svg>
      <Animated.Text style={[styles.powerText, powerTextStyle]}>
        Power %
      </Animated.Text>
      <Animated.Text style={[styles.powerPercentage, powerPercentTextStyle]}>
        {percentageComplete}
      </Animated.Text>
      <Button
        title="Animate!"
        onPress={() => {
          if (!textOpacity.value) {
            theta.value = animateTo.value;
            textOpacity.value = 1;
          } else {
            theta.value = 2 * Math.PI * 1.001;
            textOpacity.value = 0;
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerText: {
    fontSize: 30,
    fontWeight: '300',
  },
  powerPercentage: {
    fontSize: 60,
    fontWeight: '200',
  },
});
