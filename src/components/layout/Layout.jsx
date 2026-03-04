import PropTypes from 'prop-types'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}

Layout.propTypes = { children: PropTypes.node.isRequired }
export default Layout
