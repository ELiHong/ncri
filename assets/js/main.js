/**
 * Template Name: Axis
 * Template URL: https://bootstrapmade.com/axis-bootstrap-corporate-template/
 * Updated: Sep 13 2025 with Bootstrap v5.3.8
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

// 강의 수강신청 모달 열기
function openCourseModal(courseName) {
  try {
    const nameInput = document.getElementById("courseNameInput");
    const subjectInput = document.getElementById("courseSubjectInput");
    if (nameInput) nameInput.value = courseName;
    if (subjectInput) subjectInput.value = `[수강신청] ${courseName}`;

    const modalEl = document.getElementById("courseEnrollModal");
    if (!modalEl) return;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  } catch (e) {
    // 폴백: 모달이 없으면 문의 섹션으로 이동
    alert(`수강신청: ${courseName}\n문의 폼으로 이동합니다.`);
    window.location.href = "#contact";
  }
}

/**
 * NCRI 수익사업 결제 시스템
 */

// 결제 시작 함수
function startPayment(serviceType, amount) {
  // 로그인 확인
  if (!isUserLoggedIn()) {
    showLoginModal();
    return;
  }

  // 결제 정보 설정
  const paymentData = {
    service: serviceType,
    amount: amount,
    currency: "KRW",
    user: getCurrentUser(),
  };

  // 결제 모달 표시
  showPaymentModal(paymentData);
}

// 서비스 문의 요청
function requestConsultation(serviceType) {
  // 서비스별 문의 폼 표시
  showConsultationForm(serviceType);
}

// 기업 데모 요청
function requestEnterpriseDemo() {
  // 데모 요청 폼 표시
  showEnterpriseForm();
}

// 로그인 상태 확인
function isUserLoggedIn() {
  // 실제 구현에서는 세션이나 토큰 확인
  return localStorage.getItem("ncri_user_token") !== null;
}

// 현재 사용자 정보 가져오기
function getCurrentUser() {
  const userToken = localStorage.getItem("ncri_user_token");
  if (userToken) {
    try {
      return JSON.parse(localStorage.getItem("ncri_user_info"));
    } catch (e) {
      return null;
    }
  }
  return null;
}

// 로그인 모달 표시
function showLoginModal() {
  alert(
    "로그인이 필요한 서비스입니다.\n\n회원가입 후 NCRI의 다양한 수익사업 서비스를 이용하실 수 있습니다."
  );
  // 실제 구현에서는 로그인 모달을 표시
  window.location.href = "#contact";
}

// 결제 모달 표시
function showPaymentModal(paymentData) {
  const serviceNames = {
    education: "NCS 온라인 교육 과정",
    certification: "전문 인증서 발급",
    membership: "NCRI 프리미엄 멤버십",
    research: "연구자료 구독",
  };

  const serviceName = serviceNames[paymentData.service] || "서비스";
  const message = `${serviceName}\n금액: ${paymentData.amount.toLocaleString()}원\n\n결제를 진행하시겠습니까?`;

  if (confirm(message)) {
    // 실제 Stripe 결제 처리
    processStripePayment(paymentData);
  }
}

// Stripe 결제 처리
function processStripePayment(paymentData) {
  // 로딩 표시
  showPaymentLoading();

  // 실제 구현에서는 Stripe API 호출
  setTimeout(() => {
    hidePaymentLoading();
    alert(
      "결제가 완료되었습니다!\n\n서비스 이용 안내가 등록하신 이메일로 발송됩니다."
    );

    // 결제 완료 후 처리
    handlePaymentSuccess(paymentData);
  }, 2000);
}

// 교육세미나 문의 폼 표시
function showConsultationForm(serviceType) {
  const message = `NCS 전문 교육세미나 신청\n\n교육 과정:\n• NCS 기반 직무교육 과정\n• 산업별 맞춤 세미나\n• 온라인/오프라인 선택 가능\n• 전문가 강사진 구성\n• 수료증 발급\n• 교육자료 제공\n• 사후 Q&A 지원\n• 기업 맞춤 교육 가능\n\n교육 일정 및 비용 상담을 위해 연락처로 문의해주세요.`;
  alert(message);
  window.location.href = "#contact";
}

// 기업 데모 요청 폼 표시
function showEnterpriseForm() {
  const message = `기업 맞춤 패키지 데모\n\n• 임직원 교육 프로그램\n• 조직 진단 및 분석\n• 맞춤형 교육 콘텐츠\n• 전담 컨설턴트 배정\n• 지속적인 관리 지원\n\n데모 요청을 위해 연락처로 문의해주세요.`;
  alert(message);
  window.location.href = "#contact";
}

// 결제 로딩 표시
function showPaymentLoading() {
  // 실제 구현에서는 로딩 스피너 표시
  console.log("결제 처리 중...");
}

// 결제 로딩 숨기기
function hidePaymentLoading() {
  // 실제 구현에서는 로딩 스피너 숨기기
  console.log("결제 처리 완료");
}

// 결제 성공 처리
function handlePaymentSuccess(paymentData) {
  // 결제 성공 추적
  console.log("Payment successful:", paymentData);

  // Google Analytics 등 추적 코드
  if (typeof gtag !== "undefined") {
    gtag("event", "purchase", {
      transaction_id: Date.now().toString(),
      value: paymentData.amount,
      currency: "KRW",
      items: [
        {
          item_id: paymentData.service,
          item_name: paymentData.service,
          category: "NCRI Service",
          quantity: 1,
          price: paymentData.amount,
        },
      ],
    });
  }
}
