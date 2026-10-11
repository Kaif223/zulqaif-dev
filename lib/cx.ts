// Joins class names, skipping falsy values. Small enough not to need clsx.
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
