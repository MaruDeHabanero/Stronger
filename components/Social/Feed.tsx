import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Publicacion from '@/components/Social/Publicacion';
import { Post } from '@/types/posts';
import { Texto } from '../Texto';

interface FeedProps {
	posts: Post[];
}

const Feed: React.FC<FeedProps> = ({ posts }) => {
	return (
	  <FlatList
		ListHeaderComponent={
			<Texto style={styles.title}>Feed</Texto>
		}
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
  title: {
	fontSize: 50,
	fontFamily: "Poppins_600SemiBold",
},
});

export default Feed;
