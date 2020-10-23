export type Item = {
  id: string | null;
  ref: React.RefObject<HTMLElement>;
  groupId?: string;
  disabled?: boolean;
};
