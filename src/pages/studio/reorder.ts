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
