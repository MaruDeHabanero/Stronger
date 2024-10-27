import { Text, View, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.miniContainer}>
        <Text style={styles.text}>Hello World</Text>
      </View>
      <View style={styles.miniContainer}>
        <Text style={styles.text}>Hello World, but 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
    height: "100%",
  },
  text: {
    fontSize: 50,
    color: "white",
  },
  miniContainer: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    borderColor: "red",
    width: "100%",
  },
});
