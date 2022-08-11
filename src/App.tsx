import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { SortableImages } from './SortableImages';
import { ImageItem } from './ImageItem';

const App = () => {

  const [photos] = useState([
    {
      id: 'img1',
      uri: 'https://images.unsplash.com/photo-1656217818549-c7078fe222b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80',
    },
    {
      id: 'img2',
      uri: 'https://images.unsplash.com/photo-1660050186491-cbd9d8e02d2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      id: 'img3',
      uri: 'https://images.unsplash.com/photo-1659987156572-b6540170a7f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      id: 'img4',
      uri: 'https://images.unsplash.com/photo-1649196548669-d9174cd43ef2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <SortableImages>
        {photos.map((it, index) => (
          <ImageItem
            key={index}
            id={it.id}
            uri={it.uri}
            onLongPress={() => {}}
          />
        ))}
      </SortableImages>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
