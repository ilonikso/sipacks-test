// Index page
// let tl = gsap.timeline({repeat: -1, repeatDelay: 0});
// gsap.set('#mask-1', {duration: 14, transformOrigin:"50% 50%"});
// tl.set('#mask-1', {duration: 14, transformOrigin:"50% 50%"});

// // 0
// tl.to('#mask-1', {duration: 4, rotate:"2", x:10 , y: 15, ease:"power1.inOut"});
// tl.to('#mask-1', {duration: 4, rotate:"0", y:-20, scaleY: 1.05,  ease:"power1.inOut"}, "-=0");
// tl.to('#mask-1', {duration: 4, rotate:"-2", y:-15, x: -10, scaleX: 1.03,  ease:"power1.inOut"}, "-=0");
// tl.to('#mask-1', {duration: 4, rotate:"-1", y: 5, x: 10, scaleX: 1.04,  scaleY: 1.02, ease:"power1.inOut"}, "-=0");
// tl.to('#mask-1', {duration: 4, rotate:"-3", y: 15, x: -15, scaleX: 1.02,  scaleY: 1.02, ease:"power1.inOut"}, "-=0");
// tl.to('#mask-1', {duration: 4, rotate:"-2", y: 10, x: -15, scaleX: 0.98,  scaleY: 1.01, ease:"power1.inOut"}, "-=0");
// tl.to('#mask-1', {duration: 4, rotate:"0", x:0, y:0, scaleX: 1,  scaleY: 1, ease:"power1.inOut"}, "-=0");

import {gsap} from 'gsap';



const gsapInit = () => {
    const tl = gsap.timeline({repeat: -1, repeatDelay: 0});
    gsap.set('#mask-1', {duration: 14, transformOrigin:"50% 50%"});
    tl.set('#mask-1', {duration: 14, transformOrigin:"50% 50%"});

    // 0
    tl.to('#mask-1', {duration: 4, rotate:"2", x:10 , y: 15, ease:"power1.inOut"});
    tl.to('#mask-1', {duration: 4, rotate:"0", y:-20, scaleY: 1.05,  ease:"power1.inOut"}, "-=0");
    tl.to('#mask-1', {duration: 4, rotate:"-2", y:-15, x: -10, scaleX: 1.03,  ease:"power1.inOut"}, "-=0");
    tl.to('#mask-1', {duration: 4, rotate:"-1", y: 5, x: 10, scaleX: 1.04,  scaleY: 1.02, ease:"power1.inOut"}, "-=0");
    tl.to('#mask-1', {duration: 4, rotate:"-3", y: 15, x: -15, scaleX: 1.02,  scaleY: 1.02, ease:"power1.inOut"}, "-=0");
    tl.to('#mask-1', {duration: 4, rotate:"-2", y: 10, x: -15, scaleX: 0.98,  scaleY: 1.01, ease:"power1.inOut"}, "-=0");
    tl.to('#mask-1', {duration: 4, rotate:"0", x:0, y:0, scaleX: 1,  scaleY: 1, ease:"power1.inOut"}, "-=0");
};


export default gsapInit;