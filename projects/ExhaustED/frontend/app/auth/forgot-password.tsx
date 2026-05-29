import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.screen}>
      <Card>
        <Text style={styles.title}>Password reset</Text>
        <Text style={styles.text}>This demo build uses local sign-in. For production, connect this screen to your backend reset endpoint.</Text>
        <Link href="/auth/login" style={styles.link}>
          Back to login
        </Link>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: Colors.background },
  title: { color: Colors.textPrimary, fontSize: 26, fontWeight: '900', marginBottom: 8 },
  text: { color: Colors.textSecondary, lineHeight: 22 },
  link: { color: Colors.mintDark, fontWeight: '700', marginTop: 16 },
});
