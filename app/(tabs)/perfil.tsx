import { Text, View, StyleSheet } from "react-native";

export default function Social() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 50 }}>Blank</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
});
