import {useState } from 'react';
import { feedbackSave } from '../services/feedback';

function CustomerFeedbackForm() {
  const [rating, setRating] = useState(0);

  const [customername , setCustomerName] = useState("")
  const [email , setEmail] = useState("")
  const [feedback , setFeedback] = useState<string>("")
  const [hover , setHover] = useState<number>(0)
  const [ratings , setRatings] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);

  const handelSumbitFeedback =async ()=>{
    if(!customername || !email || !feedback || !ratings){
        alert("please fill all Fields")
        return;
    }

    setLoading(true);

    const feedbackData = {
      customername,
      email,
      ratings,
      feedback
    }

    try{
      await feedbackSave(feedbackData);
      alert("Successful Feedback Saved")

      setCustomerName("");
      setEmail("");
      setRating(0);
      setFeedback("");
    }catch(error){
      console.log(error)
      alert("Feedback Submittting Faild")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 pt-24">
      {/* Background Decor */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/10 blur-[120px] rounded-full"></div>

      {/* --- Feedback Card --- */}
      <div className="max-w-3xl w-full bg-slate-800/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <span className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em]">Share Your Experience</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">We Value Your <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">Opinion.</span></h2>
          <p className="text-slate-400 mt-4 text-sm">How would you rate your recent purchase at Cloth Shop?</p>
        </div>

        <form className="space-y-8" onClick={(e) => e.preventDefault()}>
          {/* --- Star Rating System --- */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-4xl transition-all duration-200 transform cursor-pointer
                  ${star <= (hover || ratings) ? 'text-amber-400 scale-110' : 'text-slate-600'}`}
                  onClick={() => setRatings(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great' : rating === 3 ? 'Good' : rating === 2 ? 'Poor' : rating === 1 ? 'Very Bad' : 'Select Rating'}
            </p>
          </div>

          <div className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-slate-300 text-xs font-bold uppercase mb-2 ml-1">Your Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={customername}
                onChange={(e)=>setCustomerName(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-slate-300 text-xs font-bold uppercase mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Feedback Message */}
            <div>
              <label className="block text-slate-300 text-xs font-bold uppercase mb-2 ml-1">Your Message</label>
              <textarea 
                placeholder="Tell us what you loved or what we can improve..." 
                value={feedback}
                onChange={(e)=>setFeedback(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button onClick={handelSumbitFeedback} disabled={loading} className="w-full bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-xl  cursor-pointer shadow-indigo-600/20 active:scale-[0.98]">
            {loading ?  "Submitting....." : "Submit Feedback"}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-slate-500 uppercase tracking-widest">
          Your feedback helps us to create a better experience.
        </p>
      </div>
    </div>
  );
}

export default CustomerFeedbackForm;