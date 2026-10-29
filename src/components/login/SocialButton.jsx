export default function SocialButton({ icon, text }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg mb-2 hover:bg-slate-50 transition-colors"
    >
      {icon}
      {text}
    </button>
  );
}
