import { Pipe, PipeTransform } from '@angular/core';

const MONTH_MAP: Readonly<Record<string, number>> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseDate(str: string, now: Date): Date | null {
  const trimmed = str.trim();
  if (trimmed.toLowerCase() === 'present') return now;

  const parts = trimmed.split(' ');
  if (parts.length !== 2) return null;

  const [mon, yrStr] = parts;
  const yr = parseInt(yrStr, 10);

  if (!(mon in MONTH_MAP) || isNaN(yr)) return null;

  return new Date(yr, MONTH_MAP[mon]);
}

// Pure pipe: output is a deterministic function of (period, now).
// Pass `now` from the component so change detection can update "Present"
// entries when the date changes without relying on impure evaluation.
@Pipe({ name: 'employmentDuration', standalone: true })
export class EmploymentDurationPipe implements PipeTransform {
  transform(period: string, now: Date): string {
    const [startStr, endStr] = period.split('-').map(s => s.trim());

    const start = parseDate(startStr, now);
    const end   = parseDate(endStr,   now);

    if (!start || !end) return '';

    const totalMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;

    if (totalMonths <= 0) return '';

    const yrs = Math.floor(totalMonths / 12);
    const mos = totalMonths % 12;

    if (yrs && mos) return `${yrs} yr${yrs > 1 ? 's' : ''} ${mos} mo${mos > 1 ? 's' : ''}`;
    if (yrs)        return `${yrs} yr${yrs > 1 ? 's' : ''}`;
    return          `${mos} mo${mos > 1 ? 's' : ''}`;
  }
}
