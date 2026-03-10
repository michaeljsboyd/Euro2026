import { BookingStatus } from '@/lib/types';
import clsx from 'clsx';

const statusStyles: Record<BookingStatus, string> = {
  Booked: 'bg-emerald-100 text-emerald-700',
  Tentative: 'bg-amber-100 text-amber-700',
  'Need to Book': 'bg-rose-100 text-rose-700'
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={clsx('rounded-full px-2.5 py-1 text-xs font-semibold', statusStyles[status])}>
      {status}
    </span>
  );
}
