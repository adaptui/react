import {
  Item as ReakitItem,
  Group as ReakitGroup,
} from "reakit/ts/Composite/__utils/types";

export type Group = ReakitGroup;
export type Item = ReakitItem & {
  value?: string;
};
