import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";

export default function MenuButton() {
    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col gap-1 p-2">
            <span className="w-5 h-0.5 bg-white rounded-full" />
            <span className="w-5 h-0.5 bg-white rounded-full" />
            <span className="w-5 h-0.5 bg-white rounded-full" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 mt-2 rounded-xl shadow-lg"
      >
        <DropdownMenuItem asChild>
          <a href="/profile">View Profile</a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="/add-food">Add Food Establishment</a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="/favorites">Favorites</a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-green-700 font-medium"
          asChild
        >
          <a href="/landing-page">Log Out</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}