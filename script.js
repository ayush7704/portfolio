
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
gsap.registerPlugin(ScrollTrigger)
// ScrollSmoother.create({
//     smooth: 1,
//     effects: true,
//   });

// let smoother = ScrollSmoother.create({
//     smooth: 2,
//     effects: true,
//     // normalizeScroll: true
//   });

let timeline = gsap.timeline()

timeline.to('.loadermiddle .parent .child', {
    transform: 'translateX(0%)',
    ease: Power3.easeInOUT,
    opacity: 1,
    color: 'white',
    stagger: 0.3,
    onStart: () => { gsap.to('body', { overflow: 'hidden' }) },
})

window.addEventListener('load', () => {
    console.log('loaded')
    timeline.to('.child', {
        transform: 'translateY(-100%)',
        ease: Power3.easeInOUT,
        duration: 0.3,
        delay: 0.3,
    }).to('.loaderpage .loaderdown img', {
        top: '-100vh',
        position: 'relative',
        duration: 0.6,
        ease: Power3.easeInOUT,
        delay: -0.2
    }).to('main .loaderpage', {
        height: 0,
        duration: 0.4,
        delay: 0.2,
        ease: Power3.easeInOUT,
        onStart: () => { gsap.to('.parent', { display: 'none', duration: 0 }) },
    }).to('main .green', {
        height: 0,
        duration: 1,
        delay: '-0.1',
        ease: 'expo',
        onComplete: () => {
            gsap.to('main .loaderpage', { display: 'none' })
        }
    }).from('.img .before', {
        animation: 'rotate 0.2s linear infinite',
        duration: 0.3
    }).to('.name', {
        duration: 0.5,
        webkitTextStroke: 1 + 'px white'
    }).from('.hamburger', {
        scale: 0,
        ease: Power4,
        duration: 0.3,
        onComplete: () => {
            gsap.to('body', { overflow: 'auto' })
            // gsap.fromTo('.twolines p', { fontWeight: 'bold', scale: 1.1,yoyo: true  }, { duration: 1.3, stagger: 1.3, fontWeight: '400', scale: 1,})
        }
    }).from('.home h1', {
        transform: 'rotateX(-90deg)',
        duration: 0.3,
        stagger: 0.3
    }).fromTo('.skills',
        { y: '60%', duration: 0, ease:'cubic-bezier(0, 0.59, 0.2, -0.02)'}, { y: '-160%', duration:6, stagger:3, repeatDelay: -1.9, ease: Power3, repeat: -1 },
    ).from('.twolines p span', {
        y: '100%',
        rotate: '30deg',
        opacity: 0,
        // dispaly:'block',
        duration: 1,
        ease: Power4,
        delay: '-12'
    }).from('#projects', {
        backgroundColor: '#151515',
        duration: 0.6,
        ease: Power1,
        scrollTrigger: {
            trigger: '#projects',
            // scroller: '.wrapper',
            start: 'top 80%',
            end: 'top 80%',
            scrub: 3,
            // markers:true
        }
    })
})

gsap.to('.ball', {
    rotate: '3000deg',
    scrollTrigger: {
        trigger: '#projects',
        start: 'top bottom',
        scrub: 3,
        // scroller:'.wrapper'
        // markers:true
    }
})

function width() {
    const skew = document.querySelectorAll('.rotateX');
    const technogiqspan = document.querySelectorAll('.technogiq')
    if (document.body.offsetWidth > '800') {

        gsap.fromTo('.aboutme .technogiq', {
            backgroundSize: '0% 100%',
            ease: 'none',
        }, {
            backgroundSize: '100% 100%',
            scrollTrigger: {
                // scroller:'.wrapper',
                trigger: '#main .aboutme .technogiq',
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
                // markers:true
            }
        })
    }
    if (document.body.offsetWidth > '800') {

        gsap.fromTo('.rotateX', {
            perspective: '1px',
            rotateX: '-8deg',
            transition: 'none',
            ease: 'none',
        }, {
            perspective: '1px',
            rotateX: '0deg',
            transition: 'none',
            ease: 'none',
            scrollTrigger: {
                // scroller:'.wrapper',
                trigger: '#main .aboutme',
                start: 'top 250%',
                end: 'top 40%',
                scrub: 1,
                // pin:true, pinSpacing:false
                // markers:true
            }
        })
        console.log('hem')
    }

    const obserber3 = new IntersectionObserver((slides) => {
        slides.forEach((slide) => {
            if (slide.target.classList.contains('rotateX') && document.body.offsetWidth <= '800') {
                if (slide.isIntersecting) {
                    slide.target.classList.add('norotateX')
                    observer.unobserve(slide.target);
                }
            }
            if (slide.target.classList.contains('technogiq') && document.body.offsetWidth <= '800') {
                slide.target.classList.toggle('technogiq100', slide.isIntersecting)
            }
        })
    }, {
        threshold: 0.5
    })

    skew.forEach((s) => { obserber3.observe(s) })
    technogiqspan.forEach((c) => { obserber3.observe(c) })
}
width()

//===== hamburgur 
document.querySelector('.hamburger').addEventListener('click', (event) => {
    event.stopPropagation()
    let bookmarks = document.querySelector('.bookmarks')
    let off = document.querySelector('.hamburgeroff');
    let on = document.querySelector('.hamburgeron')
    let blur = document.querySelector('.bluriff')

    function sidebar() {
        on.classList.toggle('d-none')
        off.classList.toggle('d-none')
        bookmarks.classList.toggle('d-none')
        blur.classList.toggle('zIndex')
        console.log('sideinter')
    }
    console.log('beechka')
    let intm = gsap.timeline()
    if (on.classList.contains('d-none')) {
        sidebar()
        intm.from('.bookmark', {
            x: '-70%',
            stagger: 0.1,
            duration: 0.2,
            // ease: 'none'
            ease: "circ.out",
        })
            .from('.bookmark', {
                rotate: '0deg',
                duration: 0.6,
                // ease: 'none'
                ease: "circ.out",
            })
        console.log('pass')
    }

    else {
        sidebar()
    }
    function bookandblur() {
        on.classList.add('d-none')
        off.classList.remove('d-none')
        bookmarks.classList.add('d-none')
        blur.classList.remove('zIndex')
        console.log('clicked')
    }
    document.querySelectorAll('.bookmark').forEach((elm) => {
        elm.addEventListener('click', (e) => {
            e.stopPropagation()
            bookandblur()
        })
        document.querySelector('.bluriff').style.cssText = ''
    })
    document.querySelector('.bluriff').addEventListener('click', () => {
        bookandblur()
        // intm.reverse()
        console.log('onsblur')
    })
})

// profile pic open 
const profiletm = gsap.timeline()
document.querySelectorAll('.profile').forEach((pic) => {
    pic.addEventListener('click', () => {
        profiletm.to('.myphoto', {
            zIndex: 6,
            duration: 0.5,
            opacity: 1
        })
        let blur = document.querySelector('.myphoto').addEventListener('click', () => {
            document.querySelector('.myphoto').style.cssText = 'z-index:-2'
        })
    })
})
document.querySelector('.remove').addEventListener('click', () => {
    document.querySelector('.myphoto').style.cssText = 'z-index:-2'
})
document.querySelector('.myphoto img').addEventListener('click', (e) => {
    e.stopPropagation()
})




//=========== on resize 
window.addEventListener('DOMContentLoaded', () => {
    let body = document.body;
    document.documentElement.style.setProperty('--navheight', document.querySelector('nav').offsetHeight + 'px')

    document.documentElement.style.setProperty('--scrolltop', document.querySelector('nav').offsetHeight + 'px')
    if (body.offsetWidth <= '800') {

    }
    function setproperty() {
        if (body.offsetWidth <= '300') {
            document.documentElement.style.setProperty('--gridWidth', body.offsetWidth - 60 + 'px')
            document.documentElement.style.setProperty('--navheight', document.querySelector('nav').offsetHeight + 'px')
            document.documentElement.style.setProperty('--scrolltop', document.querySelector('nav').offsetHeight + 'px')
            console.log('aagya')
            // we minused the padd off the element here for better results
            document.querySelector('.aboutimg img').style.cssText = `width:${body.offsetWidth - 60 + 'px'};height:${body.offsetWidth - 60 + 'px'}`
        }
        else {

            document.querySelector('.aboutimg img').style.cssText = ''
        }
    }
    setproperty()
    window.addEventListener('resize', () => {
        setproperty()
        width()
    })
})

// intersecting observer animation 
const skillcontainer = document.querySelectorAll('.keyskillscontainer');
const projects = document.querySelectorAll('.project');
const contact = document.querySelectorAll('#contact')

let observer = new IntersectionObserver((events) => {
    events.forEach((e) => {
        let goupcontainer = document.querySelector('.goupcontainer')
        if (e.target.classList.contains('keyskillscontainer')) {
            e.target.children[0].children[0].classList.toggle('hundred', e.isIntersecting)
        }
        if (e.target.classList.contains('project')) {
            e.target.classList.toggle('noprojectanm', e.isIntersecting)
        }
        if (e.target.classList.contains('contact')) {
            if (e.isIntersecting) {
                gsap.fromTo('.goupcontainer', { bottom: '100%', opacity: 0 }, { bottom: '2%', opacity: 1, duration: 0.4 })
                goupcontainer.classList.toggle('d-block')
            }
            else {
                goupcontainer.classList.remove('d-block')
            }
        }
    })
}, {
    threshold: 0.3
})
skillcontainer.forEach((s) => { observer.observe(s) })
projects.forEach((p) => { observer.observe(p) })
contact.forEach((c) => { observer.observe(c) })

const slideshow = document.querySelectorAll('.slide');
const obserber2 = new IntersectionObserver((slides) => {
    slides.forEach((slide) => {
        slide.target.classList.toggle('noslide', slide.isIntersecting)
    })
}, {
    threshold: 0.3
})
slideshow.forEach((slide) => {
    obserber2.observe(slide)
})


//======= colorchange on call icon 
let color = ['springgreen', 'dodgerblue', 'gold', 'lawngreen', 'royalblue', 'violet']
let colornum = 0;
setInterval(() => {
    gsap.to('.numbercopy', {
        boxShadow: `0 0 7px 2px ${color[colornum]}`,
        duration: 0.6,
    })
    colornum++
    if (colornum == color.length) {
        colornum = 0
    }
}, 600)

//======== number copy 
document.querySelector('.numbercopy').addEventListener('click', () => {
    navigator.clipboard.writeText(9754742477)
    navigator.vibrate([100, 100, 100])
    setTimeout(() => {
        document.querySelector('.copytext').style.display = 'block'
    }, 100)
    setTimeout(() => {
        document.querySelector('.copytext').style.display = 'none'
    }, 1000)
})

//========= hover animation on skills 
document.querySelectorAll('.keyskillscontainer').forEach((keyimgs) => {
    keyimgs.addEventListener('mouseenter', (enter) => {
        try {
            // keyimgs.childNodes[5].style.opacity = '1';
            gsap.to(keyimgs.childNodes[5],{
                opacity:1
            })
        }
        catch (er) {
            console.log(er)
        }
    })
    keyimgs.addEventListener('mouseleave', (leave) => {
        try {
            // keyimgs.childNodes[5].style.opacity = '0'
            gsap.to(keyimgs.childNodes[5],{
                opacity:0
            })
        }
        catch (er) {
            console.log(er)
        }
    })
    keyimgs.addEventListener('mousemove', (img) => {
        // console.log(keyimgs.childNodes)
        try {
            // keyimgs.childNodes[5].style.left = img.x + 'px';
            gsap.to(keyimgs.childNodes[5],{
                left:img.clientX +'px'
            })
        }
        catch (er) {
            console.log(er)
        }
    })
})

function projectball() {
    let projects = document.querySelector('#projects')
    let ball = document.querySelector('.ball');
    projects.addEventListener('mouseenter', (dets) => {
        gsap.to(ball, {
            opacity: 1,
            scale: 1
        })
    })
    projects.addEventListener('mouseleave', (dets) => {
        gsap.to(ball, {
            opacity: 0,
            scale: 0
        })
    })
    projects.addEventListener('mousemove', (pos) => {
        gsap.to(ball, {
            top: pos.y + 'px',
            left: pos.x + 'px',
        })
    })
}
projectball()

function homecursor() {
    let timeoutId;
    let home = document.querySelector('.home')
    let homedote = document.querySelector('.homedote');
    home.addEventListener('mousemove', (e) => {
        gsap.to(homedote, {
            opacity: 1,
            translate: '-50%,-50%',
            scale: '1',
            top: e.y + 'px',
            left: e.x + 'px'
        })

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            console.log("Mouse stopped moving!");
            gsap.to(homedote, {
                opacity: 0,
                scale: '0',
            })
        }, 5000);
    });

    home.addEventListener('mouseleave', (e) => {
        gsap.to(homedote, {
            opacity: 0,
            scale: '0',
        })
        clearTimeout(timeoutId);
    })

    setInterval(() => {
        let width = Math.floor(Math.random() * (100 - 50) + 50);
        let height = Math.floor(Math.random() * (100 - 50) + 50);
        homedote.style.width = width + 'px';
        homedote.style.height = width + 'px';
        homedote.style.borderTopRightRadius = `${Math.floor(Math.random() * (100 - 50) + 50)}px ${Math.floor(Math.random() * (100 - 50) + 50)}px`
        homedote.style.borderTopLeftRadius = `${Math.floor(Math.random() * (100 - 50) + 50)}px ${Math.floor(Math.random() * (100 - 50) + 50)}px`
        homedote.style.borderBottomRightRadius = `${Math.floor(Math.random() * (100 - 50) + 50)}px ${Math.floor(Math.random() * (100 - 50) + 50)}px`
        homedote.style.borderBottomLeftRadius = `${Math.floor(Math.random() * (100 - 50) + 50)}px ${Math.floor(Math.random() * (100 - 50) + 50)}px`
    }, 500)
}
homecursor()


