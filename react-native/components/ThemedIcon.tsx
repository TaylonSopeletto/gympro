import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type ThemedIconrops = ViewProps & {
    name: string;
    lightColor?: string;
    darkColor?: string;
    size: number;
    color?: string;
};

export function ThemedIcon({ style, lightColor, darkColor, name, color }: ThemedIconrops) {
    const defaultColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return <MaterialIcons
        name={name as any}
        size={20}
        color={color ?? defaultColor}
    />

}
