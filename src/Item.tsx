import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { animationConfig, getOrder, getPosition, Positions, SIZE } from './Config';

interface IProps {
  children: ReactNode;
  id: string;
  positions: Animated.SharedValue<Positions>;
}

export const Item = ({ children, positions, id }: IProps) => {

  const isGestureActive = useSharedValue(false);
  const p1 = getPosition(positions.value[id]);
  const position = getPosition(getOrder(p1.x, p1.y));
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  useAnimatedReaction(() => positions.value[id], newOrder => {
    console.log(newOrder, ' => newOrder');
    const newPosition = getPosition(newOrder);
    translateX.value = withTiming(newPosition.x, animationConfig);
    translateY.value = withTiming(newPosition.y, animationConfig);
  });

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number, y: number }>({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = ctx.x + translationX;
      translateY.value = ctx.y + translationY;
      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(key => positions.value[key] === newOrder);
        if (idToSwap) {
          const newPositions = { ...positions.value };
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }
    },
    onEnd: () => {
      const newPosition = getPosition(positions.value[id]!);
      translateX.value = withTiming(newPosition.x, animationConfig, () => {
        isGestureActive.value = false;
      });
      translateY.value = withTiming(newPosition.y, animationConfig);
    },
  });

  const style = useAnimatedStyle(() => {

    const zIndex = isGestureActive.value ? 100 : 0;
    const scale  = isGestureActive.value ? 1.05 : 1;

    return ({
      position: 'absolute',
      top: 0,
      left: 0,
      width: SIZE,
      height: SIZE,
      zIndex,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale },
      ],
    });
  });

  return (
    <Animated.View style={style}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
