export default function AuthTerms({ text, actionText, onClick }) {
  return (
    <p className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
      {text}{" "}
      <button
        type="button"
        onClick={onClick}
        className="text-indigo-600 font-semibold hover:text-indigo-700"
      >
        {actionText}
      </button>
    </p>
  );
}
