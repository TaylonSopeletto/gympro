import { TouchableOpacity, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { cardStyle } from '@/constants/Colors';

export type ThemedOpacityProps = ViewProps & {
    onPress?: () => void;
    lightColor?: string;
    darkColor?: string;
};

export function ThemedOpacity({
    style, lightColor = cardStyle.light.backgroundColor,
    darkColor = cardStyle.dark.backgroundColor,
    ...otherProps
}: ThemedOpacityProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    return <TouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />;
}
