import { useState, useEffect } from "react"
import {
  PhoneIcon,
  BriefcaseIcon,
  UserIcon,
  LogOutIcon,
  MicIcon,
  MicOffIcon,
  PhoneOffIcon,
  ChevronUp,
  Pause,
  MessageSquare,
  Clock,
  Lightbulb,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"

// Menu items
const navigationItems = [
  {
    title: "Call Nasihat",
    url: "#call-nasihat",
    icon: PhoneIcon,
  },
  {
    title: "Jobs",
    url: "#jobs",
    icon: BriefcaseIcon,
  },
  {
    title: "My Profile",
    url: "#profile",
    icon: UserIcon,
  },
]

const Dashboard = () => {
  const [isMuted, setIsMuted] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [controlsExpanded, setControlsExpanded] = useState(false)
  const [aiState, setAiState] = useState<'idle' | 'listening' | 'thinking' | 'replying'>('idle')

  // Simulate call duration timer
  useEffect(() => {
    if (isCallActive) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      setCallDuration(0)
    }
  }, [isCallActive])

  // Simulate AI listening animation - only when call is active
  useEffect(() => {
    if (isCallActive) {
      const interval = setInterval(() => {
        setIsListening(prev => !prev)
      }, 1500)
      return () => clearInterval(interval)
    } else {
      setIsListening(false)
    }
  }, [isCallActive])

  // Auto-expand controls when call starts, auto-collapse when call ends
  useEffect(() => {
    setControlsExpanded(isCallActive)
  }, [isCallActive])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  const handleEndCall = () => {
    setIsCallActive(false)
    // You can add navigation or other logic here
  }

  return (
    <SidebarProvider>
      <Sidebar className="!border-r-0 bg-gradient-to-t from-slate-950 to-slate-800 text-white [&>div>div]:!border-r-0">
        <SidebarHeader className="border-b border-slate-800/50 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700/50">
              <Lightbulb className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-wider">NASIHAT</h2>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-3 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className="h-12 px-4 text-slate-300 hover:text-white hover:bg-slate-800/50 data-[active=true]:bg-slate-800/50 data-[active=true]:text-white"
                    >
                      <a href={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t-2 border-slate-800 w-[90%] mx-auto py-4">
          <div className="flex items-center justify-between gap-3 py-3 rounded-lg transition-colors">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-700/50">
              <UserIcon className="h-5 w-5 text-slate-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">Danial Hadi</p>
              <p className="text-xs text-slate-400 truncate">danial@rapidscreen.io</p>
            </div>
            <button className="p-2 hover:bg-slate-700/50 rounded cursor-pointer">
              <LogOutIcon className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-gradient-to-b from-slate-950 to-slate-800 relative overflow-hidden">
        {/* Radial Gradient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)',
            }}
          />
        </div>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-800/50 bg-slate-800 backdrop-blur-sm px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-white border-2 border-x-0 border-white/10 bg-white/10" />
            <h1 className="text-xl font-semibold text-white">Call Nasihat</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="border-2 border-x-0 border-white/10 flex h-11 w-11 items-center justify-center rounded-full bg-slate-700/50 text-white font-semibold">
              DH
            </div>
          </div>
        </header>

        <main className="relative flex-1 overflow-auto flex flex-col items-center p-6 min-h-[90vh]">
          <div className="w-full max-w-3xl flex-1 flex flex-col items-center mt-6 lg:mt-12">
            <div className="space-y-12 w-full">
                {/* Title */}
                <div className="text-center">
                  <h2 className="text-4xl font-medium text-slate-300 mb-20 lg:mb-16">
                    What would you like to do today?
                  </h2>
                </div>

                {/* AI Avatar/Visualization - Enhanced Sound Wave */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    {/* Outer pulsing rings */}
                    <div className={`absolute w-96 h-96 rounded-full border-2 animate-pulse-ring-1 ${
                      aiState === 'listening' ? 'border-blue-500/20' :
                      aiState === 'thinking' ? 'border-yellow-500/20' :
                      aiState === 'replying' ? 'border-green-500/20' :
                      'border-slate-500/20'
                    }`} />
                    <div className={`absolute w-[28rem] h-[28rem] rounded-full border-2 animate-pulse-ring-2 ${
                      aiState === 'listening' ? 'border-blue-500/15' :
                      aiState === 'thinking' ? 'border-yellow-500/15' :
                      aiState === 'replying' ? 'border-green-500/15' :
                      'border-slate-500/15'
                    }`} />
                    <div className={`absolute w-[32rem] h-[32rem] rounded-full border-2 animate-pulse-ring-3 ${
                      aiState === 'listening' ? 'border-blue-500/10' :
                      aiState === 'thinking' ? 'border-yellow-500/10' :
                      aiState === 'replying' ? 'border-green-500/10' :
                      'border-slate-500/10'
                    }`} />
                    
                    {/* Main sound wave container */}
                    <div className="relative w-44 h-44 rounded-full flex items-center justify-center">
                      {/* Background gradient circle */}
                      <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                        aiState === 'listening' ? 'bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent' :
                        aiState === 'thinking' ? 'bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-transparent' :
                        aiState === 'replying' ? 'bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent' :
                        'bg-gradient-to-br from-slate-500/20 via-slate-400/10 to-transparent'
                      } backdrop-blur-sm border border-white/10 shadow-2xl`} />


                      {/* Center core with enhanced effects */}
                      <div className={`absolute w-40 h-40 rounded-full transition-all duration-500 ${
                        aiState === 'listening' ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 scale-110 shadow-2xl shadow-blue-500/50' :
                        aiState === 'thinking' ? 'bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-500 scale-100 shadow-2xl shadow-yellow-500/50' :
                        aiState === 'replying' ? 'bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 scale-110 shadow-2xl shadow-green-500/50' :
                        'bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 scale-100'
                      } animate-pulse-glow`} />
                      
                      {/* Inner core dot */}
                      <div className={`absolute w-12 h-12 rounded-full transition-all duration-300 ${
                        aiState === 'listening' ? 'bg-gradient-to-br from-white to-transparent shadow-lg shadow-blue-500/30' :
                        aiState === 'thinking' ? 'bg-gradient-to-br from-white to-transparent shadow-lg shadow-yellow-500/30' :
                        aiState === 'replying' ? 'bg-gradient-to-br from-white to-transparent shadow-lg shadow-green-500/30' :
                        'bg-white/60'
                      } animate-pulse-inner`} />
                    </div>
                  </div>

                  {/* Enhanced Status Text */}
                  <div className="text-center mt-12">
                    <div className={`inline-flex border-x-0 border-2 items-center gap-2 px-6 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                      aiState === 'listening' ? 'bg-blue-500/10 border-blue-500/10 text-blue-300' :
                      aiState === 'thinking' ? 'bg-yellow-500/10 border-yellow-500/10 text-yellow-300' :
                      aiState === 'replying' ? 'bg-green-500/10 border-green-500/10 text-green-300' :
                      'bg-slate-500/10 border-slate-500/30 text-slate-400'
                    }`}>
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        aiState === 'listening' ? 'bg-blue-400' :
                        aiState === 'thinking' ? 'bg-yellow-400' :
                        aiState === 'replying' ? 'bg-green-400' :
                        'bg-slate-400'
                      }`} />
                      <p className="tracking-wide text-sm font-medium">
                        {!isCallActive ? 'Call to start a conversation' : 
                         aiState === 'listening' ? 'Listening...' :
                         aiState === 'thinking' ? 'Thinking...' :
                         aiState === 'replying' ? 'Replying...' : 'Ready'}
                      </p>
                    </div>
                  </div>
                </div>


                {/* Call Controls with Glassmorphism */}
                <div className="absolute bottom-28 lg:bottom-0 left-0 right-0 lg:relative flex items-center justify-center gap-4 pt-8">
                  <div className="flex items-center gap-2 lg:gap-4 px-6 py-4 rounded-full bg-slate-800/30 backdrop-blur-xl border-2 border-x-0 border-white/10 shadow-2xl transition-all duration-300">
                    {/* Chevron Toggle Button */}
                    <button 
                      onClick={() => setControlsExpanded(!controlsExpanded)}
                      className="border-2 border-x-0 border-white/10 flex items-center justify-center h-14 w-14 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 transition-all cursor-pointer"
                    >
                      <ChevronUp className={`h-6 w-6 transition-transform duration-300 ${controlsExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Expandable Controls - Only show when expanded */}
                    <div className={`lg:flex grid grid-cols-2 items-center gap-4 overflow-hidden transition-all duration-300 ${
                      controlsExpanded ? 'max-w-[400px] opacity-100' : 'max-w-0 opacity-0'
                    }`}>
                      {/* Microphone Button */}
                      <button
                        onClick={handleMuteToggle}
                        className={`border-2 border-x-0 border-white/10 flex items-center justify-center h-14 w-14 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                          isMuted 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300'
                        }`}
                      >
                        {isMuted ? (
                          <MicOffIcon className="h-6 w-6" />
                        ) : (
                          <MicIcon className="h-6 w-6" />
                        )}
                      </button>

                      {/* Pause Button */}
                      <button className="border-2 border-x-0 border-white/10 flex items-center justify-center h-14 w-14 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 transition-all flex-shrink-0 cursor-pointer">
                        <Pause className="h-6 w-6" />
                      </button>

                      {/* Message Button */}
                      <button className="border-2 border-x-0 border-white/10 flex items-center justify-center h-14 w-14 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 transition-all flex-shrink-0 cursor-pointer">
                        <MessageSquare className="h-6 w-6" />
                      </button>

                      {/* Timer/Clock Button */}
                      <button className="border-2 border-x-0 border-white/10 flex items-center justify-center h-14 w-14 rounded-full bg-yellow-600 hover:bg-yellow-500 text-white transition-all flex-shrink-0 cursor-pointer">
                        <Clock className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Call Button - Always visible */}
                    <button
                      onClick={() => setIsCallActive(!isCallActive)}
                      className={`border-2 border-x-0 border-white/10 flex items-center justify-center h-14 w-14 rounded-full text-white transition-all hover:scale-105 cursor-pointer ${
                        isCallActive 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {isCallActive ? (
                        <PhoneOffIcon className="h-6 w-6" />
                      ) : (
                        <PhoneIcon className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
          </div>

          {/* Footer Branding */}
          <div className="absolute bottom-6 right-6 border-2 border-x-0 border-white/10 rounded-full p-2 px-6 bg-white/5">
            <p className="text-xs text-white font-bold tracking-wide">
              POWERED BY <span className="text-orange-400 italic">RAPID</span>SCREEN
            </p>
          </div>
        </main>

        {/* AI State Control Buttons - Absolute positioned on right */}
        <div className="absolute right-6 -mt-8 lg:mt-0 top-7/16 lg:top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
          <button
            onClick={() => setAiState('listening')}
            className={`h-12 w-12 cursor-pointer rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
              aiState === 'listening' 
                ? 'bg-blue-500/20 text-blue-400 border-2 border-x-0 border-blue-500/30 shadow-lg shadow-blue-500/20' 
                : 'bg-slate-800/30 text-slate-400 border-2 border-x-0 border-slate-700/30 hover:bg-slate-700/30'
            }`}
          >
            <MicIcon className="w-4 h-4 inline" />
          </button>
          
          <button
            onClick={() => setAiState('thinking')}
            className={`h-12 w-12 cursor-pointer rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
              aiState === 'thinking' 
                ? 'bg-yellow-500/20 text-yellow-400 border-2 border-x-0 border-yellow-500/30 shadow-lg shadow-yellow-500/20' 
                : 'bg-slate-800/30 text-slate-400 border-2 border-x-0 border-slate-700/30 hover:bg-slate-700/30'
            }`}
          >
            <Lightbulb className="w-4 h-4 inline" />
          </button>
          
          <button
            onClick={() => setAiState('replying')}
            className={`h-12 w-12 cursor-pointer rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
              aiState === 'replying' 
                ? 'bg-green-500/20 text-green-400 border-2 border-x-0 border-green-500/30 shadow-lg shadow-green-500/20' 
                : 'bg-slate-800/30 text-slate-400 border-2 border-x-0 border-slate-700/30 hover:bg-slate-700/30'
            }`}
          >
            <MessageSquare className="w-4 h-4 inline" />
          </button>
        </div>
      </SidebarInset>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </SidebarProvider>
  )
}

export default Dashboard