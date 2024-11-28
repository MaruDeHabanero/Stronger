import { StyleSheet } from "react-native";
import Feed from "@/components/Social/Feed";
import dataSocial from "@/assets/dataSocial.json";
import { Texto } from "@/components/Texto";

import { Vista } from "@/components/Vista";

export default function Social() {
	return (
		<Vista style={styles.container}>
			<Feed posts={dataSocial.posts} headerTitle={"Feed"} />
		</Vista>
	);
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
		paddingHorizontal: 20,
		paddingTop: 20,
    },
	title: {
        fontSize: 50,
        fontFamily: "Poppins_600SemiBold",
    },
});
