import { Link } from 'react-router-dom';
import "../Header.css";

const HeaderLink = ({ page }) => {
    let title;
    page === ""? title = "Home": title = page.charAt(0).toUpperCase() + page.slice(1);
    return <Link to={`/${page}`} className='headerlink-title'>{title}</Link>;
};


const Header = () => {
    return (
      <div className='header'>
        <HeaderLink page='' />
        <HeaderLink page='aptOwners' />
        <HeaderLink page='apts' />
        <HeaderLink page='aptFloors' />
        <HeaderLink page='priceHistory' />
        <HeaderLink page='rodents' />
        <HeaderLink page='rodentsToFloors' />

      </div>
    );
  };
  
  export default Header;