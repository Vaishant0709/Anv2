export function DesktopBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(131,197,190,0.18),transparent_26%),radial-gradient(circle_at_20%_18%,rgba(245,185,113,0.14),transparent_20%),linear-gradient(180deg,#0c1730_0%,#07111f_54%,#050b14_100%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.24) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(255,255,255,0.75) 50%, transparent 50%), linear-gradient(90deg, rgba(255,255,255,0.65) 50%, transparent 50%)",
          backgroundSize: "3px 3px",
        }}
      />
    </>
  );
}
