import { useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useThemeColors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

type LoginErrors = Partial<Record<'email' | 'password' | 'form', string>>;

export default function LoginScreen() {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('Marjinel@gmail.com');
  const [password, setPassword] = useState('1234567789');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const isCompact = width < 380;

  const canSubmit = useMemo(() => email.trim().length > 0 && password.length > 0 && !loading, [email, password, loading]);

  function validate(): LoginErrors {
    const nextErrors: LoginErrors = {};
    if (!email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!password) nextErrors.password = 'Password is required.';
    return nextErrors;
  }

  async function handleLogin() {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      await login({ email, password });
      router.replace('/tabs');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Please try again.';
      setErrors({ form: message });
      Alert.alert('Login failed', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.screen, { paddingHorizontal: isCompact ? 16 : 20 }]}
      >
        <Card style={styles.card}>
          <View style={styles.brandBlock}>
            <Text style={[styles.brand, { color: colors.mint }]}>ExhaustED</Text>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Welcome back</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Sign in to keep your burnout support, assessments, and history private to your account.
            </Text>
          </View>
          {errors.form ? <Text style={[styles.formError, { color: colors.red }]}>{errors.form}</Text> : null}
          <Input
            label="Email"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
            }}
            error={errors.email}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              if (errors.password) setErrors((current) => ({ ...current, password: undefined }));
            }}
            error={errors.password}
            secureTextEntry
            autoComplete="password"
          />
          <Button title={loading ? 'Signing in...' : 'Sign in'} loading={loading} disabled={!canSubmit} onPress={handleLogin} />
          <Link href="/auth/register" style={[styles.link, { color: colors.mintDark }]}>
            Create an account
          </Link>
        </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  screen: { flex: 1, justifyContent: 'center', paddingVertical: 24 },
  card: { gap: 14 },
  brandBlock: { gap: 6, marginBottom: 4 },
  brand: { fontWeight: '900', fontSize: 16, textTransform: 'uppercase' },
  title: { fontSize: 31, fontWeight: '900' },
  subtitle: { lineHeight: 22 },
  formError: { fontWeight: '700', lineHeight: 20 },
  link: { fontWeight: '800', textAlign: 'center', paddingTop: 6 },
});
