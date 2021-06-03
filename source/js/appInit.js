import gsapInit from './svgShapes'
import menuOpenInit  from './menuOpen'
import modalsInit  from './modals'
import dropdownToggle   from './dropdown'
import categoriesButtonInit from './categoriesButton';
import sortItems from './sortItems';
import preloader from './preloader';
import formHandler from './ajax';

const appInit = () => {

    preloader();

    // Initialization promo banner animation
    gsapInit();

    // Initialization of menu open function
    menuOpenInit();

    // Initialization of modals open
    modalsInit();

    // Initializations of dropdowns
    dropdownToggle();

    // Categories button switching
    categoriesButtonInit();

    // Sort items by name, date, author
    sortItems();

    // Form Handler
    formHandler();
}

export default appInit;

