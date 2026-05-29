import { useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useThemeColors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

type RegisterErrors = Partial<Record<'fullName' | 'email' | 'password' | 'form', string>>;

export default function RegisterScreen() {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const register = useAuthStore((state) => state.register);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const isCompact = width < 380;

  const canSubmit = useMemo(
    () => fullName.trim().length > 0 && email.trim().length > 0 && password.length > 0 && !loading,
    [fullName, email, password, loading]
  );

  function validate(): RegisterErrors {
    const nextErrors: RegisterErrors = {};
    if (fullName.trim().length < 2) nextErrors.fullName = 'Enter your full name.';
    if (!email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (password.length < 8) nextErrors.password = 'Use at least 8 characters.';
    else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      nextErrors.password = 'Use at least one uppercase letter and one number.';
    }
    return nextErrors;
  }

  async function handleRegister() {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      await register({
        fullName,
        email,
        password,
        confirmPassword: password,
        studentId: `LOCAL-${email.trim().toLowerCase()}`,
        program: 'Computer Science',
        yearLevel: 1,
      });
      router.replace('/tabs');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Please try again.';
      setErrors({ form: message });
      Alert.alert('Registration failed', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
        <ScrollView contentContainerStyle={[styles.content, { paddingHorizontal: isCompact ? 16 : 20 }]} keyboardShouldPersistTaps="handled">
          <Card style={styles.card}>
            <Text style={[styles.brand, { color: colors.mint }]}>ExhaustED</Text>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Create your space</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Your assessments and Majik chat history start fresh and stay tied to this account.
            </Text>
            {errors.form ? <Text style={[styles.formError, { color: colors.red }]}>{errors.form}</Text> : null}
            <Input
              label="Full name"
              value={fullName}
              onChangeText={(value) => {
                setFullName(value);
                if (errors.fullName) setErrors((current) => ({ ...current, fullName: undefined }));
              }}
              error={errors.fullName}
              autoComplete="name"
            />
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
              autoComplete="new-password"
            />
            <Button title={loading ? 'Creating account...' : 'Create account'} loading={loading} disabled={!canSubmit} onPress={handleRegister} />
            <Link href="/auth/login" style={[styles.link, { color: colors.mintDark }]}>
              I already have an account
            </Link>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  keyboard: { flex: 1 },
  content: { flexGrow: 1, justifyContent: 'center', paddingVertical: 24 },
  card: { gap: 14 },
  brand: { fontWeight: '900', fontSize: 16, textTransform: 'uppercase' },
  title: { fontSize: 31, fontWeight: '900' },
  subtitle: { lineHeight: 22, marginBottom: 4 },
  formError: { fontWeight: '700', lineHeight: 20 },
  link: { fontWeight: '800', textAlign: 'center', paddingTop: 6 },
});
