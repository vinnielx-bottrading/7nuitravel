/**
 * 7 NÚI TRAVEL — JavaScript Engine
 * Tương tác nhẹ nhàng, lưu khách đăng ký vào Firebase & chuyển tiếp Zalo trực tiếp 0911.307.874
 */

document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initTheme();
  initNavMenu();
  initTourModal();
  initAmbientSound();
  initTourFilter();
  initMoodQuiz();
  initSmoothScroll();
  initLightbox();
});

/* -------------------------------------------------------------
 * 1. Lucide Icons Initialization
 * ------------------------------------------------------------- */
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* -------------------------------------------------------------
 * 2. Theme Toggle (Sáng Ấm Áp / Đêm Rừng Trầm)
 * ------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('7nui_theme');
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    updateThemeIcons(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeIcons(false);
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('7nui_theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
  }

  function updateThemeIcons(isDark) {
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');
    sunIcons.forEach(el => el.classList.toggle('hidden', !isDark));
    moonIcons.forEach(el => el.classList.toggle('hidden', isDark));
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
}

/* -------------------------------------------------------------
 * 2b. Menu Điều Hướng Dạng Thả Xuống (Thay Cho Nav Ngang Dễ Tràn Header)
 * ------------------------------------------------------------- */
function initNavMenu() {
  const toggleBtn = document.getElementById('nav-menu-toggle');
  const dropdown = document.getElementById('nav-menu-dropdown');

  if (!toggleBtn || !dropdown) return;

  function closeMenu() {
    dropdown.classList.add('hidden');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    dropdown.classList.remove('hidden');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !dropdown.classList.contains('hidden');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Đóng menu khi bấm ra ngoài
  document.addEventListener('click', (e) => {
    if (!dropdown.classList.contains('hidden') && !dropdown.contains(e.target) && e.target !== toggleBtn) {
      closeMenu();
    }
  });

  // Đóng menu khi bấm một mục điều hướng, hoặc nhấn Escape
  dropdown.querySelectorAll('.nav-menu-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* -------------------------------------------------------------
 * 3. Pop-up Đăng Ký Tour, Lưu Firebase & Chuyển Thẳng Đến Zalo 0911.307.874
 * ------------------------------------------------------------- */
function initTourModal() {
  const modal = document.getElementById('tour-booking-modal');
  const modalClose = document.getElementById('modal-close');
  const openModalBtns = document.querySelectorAll('.open-tour-modal');
  const tourSelect = document.getElementById('booking-tour-select');
  const bookingForm = document.getElementById('tour-booking-form');
  const submitBtn = document.getElementById('booking-submit-btn');

  // Success Zalo Connection Modal
  const zaloSuccessModal = document.getElementById('zalo-success-modal');
  const zaloSuccessClose = document.getElementById('zalo-success-close');
  const zaloDirectBtn = document.getElementById('zalo-direct-link');
  const zaloMsgPreview = document.getElementById('zalo-message-preview');

  if (!modal) return;

  function openModal(tourName = '') {
    if (tourSelect && tourName) {
      Array.from(tourSelect.options).forEach(opt => {
        if (opt.value.toLowerCase().includes(tourName.toLowerCase()) || tourName.toLowerCase().includes(opt.value.toLowerCase())) {
          opt.selected = true;
        }
      });
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      const dialog = modal.querySelector('.modal-dialog');
      if (dialog) dialog.classList.remove('scale-95', 'translate-y-4');
    }, 10);
    document.body.classList.add('overflow-hidden');
  }

  function closeModal() {
    const dialog = modal.querySelector('.modal-dialog');
    if (dialog) dialog.classList.add('scale-95', 'translate-y-4');
    modal.classList.add('opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 250);
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tourName = btn.getAttribute('data-tour') || '';
      openModal(tourName);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Handle Form Submit -> Lưu vào Firebase & Chuyển thẳng về Zalo 0911.307.874
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('booking-name')?.value.trim();
      const phone = document.getElementById('booking-phone')?.value.trim();
      const tour = tourSelect ? tourSelect.value : 'Tư vấn chung';
      const guests = document.getElementById('booking-guests')?.value || '1';
      const date = document.getElementById('booking-date')?.value || 'Chưa xác định';
      const notes = document.getElementById('booking-notes')?.value || '';

      if (!name || !phone) {
        showToast('Vui lòng điền họ tên và số điện thoại để 7 Núi Travel liên lạc nhé.', 'error');
        return;
      }

      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg> Đang lưu thông tin...
        `;

        // Dữ liệu khách đăng ký sẽ được lưu vào collection "dang_ky_tour" trên Firestore
        const registrationData = {
          hoTen: name,
          soDienThoai: phone,
          tour: tour,
          soLuongKhach: guests,
          thoiGianDuKien: date,
          loiNhan: notes,
          trangThai: 'moi',
          nguon: '7nuitravel.vn',
          createdAt: (typeof firebase !== 'undefined' && firebase.firestore && firebase.firestore.FieldValue)
            ? firebase.firestore.FieldValue.serverTimestamp()
            : new Date().toISOString()
        };

        function finishBooking() {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          bookingForm.reset();
          closeModal();

          // Định dạng tin nhắn gửi đến Zalo quản lý
          const formattedMessage = `🌿 [ĐĂNG KÝ TOUR CHỮA LÀNH BẢY NÚI]\n` +
            `• Họ tên khách: ${name}\n` +
            `• SĐT / Zalo: ${phone}\n` +
            `• Gói tour: ${tour}\n` +
            `• Số lượng: ${guests} người\n` +
            `• Thời gian dự kiến: ${date}\n` +
            `• Lời nhắn tâm tình: "${notes || 'Không có'}"`;

          // Cập nhật nội dung hiển thị trong modal chuyển tiếp Zalo
          if (zaloMsgPreview) {
            zaloMsgPreview.textContent = formattedMessage;
          }
          if (zaloDirectBtn) {
            zaloDirectBtn.href = `https://zalo.me/0911307874`;
          }

          // Mở modal kết nối Zalo bảo mật
          if (zaloSuccessModal) {
            zaloSuccessModal.classList.remove('hidden');
            setTimeout(() => {
              zaloSuccessModal.classList.remove('opacity-0');
            }, 10);
            document.body.classList.add('overflow-hidden');
          }

          // Tự động mở cửa sổ chat Zalo đến 0911.307.874
          window.open('https://zalo.me/0911307874', '_blank');

          showToast(`Cảm ơn bạn ${name}! Thông tin đã được lưu và chuyển tiếp đến Zalo 0911.307.874.`, 'success');
        }

        // Ghi dữ liệu thật vào Firebase Firestore (project: wellnessretreat-8d1bc)
        if (typeof db !== 'undefined' && db) {
          db.collection('dang_ky_tour').add(registrationData)
            .then(() => finishBooking())
            .catch((err) => {
              console.error('Lỗi khi lưu vào Firebase:', err);
              showToast('Không thể lưu vào hệ thống lúc này, nhưng thông tin của bạn vẫn được chuyển đến Zalo.', 'error');
              finishBooking();
            });
        } else {
          console.warn('Firebase chưa sẵn sàng — bỏ qua bước lưu database.');
          finishBooking();
        }
      }
    });
  }

  // Đóng modal Zalo success
  if (zaloSuccessClose) {
    zaloSuccessClose.addEventListener('click', () => {
      zaloSuccessModal.classList.add('opacity-0');
      setTimeout(() => {
        zaloSuccessModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }, 250);
    });
  }
}

/* -------------------------------------------------------------
 * 4. Toast Notification
 * ------------------------------------------------------------- */
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  if (!toast) return;

  if (toastMessage) toastMessage.textContent = msg;
  if (toastIcon) {
    toastIcon.innerHTML = type === 'error' 
      ? '<i data-lucide="alert-circle" class="w-5 h-5 text-amber-600"></i>'
      : '<i data-lucide="heart" class="w-5 h-5 text-emerald-600 fill-emerald-600/20"></i>';
    if (window.lucide) window.lucide.createIcons();
  }

  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.remove('translate-y-6', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 10);

  setTimeout(() => {
    toast.classList.add('translate-y-6', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 4500);
}

/* -------------------------------------------------------------
 * 5. Bộ Lọc Gói Tour Theo Thời Gian
 * ------------------------------------------------------------- */
function initTourFilter() {
  const filterBtns = document.querySelectorAll('.tour-filter-btn');
  const tourCards = document.querySelectorAll('.tour-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#264638]', 'text-white', 'dark:bg-[#C88D3D]', 'dark:text-[#121C16]');
        b.classList.add('bg-stone-100', 'dark:bg-stone-800', 'text-stone-600', 'dark:text-stone-300');
      });
      btn.classList.add('bg-[#264638]', 'text-white', 'dark:bg-[#C88D3D]', 'dark:text-[#121C16]');
      btn.classList.remove('bg-stone-100', 'dark:bg-stone-800', 'text-stone-600', 'dark:text-stone-300');

      const filter = btn.getAttribute('data-filter');

      tourCards.forEach(card => {
        const duration = card.getAttribute('data-duration');
        if (filter === 'all' || duration === filter) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.classList.remove('opacity-0', 'scale-95');
            card.classList.add('opacity-100', 'scale-100');
          }, 30);
        } else {
          card.classList.add('opacity-0', 'scale-95');
          setTimeout(() => {
            card.classList.add('hidden');
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 6. Trắc Nghiệm Tìm Chuyến Đi Hợp Tâm Trạng
 * ------------------------------------------------------------- */
function initMoodQuiz() {
  const submitQuizBtn = document.getElementById('quiz-submit-btn');
  const resultContainer = document.getElementById('quiz-result');
  const recommendedTourName = document.getElementById('quiz-tour-name');
  const recommendedTourDesc = document.getElementById('quiz-tour-desc');
  const quizActionBtn = document.getElementById('quiz-action-btn');

  if (!submitQuizBtn) return;

  submitQuizBtn.addEventListener('click', () => {
    const q1 = document.querySelector('input[name="quiz-q1"]:checked')?.value;
    const q2 = document.querySelector('input[name="quiz-q2"]:checked')?.value;
    const q3 = document.querySelector('input[name="quiz-q3"]:checked')?.value;

    if (!q1 || !q2 || !q3) {
      showToast('Hãy chọn câu trả lời cho cả 3 câu hỏi bạn nhé!', 'error');
      return;
    }

    let tourTitle = 'Tour "Sương Mây Đỉnh Cấm Sơn — Digital Detox" (3N2D)';
    let tourDesc = 'Bạn đang cần một khoảng thời gian trọn vẹn để rời xa thiết bị số và tận hưởng thiên nhiên. Ba ngày hít thở mây ngàn Thiên Cấm Sơn và thiền chuông tĩnh lặng sẽ giúp bạn nạp lại thật nhiều năng lượng.';
    let tourKey = 'Sương Mây Đỉnh Cấm Sơn';

    if (q1 === 'mild' && q2 === 'mild') {
      tourTitle = 'Tour "Thở Giữa Rừng Tràm Trà Sư" (2N1D)';
      tourDesc = 'Bạn đang cần một khoảng lặng dịu dàng cuối tuần, thả mình theo thảm bèo xanh và ngắm hoàng hôn thốt nốt bình yên.';
      tourKey = 'Thở Giữa Rừng Tràm';
    } else if (q3 === 'nature') {
      tourTitle = 'Tour "Hoàng Hôn Tà Pạ & Cánh Đồng Tri Tôn" (2N1D)';
      tourDesc = 'Không gian khoáng đạt của hồ ngọc bích Tà Pạ và cánh đồng thốt nốt bao la sẽ giúp bạn thư giãn và có thêm thật nhiều năng lượng mới.';
      tourKey = 'Hoàng Hôn Tà Pạ';
    }

    if (recommendedTourName) recommendedTourName.textContent = tourTitle;
    if (recommendedTourDesc) recommendedTourDesc.textContent = tourDesc;
    if (quizActionBtn) {
      quizActionBtn.setAttribute('data-tour', tourKey);
    }

    if (resultContainer) {
      resultContainer.classList.remove('hidden');
      resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/* -------------------------------------------------------------
 * 7. Ambient Zen Audio (Âm Thanh Chuông Thiền Thư Giãn)
 * ------------------------------------------------------------- */
function initAmbientSound() {
  const soundBtn = document.getElementById('ambient-sound-toggle');
  let audioCtx = null;
  let isPlaying = false;
  let chimeInterval = null;

  if (!soundBtn) return;

  function createChime() {
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      const freqs = [432, 528, 639, 396, 741];
      const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomFreq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 5.0);
    } catch (err) {
      console.warn('Audio note error:', err);
    }
  }

  soundBtn.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = !isPlaying;

    if (isPlaying) {
      soundBtn.classList.add('playing', 'text-[#C88D3D]', 'border-[#C88D3D]');
      createChime();
      chimeInterval = setInterval(createChime, 6000);
      showToast('Đang phát tiếng chuông thiền thư giãn...', 'success');
    } else {
      soundBtn.classList.remove('playing', 'text-[#C88D3D]', 'border-[#C88D3D]');
      if (chimeInterval) clearInterval(chimeInterval);
    }
  });
}

/* -------------------------------------------------------------
 * 8. Cuộn Trang Nhẹ Nhàng (Smooth Scroll)
 * ------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#!') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* -------------------------------------------------------------
 * 9. Lightbox Photo Viewer (Xem Ảnh Cảnh Sắc Toàn Màn Hình)
 * ------------------------------------------------------------- */
function initLightbox() {
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxTourBtn = document.getElementById('lightbox-tour-btn');
  const triggerElements = document.querySelectorAll('.open-lightbox');

  if (!lightboxModal) return;

  function openLightbox(src, title, desc, tourKey) {
    if (lightboxImg) lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = desc;
    if (lightboxTourBtn) {
      lightboxTourBtn.setAttribute('data-tour', tourKey);
    }

    lightboxModal.classList.remove('hidden');
    setTimeout(() => {
      lightboxModal.classList.remove('opacity-0');
    }, 10);
    document.body.classList.add('overflow-hidden');
  }

  function closeLightbox() {
    lightboxModal.classList.add('opacity-0');
    setTimeout(() => {
      lightboxModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 250);
  }

  triggerElements.forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-img');
      const title = el.getAttribute('data-title');
      const desc = el.getAttribute('data-desc');
      const tourKey = el.getAttribute('data-tour');
      openLightbox(src, title, desc, tourKey);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  if (lightboxTourBtn) {
    lightboxTourBtn.addEventListener('click', () => {
      closeLightbox();
      const tour = lightboxTourBtn.getAttribute('data-tour');
      const bookBtn = document.querySelector(`.open-tour-modal[data-tour*="${tour}"]`) || document.querySelector('.open-tour-modal');
      if (bookBtn) bookBtn.click();
    });
  }
}
