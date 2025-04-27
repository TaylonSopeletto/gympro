import { TouchableOpacity, type ViewProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedCtaProps = ViewProps & {
    onPress?: () => void;
    lightColor?: string;
    darkColor?: string;
};

export function ThemedCta({
    style, lightColor, darkColor, ...otherProps
}: ThemedCtaProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'ctaBackground');
    return <TouchableOpacity style={[styles.cta, { backgroundColor }, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
    cta: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        minWidth: 150,
        marginHorizontal: 'auto',
        paddingHorizontal: 32,
        paddingVertical: 8,
        borderRadius: 10
    },
    ctaText: {
        fontSize: 14
    }
})
