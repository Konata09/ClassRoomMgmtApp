import * as React from 'react';
import {Animated, Easing, PanResponder, View} from 'react-native';
import {Circle, G, Path, Svg} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export function LoadingScreen() {
  const {style} = animateTransform({
    type: 'rotate',
    from: '0 18 18',
    to: '360 18 18',
    dur: '1s',
    repeatCount: 'indefinite',
  });
  return (
    <View style={{alignItems: "center", justifyContent: "space-between", padding: 160}}>
      <Svg
        width="100%"
        height="60%"
        viewBox="0 0 38 38"
        aria-label="spinner"
        fillRule="evenodd"
        stroke="gray"
        fill="none">
        <G transform="translate(1 1)" strokeWidth="2">
          <Circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
          <AnimatedPath d="M36 18c0-9.94-8.06-18-18-18" style={style}/>
        </G>
      </Svg>
      <App2/>
    </View>
  );
}


function animateTransform({type, from, to, dur, repeatCount}) {
  const duration = parseFloat(dur.slice(0, -1)) * 1000;
  const [fromAngle, fromCX, fromCY] = from.split(' ').map(Number);
  const [toAngle, toCX, toCY] = to.split(' ').map(Number);
  const t = new Animated.Value(0);
  const animateTransform = [
    Animated.timing(t, {
      duration,
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
  ];
  const animation = Animated.loop(Animated.sequence(animateTransform), {
    iterations: -1,
  }).start();
  const rotateAngle = t.interpolate({
    inputRange: [0, 1],
    outputRange: [fromAngle + 'deg', toAngle + 'deg'],
  });
  const cx = t.interpolate({
    inputRange: [0, 1],
    outputRange: [fromCX, toCX],
  });
  const cy = t.interpolate({
    inputRange: [0, 1],
    outputRange: [fromCY, toCY],
  });
  const icx = t.interpolate({
    inputRange: [0, 1],
    outputRange: [-fromCX, -toCX],
  });
  const icy = t.interpolate({
    inputRange: [0, 1],
    outputRange: [-fromCY, -toCY],
  });
  const style = {
    transform: [
      {translateX: cx},
      {translateY: cy},
      {rotateZ: rotateAngle},
      {translateX: icx},
      {translateY: icy},
    ],
  };
  return {t, animation, style, rotateAngle, cx, cy, icx, icy};
}

function animateSpline({
                         values,
                         dur,
                         repeatCount,
                         begin,
                         keyTimes,
                         keySplines,
                       }) {
  const duration = dur * 1000;
  const t = new Animated.Value(keyTimes[0]);
  const splines = keySplines.map((spline, i) => {
    const [x1, y1, x2, y2] = spline;
    const fromValue = keyTimes[i];
    const toValue = keyTimes[i + 1];
    return Animated.timing(t, {
      toValue,
      delay: i == 0 ? begin : 0,
      duration: duration * (toValue - fromValue),
      easing: Easing.bezier(x1, y1, x2, y2),
      useNativeDriver: true,
    });
  });
  const iterations = repeatCount === 'indefinite' ? -1 : +repeatCount;
  const animation = Animated.loop(Animated.sequence(splines), {iterations});
  const value = t.interpolate({
    inputRange: keyTimes,
    outputRange: values,
  });
  return {t, animation, value, splines};
}

function panHandler() {
  const x = new Animated.Value(0);
  const y = new Animated.Value(0);
  const dx = new Animated.Value(0);
  const dy = new Animated.Value(0);

  const panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    // The gesture has started. Show visual feedback so the user knows
    // what is happening!
    // gestureState.d{x,y} will be set to zero now
    onPanResponderGrant: (evt, gestureState) => {
    },

    // The most recent move distance is gestureState.move{X,Y}
    // The accumulated gesture distance since becoming responder is
    // gestureState.d{x,y}
    onPanResponderMove: Animated.event([
      null, // ignore the native event
      // extract dx and dy from gestureState
      // like 'pan.x = gestureState.dx, pan.y = gestureState.dy'
      {dx, dy},
    ]),

    onPanResponderTerminationRequest: (evt, gestureState) => true,
    // The user has released all touches while this view is the
    // responder. This typically means a gesture has succeeded
    onPanResponderRelease: (evt, gestureState) => {
      x.setValue(x._value + gestureState.dx);
      y.setValue(y._value + gestureState.dy);
      dx.setValue(0);
      dy.setValue(0);
    },
    // Another component has become the responder, so this gesture
    // should be cancelled
    onPanResponderTerminate: () => {
    },

    // Returns whether this component should block native components from becoming the JS
    // responder. Returns true by default. Is currently only supported on android.
    onShouldBlockNativeResponder: (evt, gestureState) => {
      return true;
    },
  });

  return {
    x,
    y,
    dx,
    dy,
    panResponder,
    translateX: Animated.add(x, dx),
    translateY: Animated.add(y, dy),
  };
}

function App2() {
  /*
    <circle cx="16" cy="16" r="16">
      <animate
        attributeName="r"
        values="0; 4; 0; 0"
        dur="1.2s"
        repeatCount="indefinite"
        begin="0"
        keytimes="0;0.2;0.7;1"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
        calcMode="spline" />
    </circle>
  */
  const {animation, value} = animateSpline({
    values: [0, 4, 0, 0],
    dur: 1.2,
    repeatCount: 'indefinite',
    begin: 0,
    keyTimes: [0, 0.2, 0.7, 1],
    keySplines: [
      [0.2, 0.2, 0.4, 0.8],
      [0.2, 0.6, 0.4, 0.8],
      [0.2, 0.6, 0.4, 0.8],
    ],
  });
  animation.start();

  const {panResponder, translateX, translateY} = panHandler();

  return (
    <View {...panResponder.panHandlers}>
      <AnimatedSvg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        style={{
          transform: [{translateX}, {translateY}],
        }}>
        <AnimatedCircle cx="16" cy="16" r={value}/>
      </AnimatedSvg>
    </View>
  );
}


