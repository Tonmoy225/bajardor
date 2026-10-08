/* eslint-disable @next/next/no-img-element */
export default function Avatar({
  name,
  image,
  className = "size-9",
}: {
  name: string;
  image?: string | null;
  className?: string;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        referrerPolicy="no-referrer"
        className={`${className} shrink-0 rounded-lg bg-base-200 object-cover`}
      />
    );
  }
  return (
    <span
      aria-label={name}
      className={`${className} grid shrink-0 place-items-center rounded-lg bg-secondary font-bold text-secondary-content`}
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
