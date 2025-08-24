document.addEventListener("DOMContentLoaded", () => {
  const webtoonCards = document.querySelectorAll(".webtoon-card");
  const adminBtn = document.getElementById("adminBtn");

  let openWebtoons = JSON.parse(localStorage.getItem("openWebtoons")) || {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  };

  // 🔹 웹툰 카드 클릭 이벤트
  webtoonCards.forEach((card) => {
    const webtoonId = card.getAttribute("data-id");
    if (!openWebtoons[webtoonId]) card.style.opacity = "0.5";

    card.addEventListener("click", () => {
      if (!openWebtoons[webtoonId]) {
        alert("앗! 아직 오픈되지 않았어요.\n우리 조금만 더 배우고 읽어볼까요?~");
        return;
      }
      const subtitle = card.querySelector(".subtitle").innerText;
      const title = card.querySelector("h2").innerText;
      window.location.href = `viewer.html?id=${webtoonId}&subtitle=${encodeURIComponent(
        subtitle
      )}&title=${encodeURIComponent(title)}`;
    });
  });

  // 🔹 관리자 모드 버튼 클릭 시 모달 열기
  adminBtn.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <h2>관리자 로그인</h2>
        <input type="password" id="adminPassword" placeholder="비밀번호 입력" maxlength="4">
        <div id="webtoonSettings" style="display:none; margin-top:10px;"></div>
        <div>
          <button id="confirmBtn">확인</button>
          <button id="cancelBtn">취소</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = "flex";

    const passwordInput = modal.querySelector("#adminPassword");
    const confirmBtn = modal.querySelector("#confirmBtn");
    const cancelBtn = modal.querySelector("#cancelBtn");
    const webtoonSettings = modal.querySelector("#webtoonSettings");

    passwordInput.focus();

    // ✅ 확인 버튼 클릭
    confirmBtn.addEventListener("click", () => {
      if (webtoonSettings.style.display === "none") {
        // 로그인 단계
        if (passwordInput.value === "0921") {
          passwordInput.style.display = "none";
          modal.querySelector("h2").innerText = "웹툰 공개 설정";
          webtoonSettings.style.display = "block";

          // 🔹 체크박스 목록 생성
          webtoonCards.forEach((card) => {
            const webtoonId = card.getAttribute("data-id");
            const title = card.querySelector("h2").innerText;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = openWebtoons[webtoonId];
            checkbox.addEventListener("change", () => {
              openWebtoons[webtoonId] = checkbox.checked;
              localStorage.setItem(
                "openWebtoons",
                JSON.stringify(openWebtoons)
              );
              card.style.opacity = checkbox.checked ? "1" : "0.5";
            });

            const label = document.createElement("label");
            label.style.display = "block"; // 줄바꿈
            label.appendChild(checkbox);
            label.append(` ${title}`);
            webtoonSettings.appendChild(label);
          });
        } else {
          alert("비밀번호가 틀렸습니다!");
        }
      } else {
        modal.remove(); // 설정 완료 후 닫기
      }
    });

    // ✅ 엔터키 입력 시 "확인" 버튼과 동일하게 동작
    passwordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        confirmBtn.click();
      }
    });

    // ✅ 취소 버튼 클릭 시 닫기
    cancelBtn.addEventListener("click", () => {
      modal.remove();
    });

    // ✅ ESC 키로 모달 닫기
    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        modal.remove();
        document.removeEventListener("keydown", escHandler);
      }
    });
  });
});

