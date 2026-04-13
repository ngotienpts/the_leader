/* FOR EXPLUS */
const explusSliderElements = document.querySelectorAll('.explus_slider');
explusSliderElements.forEach(slider => {
    const show = slider.getAttribute('data-show');
    var width = slider.offsetWidth;
    if(slider.getAttribute('data-vertical')=='true') width = slider.offsetHeight;
    slider.dataset.width = width;
    width = width / show;
    const sliderListItems = slider.querySelectorAll('.slider_list .item');
    for (const item of sliderListItems) {
        if(slider.getAttribute('data-vertical')=='true') item.style.height = width + 'px';
        else item.style.width = width + 'px';
    }
});
function explus_slider(e, page=1) {
    const activeElements = e.parentElement.querySelectorAll('.active');
    for (const activeElement of activeElements) {activeElement.classList.remove('active');}
    e.classList.add('active');
    const s = e.closest('.explus_slider');
    const show = s.getAttribute('data-show');
    const width = s.getAttribute('data-width') / show;
    if(s.getAttribute('data-vertical')=='true') s.querySelector('.slider_list').scrollTop = width * page;
    else s.querySelector('.slider_list').scrollLeft = width * page;
}
function explus_slider_prev(e) {
    const s = e.closest('.explus_slider');
    const show = parseInt(s.getAttribute('data-show'));
    var page = parseInt(s.getAttribute('data-page'));
    if(page>0) {
        page = page-show;
        s.dataset.page = page;
        explus_slider(e, page);
    }
}
function explus_slider_next(e) {
    const s = e.closest('.explus_slider');
    const show = parseInt(s.getAttribute('data-show'));
    var page = parseInt(s.getAttribute('data-page'));
    const total = parseInt(s.getAttribute('data-item'))/show;
    if(page<=total) {
        page = page+show;
        s.dataset.page = page;
        explus_slider(e, page);
    }
}

/* video */
const videoPlayers = document.querySelectorAll('.video-player');
videoPlayers.forEach(videoPlayer => {
    const video = videoPlayer.querySelector('video');
    const poster = videoPlayer.querySelector('.poster');
    const progressBar = videoPlayer.querySelector('.progress');
    const tooltip = videoPlayer.querySelector('.tooltip');
    let isPlaying = false;
    let isLoad = false;

    videoPlayer.dataset.play = isPlaying; // Use dataset property

    videoPlayer.querySelector('.toggleButton').addEventListener('click', () => {
        video.click();
    });

    video.addEventListener('click', () => {
        if (isPlaying) {
            video.pause();
        } else {
            if(!isLoad) {
                isLoad = true;
                video.style.display = 'block';
                poster.style.display = 'none';
            }
            video.play();
        }
        isPlaying = !isPlaying;
        videoPlayer.dataset.play = isPlaying;
    });
    video.addEventListener('timeupdate', () => {
        const {
            duration,
            currentTime
        } = video;
        const percentage = (currentTime / duration) * 100;
        progressBar.value = percentage;
        progressBar.style.background = 'linear-gradient(to right, #FFF 0%, #FFF ' + percentage + '%, rgba(255, 255, 255, 0.5) ' + percentage + '%, rgba(255, 255, 255, 0.5) 100%)';
    });
    progressBar.addEventListener('input', () => {
        progressBar.style.background = 'linear-gradient(to right, #FFF 0%, #FFF ' + progressBar.value + '%, rgba(255, 255, 255, 0.5) ' + progressBar.value + '%, rgba(255, 255, 255, 0.5) 100%)';
        const newTime = (progressBar.value / 100) * video.duration;
        video.currentTime = newTime;
    });

    progressBar.addEventListener('touchstart', () => {
        tooltip.style.display = 'block';
    });
    progressBar.addEventListener('touchend', () => {
        tooltip.style.display = 'none';
    });
    progressBar.addEventListener('touchmove', (event) => {
        const progressWidth = progressBar.offsetWidth;
        var rect = event.target.getBoundingClientRect();
        const mouseX = event.targetTouches[0].offsetX - rect.left;
        const percentage = (mouseX / progressWidth) * 100;
        const newTime = (percentage / 100) * video.duration;
        const minutes = Math.floor(newTime / 60);
        const seconds = Math.floor(newTime % 60).toString().padStart(2, '0');
        tooltip.textContent = `${minutes}:${seconds} / ${Math.floor(video.duration / 60)}:${Math.floor(video.duration % 60).toString().padStart(2, '0')}`;
    });

    progressBar.addEventListener('mousemove', (event) => {
        const progressWidth = progressBar.offsetWidth;
        const mouseX = event.offsetX;
        const percentage = (mouseX / progressWidth) * 100;
        const newTime = (percentage / 100) * video.duration;
        const minutes = Math.floor(newTime / 60);
        const seconds = Math.floor(newTime % 60).toString().padStart(2, '0');
        tooltip.textContent = `${minutes}:${seconds} / ${Math.floor(video.duration / 60)}:${Math.floor(video.duration % 60).toString().padStart(2, '0')}`;
    });

    progressBar.addEventListener('mouseover', () => {
        tooltip.style.display = 'block';
    });
    progressBar.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });


});
/* ads */
var device = 'desktop';
let isAds = true;
if (/Lighthouse|moto g power|bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)) {
    isAds = false;
}
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.querySelectorAll('.hide_mb').forEach(element => element.style.display = 'none');
    device = 'mobile';
} else {
    document.querySelectorAll('.hide_pc').forEach(element => element.style.display = 'none');
}
let isRun = false;
function runJs() {
    if (isRun) return true;
    isRun = true;

    document.querySelectorAll(`script[type="${device}js"][src]`).forEach(script => {
        script.type = 'text/javascript';
        const url = script.src;
        fetch(url)
            .then(response => response.text())
            .then(scriptContent => {
                try {
                    eval(scriptContent);
                    document.querySelectorAll(`script[type="lazy_ads"]:not([src])`).forEach(script => {
                        script.type = 'text/javascript';
                        const scriptContent = script.textContent;
                        try {
                            eval(scriptContent);
                        } catch (e) {
                            if (e instanceof SyntaxError) {
                                console.log(e.message);
                            }
                        }
                    });
                    document.querySelectorAll(`script[type="lazy_ads"][src]`).forEach(script => {
                        script.type = 'text/javascript';
                        const url = script.src;
                        fetch(url)
                            .then(response => response.text())
                            .then(scriptContent => {
                                const newScript = document.createElement('script');
                                newScript.type = 'text/javascript';
                                newScript.textContent = scriptContent;
                                document.head.appendChild(newScript);
                            });
                    });
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        console.log(e.message);
                    }
                }
            });
    });

}
window.addEventListener('focus', () => {
    if (isAds) runJs();
});
if (!document.hidden) {
    if (isAds) runJs();
}
if (device === 'mobile') {
    document.querySelectorAll('.home_desktop').forEach(element => element.remove());
} else {
    document.querySelectorAll('.home_mobile').forEach(element => element.remove());
}
setTimeout(function(){
    const expQcShareElements = document.querySelectorAll('.exp_qc_share');
    expQcShareElements.forEach((element) => {
      const sleep = parseInt(element.getAttribute('data-sleep'));
      const total = element.querySelectorAll('.exp_qc_one').length;
      let k = 1;
      element.querySelector('.exp_qc_one:nth-of-type(' + k + ')').classList.add('active');
      if (sleep > 0) {
        setInterval(() => {
          k++;
          if (k > total) {
            k = 1;
          }
          const next = element.querySelector('.exp_qc_one:nth-of-type(' + k + ')');
          element.querySelectorAll('.exp_qc_one').forEach((item) => {
            item.classList.remove('active');
          });
          next.classList.add('active');
        }, sleep * 1000);
      }
    });
}, 5000)

/* Time */
// Hàm hỗ trợ kiểm tra và gán sự kiện click
function safeClick(id, callback) {
  const el = document.getElementById(id);
  if (el) {
    el.onclick = callback;
  }
}

const modal1 = document.getElementById("myModal1");
const modal2 = document.getElementById("myModal2");
const modalheader = document.getElementById("myModal");

// Gán sự kiện cho Modal chính
safeClick("myBtn", () => toggleModal(modalheader, true));
safeClick("close", () => toggleModal(modalheader, false));

// Gán sự kiện cho Modal 1
safeClick("myBtn1", (event) => { event.preventDefault(); toggleModal(modal1, true); });
safeClick("close1", () => toggleModal(modal1, false));

// Gán sự kiện cho Modal 2
safeClick("myBtn2", (event) => { event.preventDefault(); toggleModal(modal2, true); });
safeClick("close2", () => toggleModal(modal2, false));

// Đóng modal khi click ra ngoài
window.onclick = (event) => {
  [modal2, modal1, modalheader].forEach(modal => {
    if (modal && event.target === modal) toggleModal(modal, false);
  });
};

function toggleModal(modal, show) {
  if (!modal) return; // Bảo vệ nếu modal không tồn tại
  modal.style.display = show ? "block" : "none";
  document.body.style.overflow = show ? "hidden" : "auto";
}

// --- Phần thời gian ---

function getCurrentTime() {
  const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const months = ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"];

  const now = new Date();
  const dayOfWeek = daysOfWeek[now.getDay()];
  const day = String(now.getDate()).padStart(2, '0');
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${dayOfWeek}, ngày ${day} ${month} năm ${year}, ${hours}:${minutes}:${seconds}`;
}

function displayCurrentTime() {
  const timeDisplay = document.getElementById('current-time');
  if (timeDisplay) {
    timeDisplay.innerText = getCurrentTime();
  }
}

// Chỉ chạy Interval nếu có phần tử hiển thị thời gian trên trang
if (document.getElementById('current-time')) {
  setInterval(displayCurrentTime, 1000);
  displayCurrentTime();
}

function getTimeInterval(str_time, includeDirection = true) {
  let seconds = Math.floor(Date.now() / 1000) - str_time;
  let unit = "phút";
  let direction = "trước";
  if (seconds < 0) {
    seconds = -seconds;
    direction = "vừa xong";
  }
  let value = seconds;
  if (seconds >= 31536000) {
    value = Math.floor(seconds / 31536000);
    unit = "năm";
  } else if (seconds >= 86400) {
    value = Math.floor(seconds / 86400);
    unit = "ngày";
  } else if (seconds >= 3600) {
    value = Math.floor(seconds / 3600);
    unit = "giờ";
  } else if (seconds >= 60) {
    value = Math.floor(seconds / 60);
    unit = "phút";
  } else {
    value = 1;
  }
  return includeDirection ? `${value} ${unit} ${direction}` : `${value} ${unit}`;
}

// --- DOM Content Loaded ---

document.addEventListener("DOMContentLoaded", () => {
  // Xử lý nút tìm kiếm mobile
  document.querySelectorAll('.js__showSearchMb').forEach(button => {
    button.addEventListener('click', () => {
      const searchInput = document.querySelector('.header-mb__rightSearchInput');
      if (searchInput) searchInput.focus();
    });
  });

  // Xử lý gettimeago
  document.querySelectorAll('.gettimeago').forEach(element => {
    const timestamp = element.getAttribute('data-date');
    if (timestamp) element.textContent = getTimeInterval(timestamp);
  });

  document.querySelectorAll('.gettimeago-update').forEach(element => {
    const timestamp = element.getAttribute('data-date');
    if (timestamp) element.textContent = getTimeInterval(timestamp, false);
  });
});

/* END EXPLUS */




document.addEventListener("DOMContentLoaded", function () {
    // Tập hợp tất cả các phần tử cần sử dụng
    const backTop = document.querySelector("#back-top");
    const langContainers = document.querySelectorAll(".js__languageContainer");
    // slide
    const autoSlides = document.querySelectorAll(".js__autoSlideContainer");
    const oneSlides = document.querySelectorAll(".js__oneSlidesContainer");
    const oneSlidesAutoplay = document.querySelectorAll(".js__oneSlidesContainerAutoplay");
    const oneSlidesSecondary = document.querySelectorAll(
        ".js__oneSlidesSecondaryContainer"
    );
    const twoSlides = document.querySelectorAll(".js__twoSlidesContainer");

    const stickyHeaderPC = document.querySelector(".js__stickyHeader");
    const video169s = document.querySelectorAll(".js__video169");
    const fancyboxes = document.querySelectorAll(".fancybox-full");

    // show sub menu
    const dropdownSubMenu = document.querySelectorAll(".js__dropDown");
    const subMenu = document.querySelector(".js__clickShowMenuMb");

    // more menu
    const navbarMoreIcon = document.querySelector('.js__navbarMoreIcon')
    const navbarMoreContent = document.querySelector('.js__navbarMoreContent')


    // search mb
    const searchMbs = document.querySelectorAll(".js__searchMb");
    // navbar mb
    const navbarMb = document.querySelector(".js__navbarMenuMb");

    // sticky
    const stickyContainers = document.querySelectorAll('.js__stickyContainer')

    // Xử lý sự kiện khi nhấn nút "back to top"
    function handleBackTop() {
        if(!backTop) return;
        
        backTop.onclick = function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };
        
    }

    // xử lý sự kiện để show sub menu
    function handleShowSubMenu() {
        if (!subMenu) return;
        var closeSubMenu = document.querySelector(".js__closeSubMenu");
        var overlay = document.querySelector(".js__overlay");
        var parentBox = subMenu.parentElement;

        subMenu.onclick = function () {
            this.parentElement.classList.add("active");
            document.querySelector("body").style.overflow = "hidden";
        };
        closeSubMenu.onclick = function () {
            parentBox.classList.remove("active");
            document.querySelector("body").style.overflow = "auto";
        };
        overlay.onclick = function () {
            parentBox.classList.remove("active");
            document.querySelector("body").style.overflow = "auto";
        };
    }

    // xử lý sự kiện show more menu
    function handleMoreMenu() {
        if(!navbarMoreIcon || !navbarMoreContent) return;

        navbarMoreIcon.onclick = function() {
            this.classList.toggle('active')
            navbarMoreContent.classList.toggle('active')
        }

    }

    // Xử lý sự kiện để show dropdown submenu
    function handleShowDropdownSubMenu() {
        dropdownSubMenu &&
            dropdownSubMenu.forEach((item) => {
                var parent = item.parentElement;
                var nextEle = parent.querySelector(".js__listSubMenu");
                item.onclick = function () {
                    parent.classList.toggle("active");
                    if (nextEle.style.maxHeight) {
                        nextEle.style.maxHeight = null;
                    } else {
                        nextEle.style.maxHeight = nextEle.scrollHeight + "px";
                    }
                };
            });
    }

    // Xử lý sự kiện show search mb
    function handleShowSearchMb() {
        if (!searchMbs) return;
        searchMbs.forEach((searchMb) => {
            var closeSearchMb =
                document.querySelector(".js__closeSearchMb");
            var formSearchMb = document.querySelector(".js__formSearchMb");
            const focusElement =
                formSearchMb.querySelector(".js__focusSearchMb");
            searchMb.onclick = function () {
                formSearchMb.classList.add("active");
                focusElement.focus();
                if (showSearchMb.classList.contains("active")) {
                    focusElement.value = "";
                }
            };
            closeSearchMb.onclick = function () {
                formSearchMb.classList.remove("active");
                focusElement.value = "";
            };
        });
    }

    // Xử lý sự kiện scroll navbar mb
    function handleNavbarMb() {
        if (!navbarMb) return;

        const container = navbarMb.querySelector(".js__navbarMb");
        const scrollBtn = navbarMb.querySelector(".js__navbarIcon");

        let scrollAmount = 0;
        let scrollPosition = 0;

        scrollBtn.addEventListener("click", function () {
            const scrollDistance = 100;
            scrollAmount = scrollPosition + scrollDistance;
            scrollAmount = Math.min(
                scrollAmount,
                container.scrollWidth - container.clientWidth
            );
            container.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
            });
            scrollPosition = scrollAmount;
        });
    }
    // Xử lý thay đổi ngôn ngữ
    function handleLanguageSwitch() {
        if (!langContainers) return;
        
        langContainers.forEach((langContainer) => {
            var languageDefault = langContainer.querySelector(
                ".js__languageDefault"
            );
            var languageItems =
                langContainer.querySelectorAll(".js__languageItem");

            languageDefault.onclick = function () {
                this.classList.toggle("active");
            };

            languageItems.forEach((languageItem) => {
                var children = languageDefault.querySelector(
                    ".js__languageDefaultText"
                );
                languageItem.onclick = function () {
                    children.innerHTML = languageItem.innerHTML;
                    languageDefault.classList.remove("active");
                };
            });
        });
    }

    // Xử lý video tỉ lệ 16:9
    function handleVideo169() {
        if (video169s) {
            video169s.forEach((video169) => {
                var videos = video169.querySelectorAll("iframe");
                if (videos) {
                    videos.forEach((video) => {
                        var w = video.offsetWidth;
                        video.style.height = (w * 9) / 16 + "px";
                    });
                }
            });
        }
    }

    // Khởi tạo fancybox
    function initFancybox() {
        if (fancyboxes) {
            fancyboxes.forEach(function () {
                $(".fancybox-full a").fancybox();
            });
        }
    }

    // Khởi tạo sticky content 
    function initStickyContent() {
        if (!stickyContainers) return; 
    
        stickyContainers.forEach(item => {
            var stickyElements = [item.querySelector('.js__stickyLeft'), item.querySelector('.js__stickyRight')]
                .filter(element => element !== null); 
    
            stickyElements.forEach(element => {
                $(element).theiaStickySidebar({
                    additionalMarginTop: 60,
                });
            });
        });
    }

    // khởi tạo slider với nhiều item có width auto
    function initSliderAutoItems() {
        if (autoSlides) {
            autoSlides.forEach((item) => {
                var slider = item.querySelector(".js__swiperAuto");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                new Swiper(slider, {
                    slidesPerView: "auto",
                    spaceBetween: 20,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                });
            });
        }
    }
    // Khởi tạo slider với một item
    function initSliderOneItems() {
        if (oneSlides) {
            oneSlides.forEach((item) => {
                var slider = item.querySelector(".js__oneSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");

                var swiperSlides = slider.querySelectorAll('.swiper-slide');
                var loopMode = swiperSlides.length >= 2; 
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    slidesPerGroup: 1,
                    autoHeight: true,
                    // loop: loopMode,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi,
                        clickable: true,
                    },
                    
                });
            });
        }
    }
    // Khởi tạo slider với một item autoplay
    function initSliderOneItemsAutoplay() {
        if (oneSlidesAutoplay) {
            oneSlidesAutoplay.forEach((item) => {
                var slider = item.querySelector(".js__oneSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");

                var swiperSlides = slider.querySelectorAll('.swiper-slide');
                var loopMode = swiperSlides.length >= 2; 
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    slidesPerGroup: 1,
                    // autoHeight: true,
                    // loop: loopMode,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi,
                        clickable: true,
                    },
                    autoplay: {
                        delay: 7000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      },
                });
            });
        }
    }

    // khởi tạo slider với 1.5 item
    function initSliderOneSecondaryItems() {
        if (oneSlidesSecondary) {
            oneSlidesSecondary.forEach((item) => {
                var slider = item.querySelector(".js__oneSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");
                new Swiper(slider, {
                    slidesPerView: 1.2,
                    spaceBetween: 20,
                    slidesPerGroup: 1,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi,
                        type: "progressbar",
                    },
                });
            });
        }
    }
     function initSliderTwoItems() {
        if (twoSlides) {
            twoSlides.forEach((item) => {
                var slider = item.querySelector(".js__twoSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");

                var swiperSlides = slider.querySelectorAll('.swiper-slide');
                var loopMode = swiperSlides.length >= 2; 
                new Swiper(slider, {
                    slidesPerView: 2,
                    spaceBetween: 10,
                    slidesPerGroup: 1,
                    // loop: loopMode,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi,
                        clickable: true,
                    },
                    
                });
            });
        }
    }

    // Xử lý thanh header dính
    function handleStickyHeader() {
        if (stickyHeaderPC) {
            const isSticky = scrollY > 300;
            stickyHeaderPC.classList.toggle("sticky", isSticky);
        }
    }
    // Hàm hiển thị nút backTop dựa trên vị trí cuộn trang
function handleBackTopVisibility() {
    if (backTop) {
        if (
            document.body.scrollTop > 300 ||
            document.documentElement.scrollTop > 300
        ) {
            backTop.style.opacity = 1;
            backTop.style.visibility = "visible";
        } else {
            backTop.style.opacity = 0;
            backTop.style.visibility = "hidden";
        }
    }
}
    // Xử lý sự kiện khi cuộn trang
    function handleWindowScroll() {
        window.onscroll = function () {
            handleStickyHeader();
            handleBackTopVisibility()
        };
    }

    // Khởi tạo tất cả các chức năng
    function initApp() {
        handleBackTop();
        handleShowSubMenu();
        handleShowDropdownSubMenu();
        handleMoreMenu();
        handleShowSearchMb();
        handleNavbarMb();
        handleLanguageSwitch();
        handleVideo169();
        initFancybox();
        initStickyContent();
        // slide
        initSliderOneItems();
        initSliderOneItemsAutoplay();
        initSliderAutoItems();
        initSliderOneSecondaryItems();
        initSliderTwoItems();
        // scroll
        handleWindowScroll();
    }

    // Bắt đầu khởi tạo ứng dụng
    initApp();
});
