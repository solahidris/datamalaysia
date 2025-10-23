import { useState, useEffect } from "react"
import {
  PhoneIcon,
  BriefcaseIcon,
  UserIcon,
  LogOutIcon,
  MicIcon,
  MicOffIcon,
  ChevronUp,
  Pause,
  MessageSquare,
  Clock,
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
  const [isCallActive, setIsCallActive] = useState(true)
  const [callDuration, setCallDuration] = useState(0)
  const [isListening, setIsListening] = useState(false)

  // Simulate call duration timer
  useEffect(() => {
    if (isCallActive) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isCallActive])

  // Simulate AI listening animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsListening(prev => !prev)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

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
      <Sidebar className="!border-r-0 bg-[#1a1d29] text-white [&>div>div]:!border-r-0">
        <SidebarHeader className="border-b border-slate-800/50 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-blue-400" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
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

        <SidebarFooter className="border-t border-slate-800/50 p-4">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors cursor-pointer">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-700/50">
              <UserIcon className="h-5 w-5 text-slate-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">Danial Hadi</p>
              <p className="text-xs text-slate-400 truncate">danial@rapidscreen.io</p>
            </div>
            <button className="p-1 hover:bg-slate-700/50 rounded">
              <LogOutIcon className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-[#0f1117] relative overflow-hidden">
        {/* Radial Gradient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)',
            }}
          />
        </div>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-800/50 bg-[#1a1d29]/80 backdrop-blur-sm px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-white" />
            <h1 className="text-xl font-semibold text-white">Call Nasihat</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/50 text-white font-semibold">
              DH
            </div>
          </div>
        </header>

        <main className="relative flex-1 overflow-auto flex flex-col items-center justify-center p-6 min-h-screen">
          <div className="w-full max-w-3xl flex-1 flex flex-col items-center justify-center">
            <div className="space-y-12 w-full">
                {/* Title */}
                <div className="text-center">
                  <h2 className="text-4xl font-medium text-slate-300 mb-12">
                    What would you like to do today?
                  </h2>
                </div>

                {/* AI Avatar/Visualization - Glowing Ring */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    {/* Outer glow rings */}
                    <div className="absolute inset-0 w-80 h-80 rounded-full">
                      {isListening && (
                        <>
                          <div 
                            className="absolute inset-0 rounded-full animate-pulse"
                            style={{
                              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                            }}
                          />
                          <div 
                            className="absolute inset-2 rounded-full animate-ping"
                            style={{
                              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                              animationDuration: '2s',
                            }}
                          />
                        </>
                      )}
                    </div>

                    {/* Main glowing circle */}
                    <div className="relative w-72 h-72 rounded-full flex items-center justify-center">
                      {/* Inner dark circle */}
                      <div className="absolute inset-8 rounded-full bg-slate-900" />
                      
                      {/* Glowing border ring */}
                      <div 
                        className={`absolute inset-0 rounded-full transition-all duration-500 ${
                          isListening ? 'opacity-100' : 'opacity-70'
                        }`}
                        style={{
                          background: 'conic-gradient(from 0deg, #3b82f6, #60a5fa, #3b82f6)',
                          padding: '3px',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                        }}
                      />
                      
                      {/* Blue glow effect */}
                      <div 
                        className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${
                          isListening ? 'opacity-60' : 'opacity-40'
                        }`}
                        style={{
                          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
                        }}
                      />

                      {/* Shimmer effect - animated dots */}
                      {[...Array(20)].map((_, i) => {
                        const angle = (i / 20) * 360
                        const radius = 144 // Half of w-72 (288px / 2)
                        const x = Math.cos((angle * Math.PI) / 180) * radius
                        const y = Math.sin((angle * Math.PI) / 180) * radius
                        return (
                          <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-blue-400"
                            style={{
                              left: '50%',
                              top: '50%',
                              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                              opacity: isListening ? 0.6 + Math.random() * 0.4 : 0.3,
                              animation: isListening ? `twinkle 2s ease-in-out infinite ${i * 0.1}s` : 'none',
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>

                  {/* Status Text */}
                  <div className="text-center mt-8">
                    <p className="text-lg text-slate-400">
                      {isListening ? 'Listening' : 'Thinking...'}
                    </p>
                  </div>
                </div>

                {/* Call Controls with Glassmorphism */}
                <div className="flex items-center justify-center gap-4 pt-8">
                  <div className="flex items-center gap-4 px-6 py-4 rounded-full bg-slate-800/30 backdrop-blur-xl border border-white/10 shadow-2xl">
                    {/* Chevron Up Button */}
                    <button className="flex items-center justify-center h-14 w-14 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 transition-all">
                      <ChevronUp className="h-6 w-6" />
                    </button>

                    {/* Microphone Button */}
                    <button
                      onClick={handleMuteToggle}
                      className={`flex items-center justify-center h-14 w-14 rounded-full transition-all ${
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
                    <button className="flex items-center justify-center h-14 w-14 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 transition-all">
                      <Pause className="h-6 w-6" />
                    </button>

                    {/* Message Button */}
                    <button className="flex items-center justify-center h-14 w-14 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 transition-all">
                      <MessageSquare className="h-6 w-6" />
                    </button>

                    {/* Timer/Clock Button */}
                    <button className="flex items-center justify-center h-14 w-14 rounded-full bg-yellow-600 hover:bg-yellow-500 text-white transition-all">
                      <Clock className="h-6 w-6" />
                    </button>

                    {/* Start Call Button */}
                    <button
                      onClick={() => setIsCallActive(!isCallActive)}
                      className="flex items-center justify-center h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-105"
                    >
                      <PhoneIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
          </div>

          {/* Footer Branding */}
          <div className="absolute bottom-6 right-6">
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              POWERED BY <span className="text-blue-400">RAPID</span>SCREEN
            </p>
          </div>
        </main>
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