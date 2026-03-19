import { StyleSheet, Text, View } from 'react-native';
import TagItem from './TagItem';
import { colors, radius, shadows, spacing } from '../styles/theme';

export default function FileCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.size}>{item.size}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.meta}>{item.category}</Text>
        <Text style={styles.meta}>{item.modifiedAt}</Text>
      </View>
      <View style={styles.tagRow}>
        {item.tags.map((tag) => (
          <TagItem key={`${item.id}-${tag}`} label={`#${tag}`} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    marginRight: spacing.md,
    fontSize: 15,
    color: colors.text,
    fontWeight: '700',
  },
  size: {
    fontSize: 13,
    color: colors.point,
    fontWeight: '700',
  },
  meta: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.textMuted,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
});
