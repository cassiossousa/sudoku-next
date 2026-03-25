export default function SudokuGameCellInitial({
  initialValue,
}: {
  initialValue: number;
}) {
  return (
    <div
      className="w-10 h-10 flex items-center justify-center
                 border border-zinc-700
                 text-sm font-bold text-blue-400
                 bg-zinc-800"
    >
      {initialValue}
    </div>
  );
}
