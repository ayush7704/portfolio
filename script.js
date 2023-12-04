
gsap.registerPlugin()

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
        duration: 0.5,
        ease: Power3.easeInOUT,
        delay: -0.3
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
        { y: '60%', duration: 0, ease: Power3 }, { y: '-160%', duration: 4.2, repeatDelay: -1.6, ease: Power3, stagger: 2.1, repeat: -1 },
    ).from('.twolines p span', {
        y: '100%',
        rotate: '30deg',
        opacity: 0,
        // dispaly:'block',
        duration: 1,
        ease: Power4,
        delay: '-8'
    }).from('#projects', {
        backgroundColor: '#151515',
        duration: 0.6,
        ease: Power1,
        scrollTrigger: {
            trigger: '#projects',
            scroller: 'body',
            start: 'top 80%',
            end: 'top 80%',
            scrub: 3,
            // markers:true
        }
    })
})

gsap.from('.aboutme .technogiq',{
    color:'white',
    ease:'none',
    scrollTrigger:{
        trigger:'.aboutme .technogiq',
        start:'top 90%',
        end:'top 60%',
        scrub:3,
        // markers:true
    }
})

//===== hamburgur 
document.querySelector('.hamburger').addEventListener('click', (event) => {

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

    if (on.classList.contains('d-none')) {
        sidebar()
        let intm = gsap.timeline()
        intm.from('.bookmark', {
            x: '-70%',
            stagger: 0.1,
            duration: 0.2,
            ease: 'none'
        })
            .from('.bookmark', {
                rotate: '0deg',
                duration: 0.6,
                ease: 'none'
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
            bookandblur()
        })
        document.querySelector('.bluriff').style.cssText = ''
    })
    document.querySelector('.bluriff').addEventListener('click', () => {
        bookandblur()
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




//=========== on resize 
window.addEventListener('DOMContentLoaded', () => {
    let body = document.body;
    document.documentElement.style.setProperty('--navheight', document.querySelector('nav').offsetHeight + 'px')

    document.documentElement.style.setProperty('--scrolltop', document.querySelector('nav').offsetHeight + 'px')

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
    })
})

// intersecting observer animation 
const skillcontainer = document.querySelectorAll('.keyskillscontainer');
const skew = document.querySelectorAll('.skewelm');
const projects = document.querySelectorAll('.project');
const contact = document.querySelectorAll('#contact')

let observer = new IntersectionObserver((events) => {
    events.forEach((e) => {
        let goupcontainer = document.querySelector('.goupcontainer')
        if (e.target.classList.contains('skewelm') && e.target.classList.contains('keyskillscontainer')) {
            e.target.children[0].children[0].classList.toggle('hundred', e.isIntersecting)
            e.target.classList.toggle('noskew', e.isIntersecting)
        }
        else if (e.target.classList.contains('keyskillscontainer')) {
            e.target.children[0].children[0].classList.toggle('hundred', e.isIntersecting)
        }
        else if (e.target.classList.contains('skewelm')) {
            e.target.classList.toggle('noskew', e.isIntersecting)
        }
        else if (e.target.classList.contains('project')) {
            e.target.classList.toggle('noprojectanm', e.isIntersecting)
        }
        else if (e.target.classList.contains('contact')) {
            goupcontainer.classList.toggle('d-block', e.isIntersecting)
        }
    })
}, {
    threshold: 0.3
})
skillcontainer.forEach((s) => { observer.observe(s) })
skew.forEach((s) => { observer.observe(s) })
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
            keyimgs.childNodes[5].style.opacity = '1';
        }
        catch (er) {
            console.log(er)
        }
    })
    keyimgs.addEventListener('mouseleave', (leave) => {
        try {
            keyimgs.childNodes[5].style.opacity = '0'
        }
        catch (er) {
            console.log(er)
        }
    })
    keyimgs.addEventListener('mousemove', (img) => {
        // console.log(keyimgs.childNodes)
        try {
            keyimgs.childNodes[5].style.left = img.x + 'px';
        }
        catch (er) {
            console.log(er)
        }
    })
})

function projectball() {
    let ball = document.querySelector('.ball');
    document.querySelector('#projects').addEventListener('mouseenter', (dets) => {
        ball.style.opacity = '1'
    })
    document.querySelector('#projects').addEventListener('mouseleave', (dets) => {
        ball.style.opacity = '0'
    })
    document.querySelector('#projects').addEventListener('mousemove', (pos) => {
        ball.style.top = pos.y + 'px'
        ball.style.left = pos.x + 'px'
        console.log(pos.y)
    })
}
// projectball()

// document.querySelector('.about .d-grid-300 .aboutimg img').addEventListener('mousemove', (dets) => {
//     console.log(document.querySelector('.about .aboutimg img'))
//     console.log(dets)
//     document.querySelector('.about .aboutimg .tap').style.left = dets.x + 'px'
//     document.querySelector('.about .aboutimg .tap').style.top = dets.y + 'px'
// })
