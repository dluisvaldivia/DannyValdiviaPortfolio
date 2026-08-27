import { useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Home from './view/pages/Home'
import NotFound from './view/pages/NotFound'
import Navbar from './view/components/Navbar';
import AccessibilityChecker from './view/pages/AccessibilityChecker';
import Blog from './view/pages/Blog';
import BlogPost from './view/pages/BlogPost';
import AdminLogin from './view/pages/admin/AdminLogin';
import AdminDashboard from './view/pages/admin/AdminDashboard';
import PostEditor from './view/pages/admin/PostEditor';
import PrivateRoute from './view/components/PrivateRoute';
import BackToTop from './view/components/backToTop';
import { getInitialTheme, setTheme } from './controllers/themeController'


function App() {
  const { t } = useTranslation();
  useEffect(() => { setTheme(getInitialTheme()) }, []);


  return (
    <MotionConfig reducedMotion="user">
      <Router basename={import.meta.env.BASE_URL}>
        <Link className="skip-link" to="/#projects">{t('nav.skip')}</Link>
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/free-tools/accessibility-checker" element={<AccessibilityChecker />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/admin/post/new" element={<PrivateRoute><PostEditor /></PrivateRoute>} />
            <Route path="/admin/post/:slug" element={<PrivateRoute><PostEditor /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <BackToTop />
        {/* <Footer /> */}

      </Router>
    </MotionConfig>
  )
}

export default App
