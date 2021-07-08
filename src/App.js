import {useState} from 'react';

import {CSSTransition} from 'react-transition-group';

import {ReactComponent as BellIcon} from './icons/bell.svg';
import {ReactComponent as MessengerIcon} from './icons/messenger.svg';
import {ReactComponent as CaretIcon} from './icons/caret.svg';
import {ReactComponent as PlusIcon} from './icons/plus.svg';
import {ReactComponent as CogIcon} from './icons/cog.svg';
import {ReactComponent as ChevronIcon} from './icons/chevron.svg';
import {ReactComponent as ArrowIcon} from './icons/arrow.svg';
import {ReactComponent as BoltIcon} from './icons/bolt.svg';

// ---------------------------------------------------------------------------

const Navbar = (props) => {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        {props.children}
      </ul>
    </nav>
  );
}

// ---------------------------------------------------------------------------

const NavItem = (props) => {

  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item" >
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

// ---------------------------------------------------------------------------

const DropdownMenu = () => {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  console.log('DropdownMenu fired...');

  // -------------------------------------------------------------------------

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  // -------------------------------------------------------------------------

  const DropdownItem = (props) => {

    console.log('DropdownItem fired...');

    const rightImage = (image) => {
      if (image !== undefined) {
        return <span className="icon-right">{image}</span>
      } else {
        return <></>
      }
    }

    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        {rightImage(props.rightIcon)}
      </a>
    );
  }

  // -------------------------------------------------------------------------

  return (

    <div className="dropdpown" style={{height: menuHeight}}>

      <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<MessengerIcon />}  goToMenu='settings'>
              Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === 'settings'} unmountOnExit timeout={500} classNames="menu-secondary"  onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu='main' />
          <DropdownItem leftIcon={<PlusIcon />} >Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem xyzzy={<PlusIcon />}>Settings...</DropdownItem>
        </div>
      </CSSTransition>

    </div>
  );
}

// ---------------------------------------------------------------------------

function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />
      <NavItem icon={<ChevronIcon />} />

      <NavItem icon={<CaretIcon />} >
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

// ---------------------------------------------------------------------------

export default App;
