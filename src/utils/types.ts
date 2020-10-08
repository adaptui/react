export type DateTimeFormatOptions = Intl.DateTimeFormatOptions & {
  timeStyle?: string;
  dateStyle?: string;
};

export type DateValue = string | number | Date;
