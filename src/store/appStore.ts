import { create } from 'zustand';
import dayjs from 'dayjs';

export type Currency = 'USD' | 'LKR' | 'EUR' | 'GBP';

type AppState = {
  // global settings
  currency: Currency;
  setCurrency: (c: Currency) => void;

  // the currently selected month (YYYY-MM) for budget/transactions views
  month: string;
  setMonth: (iso: string) => void;
  nextMonth: () => void;
  prevMonth: () => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  currency: 'USD',
  setCurrency: (currency) => set({ currency }),

  month: dayjs().format('YYYY-MM'),
  setMonth: (iso) => set({ month: iso }),

  nextMonth: () => {
    const next = dayjs(get().month + '-01').add(1, 'month').format('YYYY-MM');
    set({ month: next });
  },
  prevMonth: () => {
    const prev = dayjs(get().month + '-01').subtract(1, 'month').format('YYYY-MM');
    set({ month: prev });
  },
}));
