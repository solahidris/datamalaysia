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

                {/* AI Avatar/Visualization - Circular Sound Wave */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    {/* Main sound wave container */}
                    <div className="relative w-50 h-50 rounded-full flex items-center justify-center">
                      {/* Background circle */}
                      <div className="absolute inset-0 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/30" />
                      
                      {/* Sound wave bars */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        {[...Array(32)].map((_, i) => {
                          const angle = (i / 32) * 360
                          const radius = 80 // Inner radius for bars
                          const x = Math.cos((angle * Math.PI) / 180) * radius
                          const y = Math.sin((angle * Math.PI) / 180) * radius
                          
                          // Create varying heights for more realistic sound wave
                          const baseHeight = aiState === 'listening' ? 8 + Math.random() * 12 : 
                                           aiState === 'thinking' ? 6 + Math.random() * 8 : 
                                           aiState === 'replying' ? 4 + Math.random() * 6 : 2
                          const height = aiState !== 'idle' ? baseHeight : 2
                          
                          return (
                            <div
                              key={i}
                              className={`absolute rounded-full transition-all duration-150 ${
                                aiState === 'listening' ? 'bg-gradient-to-t from-blue-500 to-cyan-400' :
                                aiState === 'thinking' ? 'bg-gradient-to-t from-yellow-500 to-orange-400' :
                                aiState === 'replying' ? 'bg-gradient-to-t from-green-500 to-emerald-400' :
                                'bg-gradient-to-t from-slate-500 to-slate-400'
                              }`}
                              style={{
                                left: '50%',
                                top: '50%',
                                width: '3px',
                                height: `${height}px`,
                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angle}deg)`,
                                transformOrigin: 'center',
                                opacity: aiState === 'listening' ? 0.8 + Math.random() * 0.2 : 
                                        aiState === 'thinking' ? 0.6 + Math.random() * 0.2 :
                                        aiState === 'replying' ? 0.7 + Math.random() * 0.2 : 0.3,
                                animation: aiState !== 'idle' ? `soundWave 1.5s ease-in-out infinite ${i * 0.05}s` : 'none',
                                '--x': `${x}px`,
                                '--y': `${y}px`,
                                '--angle': `${angle}deg`,
                              } as React.CSSProperties}
                            />
                          )
                        })}
                      </div>

                      {/* Center dot */}
                      <div className={`absolute w-4 h-4 rounded-full transition-all duration-300 ${
                        aiState === 'listening' ? 'bg-gradient-to-r from-blue-500 to-cyan-400 scale-110 shadow-lg shadow-blue-500/50' :
                        aiState === 'thinking' ? 'bg-gradient-to-r from-yellow-500 to-orange-400 scale-105 shadow-lg shadow-yellow-500/50' :
                        aiState === 'replying' ? 'bg-gradient-to-r from-green-500 to-emerald-400 scale-110 shadow-lg shadow-green-500/50' :
                        'bg-gradient-to-r from-slate-500 to-slate-400 scale-100'
                      }`} />
                      
                      {/* Outer pulse rings */}
                      {aiState !== 'idle' && (
                        <>
                          <div className={`absolute inset-0 rounded-full border-2 animate-ping ${
                            aiState === 'listening' ? 'border-blue-500/30' :
                            aiState === 'thinking' ? 'border-yellow-500/30' :
                            'border-green-500/30'
                          }`} />
                          <div className={`absolute inset-2 rounded-full border animate-pulse ${
                            aiState === 'listening' ? 'border-cyan-400/20' :
                            aiState === 'thinking' ? 'border-orange-400/20' :
                            'border-emerald-400/20'
                          }`} />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status Text */}
                  <div className="text-center mt-8">
                    <p className="text-slate-400 tracking-wide text-sm">
                      {!isCallActive ? 'Call to start a conversation' : 
                       aiState === 'listening' ? 'Listening...' :
                       aiState === 'thinking' ? 'Thinking...' :
                       aiState === 'replying' ? 'Replying...' : 'Ready'}
                    </p>
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
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20' 
                : 'bg-slate-800/30 text-slate-400 border border-slate-700/30 hover:bg-slate-700/30'
            }`}
          >
            <MicIcon className="w-4 h-4 inline" />
          </button>
          
          <button
            onClick={() => setAiState('thinking')}
            className={`h-12 w-12 cursor-pointer rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
              aiState === 'thinking' 
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-lg shadow-yellow-500/20' 
                : 'bg-slate-800/30 text-slate-400 border border-slate-700/30 hover:bg-slate-700/30'
            }`}
          >
            <Lightbulb className="w-4 h-4 inline" />
          </button>
          
          <button
            onClick={() => setAiState('replying')}
            className={`h-12 w-12 cursor-pointer rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
              aiState === 'replying' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/20' 
                : 'bg-slate-800/30 text-slate-400 border border-slate-700/30 hover:bg-slate-700/30'
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