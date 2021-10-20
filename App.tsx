import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  Text,
  SafeAreaView,
} from "react-native";
import { Map } from "./src/page/Map";
import * as Location from "expo-location";

export default function App() {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    Location.installWebGeolocationPolyfill();
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonOpenMap}
          onPress={() => setShowMap(!showMap)}
        >
          <Text style={styles.buttonText}>
            {showMap ? "Parar transmissão" : "Iniciar transmissão"}
          </Text>
        </TouchableOpacity>
      </View>
      {showMap ? <Map /> : <View />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    height: 200,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOpenMap: {
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
