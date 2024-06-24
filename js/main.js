document.addEventListener("DOMContentLoaded", function () {
    // Tập hợp tất cả các phần tử cần sử dụng
    const backTop = document.querySelector("#back-top");
    const langContainers = document.querySelectorAll(".js__languageContainer");
    // slide
    const autoSlides = document.querySelectorAll(".js__autoSlideContainer");
    const oneSlides = document.querySelectorAll(".js__oneSlidesContainer");
    const oneSlidesSecondary = document.querySelectorAll(
        ".js__oneSlidesSecondaryContainer"
    );

    const stickyHeaderPC = document.querySelector(".js__stickyHeader");
    const video169s = document.querySelectorAll(".js__video169");
    const fancyboxes = document.querySelectorAll(".fancybox-full");

    // Xử lý sự kiện khi nhấn nút "back to top"
    function handleBackTop() {
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

    // Xử lý thay đổi ngôn ngữ
    function handleLanguageSwitch() {
        if (langContainers) {
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
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    slidesPerGroup: 1,
                    // effect: "fade",
                    autoHeight: true,
                    loop: true,
                    // fadeEffect: { crossFade: true },
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

    // Xử lý thanh header dính
    function handleStickyHeader() {
        if (stickyHeaderPC) {
            const isSticky = scrollY > 300;
            stickyHeaderPC.classList.toggle("sticky", isSticky);
        }
    }

    // Xử lý sự kiện khi cuộn trang
    function handleWindowScroll() {
        window.onscroll = function () {
            handleStickyHeader();
        };
    }

    // Khởi tạo tất cả các chức năng
    function initApp() {
        handleBackTop();
        handleLanguageSwitch();
        handleVideo169();
        initFancybox();
        // slide
        initSliderOneItems();
        initSliderAutoItems();
        initSliderOneSecondaryItems();
        // scroll
        handleWindowScroll();
    }

    // Bắt đầu khởi tạo ứng dụng
    initApp();
});
