import React from 'react'

const Skeleton = () => {
  return (
    <div className='flex flex-col items-center justify-between gap-8 px-4 py-6 min-h-[70vh]'>
    <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
        <div className="h-32 w-32 bg-slate-900/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg shadow-purple-500/10 animate-pulse"></div>
        <div className="h-32 w-32 bg-slate-900/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg shadow-purple-500/10 animate-pulse"></div>
        <div className="h-32 w-32 bg-slate-900/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg shadow-purple-500/10 animate-pulse"></div>
        <div className="h-32 w-32 bg-slate-900/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg shadow-purple-500/10 animate-pulse"></div>
        <div className="h-32 w-32 bg-slate-900/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg shadow-purple-500/10 animate-pulse"></div>
        <div className="h-32 w-32 bg-slate-900/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg shadow-purple-500/10 animate-pulse"></div>
        <div className="h-32 w-32 bg-slate-900/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg shadow-purple-500/10 animate-pulse"></div>
        <div className="h-32 w-32 bg-slate-900/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg shadow-purple-500/10 animate-pulse"></div>
        <div className="h-32 w-32 bg-slate-900/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg shadow-purple-500/10 animate-pulse"></div>
       
    </div>
   <div className='text-center '>
    <span className="text-rotate  leading-[2] font-bold text-6xl ">
  <span className="flex flex-col items-center gap-2 ">
    <span>Forget your ex</span>
    <span>Move on to the next</span>
    <span>By giving someone a text</span>
   
  </span>
</span>
   </div>
    </div>
  )
}

export default Skeleton
