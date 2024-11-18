import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Publicacion from '@/components/Social/Publicacion';
import { Post } from '@/types/posts';

interface FeedProps {
	posts: Post[];
}

const Feed: React.FC<FeedProps> = ({ posts }) => {
	return (
	  <FlatList
		data={posts}
		keyExtractor={(item, index) => index.toString()}
		renderItem={({ item }) => <Publicacion {...item} />}
		contentContainerStyle={styles.feed}
	  />
	);
  };

const styles = StyleSheet.create({
  feed: {
    padding: 0,
  },
});

export default Feed;
