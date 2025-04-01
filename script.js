document.addEventListener("DOMContentLoaded", () => {
  const webtoonCards = document.querySelectorAll(".webtoon-card");
  // const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // // 🔥 scrollToTopBtn이 존재할 때만 이벤트 추가!
  // if (scrollToTopBtn) {
  //   window.addEventListener("scroll", () => {
  //     console.log("스크롤 위치:", window.scrollY); // 현재 스크롤 위치 확인
  //     console.log("화면 높이 절반:", window.innerHeight / 2);
  //     if (window.scrollY > window.innerHeight / 2) {
  //       scrollToTopBtn.style.opacity = 1;
  //     } else {
  //       scrollToTopBtn.style.opacity = 0;
  //     }
  //   });

  //   scrollToTopBtn.addEventListener("click", () => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   });
  // }

  // 🔥 여기에서 오픈된 웹툰을 설정할 수 있음
  const openWebtoons = {
    //true 오픈, false 닫힘
    1: true,
    2: true,
    3: true,
    4: true, 
    5: true,
    6: true,
    7: true,
  };

  webtoonCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const webtoonId = card.getAttribute("data-id");
      const subtitle = card.querySelector(".subtitle").innerText;
      const title = card.querySelector("h2").innerText;

      if (openWebtoons[webtoonId]) {
        // 🔹 웹툰이 오픈된 경우, viewer.html로 이동
        window.location.href = `viewer.html?id=${webtoonId}&subtitle=${encodeURIComponent(
          subtitle
        )}&title=${encodeURIComponent(title)}`;
      } else {
        // 🚫 웹툰이 아직 오픈되지 않음 -> 경고 메시지
        alert("앗! 아직 오픈되지 않았어요.\n아쉽지만 다음에 이용해주세요~\n-반쌤-");
      }
    });
  });
});
