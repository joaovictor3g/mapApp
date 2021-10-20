import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import MapView, { MarkerAnimated } from "react-native-maps";
interface RegionProps {
  latitude: Number;
  longitude: Number;
  latitudeDelta: Number;
  longitudeDelta: Number;
}

export function Map() {
  const [latitude, setLatitude] = useState(-4.9790697);
  const [longitude, setLongitude] = useState(-39.055975);
  const [latitudeDelta, setLatitudeDelta] = useState(0.005);
  const [longitudeDelta, setLongitudeDelta] = useState(0);
  const [watchID, setWatchID] = useState(0);
  useEffect(() => {}, []);

  function callLocation() {
    if (Platform.OS === "ios") {
      getLocation();
    } else {
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permissão de Acesso à Localização",
            message: "Este aplicativo precisa acessar sua localização.",
            buttonNeutral: "Pergunte-me depois",
            buttonNegative: "Cancelar",
            buttonPositive: "Aceitar",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          alert("Permissão de Localização negada");
        }
      };
      requestLocationPermission();
    }
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = +JSON.stringify(position.coords.latitude);
        const currentLongitude = +JSON.stringify(position.coords.longitude);
        setLatitude(currentLatitude);
        setLongitude(currentLongitude);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    const watchID = navigator.geolocation.watchPosition(
      (position) => {
        const currentLatitude = +JSON.stringify(position.coords.latitude);
        const currentLongitude = +JSON.stringify(position.coords.longitude);
        setLatitude(currentLatitude);
        setLongitude(currentLongitude);
      },
      () => {}
    );
    setWatchID(watchID);
  }

  const clearLocation = () => {
    navigator.geolocation.clearWatch(watchID);
  };

  useEffect(() => {
    callLocation();
  }, []);

  return (
    <MapView
      region={{ latitude, longitude, latitudeDelta, longitudeDelta }}
      style={{ flex: 1, backgroundColor: "#444" }}
      onRegionChange={(region: RegionProps) => {}}
      zoomEnabled
      scrollDuringRotateOrZoomEnabled
    >
      <MarkerAnimated
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        onSelect={() => console.log("Lagoinha")}
      />
    </MapView>
  );
}
