let timeline = gsap.timeline()

timeline.to('.loadermiddle .parent .child', {
    transform: 'translateX(0%)',
    ease: Power3.easeInOUT,
    opacity: 1,
    color: 'white',
    stagger: 0.3,
    onStart: () => { gsap.to('body', { overflow: 'hidden' }) },
})

console.log('load')
window.addEventListener('load', () => {
    console.log('loaded')
    timeline.to('.child', {
        transform: 'translateY(-100%)',
        ease: Power3.easeInOUT,
        duration: 0.3,
        delay: 0.7,
    }).to('main .loaderpage', {
        height: 0,
        duration: 0.5,
        delay: 0.2,
        ease: Power3.easeInOUT,
        onStart: () => { gsap.to('.parent', { display: 'none', duration: 0 }) },
    }).to('main .green', {
        height: 0,
        duration: 1,
        delay: '-0.1',
        ease: 'expo',
        onComplete: () => {
            gsap.to('main .loaderpage', { display: 'none' }), gsap.to('body', { overflow: 'auto' })
        }
    }).from('.img .before', {
        animation: 'rotate 0.2s linear infinite',
        duration: 0.5
    }).to('.name', {
        duration: 1,
        webkitTextStroke: 1 + 'px white'
    }).from('.hamburger', {
        scale: 0,
        ease: Power4,
        duration: 0.5
    }).from('.home h1', {
        transform: 'rotateX(-90deg)',
        duration: 0.3,
        stagger: 0.3
    }).fromTo('.skills',
        { y: '60%', duration: 0, ease: Power3 }, { y: '-160%', duration: 4, repeatDelay: -1.5, ease: Power3, stagger: 2, repeat: -1 }
    )
    // .to('.home', {
    //     height: 0,
    //     overflow: 'hidden',
    //     scrollTrigger: {
    //         trigger: '.home',
    //         scroller: 'body',
    //         start: 'top 0%',
    //         end: 'top -20%',
    //         scrub: 1,
    //         // markers: true
    //     }
    // })
})

//===== hamburgur 
document.querySelector('.hamburger').addEventListener('click', (event) => {
    let off = document.querySelector('.hamburgeroff');
    let on = document.querySelector('.hamburgeron')
    if (on.classList.contains('d-none')) {
        on.classList.toggle('d-none')
        off.classList.toggle('d-none')
    }
    else {
        off.classList.toggle('d-none')
        on.classList.toggle('d-none')
    }
})

//=========== on resize 
window.addEventListener('DOMContentLoaded', () => {
    let body = document.body;
    function setproperty() {
        if (body.offsetWidth <= '300') {
            document.documentElement.style.setProperty('--gridWidth', body.offsetWidth - 40 + 'px')
            // we minused the padd off the element here for better results
        } else {
            document.documentElement.style.setProperty('--gridWidth', 300 + 'px')
        }
    }
    window.addEventListener('resize', () => {
        setproperty()
    })
})

// skill lines animation 
const skillcontainer = document.querySelectorAll('.keyskillscontainer');
const skew = document.querySelectorAll('.skewelm');

let observer = new IntersectionObserver((events) => {
    events.forEach((e) => {
        if(e.target.classList.contains('skewelm') && e.target.classList.contains('keyskillscontainer')){
           e.target.children[0].children[0].classList.toggle('hundred', e.isIntersecting)
           e.target.classList.toggle('noskew', e.isIntersecting)
       }
        else if (e.target.classList.contains('keyskillscontainer')) {
            e.target.children[0].children[0].classList.toggle('hundred', e.isIntersecting)
        }
        else if (e.target.classList.contains('skewelm')) {
            e.target.classList.toggle('noskew', e.isIntersecting)
        }
    })
}, {
    threshold: 0.5
})
skillcontainer.forEach((s) => {
    observer.observe(s)
})
skew.forEach((s) => {
    observer.observe(s)
})
