import pkg from '../../package.json';

export default function Footer() {
  const version = pkg.version;

  return (
    <footer className="w-full mt-10 py-4 text-xs text-zinc-500 opacity-80 hover:opacity-100 transition-opacity">
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center gap-2 md:flex-row md:justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">Sudoku</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-600">v{version}</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/cassiossousa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>

          <span className="text-zinc-600">•</span>

          <a
            href="https://github.com/cassiossousa/sudoku-next"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            Repo
          </a>
        </div>
      </div>
    </footer>
  );
}
