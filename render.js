
var path1 = anime.path('.target');
var path2 = anime.path('.target2');

anime({
  targets: '#sig1',
  translateX: path1('x'),
  translateY: path1('y'),
  rotate: path1('angle'),
  easing: 'linear',
  duration: 2000,
  loop: true
});
anime({
    targets: '#sig2',
    translateX: path2('x'),
    translateY: path2('y'),
    rotate: path2('angle'),
    easing: 'linear',
    duration: 6000,
    loop: true
});

let cards = document.querySelectorAll('.card')
VanillaTilt.init(cards, {
    max: 20,
    speed: 300,
    scale: 1.1,
    glare: true,
    "max-glare":0.2,
    perspective:500
});

let businessCard = document.querySelector('#contact .card')
businessCard.addEventListener('click', (e)=>{
    navigator.clipboard.writeText('nordyke.trent@gmail.com')
    alert('copied email address: nordyke.trent@gmail.com')

    if (!businessCard.classList.contains('expanded')) businessCard.vanillaTilt.destroy();
    businessCard.classList.add('expanded')
    console.log(e.target.previousElementSibling)
    document.querySelector(".wrapper").classList.add('expanded');
})
businessCard.addEventListener('mouseleave', (e)=>{
    businessCard.classList.remove('expanded')
    document.querySelector(".wrapper").classList.remove('expanded');
    VanillaTilt.init(businessCard, {
        max: 20,
        speed: 300,
        glare: true,
        "max-glare":0.2,
        perspective:500
    });
})

function isElementInViewport (el) {
    let rect = el.getBoundingClientRect();
    return (rect.bottom - (rect.bottom - rect.top)/2 > 0  && rect.bottom - (rect.bottom - rect.top)/2 < window.innerHeight);
}
let contents = document.querySelectorAll('nav > a')
let current = document.querySelector('nav > a.current');
contents.forEach(_=>_.addEventListener('click', ()=>{
    current.classList.remove('current')
    _.classList.add('current')
    current = _;
}))

window.addEventListener('scroll', ()=>{
    document.querySelectorAll('article').forEach(article => {
        if (isElementInViewport(article)){
            contents.forEach(content => {
                if (content != current && content.hash == "#"+article.id) {
                    current.classList.remove('current')
                    content.classList.add('current')
                    current = content;
                }
            })
        }
    })
})

function makeNoisyWave(pos, freq, amp){
    let d = `M `
    let y;
    for (let i=0; i<500; i++){
        y = Math.sin(freq * (i+pos.x))
        d += `${i},${ (2*Math.random()*Math.sin((0.8*i)+(2*Math.random()))*(y**2)) + pos.y + (y*amp) } `
    }
    return d
}
function waves(){
    document.querySelector('#upper1').setAttribute("d", makeNoisyWave({x:0, y:85}, 0.03,  65))
    document.querySelector('#upper2').setAttribute("d", makeNoisyWave({x:105, y:85}, 0.03, 65))
    document.querySelector('#lower1').setAttribute("d", makeNoisyWave({x:50, y:215}, 0.03, 65))
    document.querySelector('#lower2').setAttribute("d", makeNoisyWave({x:160, y:215}, 0.03, 65))

    document.querySelector('#cycle1').setAttribute("d", makeNoisyWave({x:80, y:150}, 0.02, 130))
    document.querySelector('#cycle2').setAttribute("d", makeNoisyWave({x:183, y:150}, 0.02, 130))
    document.querySelector('#cycle3').setAttribute("d", makeNoisyWave({x:290, y:150}, 0.02, 130))

}
setInterval(waves, 200)
