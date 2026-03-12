import { View , Text , SafeAreaView , StyleSheet, TouchableOpacity , ScrollView , FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Home = () => {
    const presentCount = history.filter(item => item.status === "Present").length;
    const absentCount = history.filter(item => item.status === "Absent").length;
    const totalClass = history.length;

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View>
                <Text style={styles.course}>{item.course}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>

            <View style={styles.statusContainer}>
                <MaterialIcons
                    name={item.status === "Present" ? "check-circle" : "cancel"}
                    size={20}
                    color={item.status === "Present" ? "green" : "red"}
                />

                <Text style={item.status === "Present" ? styles.present : styles.absent}>
                    {item.status}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.tittle}>Attendance App</Text>

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
                        <Text>Lab 3</Text>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>CHECK IN</Text>
                        </TouchableOpacity>
                </View>

                <View style={styles.classcard}>
                        <Text style={styles.subtitle}>Upcoming Class</Text>
                        <Text>Mobile Programming</Text>
                        <Text>Lab 3</Text>
                </View>

                <View style={styles.classcard}>
                    <Text style={styles.subtitle}>Attendance Summary</Text>


                    <Text>Total Classes: {totalClass}</Text>
                    <Text>Present: {presentCount}</Text>
                    <Text>Absent: {absentCount}</Text>
                </View>

                <Text style={styles.subtitle}>Attendance History</Text>
                <FlatList
                    data={history}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    scrollEnabled={true}
                />
            </ScrollView>
        </SafeAreaView>
        
    );
};

const history = [
    {id: 1, course: 'Mobile Programming', date: '2026-03-01', status: 'Present'},
    {id: 2, course: 'Database System', date: '2026-03-02', status: 'Present'},
    {id: 3, course: 'Operating System', date: '2026-03-03', status: 'Absent'},
    {id: 4, course: 'Computer Network', date: '2026-03-04', status: 'Present'},
    {id: 5, course: 'Web Programming', date: '2026-03-05', status: 'Present'},
    {id: 6, course: 'Software Engineering', date: '2026-03-06', status: 'Absent'},
    {id: 7, course: 'Data Structures', date: '2026-03-07', status: 'Present'},
    {id: 8, course: 'Artificial Intelligence', date: '2026-03-08', status: 'Present'},
    {id: 9, course: 'Cloud Computing', date: '2026-03-09', status: 'Absent'},
    {id: 10, course: 'Cyber Security', date: '2026-03-10', status: 'Present'},
    {id: 11, course: 'UI UX Design', date: '2026-03-11', status: 'Present'},
    {id: 12, course: 'Machine Learning', date: '2026-03-12', status: 'Absent'},
    {id: 13, course: 'Computer Graphics', date: '2026-03-13', status: 'Present'},
    {id: 14, course: 'Information Systems', date: '2026-03-14', status: 'Present'},
    {id: 15, course: 'Big Data', date: '2026-03-15', status: 'Absent'},
    {id: 16, course: 'Network Security', date: '2026-03-16', status: 'Present'},
    {id: 17, course: 'Internet of Things', date: '2026-03-17', status: 'Present'},
    {id: 18, course: 'Human Computer Interaction', date: '2026-03-18', status: 'Absent'},
    {id: 19, course: 'Distributed Systems', date: '2026-03-19', status: 'Present'},
    {id: 20, course: 'Software Testing', date: '2026-03-20', status: 'Present'}
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        backgroundColor: 'white',
    },
    tittle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    classcard: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
        paddingBottom: 40
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    course: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: '#555',
    },
    present: {
        color: 'green',
        fontWeight: 'bold',
    },
    absent: {
        color: 'red',
        fontWeight: 'bold',
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default Home;