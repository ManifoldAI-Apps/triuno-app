```
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  activeView: View;
  setView: (view: View) => void;
  unreadMessages?: number;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setView, unreadMessages = 0 }) => {
  // The navItems array is not used in the new JSX structure, but keeping it commented out
  // for reference or if it was intended to be used differently.
  // const navItems = [
  //   { view: View.DASHBOARD, icon: 'home_app_logo', label: 'Home' },
  //   { view: View.CALENDAR, icon: 'calendar_today', label: 'Portal' },
  //   { view: View.ADD_GRATITUDE, icon: 'add_circle', label: 'Ecoar', isPrimary: true },
  //   { view: View.JOURNEY, icon: 'person', label: 'Senda' },
  //   { view: View.MESSAGES, icon: 'chat_bubble', label: 'Ecos' }
  // ];

  return (
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
