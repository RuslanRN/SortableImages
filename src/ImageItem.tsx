import * as React from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';
import { FunctionComponent } from 'react';
import { MARGIN, SIZE } from './Config';

interface BlockProps {
  onLongPress: () => void;
  id: string;
  uri: string;
  key: number;
}

export const ImageItem: FunctionComponent<BlockProps> = ({
  uri,
}) => {
  return (
    <Image style={styles.image} source={{ uri }} />
  );
};

const styles = StyleSheet.create({
  image: {
    height: SIZE,
    width: SIZE,
    margin: MARGIN,
  },
});
