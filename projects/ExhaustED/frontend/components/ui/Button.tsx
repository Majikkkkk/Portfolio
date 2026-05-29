import { forwardRef } from 'react';
import { ActivityIndicator, Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import { useThemeColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
}

export const Button = forwardRef<View, ButtonProps>(
  ({ title, variant = 'primary', loading = false, disabled, style, ...props }, ref) => {
    const colors = useThemeColors();
    const isDisabled = disabled || loading;
    const backgroundColor =
      variant === 'primary' ? colors.mint : variant === 'danger' ? colors.red : colors.surfaceElevated;
    const textColor = variant === 'primary' || variant === 'danger' ? colors.white : colors.mintDark;

    return (
      <Pressable
        ref={ref}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.base,
          {
            backgroundColor,
            borderColor: variant === 'secondary' ? colors.borderStrong : backgroundColor,
            borderWidth: variant === 'secondary' ? 1 : 0,
          },
          pressed && !isDisabled ? styles.pressed : null,
          isDisabled ? styles.disabled : null,
          typeof style === 'function' ? style({ pressed }) : style,
        ]}
        {...props}
      >
        {loading ? <ActivityIndicator color={textColor} /> : null}
        <Text style={[styles.text, { color: textColor }]} numberOfLines={1} adjustsFontSizeToFit>
          {title}
        </Text>
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 18,
  },
  text: Typography.button,
  pressed: { opacity: 0.84, transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.55 },
});
