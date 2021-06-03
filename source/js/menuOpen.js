const menuOpenInit = () => {
    const menuOpen = document.querySelector(".nav__burger");
    const menu = document.querySelector(".nav__menu");
    const overlay = document.querySelector(".overlay--menu");
    const navWrapper = document.querySelector(".nav__wrapper");
    const menuLinks = Array.from(document.querySelectorAll(".nav__item a"));

    menuOpen.addEventListener("click", () => {
        overlay.classList.toggle("active");
        menuOpen.classList.toggle("nav__burger--close");
        menu.classList.toggle("nav__menu--open");
        navWrapper.classList.toggle("nav__wrapper--open");

        if (menu.classList.contains("nav__menu--open")) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }

        menuLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (menu.classList.contains("nav__menu--open")) {
                    document.body.style.overflowY = "auto";

                    overlay.classList.toggle("active");
                    menuOpen.classList.toggle("nav__burger--close");
                    menu.classList.toggle("nav__menu--open");
                    navWrapper.classList.toggle("nav__wrapper--open");
                }
            });
        });
    });
};

export default menuOpenInit;
