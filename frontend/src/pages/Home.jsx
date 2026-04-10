import React from 'react'
import Sidebar from '../component/Sidebar'
import NotSelected from '../component/Notselected'
import Selected from '../component/Selected'
import { useChatStore } from '../store/chatstore'
const Home = () => {
   const { selectedUser } = useChatStore();
  return (

      <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-black ">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="rounded-4xl shadow-2xl shadow-purple-500/10 w-full max-w-6xl h-[calc(100vh-8rem)] p-6 rounded-4xl">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NotSelected /> : <Selected />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
