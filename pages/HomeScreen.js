// import React from "react";
// import { View, Text } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
// } from "@react-navigation/drawer";
// import LoginScreen from "./LoginScreen";

// // ===== TAB =====
// const Tab = createBottomTabNavigator();

// function Tab1() {
//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Halo Ini Halaman dari Tab Screen 1</Text>
//     </View>
//   );
// }
// function Tab2() {
//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Halo Ini Halaman dari Tab Screen 2</Text>
//     </View>
//   );
// }

// function TabNavigator() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Tab1" component={Tab1} />
//       <Tab.Screen name="Tab2" component={Tab2} />
//     </Tab.Navigator>
//   );
// }

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       {/* Menu default */}
//       <DrawerItem
//         label="TabNavigation"
//         onPress={() => props.navigation.navigate("TabNavigation")}
//       />

//       <DrawerItem
//         label="DrawerNavigation"
//         onPress={() => props.navigation.navigate("DrawerNavigation")}
//       />

//       {/* LOGOUT */}
//       <DrawerItem
//         label="Logout"
//         onPress={() =>
//           props.navigation.reset({
//             index: 0,
//             routes: [{ name: "Login" }],
//           })
//         }
//       />
//     </DrawerContentScrollView>
//   );
// }

// // ===== DRAWER =====
// const Drawer = createDrawerNavigator();

// function Drawer2() {
//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Halo Ini Halaman dari Drawer Screen 2</Text>
//     </View>
//   );
// }
// export default function HomeScreen() {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       {/* Ini yang punya TAB */}
//       <Drawer.Screen name="TabNavigation" component={TabNavigator} />
//       {/* Menu drawer lain */}
//       <Drawer.Screen name="DrawerNavigation" component={Drawer2} />
//       {/* <Drawer.Screen name="Logout" component={LoginScreen} options={{ headerShown: false }}/> */}
//     </Drawer.Navigator>
//   );
// }

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState("Memuat Jam...");
  const [note, setNote] = useState("");
  const noteInputRef = useRef(null);

  const attendanceStats = useMemo(() => {
    return { totalPresent: 12, totalAbsent: 2 };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("id-ID", {}));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    if (isCheckedIn)
      return Alert.alert(
        "Perhatian",
        "Anda sudah melakukan check-in untuk kelas ini.",
      );
    if (note.trim() === "") {
      Alert.alert("Peringatan", "Catatan kehadiran wajib diisi.");
      noteInputRef.current?.focus();
      return;
    }
    setIsCheckedIn(true);
    Alert.alert("Sukses", `Berhasil Check-in pada pukul ${currentTime}!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.tittle}>Attendance App</Text>
          <Text style={styles.clockText}>{currentTime}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialIcons name="person" size={40} color="#555" />
          </View>

          <View>
            <Text style={styles.name}>Sheva Yudha Yunior</Text>
            <Text>NIM : 0320240078</Text>
            <Text>Class : Informatika 2-A</Text>
          </View>
        </View>

        <View style={styles.classcard}>
          <Text style={styles.subtitle}>Today's Class</Text>
          <Text>Mobile Programming</Text>
          <Text>08:00 - 10:00</Text>
          <Text>Lab 3</Text>

          {!isCheckedIn && (
            <TextInput
              ref={noteInputRef}
              style={styles.inputCatatan}
              placeholder="Tulis catatan (cth: Hadir Lab)"
              value={note}
              onChangeText={setNote}
            />
          )}

          <TouchableOpacity
            style={[
              styles.button,
              isCheckedIn ? styles.buttonDisabled : styles.buttonActive,
            ]}
            onPress={handleCheckIn}
            disabled={isCheckedIn}
          >
            <Text style={styles.buttonText}>
              {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {attendanceStats.totalPresent}
            </Text>
            <Text style={styles.statLabel}>Total Present</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: "red" }]}>
              {attendanceStats.totalAbsent}
            </Text>
            <Text style={styles.statLabel}>Total Absent</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "white",
  },
  tittle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  classcard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  course: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
  present: {
    color: "green",
    fontWeight: "bold",
  },
  absent: {
    color: "red",
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  clockText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    fontVariant: ["tabular-nums"],
  },
  buttonActive: {
    backgroundColor: "#007AFF",
  },
  buttonDisabled: {
    backgroundColor: "#d5e0f3",
  },
  inputCatatan: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    backgroundColor: "#fafafa",
  },
  statsCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  statLabel: {
    fontSize: 14,
    color: "gray",
  },
});
