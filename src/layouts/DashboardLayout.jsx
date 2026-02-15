import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Code, ClipboardCheck, BookOpen, User } from 'lucide-react'

const navItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/app/practice', icon: Code, label: 'Practice' },
  { to: '/app/assessments', icon: ClipboardCheck, label: 'Assessments' },
  { to: '/app/resources', icon: BookOpen, label: 'Resources' },
  { to: '/app/profile', icon: User, label: 'Profile' },
]

function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-900 text-white flex flex-col">
        <div className="p-6 border-b border-primary-700">
          <h1 className="text-xl font-bold">Placement Prep</h1>
        </div>
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary-500 text-white'
                        : 'text-primary-200 hover:bg-primary-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary-900">Placement Prep</h2>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-700" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
