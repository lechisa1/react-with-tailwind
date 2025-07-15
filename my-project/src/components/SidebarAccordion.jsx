import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const SidebarAccordion = ({ title, icon, path, submenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {submenu ? (
        <div 
          className={`flex items-center px-5 py-3 cursor-pointer transition-colors ${
            isOpen ? 'bg-white/10' : 'hover:bg-white/10'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={`submenu-${title.toLowerCase()}`}
        >
          <span className="mr-3">{icon}</span>
          <span className="flex-1 text-lg font-medium">{title}</span>
          <span className="transition-transform duration-200">
            {isOpen ? <FiChevronDown /> : <FiChevronRight />}
          </span>
        </div>
      ) : (
        <NavLink
          to={path}
          className={({ isActive }) => 
            `flex items-center px-5 py-3 transition-colors ${
              isActive ? 'bg-white/10' : 'hover:bg-white/10'
            }`
          }
          end
        >
          <span className="mr-3">{icon}</span>
          <span className="flex-1 text-lg font-medium">{title}</span>
        </NavLink>
      )}
      
      <AnimatePresence>
        {submenu && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
            id={`submenu-${title.toLowerCase()}`}
          >
            {submenu.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-8 py-2.5 text-lg transition-colors ${
                    isActive 
                      ? 'text-white bg-blue-500 rounded-md' 
                      : 'text-white/80 hover:text-white hover:bg-blue-400 hover:rounded-md'
                  }`
                }
                end
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {item.title}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarAccordion;