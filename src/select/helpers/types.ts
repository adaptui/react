import {
  Group as ReakitGroup,
  Item as ReakitItem,
} from "reakit/ts/Composite/__utils/types";

export type Group = ReakitGroup;
export type Item = ReakitItem & {
  value?: string;
};
