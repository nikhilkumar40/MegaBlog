import React from 'react'
import { LogoutBtn, Logo, Container, } from '../index'
import { useSelector } from 'react-redux'
import { useNavigate, useNavigation } from 'react-router-dom'


function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.isUserLoggedIn);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true //This boolean id for conditional renderring on our Navbar
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    onClick={navigate(item.slug)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header