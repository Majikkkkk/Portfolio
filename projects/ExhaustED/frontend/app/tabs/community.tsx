import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useThemeColors } from '@/constants/colors';
import { useCommunityStore } from '@/store/communityStore';

const moods = ['Need support', 'Burned out', 'Anxious', 'Tired', 'Small win'];

export default function CommunityScreen() {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const posts = useCommunityStore((state) => state.posts);
  const addPost = useCommunityStore((state) => state.addPost);
  const addComment = useCommunityStore((state) => state.addComment);
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<string | undefined>('Need support');
  const [comments, setComments] = useState<Record<string, string>>({});
  const isCompact = width < 390;

  function post() {
    try {
      addPost({ content, mood });
      setContent('');
      setMood('Need support');
    } catch (error) {
      Alert.alert('Community post blocked', error instanceof Error ? error.message : 'Please keep posts supportive.');
    }
  }

  function comment(postId: string) {
    try {
      addComment(postId, comments[postId] || '');
      setComments((current) => ({ ...current, [postId]: '' }));
    } catch (error) {
      Alert.alert('Comment blocked', error instanceof Error ? error.message : 'Please keep comments supportive.');
    }
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
            <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>Anonymous Community</Text>
            <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
              Share gently. Reply with comfort.{'\n'}Offensive words are automatically blocked.
            </Text>
          </View>
          <CommunityIllustration />
        </View>

        <Card style={styles.form}>
          <View style={styles.formHeader}>
            <View style={styles.formIcon}>
              <Ionicons name="chatbubbles" size={18} color={colors.mintDark} />
            </View>
            <View style={styles.formTitleWrap}>
              <Text style={[styles.formTitle, { color: colors.textPrimary }]}>Create anonymous post</Text>
              <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
                You are not alone. We're here for each other.
              </Text>
            </View>
          </View>

          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="What do you want support with today?"
            placeholderTextColor={colors.textTertiary}
            multiline
            textAlignVertical="top"
            style={[styles.textArea, { backgroundColor: colors.input, borderColor: colors.borderStrong, color: colors.textPrimary }]}
          />

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

          <Button title="Post anonymously" onPress={post} />

          <View style={[styles.privacyCard, { backgroundColor: colors.mintLight, borderColor: colors.border }]}>
            <Ionicons name="lock-closed" size={16} color={colors.mintDark} />
            <Text style={[styles.privacyText, { color: colors.mintDark }]}>Your identity is completely hidden.</Text>
          </View>
        </Card>

        <View style={styles.feedHeader}>
          <Text style={[styles.feedTitle, { color: colors.textPrimary }]}>Post feed</Text>
          <Text style={[styles.feedCount, { color: colors.textTertiary }]}>{posts.length} posts</Text>
        </View>

        {posts.map((item) => (
          <Card key={item.id} style={styles.post}>
            <View style={styles.postHeader}>
              <View style={styles.avatarRow}>
                <View style={[styles.avatar, { backgroundColor: colors.mintLight }]}>
                  <Ionicons name="person" size={16} color={colors.mintDark} />
                </View>
                <View style={styles.postMeta}>
                  <Text style={[styles.anonymous, { color: colors.textPrimary }]}>Anonymous Student</Text>
                  <Text style={[styles.date, { color: colors.textTertiary }]}>{new Date(item.createdAt).toLocaleString()}</Text>
                </View>
              </View>
              {item.mood ? (
                <View style={[styles.pill, { backgroundColor: colors.mintLight, borderColor: colors.border }]}>
                  <Text style={[styles.pillText, { color: colors.mintDark }]}>{item.mood}</Text>
                </View>
              ) : null}
            </View>

            <Text style={[styles.postText, { color: colors.textPrimary }]}>{item.content}</Text>

            <View style={[styles.actionRow, { borderTopColor: colors.border }]}>
              {['Like', 'Comment', 'Save'].map((label) => (
                <Pressable key={label} style={({ pressed }) => [styles.actionButton, pressed ? styles.pressed : null]}>
                  <Ionicons
                    name={label === 'Like' ? 'heart-outline' : label === 'Comment' ? 'chatbubble-outline' : 'bookmark-outline'}
                    size={16}
                    color={colors.textSecondary}
                  />
                  <Text style={[styles.actionText, { color: colors.textSecondary }]}>{label}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.comments}>
              {item.comments.map((commentItem) => (
                <View key={commentItem.id} style={[styles.comment, { backgroundColor: colors.surfaceSecondary }]}>
                  <Text style={[styles.commentAuthor, { color: colors.textPrimary }]}>Anonymous support</Text>
                  <Text style={[styles.commentText, { color: colors.textSecondary }]}>{commentItem.content}</Text>
                </View>
              ))}
              <View style={styles.commentComposer}>
                <TextInput
                  value={comments[item.id] || ''}
                  onChangeText={(value) => setComments((current) => ({ ...current, [item.id]: value }))}
                  placeholder="Write a comforting reply..."
                  placeholderTextColor={colors.textTertiary}
                  style={[styles.commentInput, { backgroundColor: colors.input, borderColor: colors.borderStrong, color: colors.textPrimary }]}
                />
                <Pressable onPress={() => comment(item.id)} style={[styles.commentButton, { backgroundColor: colors.mint }]}>
                  <Ionicons name="send" size={16} color={colors.white} />
                </Pressable>
              </View>
            </View>
          </Card>
        ))}

        {!posts.length ? (
          <Card style={styles.emptyCard}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.mintLight }]}>
              <Ionicons name="leaf" size={22} color={colors.mintDark} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>No posts yet</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Be the first to leave something honest and supportive.
            </Text>
          </Card>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function CommunityIllustration() {
  const colors = useThemeColors();

  return (
    <View style={[styles.illustration, { backgroundColor: colors.mintLight }]}>
      <View style={[styles.blobBack, { backgroundColor: colors.surface }]} />
      <View style={[styles.bubbleLarge, { backgroundColor: colors.white }]}>
        <Ionicons name="heart" size={19} color={colors.coral} />
      </View>
      <View style={[styles.bubbleSmall, { backgroundColor: colors.mint }]}>
        <Ionicons name="sparkles" size={13} color={colors.white} />
      </View>
      <View style={[styles.personCircle, { backgroundColor: colors.mint }]}>
        <Ionicons name="people" size={34} color={colors.white} />
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
  heroTitle: { fontSize: 24, lineHeight: 29, fontWeight: '900', letterSpacing: 0 },
  heroSubtitle: { fontSize: 14, lineHeight: 20 },
  illustration: {
    width: 96,
    height: 96,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  blobBack: { position: 'absolute', width: 54, height: 54, borderRadius: 18, right: 8, bottom: 9, opacity: 0.58 },
  bubbleLarge: {
    position: 'absolute',
    width: 38,
    height: 31,
    borderRadius: 15,
    top: 10,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleSmall: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    right: 12,
    top: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  form: { borderRadius: 22, padding: 16, gap: 13 },
  formHeader: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  formIcon: { width: 38, height: 38, borderRadius: 14, backgroundColor: '#E1F5EE', alignItems: 'center', justifyContent: 'center' },
  formTitleWrap: { flex: 1, gap: 2 },
  formTitle: { fontSize: 19, fontWeight: '900' },
  formSubtitle: { fontSize: 13, lineHeight: 18 },
  textArea: {
    minHeight: 104,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    lineHeight: 22,
  },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  moodChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  moodText: { fontSize: 12, fontWeight: '900' },
  privacyCard: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 8 },
  privacyText: { flex: 1, fontSize: 13, fontWeight: '800', lineHeight: 18 },
  feedHeader: { marginTop: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  feedTitle: { fontSize: 18, fontWeight: '900' },
  feedCount: { fontSize: 12, fontWeight: '800' },
  post: { borderRadius: 22, padding: 16, gap: 12 },
  postHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 },
  avatarRow: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  postMeta: { flex: 1, gap: 2 },
  anonymous: { fontSize: 15, fontWeight: '900' },
  pill: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  pillText: { fontSize: 11, fontWeight: '900' },
  postText: { fontSize: 15, lineHeight: 23 },
  date: { fontSize: 11 },
  actionRow: { borderTopWidth: 1, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' },
  actionButton: { minHeight: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingHorizontal: 8, flex: 1 },
  actionText: { fontSize: 12, fontWeight: '800' },
  pressed: { opacity: 0.65 },
  comments: { gap: 8 },
  comment: { borderRadius: 16, padding: 11, gap: 3 },
  commentAuthor: { fontSize: 12, fontWeight: '900' },
  commentText: { lineHeight: 20 },
  commentComposer: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  commentInput: { flex: 1, minHeight: 42, borderWidth: 1, borderRadius: 16, paddingHorizontal: 12 },
  commentButton: { width: 42, height: 42, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  emptyCard: { borderRadius: 22, alignItems: 'center', gap: 8 },
  emptyIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '900' },
  emptyText: { textAlign: 'center', lineHeight: 21 },
});
