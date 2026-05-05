import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { userData, logout } = useContext(AuthContext);

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState("Memuat jam...");
  const [note, setNote] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const noteInputRef = useRef(null);

  // Ganti dengan IP laptop Anda, jangan pakai localhost
  const BASE_URL = "http://10.1.13.46:8080/api/presensi";

  const attendanceStats = useMemo(() => {
    return { totalPresent: 12, totalAbsent: 2 };
  }, []);

  // Update waktu setiap detik
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("id-ID", { hour12: false });
      setCurrentTime(formatted);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = async () => {
    if (isCheckedIn) {
      return Alert.alert("Perhatian", "Anda sudah Check In.");
    }
    if (!note.trim()) {
      Alert.alert("Peringatan", "Catatan kehadiran wajib diisi!");
      noteInputRef.current?.focus();
      return;
    }

    setIsPosting(true);
    const now = new Date();

    // Payload sesuai DTO Java Spring
    const payload = {
      kodeMk: "TRPL205",
      course: "Mobile Programming",
      status: "Present",
      nimMhs: userData.mhsNim,
      pertemuanKe: 5,
      date: now.toISOString().split("T")[0],
      jamPresensi: now.toLocaleTimeString("id-ID", { hour12: false }),
      kode_qr: "AUTH-TRPL205-WS-XYZ987",
      ruangan: "Lab Komputer 3",
      dosenPengampu: "Tim Dosen TRPL",
      catatan: note,
    };

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setIsCheckedIn(true);
        Alert.alert("Berhasil!", "Presensi masuk ke Database Java Spring.", [
          { text: "OK" },
          {
            text: "Lihat Riwayat",
            onPress: () => navigation.navigate("HistoryTab"),
          },
        ]);
      } else {
        Alert.alert("Gagal", result.message || "Terjadi kesalahan di server.");
      }
    } catch (error) {
      Alert.alert(
        "Error Jaringan",
        "Pastikan IP Laptop benar dan Spring Boot berjalan.",
      );
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsPosting(false);
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header dengan jam */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Attendance App</Text>
          <Text style={styles.clockText}>{currentTime}</Text>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Kartu Mahasiswa */}
        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialIcons name="person" size={40} color="#555" />
          </View>
          <Text style={styles.name}>{userData?.mhsName || "Nama"}</Text>
          <Text>NIM : {userData?.mhsNim || "-"}</Text>
          <Text>Class : Informatika-2A</Text>
        </View>

        {/* Kartu Kelas Hari Ini */}
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Today's Class</Text>
          <Text>Mobile Programming (TRPL205)</Text>
          <Text>08:00 - 10:00</Text>
          <Text>Lab 3</Text>

          {!isCheckedIn && (
            <TextInput
              ref={noteInputRef}
              style={styles.inputCatatan}
              placeholder="Tulis catatan (cth: Hadir lab)"
              value={note}
              onChangeText={setNote}
              multiline
            />
          )}

          {isPosting ? (
            <ActivityIndicator
              size="large"
              color="#007AFF"
              style={{ marginTop: 15 }}
            />
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                isCheckedIn ? styles.buttonDisabled : styles.buttonActive,
              ]}
              onPress={handleCheckIn}
              disabled={isCheckedIn}
            >
              <Text style={styles.buttonText}>
                {isCheckedIn ? "CHECKED IN" : "CHECK IN SEKARANG"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Statistik Kehadiran */}
        <View style={styles.statsCard}>
          <View style={styles.statsBox}>
            <Text style={styles.statNumber}>
              {attendanceStats.totalPresent}
            </Text>
            <Text style={styles.statLabel}>Total Present</Text>
          </View>
          <View style={styles.statsBox}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  clockText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  classCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputCatatan: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginTop: 15,
    fontSize: 14,
    backgroundColor: "#fafafa",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonActive: {
    backgroundColor: "#007AFF",
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  logoutButton: {
    marginLeft: 12,
    backgroundColor: "#d9534f",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default HomeScreen;
