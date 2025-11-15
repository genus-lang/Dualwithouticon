import { Search, ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface LeaderboardHeaderProps {
  timeFilter: string;
  setTimeFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onProfile?: () => void;
  onHome?: () => void;
}

export function LeaderboardHeader({ 
  timeFilter, 
  setTimeFilter, 
  searchQuery, 
  setSearchQuery,
  onProfile,
  onHome
}: LeaderboardHeaderProps) {
  return (
    <div className="border-b border-cyan-500/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <h1 className="text-cyan-400 tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              LEADERBOARD
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px] bg-black/60 border-cyan-500/30 text-cyan-300 hover:border-cyan-400 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-cyan-500/30">
              <SelectItem value="week" className="text-cyan-300 focus:bg-cyan-500/20">This Week</SelectItem>
              <SelectItem value="month" className="text-cyan-300 focus:bg-cyan-500/20">This Month</SelectItem>
              <SelectItem value="alltime" className="text-cyan-300 focus:bg-cyan-500/20">All Time</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <Input
              placeholder="Search user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 bg-black/60 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-700 focus:border-cyan-400 transition-colors"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar className="w-10 h-10 border-2 border-cyan-500 ring-2 ring-cyan-500/30 hover:ring-cyan-400/50 transition-all cursor-pointer">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback className="bg-cyan-900 text-cyan-100">U</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-white/60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-[#00FFFF]/20">
              <DropdownMenuItem 
                onClick={onProfile}
                className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onHome}
                className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
              >
                Home
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-[#00FFFF]/10 cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-[#00FFFF]/10 cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
