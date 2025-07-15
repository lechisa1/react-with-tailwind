import { FiHome, FiSettings, FiUsers, FiPieChart, FiFileText, FiMail } from 'react-icons/fi';
import SidebarAccordion from './SidebarAccordion';

const Sidebar = () => {
  const user= JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role ; // Default to 'guest' if no user data
const menuItems = [
  {
    title: 'Dashboard',
    icon: <FiHome className="text-lg" />,
    path: '/protected/dashboard'
  },
    ...(userRole === 'admin' ? [{
      title: 'User Management',
      icon: <FiPieChart className="text-lg" />,
      path: '/protected/analytics',
      submenu: [
        { title: 'Add User', path: '/protected/analytics/reports' },
        { title: 'User List', path: '/protected/analytics/statistics' }
      ]
    }] : []),
  {
    title: 'Maintenances',
    icon: <FiFileText className="text-lg" />,
    path: '/protected/requests',
    submenu: [
      { title: 'Maintenances Request', path: '/protected/requests' },
      { title: 'Maintenances Index', path: '/protected/requests/index' }
    ]
  }
];


  return (
    <aside className="w-72 bg-gradient-to-b from-indigo-600 to-purple-600 text-white h-[calc(100vh-4rem)] sticky top-16 transition-all overflow-y-auto">
      <nav className="py-5">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <SidebarAccordion 
              key={index}
              title={item.title}
              icon={item.icon}
              path={item.path}
              submenu={item.submenu}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;