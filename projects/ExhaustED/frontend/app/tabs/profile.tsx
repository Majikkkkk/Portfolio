import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Switch, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useThemeColors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { useChatbotStore } from '@/store/chatbotStore';
import { useThemeStore } from '@/store/themeStore';

type SectionKey = 'personal' | 'password' | 'notifications' | 'privacy' | 'appearance' | 'language' | 'reminders';
type IconName = keyof typeof Ionicons.glyphMap;

export default function ProfileScreen() {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const updateNotifications = useAuthStore((state) => state.updateNotifications);
  const updatePrivacy = useAuthStore((state) => state.updatePrivacy);
  const updateWellness = useAuthStore((state) => state.updateWellness);
  const changePassword = useAuthStore((state) => state.changePassword);
  const clearChat = useChatbotStore((state) => state.clear);
  const mode = useThemeStore((state) => state.mode);
  const setTheme = useThemeStore((state) => state.setTheme);
  const isCompact = width < 390;
  const [open, setOpen] = useState<SectionKey | null>(null);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [profileImageUri, setProfileImageUri] = useState(user?.profileImageUri || '');
  const [gradeLevel, setGradeLevel] = useState(user?.gradeLevel || '');
  const [age, setAge] = useState(user?.age ? String(user.age) : '');
  const [school, setSchool] = useState(user?.school || '');
  const [program, setProgram] = useState(user?.program || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const notifications = user?.notificationPreferences;
  const privacy = user?.privacyPreferences;
  const wellness = user?.wellnessPreferences;
  const displayName = user?.fullName || 'Student';
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    setFullName(user?.fullName || '');
    setProfileImageUri(user?.profileImageUri || '');
    setGradeLevel(user?.gradeLevel || '');
    setAge(user?.age ? String(user.age) : '');
    setSchool(user?.school || '');
    setProgram(user?.program || '');
  }, [user]);

  async function handleSaveProfile() {
    const numericAge = age.trim() ? Number(age) : null;
    if (!fullName.trim()) {
      Alert.alert('Name required', 'Please enter your full name.');
      return;
    }
    if (numericAge !== null && (!Number.isFinite(numericAge) || numericAge < 1 || numericAge > 120)) {
      Alert.alert('Check age', 'Age is optional, but it should be a valid number if added.');
      return;
    }
    await updateProfile({ fullName, profileImageUri, gradeLevel, age: numericAge, school, program });
    Alert.alert('Saved', 'Your personal information has been updated.');
  }

  async function handlePasswordChange() {
    try {
      await changePassword({ currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      Alert.alert('Password updated', 'Your password has been changed.');
    } catch (error) {
      Alert.alert('Password not updated', error instanceof Error ? error.message : 'Please try again.');
    }
  }

  async function handleSignOut() {
    clearChat();
    await logout();
    router.replace('/auth/login');
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: isCompact ? 16 : 22,
            paddingTop: isCompact ? 10 : 14,
          },
        ]}
      >
        <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <View style={styles.heroCopy}>
            <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>Account Settings</Text>
            <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>Manage your account and preferences.</Text>
          </View>
          <SettingsIllustration />
        </View>

        <Card style={styles.userCard}>
          <View style={[styles.avatar, { backgroundColor: colors.mintLight, borderColor: colors.border }]}>
            {profileImageUri.trim() ? (
              <Image source={{ uri: profileImageUri.trim() }} style={styles.avatarImage} />
            ) : (
              <Text style={[styles.avatarInitials, { color: colors.mintDark }]}>{initials}</Text>
            )}
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.textPrimary }]} numberOfLines={1}>
              {displayName}
            </Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]} numberOfLines={1}>
              {user?.email || 'student@example.com'}
            </Text>
            <Text style={[styles.userCourse, { color: colors.mintDark }]} numberOfLines={1}>
              {user?.program || 'Course not set'}
            </Text>
          </View>
        </Card>

        <SettingsSection title="ACCOUNT">
          <SettingRow icon="person" title="Personal Information" subtitle="Name, school, course, and profile photo" open={open === 'personal'} onPress={() => setOpen(open === 'personal' ? null : 'personal')} />
          {open === 'personal' ? (
            <View style={styles.panel}>
              <Input label="Full name" value={fullName} onChangeText={setFullName} placeholder="Your full name" />
              <Input label="Email" value={user?.email || ''} editable={false} />
              <Input label="Course" value={program} onChangeText={setProgram} placeholder="Your course or program" />
              <Input label="Grade level" value={gradeLevel} onChangeText={setGradeLevel} placeholder="College, Grade 12..." />
              <Input label="Age" value={age} onChangeText={setAge} keyboardType="number-pad" placeholder="Optional" />
              <Input label="School" value={school} onChangeText={setSchool} placeholder="Your school" />
              <Input label="Profile image URI" value={profileImageUri} onChangeText={setProfileImageUri} placeholder="Optional image link" autoCapitalize="none" />
              <Button title="Save personal information" onPress={handleSaveProfile} />
            </View>
          ) : null}

          <SettingRow icon="lock-closed" title="Password & Security" subtitle="Change your password" open={open === 'password'} onPress={() => setOpen(open === 'password' ? null : 'password')} />
          {open === 'password' ? (
            <View style={styles.panel}>
              <Input label="Current password" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry />
              <Input label="New password" value={newPassword} onChangeText={setNewPassword} secureTextEntry placeholder="8+ chars, uppercase, number" />
              <Button title="Update password" onPress={handlePasswordChange} />
            </View>
          ) : null}

          <SettingRow icon="notifications" title="Notifications" subtitle={notifications?.enabled ? 'Enabled' : 'Disabled'} open={open === 'notifications'} onPress={() => setOpen(open === 'notifications' ? null : 'notifications')} />
          {open === 'notifications' ? (
            <View style={styles.panel}>
              <Toggle label="Notifications" value={!!notifications?.enabled} onValueChange={(enabled) => updateNotifications({ enabled })} />
              <Toggle label="Daily check-in" value={!!notifications?.dailyCheckin} onValueChange={(dailyCheckin) => updateNotifications({ dailyCheckin })} />
              <Toggle label="Study breaks" value={!!notifications?.studyBreaks} onValueChange={(studyBreaks) => updateNotifications({ studyBreaks })} />
              <Toggle label="Hydration" value={!!notifications?.hydration} onValueChange={(hydration) => updateNotifications({ hydration })} />
              <Toggle label="Sleep reminders" value={!!notifications?.sleep} onValueChange={(sleep) => updateNotifications({ sleep })} />
            </View>
          ) : null}

          <SettingRow icon="shield-checkmark" title="Privacy" subtitle="Anonymous and history preferences" open={open === 'privacy'} onPress={() => setOpen(open === 'privacy' ? null : 'privacy')} />
          {open === 'privacy' ? (
            <View style={styles.panel}>
              <Toggle label="Anonymous community identity" value={!!privacy?.anonymousCommunity} onValueChange={(anonymousCommunity) => updatePrivacy({ anonymousCommunity })} />
              <Toggle label="Save Majik chat history" value={!!privacy?.saveChatHistory} onValueChange={(saveChatHistory) => updatePrivacy({ saveChatHistory })} />
              <Toggle label="Local-only mode" value={!!privacy?.localOnlyMode} onValueChange={(localOnlyMode) => updatePrivacy({ localOnlyMode })} />
            </View>
          ) : null}
        </SettingsSection>

        <SettingsSection title="PREFERENCES">
          <SettingRow icon="contrast" title="App Appearance" subtitle={mode === 'dark' ? 'Dark mode' : 'Light mode'} open={open === 'appearance'} onPress={() => setOpen(open === 'appearance' ? null : 'appearance')} />
          {open === 'appearance' ? (
            <View style={styles.panel}>
              <View style={[styles.segment, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                <ThemeButton title="Light" active={mode === 'light'} onPress={() => setTheme('light')} />
                <ThemeButton title="Dark" active={mode === 'dark'} onPress={() => setTheme('dark')} />
              </View>
            </View>
          ) : null}

          <SettingRow icon="language" title="Language" subtitle={wellness?.language || 'English'} open={open === 'language'} onPress={() => setOpen(open === 'language' ? null : 'language')} />
          {open === 'language' ? (
            <View style={styles.panel}>
              <Text style={[styles.panelText, { color: colors.textSecondary }]}>English is currently selected.</Text>
            </View>
          ) : null}

          <SettingRow icon="alarm" title="Wellness reminders" subtitle={wellness?.remindersEnabled ? 'Enabled' : 'Disabled'} open={open === 'reminders'} onPress={() => setOpen(open === 'reminders' ? null : 'reminders')} />
          {open === 'reminders' ? (
            <View style={styles.panel}>
              <Toggle label="Wellness reminders" value={!!wellness?.remindersEnabled} onValueChange={(remindersEnabled) => updateWellness({ remindersEnabled })} />
              <Text style={[styles.panelText, { color: colors.textSecondary }]}>Default reminder time: {wellness?.reminderTime || '20:00'}</Text>
            </View>
          ) : null}
        </SettingsSection>

        <SettingsSection title="SUPPORT">
          <SettingRow icon="help-circle" title="Help Center" subtitle="Guides for using ExhaustED" onPress={() => Alert.alert('Help Center', 'ExhaustED helps you track burnout, journal privately, and talk with Majik.')} />
          <SettingRow icon="mail" title="Contact Support" subtitle="Reach the wellness support team" onPress={() => Alert.alert('Contact Support', 'Email support@exhausted.app for help.')} />
        </SettingsSection>

        <Pressable onPress={handleSignOut} style={[styles.signOut, { backgroundColor: colors.red }]}>
          <Ionicons name="log-out-outline" size={21} color={colors.white} />
          <Text style={[styles.signOutText, { color: colors.white }]}>Sign out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsIllustration() {
  const colors = useThemeColors();
  return (
    <View style={[styles.illustration, { backgroundColor: colors.mintLight }]}>
      <View style={[styles.securityCard, { backgroundColor: colors.white, borderColor: colors.border }]}>
        <Ionicons name="shield-checkmark" size={31} color={colors.mint} />
      </View>
      <View style={[styles.securityBadge, { backgroundColor: colors.mint }]}>
        <Ionicons name="settings" size={18} color={colors.white} />
      </View>
    </View>
  );
}

function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  const colors = useThemeColors();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>{title}</Text>
      <Card style={styles.sectionCard}>{children}</Card>
    </View>
  );
}

function SettingRow({
  icon,
  title,
  subtitle,
  open,
  onPress,
}: {
  icon: IconName;
  title: string;
  subtitle: string;
  open?: boolean;
  onPress: () => void;
}) {
  const colors = useThemeColors();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.settingRow, pressed ? styles.pressed : null]}>
      <View style={[styles.rowIcon, { backgroundColor: colors.mintLight }]}>
        <Ionicons name={icon} size={18} color={colors.mintDark} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.rowSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      </View>
      <Ionicons name={open ? 'chevron-up' : 'chevron-forward'} size={20} color={colors.textTertiary} />
    </Pressable>
  );
}

function Toggle({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (value: boolean) => void }) {
  const colors = useThemeColors();
  return (
    <View style={styles.toggleRow}>
      <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.surfaceSecondary, true: colors.mintLight }}
        thumbColor={value ? colors.mint : colors.textTertiary}
      />
    </View>
  );
}

function ThemeButton({ title, active, onPress }: { title: string; active: boolean; onPress: () => void }) {
  const colors = useThemeColors();
  return (
    <Pressable onPress={onPress} style={[styles.themeButton, { backgroundColor: active ? colors.mint : 'transparent' }]}>
      <Text style={[styles.themeButtonText, { color: active ? colors.white : colors.textSecondary }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingBottom: 104, gap: 14 },
  hero: {
    minHeight: 118,
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 2,
  },
  heroCopy: { flex: 1, gap: 7 },
  heroTitle: { fontSize: 24, lineHeight: 29, fontWeight: '900' },
  heroSubtitle: { fontSize: 14, lineHeight: 20 },
  illustration: { width: 96, height: 96, borderRadius: 26, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  securityCard: { width: 58, height: 58, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-6deg' }] },
  securityBadge: { position: 'absolute', right: 12, bottom: 13, width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  userCard: { borderRadius: 22, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 13 },
  avatar: { width: 68, height: 68, borderRadius: 24, borderWidth: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  avatarInitials: { fontSize: 25, fontWeight: '900' },
  userInfo: { flex: 1, gap: 3 },
  userName: { fontSize: 20, lineHeight: 25, fontWeight: '900' },
  userEmail: { fontSize: 13, lineHeight: 18 },
  userCourse: { fontSize: 13, lineHeight: 18, fontWeight: '900' },
  section: { gap: 7 },
  sectionLabel: { fontSize: 12, lineHeight: 16, fontWeight: '900', letterSpacing: 0.5 },
  sectionCard: { borderRadius: 22, padding: 8 },
  settingRow: { minHeight: 66, borderRadius: 17, paddingHorizontal: 9, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 11 },
  rowIcon: { width: 40, height: 40, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  rowCopy: { flex: 1, gap: 2 },
  rowTitle: { fontSize: 15, lineHeight: 20, fontWeight: '900' },
  rowSubtitle: { fontSize: 12, lineHeight: 17 },
  panel: { paddingHorizontal: 9, paddingBottom: 12, gap: 11 },
  panelText: { fontSize: 13, lineHeight: 19 },
  toggleRow: { minHeight: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  toggleLabel: { flex: 1, fontSize: 14, lineHeight: 19, fontWeight: '800' },
  segment: { borderWidth: 1, borderRadius: 16, padding: 4, flexDirection: 'row', gap: 4 },
  themeButton: { flex: 1, minHeight: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  themeButtonText: { fontSize: 14, fontWeight: '900' },
  signOut: { minHeight: 50, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  signOutText: { fontSize: 15, fontWeight: '900' },
  pressed: { opacity: 0.72 },
});
