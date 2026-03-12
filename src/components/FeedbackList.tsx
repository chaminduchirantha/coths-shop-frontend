import { useEffect, useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { getAllFeedback } from "../services/feedback";

type FeedbackType = {
  _id: string;
  customername: string;
  email: string;
  ratings: number;
  feedback: string;
  createdAt: string;
};

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 4; // Cards per page

  useEffect(() => {
    loadFeedback();
  }, [page]);

  const loadFeedback = async () => {
    try {
      const res = await getAllFeedback(page, limit);

      setFeedbacks(res.data);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            <div className="text-center mb-16">
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">
                Testimonials
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-700 tracking-tighter mb-6 italic">
                WHAT OUR <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">VISITORS SAY.</span>
            </h2>
            <p className="text-slate-700 max-w-2xl mx-auto font-medium leading-relaxed">
                Join our community of style enthusiasts. Discover how we've helped thousands redefine their wardrobe and confidence.
            </p>
            </div>

            {/* Feedback Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feedbacks.map((fb) => (
                <div
                key={fb._id}
                className="group relative bg-slate-800 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-sm transition-all duration-500 hover:border-indigo-500/30 hover:-translate-y-2 shadow-2xl hover:shadow-indigo-500/10"
                >
                <FaQuoteLeft className="absolute top-6 right-8 text-white/5 group-hover:text-indigo-500/20 transition-colors" size={40} />

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        className={`text-sm ${
                        index < fb.ratings ? "text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" : "text-slate-800"
                        }`}
                    />
                    ))}
                </div>

                {/* Feedback Message */}
                <p className="text-slate-300 italic leading-relaxed text-sm mb-8 relative z-10">
                    "{fb.feedback.length > 160
                    ? fb.feedback.slice(0, 160) + "..."
                    : fb.feedback}"
                </p>

                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                    {/* User Avatar */}
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-indigo-500/20">
                    {fb.customername.charAt(0).toUpperCase()}
                    </div>

                    <div>
                    <h4 className="font-bold text-white text-sm tracking-tight">{fb.customername}</h4>
                    <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                        {new Date(fb.createdAt).toLocaleString("en-US", {
                        month: "short",
                        year: "numeric",
                        })}
                    </p>
                    </div>
                </div>
                </div>
            ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-6 mt-16">
            <button
                disabled={page === 1}
                className="px-8 py-3 bg-white/5 border border-white/10 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white disabled:opacity-20 transition-all active:scale-95"
                onClick={() => setPage((p) => p - 1)}
            >
                Previous
            </button>

            <div className="flex items-center gap-2">
                <span className="text-indigo-400 font-black text-sm tracking-tighter">{page}</span>
                <span className="text-slate-800 text-xs">/</span>
                <span className="text-slate-500 font-bold text-sm tracking-tighter">{totalPages}</span>
            </div>

            <button
                disabled={page === totalPages}
                className="px-8 py-3 bg-white/5 border border-white/10 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white disabled:opacity-20 transition-all active:scale-95"
                onClick={() => setPage((p) => p + 1)}
            >
                Next
            </button>
            </div>
            
        </div>
    </section>
  );
}
