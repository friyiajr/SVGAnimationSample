/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {View, PixelRatio, StyleSheet} from 'react-native';
import {CircularProgress} from './CircularProgress';

const radius = PixelRatio.roundToNearestPixel(130);
const STROKE_WIDTH = 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringChartContainer: {
    width: radius * 2,
    height: radius * 2,
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.ringChartContainer}>
        <CircularProgress
          strokeWidth={STROKE_WIDTH}
          radius={radius}
          backgroundColor="#f93986"
          percentageComplete={85}
        />
      </View>
    </View>
  );
};

export default App;
