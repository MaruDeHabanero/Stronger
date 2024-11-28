import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Texto } from "@/components/Texto";  // Asegúrate de importar el componente Texto correctamente
import { tomatoCustom } from "@/constants/Colors";

const TabsPerfil = () => {
  const [selectedTab, setSelectedTab] = useState("Compartido"); // El estado de la pestaña seleccionada

  return (
    <View style={styles.tabs}>
      {["Compartido", "Historial", "Rendimiento"].map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setSelectedTab(tab)}
          style={styles.tabContainer}
        >
          <Texto
            style={[
              styles.tab,
              selectedTab === tab ? styles.selectedTab : {}, // Condicionamos el estilo si es la pestaña seleccionada
            ]}
          >
            {tab}
          </Texto>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingVertical: 10,
  },
  tabContainer: {
    alignItems: "center",
  },
  tab: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: tomatoCustom, 
  },
});

export default TabsPerfil;
