// ===== Biến chung =====
var soBan = localStorage.getItem("banDangChon");   // bàn đang chọn
if (soBan === null) {
  soBan = "1";                                     // mở thẳng trang này thì dùng bàn 1
}
var order = [];                                    // các món của bàn đang chọn

// ===== Đổi số thành tiền: 90000 -> "90.000đ" =====
function tien(so) {
  return so.toLocaleString("vi-VN") + "đ";
}

// ===== Đọc / lưu order của bàn đang chọn =====
function docOrder() {
  var daLuu = localStorage.getItem("order-ban-" + soBan);
  if (daLuu !== null) {
    order = JSON.parse(daLuu);
  } else {
    order = [];
  }
}

function luuOrder() {
  localStorage.setItem("order-ban-" + soBan, JSON.stringify(order));
}

// ===== Hiện thông báo nhỏ 1,5 giây =====
function hienThongBao(chu) {
  var o = document.getElementById("thong-bao");
  o.innerText = chu;
  o.className = "thong-bao hien";
  setTimeout(function () {
    o.className = "thong-bao";
  }, 1500);
}

// ===== Chọn bàn từ 1 đến 10 =====
function chonBan(n) {
  soBan = String(n);
  localStorage.setItem("banDangChon", soBan);
  docOrder();
  veLai();
}

// ===== Thêm món (gọi từ nút "Thêm vào món") =====
function themMon(nut) {
  var ten = nut.getAttribute("data-ten");
  var gia = Number(nut.getAttribute("data-gia"));
  var icon = nut.getAttribute("data-icon");

  // món đã có thì tăng số lượng, chưa có thì thêm dòng mới
  var daCo = false;
  for (var i = 0; i < order.length; i++) {
    if (order[i].ten === ten) {
      order[i].soLuong = order[i].soLuong + 1;
      daCo = true;
    }
  }
  if (daCo === false) {
    order.push({ ten: ten, gia: gia, soLuong: 1, icon: icon });
  }

  localStorage.setItem("trang-thai-ban-" + soBan, "co-khach");
  veLai();
  hienThongBao("Đã thêm " + ten + " vào bàn " + soBan);
}

// ===== Tăng / giảm số lượng (thay = +1 hoặc -1) =====
function doiSoLuong(vitri, thay) {
  order[vitri].soLuong = order[vitri].soLuong + thay;
  if (order[vitri].soLuong <= 0) {
    order.splice(vitri, 1);          // về 0 thì bỏ món khỏi order
  }
  veLai();
}

// ===== Xóa một món =====
function xoaMon(vitri) {
  order.splice(vitri, 1);
  veLai();
}

// ===== Xóa toàn bộ order của bàn =====
function xoaOrder() {
  order = [];
  localStorage.setItem("trang-thai-ban-" + soBan, "trong");
  veLai();
}

// ===== Xác nhận gọi món =====
function xacNhan() {
  if (order.length === 0) {
    hienThongBao("Chưa có món nào để xác nhận");
  } else {
    hienThongBao("Đã gửi order bàn " + soBan + " cho bếp");
  }
}

// ===== Vẽ lại toàn bộ phần order + cộng tiền =====
function veLai() {
  var html = "";
  var tong = 0;
  var tongMon = 0;

  for (var i = 0; i < order.length; i++) {
    var thanhTien = order[i].gia * order[i].soLuong;   // thành tiền = giá x số lượng
    tong = tong + thanhTien;                           // cộng dồn vào tổng
    tongMon = tongMon + order[i].soLuong;

    html = html +
      '<div class="dong-order">' +
        '<div class="anh-nho"><img src="' + order[i].icon.trim() + '" alt="' + order[i].ten + '"></div>' +
        '<div class="thong-tin">' +
          '<p class="ten-mon-order">' + order[i].ten + '</p>' +
          '<p class="gia-order">' + tien(order[i].gia) + ' x ' + order[i].soLuong + ' = <strong>' + tien(thanhTien) + '</strong></p>' +
          '<div class="so-luong">' +
            '<button type="button" class="nut-sl" onclick="doiSoLuong(' + i + ', -1)" aria-label="Giảm">−</button>' +
            '<span class="sl">' + order[i].soLuong + '</span>' +
            '<button type="button" class="nut-sl" onclick="doiSoLuong(' + i + ', 1)" aria-label="Tăng">+</button>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="nut-xoa" onclick="xoaMon(' + i + ')" aria-label="Xóa món">✕</button>' +
      '</div>';
  }

  document.getElementById("danh-sach-order").innerHTML = html;
  document.getElementById("bao-trong").hidden = (order.length > 0);

  document.getElementById("tong-tien").innerText = tien(tong);
  document.getElementById("so-mon").innerText = tongMon;
  document.getElementById("tong-tren").innerText = tien(tong);
  document.getElementById("so-mon-tren").innerText = tongMon;
  document.getElementById("ten-ban-tren").innerText = soBan;
  document.getElementById("tieu-de-order").innerText = "Order - Bàn " + soBan;

  luuOrder();
  capNhatNutBan();
}

// ===== Tô màu các nút bàn: đang chọn / đã có món =====
function capNhatNutBan() {
  for (var n = 1; n <= 10; n++) {
    var nut = document.getElementById("nut-ban-" + n);
    var daLuu = localStorage.getItem("order-ban-" + n);
    var coMon = false;
    if (daLuu !== null) {
      coMon = JSON.parse(daLuu).length > 0;
    }

    var lop = "nut-ban";
    if (coMon) {
      lop = lop + " co-order";
    }
    if (String(n) === soBan) {
      lop = lop + " dang-chon";
    }
    nut.className = lop;
  }
}

// ===== Chạy khi mở trang =====
docOrder();
veLai();
