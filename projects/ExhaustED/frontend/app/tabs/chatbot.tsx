import { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/constants/colors';
import { useChatbotStore } from '@/store/chatbotStore';
import type { ChatMessage } from '@/types';

export default function ChatbotScreen() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const messages = useChatbotStore((state) => state.messages);
  const isTyping = useChatbotStore((state) => state.isTyping);
  const sendMessage = useChatbotStore((state) => state.sendMessage);
  const [message, setMessage] = useState('');
  const isCompact = width < 390;

  function send() {
    const trimmed = message.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setMessage('');
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 4 : 0}
      >
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Link href="/tabs" asChild>
            <Pressable style={[styles.homeButton, { backgroundColor: colors.mintLight }]}>
              <Ionicons name="home" size={22} color={colors.mintDark} />
            </Pressable>
          </Link>
          <View style={[styles.avatar, { backgroundColor: colors.mintLight }]}>
            <Text style={[styles.avatarText, { color: colors.mintDark }]}>M</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.systemName, { color: colors.textPrimary }]}>Majik</Text>
            <Text style={[styles.tagline, { color: colors.textSecondary }]}>A softer place for burnout, pressure, and heavy days.</Text>
          </View>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          contentContainerStyle={[
            styles.list,
            {
              paddingHorizontal: isCompact ? 14 : 20,
              paddingBottom: 18,
            },
          ]}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => <MessageBubble message={item} maxWidth={isCompact ? '93%' : '86%'} />}
          ListFooterComponent={isTyping ? <TypingBubble /> : <View style={styles.footerSpace} />}
        />

        <View
          pointerEvents="box-none"
          style={[
            styles.composerWrap,
            {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              paddingBottom: Math.max(insets.bottom, 10) + 74,
            },
          ]}
        >
          <View style={[styles.composer, { backgroundColor: colors.input, borderColor: colors.borderStrong }]}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Tell Majik what feels heavy..."
              placeholderTextColor={colors.textTertiary}
              multiline
              maxLength={700}
              blurOnSubmit={false}
              returnKeyType="default"
              style={[styles.input, { color: colors.textPrimary, maxHeight: isCompact ? 96 : 122 }]}
              textAlignVertical="top"
            />
            <Pressable
              onPress={send}
              disabled={!message.trim() || isTyping}
              hitSlop={8}
              style={({ pressed }) => [
                styles.sendButton,
                { backgroundColor: message.trim() && !isTyping ? colors.mint : colors.surfaceSecondary },
                pressed && message.trim() && !isTyping ? styles.pressed : null,
              ]}
            >
              <Text style={[styles.sendText, { color: message.trim() && !isTyping ? colors.white : colors.textTertiary }]}>Send</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function MessageBubble({ message, maxWidth }: { message: ChatMessage; maxWidth: `${number}%` }) {
  const colors = useThemeColors();
  const isUser = message.role === 'user';

  return (
    <View style={[styles.messageRow, isUser ? styles.userRow : styles.assistantRow]}>
      <View
        style={[
          styles.bubble,
          {
            maxWidth,
            backgroundColor: isUser ? colors.mint : colors.surfaceElevated,
            borderColor: isUser ? colors.mint : colors.border,
            borderTopRightRadius: isUser ? 8 : 20,
            borderTopLeftRadius: isUser ? 20 : 8,
          },
        ]}
      >
        <Text style={[styles.role, { color: isUser ? colors.white : colors.mintDark }]}>{isUser ? 'You' : 'Majik'}</Text>
        <Text style={[styles.message, { color: isUser ? colors.white : colors.textPrimary }]}>{message.content}</Text>
      </View>
    </View>
  );
}

function TypingBubble() {
  const colors = useThemeColors();

  return (
    <View style={[styles.messageRow, styles.assistantRow]}>
      <View style={[styles.typing, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
        <Text style={[styles.typingText, { color: colors.textSecondary }]}>Majik is typing...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  keyboard: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  homeButton: { width: 44, height: 44, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 20, fontWeight: '900' },
  headerText: { flex: 1 },
  systemName: { fontSize: 24, fontWeight: '900' },
  tagline: { fontSize: 14, lineHeight: 20, marginTop: 2 },
  list: { flexGrow: 1, gap: 12, paddingTop: 18 },
  messageRow: { width: '100%', flexDirection: 'row' },
  userRow: { justifyContent: 'flex-end' },
  assistantRow: { justifyContent: 'flex-start' },
  bubble: { borderRadius: 20, borderWidth: 1, paddingHorizontal: 15, paddingVertical: 12 },
  role: { fontSize: 12, fontWeight: '900', marginBottom: 5 },
  message: { fontSize: 15, lineHeight: 22 },
  typing: { borderRadius: 18, borderWidth: 1, paddingHorizontal: 15, paddingVertical: 12 },
  typingText: { fontSize: 14, fontStyle: 'italic' },
  footerSpace: { height: 4 },
  composerWrap: { borderTopWidth: 1, paddingHorizontal: 14, paddingTop: 12 },
  composer: {
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    padding: 8,
  },
  input: { flex: 1, minHeight: 38, paddingHorizontal: 8, paddingVertical: 8, fontSize: 15, lineHeight: 21 },
  sendButton: { minHeight: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 },
  sendText: { fontWeight: '900', fontSize: 14 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
});
