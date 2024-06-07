function checkScroll() {
  var doc = document.documentElement;
  var scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

  if (scrollTop > 75) {
    document.querySelector("body").classList.add("_scroll");
  } else {
    document.querySelector("body").classList.remove("_scroll");
  }
}

// Call the function when the page loads
checkScroll();

window.onscroll = function () {
  checkScroll();
}


const words = ['Learn', 'Grow'];
let currentWordIndex = 0;

const dynamicWordElement = document.getElementById('dynamicWord');

if (dynamicWordElement) {
  function animateWords() {
    const currentWord = words[currentWordIndex];
    const nextWord = words[(currentWordIndex + 1) % words.length];

    let erasing = true;
    let wordIndex = currentWord.length;

    const interval = setInterval(() => {
      if (erasing) {
        dynamicWordElement.textContent = currentWord.substring(0, wordIndex);
        wordIndex--;
        if (wordIndex < 0) {
          erasing = false;
          wordIndex = 0;
          dynamicWordElement.classList.add('hidden');
          setTimeout(() => {
            dynamicWordElement.classList.remove('hidden');
          }, 300); // Adjust this delay if needed
        }
      } else {
        dynamicWordElement.textContent = nextWord.substring(0, wordIndex);
        wordIndex++;
        if (wordIndex > nextWord.length) {
          clearInterval(interval);
          currentWordIndex = (currentWordIndex + 1) % words.length;
          setTimeout(animateWords, 1000); // Adjust delay before starting the next cycle
        }
      }
    }, 100);
  }


  animateWords();

}


const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');

const mouse = { x: -100, y: -100 };
const pos = { x: 0, y: 0 };
const speed = 0.1;

const updateCoordinates = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

window.addEventListener('mousemove', updateCoordinates);


function getAngle(diffX, diffY) {
  return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(
    Math.pow(diffX, 2) + Math.pow(diffY, 2)
  );
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}


const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x += diffX * speed;
  pos.y += diffY * speed;

  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);

  const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
  const rotate = 'rotate(' + angle + 'deg)';
  const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);



const cursorModifiers = document.querySelectorAll('[cursor-class]');

if (cursorModifiers) {
  cursorModifiers.forEach(curosrModifier => {
    curosrModifier.addEventListener('mouseenter', function () {
      const className = this.getAttribute('cursor-class');
      cursor.classList.add(className);
    });

    curosrModifier.addEventListener('mouseleave', function () {
      const className = this.getAttribute('cursor-class');
      cursor.classList.remove(className);
    });
  });

}

const videos = document.querySelector(".swiper");

if (videos) {

  const swiper = new Swiper(".swiper",{
    direction: "horizontal",
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 50,
        slideShadows: false,
    },
    loop:true,
    initialSlide: 0,
    autoplay: {
        delay: 1e4,
        disableOnInteraction: !1
    },
  
    breakpoints: {
        300: {
            slidesPerView: 1,
            spaceBetween: 0
        },
        700: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1000: {
            slidesPerView: 3,
            spaceBetween: 10
        }
    }
});
  // const swiper = new Swiper('.swiper', {
  //   effect: 'coverflow',
  //   coverflowEffect: {
  //     rotate: 50,
  //     slideShadows: false,
  //   },
  
  //   // Optional parameters
  //   direction: 'horizontal',
  //   loop: true,
  //   centeredSlides: false,
  //   slidesPerView: 1, // Display 3 slides per view
  //   breakpoints: {
  //     640: {
  //       slidesPerView: 2,
  //       centeredSlides: true,
  //     },
  //     1024: {
  //       slidesPerView: 3,
  //       centeredSlides: true,

  //     },
  //   },
  //   start:1,
  //   // autoplay: {
  //   //   delay: 5000, // Autoplay with a delay of 10 seconds (10000ms)
  //   // },
  //   spaceBetween: 20, // Optional: space between slides in pixels

  // });
}



//-----------Var Inits--------------
canvas = document.getElementById("canvas");
if (canvas) {

  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;

  let confetti = [];
  const confettiCount = 300;
  const gravity = 0.5;
  const terminalVelocity = 5;
  const drag = 0.075;
  const colors = [
    { front: 'red', back: 'darkred' },
    { front: 'green', back: 'darkgreen' },
    { front: 'blue', back: 'darkblue' },
    { front: 'yellow', back: 'darkyellow' },
    { front: 'orange', back: 'darkorange' },
    { front: 'pink', back: 'darkpink' },
    { front: 'purple', back: 'darkpurple' },
    { front: 'turquoise', back: 'darkturquoise' }];


  //-----------Functions--------------
  resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width / 2;
    cy = ctx.canvas.height / 2;
  };


  randomRange = (min, max) => Math.random() * (max - min) + min;

  initConfetti = () => {
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        color: colors[Math.floor(randomRange(0, colors.length))],
        dimensions: {
          x: randomRange(10, 20),
          y: randomRange(10, 30)
        },

        position: {
          x: randomRange(0, canvas.width),
          y: canvas.height - 1
        },

        rotation: randomRange(0, 2 * Math.PI),
        scale: {
          x: 1,
          y: 1
        },

        velocity: {
          x: randomRange(-25, 25),
          y: randomRange(0, -50)
        }
      });


    }
  };


  //---------Render-----------
  render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((confetto, index) => {
      let width = confetto.dimensions.x * confetto.scale.x;
      let height = confetto.dimensions.y * confetto.scale.y;

      // Move canvas to position and rotate
      ctx.translate(confetto.position.x, confetto.position.y);
      ctx.rotate(confetto.rotation);

      // Apply forces to velocity
      confetto.velocity.x -= confetto.velocity.x * drag;
      confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
      confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

      // Set position
      confetto.position.x += confetto.velocity.x;
      confetto.position.y += confetto.velocity.y;

      // Delete confetti when out of frame
      if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

      // Loop confetto x position
      if (confetto.position.x > canvas.width) confetto.position.x = 0;
      if (confetto.position.x < 0) confetto.position.x = canvas.width;

      // Spin confetto by scaling y
      confetto.scale.y = Math.cos(confetto.position.y * 0.1);
      ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

      // Draw confetti
      ctx.fillRect(-width / 2, -height / 2, width, height);

      // Reset transform matrix
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    });

    // Fire off another round of confetti
    if (confetti.length <= 10) initConfetti();

    window.requestAnimationFrame(render);
  };

  //---------Execution--------
  initConfetti();
  render();

  //----------Resize----------
  window.addEventListener('resize', function () {
    resizeCanvas();
  });

  //------------Click------------
  window.addEventListener('click', function () {
    initConfetti();
  });
}


var searchInput = document.getElementById("searchInput");

if (searchInput) {
  var search = document.querySelectorAll(".gd-page-body-videos-piece a");

  searchInput.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase().trim().split(' ');

    search.forEach(image => {
      const titleAttr = image.getAttribute('data-title');
      const title = titleAttr ? titleAttr.toLowerCase() : '';

      // Check if all search words are present in the title
      const allWordsPresent = searchValue.every(word => title.includes(word));

      if (allWordsPresent) {
        image.style.display = 'block'; // Show the image
      } else {
        image.style.display = 'none'; // Hide the image
      }
    });
  });
}


document.addEventListener('DOMContentLoaded', function () {
  
  const glowText = document.getElementById('glow-text');
  if(glowText){
  document.addEventListener('mousemove', function (e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    glowText.style.textShadow = `
          ${x}px ${y}px 5px #800080,
          ${x * 1.5}px ${y * 1.5}px 10px #800080,
          ${x * 2}px ${y * 2}px 15px #800080,
          ${x * 2.5}px ${y * 2.5}px 20px #e600e6,
          ${x * 3}px ${y * 3}px 30px #e600e6,
          ${x * 3.5}px ${y * 3.5}px 40px #e600e6,
          ${x * 4}px ${y * 4}px 50px #e600e6,
          ${x * 4.5}px ${y * 4.5}px 60px #e600e6
      `;
  });
}});


document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const recipients = ['services@maliks.com', 'services1@maliks.com', 'services4@maliks.com', 'services5@maliks.com'];
  if(form){
  form.addEventListener('submit', function(event) {
      event.preventDefault();

      const fullName = document.getElementById('full-name').value;
      const branch = document.getElementById('branch').value;
      const title = document.getElementById('title').value;
      const message = document.getElementById('message').value;

      const subject = `Message from ${fullName}`;
      const body = `Full Name: ${fullName}\nBranch: ${branch}\nTitle: ${title}\nMessage: ${message}`;

      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipients.join(',')}`
                      + `&su=${encodeURIComponent(subject)}`
                      + `&body=${encodeURIComponent(body)}`;

                      

      window.open(gmailLink, '_blank');

      form.reset();
  });
}});


document.getElementById('chatForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = document.getElementById('prompt').value;
  const response = await fetch('123', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });
  const data = await response.json();
  document.getElementById('chatResult').innerText = data;
});