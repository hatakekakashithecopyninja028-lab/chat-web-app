import React from 'react'
import { MessageSquare } from "lucide-react";

const Notselected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-slate-900/60 backdrop-blur-sm ">
      <div className="max-w-md text-center border-white/20 rounded-4xl p-8 shadow-2xl shadow-purple-500/10 bg-slate-900/60 ">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg shadow-purple-500/10 "
            >
              <MessageSquare className="w-8 h-8 text-white " />
            </div>
          </div>
        </div>


        <h2 className="text-2xl text-white font-bold mb-2">Welcome to Aoo Saheli Chugli Kree</h2>
        <p className="text-slate-400">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  )
}

export default Notselected
