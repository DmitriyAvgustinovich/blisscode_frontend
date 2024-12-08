import { IDirectionStack } from "types";

export const getStacksOptions = (stacks: IDirectionStack[]) => {
  if (!stacks) return [];

  return stacks.map((stack) => ({
    label: stack.name,
    value: stack.id,
  }));
};
