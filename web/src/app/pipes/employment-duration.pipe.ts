import { Pipe, PipeTransform } from '@angular/core';

const MONTH_MAP: Readonly<Record<string, number>> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseDate(str: string): Date {
  if (str.trim().toLowerCase() === 'present') return new Date();
  const [mon, yr] = str.trim().split(' ');
  return new Date(parseInt(yr, 10), MONTH_MAP[mon] ?? 0);
}

@Pipe({ name: 'employmentDuration', standalone: true, pure: true })
export class EmploymentDurationPipe implements PipeTransform {
  transform(period: string): string {
    const [startStr, endStr] = period.split('-').map(s => s.trim());
    const start = parseDate(startStr);
    const end = parseDate(endStr);

    const totalMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;

    const yrs = Math.floor(totalMonths / 12);
    const mos = totalMonths % 12;

    if (yrs && mos) return `${yrs} yr${yrs > 1 ? 's' : ''} ${mos} mo${mos > 1 ? 's' : ''}`;
    if (yrs) return `${yrs} yr${yrs > 1 ? 's' : ''}`;
    return `${mos} mo${mos > 1 ? 's' : ''}`;
  }
}
