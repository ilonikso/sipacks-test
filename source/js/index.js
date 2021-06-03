import appInit from './appInit'
import main from './main';

appInit();

// Load items by DOMContent loading
document.addEventListener('DOMContentLoaded', () => {

    // Main function
    main();
});

