
// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Button } from '@/components/ui/button';
// import { User, Calendar, Settings, LogOut, History } from 'lucide-react';

// interface ProfileDropdownProps {
//   user: { name: string; email: string };
//   onLogout: () => void;
// }

// const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout }) => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="sm">
//           <User className="w-4 h-4 mr-2" />
//           My Account
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56 bg-white" align="end">
//         <DropdownMenuLabel>
//           <div className="flex flex-col space-y-1">
//             <p className="text-sm font-medium leading-none">{user.name}</p>
//             <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem asChild>
//           <Link to="/profile" className="flex items-center">
//             <Settings className="w-4 h-4 mr-2" />
//             Manage Profile
//           </Link>
//         </DropdownMenuItem>
//         <DropdownMenuItem asChild>
//           <Link to="/booking-history" className="flex items-center">
//             <History className="w-4 h-4 mr-2" />
//             Booking History
//           </Link>
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem onClick={onLogout} className="text-red-600">
//           <LogOut className="w-4 h-4 mr-2" />
//           Logout
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default ProfileDropdown;
// ProfileDropdown.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut, History, Calendar } from 'lucide-react';

interface ProfileDropdownProps {
  user: { name: string; email: string; isAdmin?: boolean };
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <User className="w-4 h-4 mr-2" />
          My Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Manage Profile */}
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Manage Profile
          </Link>
        </DropdownMenuItem>

        {/* Booking History */}
        <DropdownMenuItem asChild>
          <Link to="/booking-history" className="flex items-center">
            <History className="w-4 h-4 mr-2" />
            Booking History
          </Link>
        </DropdownMenuItem>

        {/* Admin Dashboard, if admin */}
        {user.isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
