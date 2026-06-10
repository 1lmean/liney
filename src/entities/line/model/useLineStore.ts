import { create } from 'zustand';
import { Line } from './line.types';

interface LineStore {
  lines: Line[];
  addLine: (line: Omit<Line, 'id' | 'savedAt'>) => void;
  deleteLine: (id: string) => void;
  updateLine: (id: string, updates: Partial<Omit<Line, 'id' | 'savedAt'>>) => void;
}

const DUMMY: Line[] = [
  {
    id: '1',
    sentence:
      '삶이 있는 곳에 희망이 있다. 우리는 늘 무언가를 향해 걸어가고 있으며, 그 여정 자체가 의미를 만든다.',
    bookTitle: '채식주의자',
    author: '한강',
    page: 128,
    savedAt: new Date(),
  },
  {
    id: '2',
    sentence: '우리는 모두 연약한 존재이며, 그 연약함이 우리를 인간답게 만든다.',
    bookTitle: '82년생 김지영',
    author: '조남주',
    page: 45,
    savedAt: new Date(Date.now() - 86400000),
  },
  {
    id: '3',
    sentence: '모든 것이 흘러간다는 것을 알면서도, 우리는 여전히 무언가를 붙잡으려 한다.',
    bookTitle: '아몬드',
    author: '손원평',
    page: 210,
    savedAt: new Date(Date.now() - 86400000 * 3),
  },
  {
    id: '4',
    sentence: '두려움은 없어지지 않는다. 다만 우리가 두려움보다 조금 더 용감해질 뿐이다.',
    bookTitle: '나미야 잡화점의 기적',
    author: '히가시노 게이고',
    page: 88,
    savedAt: new Date(Date.now() - 86400000 * 10),
  },
  {
    id: '5',
    sentence: '사랑한다는 것은 서로의 고독을 인정하는 것이다.',
    bookTitle: '어린 왕자',
    author: '생텍쥐페리',
    page: 62,
    savedAt: new Date(Date.now() - 86400000 * 108),
  },
  {
    id: '6',
    sentence: '행복은 언제나 소박한 것들 속에 숨어 있다.',
    bookTitle: '데미안',
    author: '헤르만 헤세',
    page: 34,
    savedAt: new Date(Date.now() - 86400000 * 400),
  },
];

export const useLineStore = create<LineStore>((set) => ({
  lines: DUMMY,

  addLine: (line) =>
    set((state) => ({
      lines: [
        {
          ...line,
          id: Date.now().toString(),
          savedAt: new Date(),
        },
        ...state.lines,
      ],
    })),

  deleteLine: (id) =>
    set((state) => ({
      lines: state.lines.filter((l) => l.id !== id),
    })),

  updateLine: (id, updates) =>
    set((state) => ({
      lines: state.lines.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    })),
}));
