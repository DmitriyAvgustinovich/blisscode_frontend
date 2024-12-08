import { IDirection } from "types";

export const getDirectionsOptions = (directions: IDirection[]) => {
  if (!directions) return [];

  return directions.map((direction) => ({
    label: direction.name,
    value: direction.id,
  }));
};
