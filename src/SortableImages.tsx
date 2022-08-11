import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { Item } from './Item';
import { useSharedValue } from 'react-native-reanimated';

interface IProps {
  children: ReactElement<{id: string}>[];
}

export const SortableImages = ({ children }: IProps) => {

  const positions = useSharedValue(
    Object.assign(
      {},
      ...children.map((child, index) => ({ [child.props.id]: index }))
    )
  );

  return (
    <View>
      {children.map(child => (
        <Item
          id={child.props.id}
          key={child.props.id}
          positions={positions}
        >
          {child}
        </Item>
      ))}
    </View>
  );
};
