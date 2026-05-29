import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useThemeColors } from '@/constants/colors';
import { useJournalStore } from '@/store/journalStore';
import type { JournalEntry } from '@/types';

const moods = ['Calm', 'Heavy', 'Anxious', 'Tired', 'Hopeful'];

export default function JournalScreen() {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const entries = useJournalStore((state) => state.entries);
  const addEntry = useJournalStore((state) => state.addEntry);
  const updateEntry = useJournalStore((state) => state.updateEntry);
  const deleteEntry = useJournalStore((state) => state.deleteEntry);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<string | undefined>(undefined);
  const isCompact = width < 390;
  const selectedEntry = useMemo(() => entries.find((entry) => entry.id === editingId), [editingId, entries]);

  function resetForm() {
    setEditingId(null);
    setTitle('');
    setContent('');
    setMood(undefined);
  }

  function startEdit(entry: JournalEntry) {
    setEditingId(entry.id);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood);
  }

  function saveEntry() {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Entry needs a little more', 'Please add both a title and something you want to write.');
      return;
    }

    if (editingId) {
      updateEntry(editingId, { title, content, mood });
    } else {
      addEntry({ title, content, mood });
    }
    resetForm();
  }

  function confirmDelete(id: string) {
    Alert.alert('Delete entry?', 'This journal entry will be removed from this account only.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteEntry(id) },
    ]);
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentWrap,
          {
            paddingHorizontal: isCompact ? 16 : 22,
            paddingTop: isCompact ? 10 : 14,
          },
        ]}
      >
        <View style={styles.brandBlock}>
          <Text style={[styles.brand, { color: colors.textPrimary }]}>ExhaustED</Text>
          <Text style={[styles.brandSubtitle, { color: colors.textSecondary }]}>
            Student wellness support for heavy academic days.
          </Text>
        </View>

        <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <View style={styles.heroCopy}>
            <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>Journal</Text>
            <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
              A private space to put feelings somewhere softer than your head.
            </Text>
          </View>
          <JournalIllustration />
        </View>

        <Card style={styles.form}>
          <View style={styles.formHeader}>
            <View style={styles.formIcon}>
              <Ionicons name="create" size={18} color={colors.mintDark} />
            </View>
            <View style={styles.formTitleWrap}>
              <Text style={[styles.formTitle, { color: colors.textPrimary }]}>{selectedEntry ? 'Edit entry' : 'New entry'}</Text>
              <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
                Capture your thoughts, feelings, and reflections.
              </Text>
            </View>
          </View>

          <Input label="Title" value={title} onChangeText={setTitle} placeholder="What would you call this moment?" />

          <View style={styles.inputWrap}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Content</Text>
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="Write what you do not want to carry alone..."
              placeholderTextColor={colors.textTertiary}
              multiline
              textAlignVertical="top"
              style={[
                styles.textArea,
                {
                  backgroundColor: colors.input,
                  borderColor: colors.borderStrong,
                  color: colors.textPrimary,
                },
              ]}
            />
          </View>

          <View style={styles.moodWrap}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Mood selection</Text>
            <View style={styles.moodGrid}>
              {moods.map((item) => {
                const active = mood === item;
                return (
                  <Pressable
                    key={item}
                    onPress={() => setMood(active ? undefined : item)}
                    style={({ pressed }) => [
                      styles.moodChip,
                      {
                        backgroundColor: active ? colors.mint : colors.surfaceSecondary,
                        borderColor: active ? colors.mint : colors.border,
                        opacity: pressed ? 0.78 : 1,
                      },
                    ]}
                  >
                    <Text style={[styles.moodText, { color: active ? colors.white : colors.textSecondary }]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={[styles.privacyCard, { backgroundColor: colors.mintLight, borderColor: colors.border }]}>
            <Ionicons name="shield-checkmark" size={17} color={colors.mintDark} />
            <Text style={[styles.privacyText, { color: colors.mintDark }]}>Your journal is private and secure.</Text>
          </View>

          <View style={styles.actions}>
            {editingId ? <Button title="Cancel" variant="secondary" onPress={resetForm} style={styles.actionButton} /> : null}
            <Button title={editingId ? 'Save changes' : 'Save entry'} onPress={saveEntry} style={styles.actionButton} />
          </View>
        </Card>

        <View style={styles.entriesHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Your entries</Text>
          <Text style={[styles.entryCount, { color: colors.textTertiary }]}>{entries.length} saved</Text>
        </View>

        {entries.map((entry) => (
          <Card key={entry.id} style={styles.entry}>
            <View style={styles.entryHeader}>
              <View style={styles.entryTitleWrap}>
                <Text style={[styles.entryTitle, { color: colors.textPrimary }]}>{entry.title}</Text>
                <Text style={[styles.entryDate, { color: colors.textTertiary }]}>{new Date(entry.date).toLocaleString()}</Text>
              </View>
              {entry.mood ? (
                <View style={[styles.entryMood, { backgroundColor: colors.mintLight, borderColor: colors.border }]}>
                  <Text style={[styles.entryMoodText, { color: colors.mintDark }]}>{entry.mood}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.entryContent, { color: colors.textSecondary }]} numberOfLines={4}>
              {entry.content}
            </Text>
            <View style={styles.entryActions}>
              <Pressable onPress={() => startEdit(entry)} style={[styles.textButton, { borderColor: colors.border }]}>
                <Ionicons name="pencil" size={14} color={colors.mintDark} />
                <Text style={[styles.textButtonLabel, { color: colors.mintDark }]}>Edit</Text>
              </Pressable>
              <Pressable onPress={() => confirmDelete(entry.id)} style={[styles.textButton, { borderColor: colors.border }]}>
                <Ionicons name="trash-outline" size={14} color={colors.red} />
                <Text style={[styles.textButtonLabel, { color: colors.red }]}>Delete</Text>
              </Pressable>
            </View>
          </Card>
        ))}

        {!entries.length ? (
          <View style={[styles.empty, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.mintLight }]}>
              <Ionicons name="book" size={22} color={colors.mintDark} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>No entries yet</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Start with one honest sentence. It does not need to be polished to be useful.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function JournalIllustration() {
  const colors = useThemeColors();

  return (
    <View style={[styles.illustration, { backgroundColor: colors.mintLight }]}>
      <View style={[styles.pageBack, { backgroundColor: colors.surfaceSecondary }]} />
      <View style={[styles.bookCover, { backgroundColor: colors.white, borderColor: colors.border }]}>
        <View style={[styles.bookLine, { backgroundColor: colors.mint }]} />
        <View style={[styles.bookLineShort, { backgroundColor: colors.lavender }]} />
        <Ionicons name="leaf" size={21} color={colors.mintDark} />
      </View>
      <View style={[styles.pen, { backgroundColor: colors.mint }]}>
        <Ionicons name="pencil" size={17} color={colors.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  contentWrap: { paddingBottom: 104, gap: 14 },
  brandBlock: { gap: 2 },
  brand: { fontSize: 24, fontWeight: '900', letterSpacing: 0 },
  brandSubtitle: { fontSize: 13, lineHeight: 18 },
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
  heroTitle: { fontSize: 25, lineHeight: 30, fontWeight: '900', letterSpacing: 0 },
  heroSubtitle: { fontSize: 14, lineHeight: 20 },
  illustration: {
    width: 96,
    height: 96,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pageBack: { position: 'absolute', width: 52, height: 60, borderRadius: 14, right: 11, top: 16, transform: [{ rotate: '8deg' }] },
  bookCover: {
    width: 56,
    height: 66,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    transform: [{ rotate: '-6deg' }],
  },
  bookLine: { width: 28, height: 4, borderRadius: 999 },
  bookLineShort: { width: 20, height: 4, borderRadius: 999 },
  pen: { position: 'absolute', right: 11, bottom: 12, width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  form: { borderRadius: 22, padding: 16, gap: 13 },
  formHeader: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  formIcon: { width: 38, height: 38, borderRadius: 14, backgroundColor: '#E1F5EE', alignItems: 'center', justifyContent: 'center' },
  formTitleWrap: { flex: 1, gap: 2 },
  formTitle: { fontSize: 19, fontWeight: '900' },
  formSubtitle: { fontSize: 13, lineHeight: 18 },
  inputWrap: { gap: 6 },
  label: { fontSize: 13, fontWeight: '800' },
  textArea: {
    minHeight: 128,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    lineHeight: 22,
  },
  moodWrap: { gap: 8 },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  moodChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 13, paddingVertical: 8 },
  moodText: { fontSize: 13, fontWeight: '800' },
  privacyCard: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 8 },
  privacyText: { flex: 1, fontSize: 13, fontWeight: '800', lineHeight: 18 },
  actions: { flexDirection: 'row', gap: 10 },
  actionButton: { flex: 1 },
  entriesHeader: { marginTop: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 18, fontWeight: '900' },
  entryCount: { fontSize: 12, fontWeight: '800' },
  entry: { borderRadius: 22, padding: 16, gap: 12 },
  entryHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 },
  entryTitleWrap: { flex: 1, gap: 4 },
  entryTitle: { fontSize: 18, fontWeight: '900' },
  entryDate: { fontSize: 12 },
  entryMood: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  entryMoodText: { fontSize: 12, fontWeight: '900' },
  entryContent: { lineHeight: 22 },
  entryActions: { flexDirection: 'row', gap: 8 },
  textButton: { borderWidth: 1, borderRadius: 13, paddingHorizontal: 12, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 6 },
  textButtonLabel: { fontWeight: '900' },
  empty: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    gap: 8,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  emptyIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '900' },
  emptyText: { textAlign: 'center', lineHeight: 21 },
});
