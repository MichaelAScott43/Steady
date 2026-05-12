import { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Props = PropsWithChildren<{ title: string; subtitle: string }>;

export function ScreenFrame({ title, subtitle, children }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.body}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B0D10' },
  container: { flex: 1, padding: 20 },
  title: { color: '#F2F4F8', fontSize: 28, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: '#A1A7B3', marginBottom: 20 },
  body: { flex: 1, borderRadius: 16, backgroundColor: '#151922', padding: 16 }
});
