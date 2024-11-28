import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Publicacion from "@/components/Social/Publicacion";
import { Post } from "@/types/posts";
import { Texto } from "../Texto";

interface FeedProps {
	posts: Post[];
	headerTitle?: string;
}

const Feed: React.FC<FeedProps> = ({ posts, headerTitle }) => {
	return (
		<FlatList
			ListHeaderComponent={headerTitle ? <Texto style={styles.title}>{headerTitle}</Texto> : null}
			data={posts}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({ item }) => <Publicacion {...item} />}
		/>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 50,
		fontFamily: "Poppins_600SemiBold",
	},
});

export default Feed;
