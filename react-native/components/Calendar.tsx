import { StyleSheet, useColorScheme } from 'react-native'
import { ThemedText } from "./ThemedText"
import { ThemedView } from "./ThemedView"
import { cardStyle } from '@/constants/Colors'

const Calendar = () => {
    const colorScheme = useColorScheme()
    const days = getDayNumbersInMonth(2025, 3)

    function getDayNumbersInMonth(year: number, month: number) {
        const numDays = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: numDays }, (_, i) => i + 1);
    }

    return (
        <ThemedView style={{ marginTop: 48, margin: 'auto' }}>
            <ThemedText style={styles.title}>April</ThemedText>
            <ThemedView style={styles.days}>
                {days.slice(0, 14).map((day, index) =>
                    <ThemedView
                        style={
                            {
                                ...styles.day,
                                ...cardStyle[colorScheme ?? 'light']
                            }
                        } key={index}>
                        <ThemedText
                            style={{ fontSize: 12 }}>
                            {day < 8 ? day : ''}
                        </ThemedText>
                    </ThemedView>
                )}
            </ThemedView>
            <ThemedText
                style={{
                    textAlign: 'right',
                    marginTop: 8,
                    fontSize: 14,
                    marginRight: 8
                }}>
                View all
            </ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    days: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 'auto',
        marginTop: 30,
        gap: 10,
        maxWidth: 280
    },
    day: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
        borderRadius: 10
    }
})

export default Calendar