import { useAuth } from "../../hooks/useAuth";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export default function MenuButton() {
  const { user } = useAuth();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth(null);
    navigate('/')
  }

  const avatarSrc =
    user?.avatar && user.avatar.trim() !== ""
      ? user.avatar
      : "/default-avatar.svg";

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="
              flex items-center gap-3 p-2 rounded-full
              transition-all duration-200
              hover:bg-white/20 hover:scale-105 active:scale-95
            "
          >
            {/* Avatar */}
            <img
              src={avatarSrc}
              alt="User avatar"
              className="w-10 h-10 rounded-full object-cover border border-white"
            />

            {/* Menu icon */}
            <div className="flex flex-col gap-1">
              <span className="w-5 h-0.5 bg-white rounded-full" />
              <span className="w-5 h-0.5 bg-white rounded-full" />
              <span className="w-5 h-0.5 bg-white rounded-full" />
            </div>
          </button> 
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 mt-2 rounded-xl shadow-lg"
        >
          <DropdownMenuItem asChild>
            <a href={`/profile/${user?.username}`}>View Profile</a>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <a href="/add-food">Add Food Establishment</a>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <a href="/owned-restau">Owned Restaurants</a>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-green-700 font-medium"
            asChild
          >
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault()
                handleLogout()
              }}
              >
                Log Out
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}