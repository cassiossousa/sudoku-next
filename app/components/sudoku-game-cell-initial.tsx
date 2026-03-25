export default function SudokuGameCellInitial({
  initialValue,
  isInvalid,
}: {
  initialValue: number;
  isInvalid: boolean;
}) {
  return (
    <div
      className={`w-10 h-10 flex items-center justify-center
        border text-sm font-bold transition-colors
        ${
          isInvalid
            ? 'border-red-400 bg-red-500/10 text-red-300'
            : 'border-zinc-700 bg-zinc-800 text-blue-400'
        }
      `}
    >
      {initialValue}
    </div>
  );
}
