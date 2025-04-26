import { TouchableOpacity, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTouchableProps = ViewProps & {
    onPress?: () => void;
    lightColor?: string;
    darkColor?: string;
};

export function ThemedTouchable({
    style, lightColor, darkColor, ...otherProps
}: ThemedTouchableProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'secondaryBackground');
    return <TouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />;
}
