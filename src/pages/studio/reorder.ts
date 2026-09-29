/**
 * Swaps the sort_order of two adjacent items so one moves up/down in the
 * admin list (and therefore on the public site, which always orders by
 * sort_order). Shared by every panel that supports reordering.
 */
export async function moveItem<T extends { id: string; sort_order: number }>(
  items: T[],
  index: number,
  direction: -1 | 1,
  update: (id: string, patch: { sort_order: number }) => Promise<unknown>
): Promise<boolean> {
  const target = index + direction;
  if (target < 0 || target >= items.length) return false;
  const a = items[index];
  const b = items[target];
  await Promise.all([update(a.id, { sort_order: b.sort_order }), update(b.id, { sort_order: a.sort_order })]);
  return true;
}

export function bySortOrder<T extends { sort_order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sort_order - b.sort_order);
}

/**
 * Moves one item to an exact 1-indexed position within `items` (already in
 * sort_order order) and reflows every affected sort_order so the whole list
 * stays a clean, gap-free, duplicate-free sequence — used by the "Priority"
 * number field in each edit form as an alternative to repeated Up/Down clicks.
 */
export async function setPriority<T extends { id: string; sort_order: number }>(
  items: T[],
  id: string,
  targetPosition: number,
  update: (id: string, patch: { sort_order: number }) => Promise<unknown>
): Promise<boolean> {
  const currentIndex = items.findIndex((i) => i.id === id);
  if (currentIndex === -1) return false;

  const clampedIndex = Math.min(Math.max(Math.round(targetPosition), 1), items.length) - 1;
  if (clampedIndex === currentIndex) return false;

  const reordered = [...items];
  const [moved] = reordered.splice(currentIndex, 1);
  reordered.splice(clampedIndex, 0, moved);

  const updates = reordered
    .map((item, i) => ({ item, sort_order: i }))
    .filter(({ item, sort_order }) => item.sort_order !== sort_order)
    .map(({ item, sort_order }) => update(item.id, { sort_order }));

  await Promise.all(updates);
  return true;
}
