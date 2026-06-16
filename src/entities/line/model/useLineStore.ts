import { create } from 'zustand';
import { Line } from './line.types';
import { supabase } from '@/shared/lib/supabase';

interface LineStore {
  lines: Line[];
  isLoading: boolean;
  fetchLines: () => Promise<void>;
  addLine: (line: Omit<Line, 'id' | 'savedAt'>) => Promise<void>;
  deleteLine: (id: string) => Promise<void>;
  updateLine: (id: string, updates: Partial<Omit<Line, 'id' | 'savedAt'>>) => Promise<void>;
}

function toLine(row: Record<string, unknown>): Line {
  return {
    id: row.id as string,
    sentence: row.sentence as string,
    bookTitle: row.book_title as string,
    author: (row.author as string | null) ?? undefined,
    page: (row.page as number | null) ?? undefined,
    savedAt: new Date(row.saved_at as string),
  };
}

export const useLineStore = create<LineStore>((set) => ({
  lines: [],
  isLoading: false,

  fetchLines: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('lines')
      .select('*')
      .order('saved_at', { ascending: false });
    if (error) console.error('[fetchLines]', error.message);
    set({ lines: (data ?? []).map(toLine), isLoading: false });
  },

  addLine: async (line) => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError) console.error('[addLine] auth error', authError.message);
    if (!user) { console.warn('[addLine] no user — skipping insert'); return; }

    const { data, error } = await supabase
      .from('lines')
      .insert({
        user_id: user.id,
        sentence: line.sentence,
        book_title: line.bookTitle,
        author: line.author ?? null,
        page: line.page ?? null,
      })
      .select()
      .single();

    if (error) console.error('[addLine] insert error', error.message);
    if (data) {
      set((state) => ({ lines: [toLine(data), ...state.lines] }));
    }
  },

  deleteLine: async (id) => {
    await supabase.from('lines').delete().eq('id', id);
    set((state) => ({ lines: state.lines.filter((l) => l.id !== id) }));
  },

  updateLine: async (id, updates) => {
    const dbUpdates: Record<string, unknown> = {};
    if (updates.sentence !== undefined) dbUpdates.sentence = updates.sentence;
    if (updates.bookTitle !== undefined) dbUpdates.book_title = updates.bookTitle;
    if ('author' in updates) dbUpdates.author = updates.author ?? null;
    if ('page' in updates) dbUpdates.page = updates.page ?? null;

    await supabase.from('lines').update(dbUpdates).eq('id', id);
    set((state) => ({
      lines: state.lines.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    }));
  },
}));
