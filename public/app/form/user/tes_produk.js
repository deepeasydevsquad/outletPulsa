function tes_produk_index(path, url) {
  const tab = tables({
    width: [10, 20, 20, 20, 20, 10],
    columns: [
      { title: "Kode", center: true },
      { title: "Info Seller", center: true },
      { title: "Harga", center: true },
      { title: "Status", center: true },
      { title: "Waktu Response", center: true },
      { title: "Aksi", center: true },
    ],
    tools: search_btn({
      placeholder: "KODE PRODUK SELLER",
      width: 350,
      onclick: `onClick="tripay_prabayar(100, '${path}', '${url}')"`,
      path: path,
    }),
    path: path,
    not_found_label: "Daftar Tes Produk Seller Digiflaz Tidak Ditemukan",
  });

  var tb = `<div class="col-3 py-3">
              <form id="form" class="formName" enctype="multipart/form-data" method="post">
                  <div class="card">
                    <div class="card-body ">
                        <div class="row" >
                          <div class="col-12">
                              <div class="form-group">
                                <label style="display:block">Seller</label>
                                <select class="form-control js-example-tags w-100" name="seller" id="seller" onChange="get_produk_seller()">
                                    <option value="0">Pilih Seller</option>
                                </select>
                              </div>
                              <div class="form-group">
                                <label style="display:block">Produk Seller</label>
                                <select class="form-control js-example-tags w-100" name="produk_seller" id="produk_seller">
                                    <option value="0">Pilih Produk Seller (0 Produk)</option>
                                </select>
                              </div>
                              <div class="form-group">
                                <label>Nomor Tujuan</label>
                                <div class="input-group">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text" style="font-size: 12px;">+62</span>
                                  </div>
                                  <input type="number" class="form-control" placeholder="Nomor Tujuan" name="nomor_tujuan" id="nomor_tujuan">
                                </div>
                              </div>
                              <div class="form-group text-right mt-4 mb-0">
                                <button class="btn btn-secondary" type="submit" onclick="update_produk_prabayar_tripay()" title="Tes">
                                    <i class="fas fa-check-double"></i> Tes
                                </button>
                              </div>
                          </div>
                        </div>
                    </div>
                  </div>
              </form>
              <script>
                  $(".js-example-tags").select2({
                    tags: true
                  });
              </script>
            </div>
            <div class="col-9 py-3">
              <div class="row" >
                  <div class="col-4">
                    <div class="small-box bg-secondary">
                      <div class="inner">
                        <h3 id="total_usaha" style="font-size: 30px;">Saldo Digiflaz</h3>
                        <p>Rp 1.000.000,-</p>
                      </div>
                      <div class="icon"><i class="fas fa-info-circle"></i></div>
                    </div>
                  </div>
                  ${tab}
              </div>
            </div>`;

  return tb;
}

function tes_produk_start(path, url) {
  ajax_default(
    {
      url: Urls("Tes_produk/info_tes"),
      method: "get",
    },
    function (e, xhr) {
      var list_seller = `<option value="0">Pilih Seller</option>`;
      for (let x in e.data) {
        list_seller += `<option value="${e.data[x].id}">${e.data[x].name}</option>`;
      }
      $("#seller").html(list_seller);
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );

  // tes_produk(100, path, url);
}

function tes_produk(perpage, path, url, input) {
  var param = [];
  param["search"] = $("#search_" + path).val();
  if (input != undefined) {
    param["pageNumber"] = input;
  }
  get_data(perpage, {
    url: Urls(url + "/server_side"),
    pagination_id: "pagination_" + path,
    bodyTable_id: "body_" + path,
    fn: "List_" + path,
    warning_text:
      '<td colspan="7"><center>Daftar Bank Transfer Tidak Ditemukan</center></td>',
    param: param,
  });
}

function List_tes_produk(JSONData) {
  var json = JSON.parse(JSONData);

  var html = tr([
    td_center([json.kode]),
    td_center([""]),
    td_center([""]),
    td_center([""]),
    td_center([json.updatedAt]),
    td(btn, 'style="text-align:right;"'),
  ]);
  return html;
}

function get_produk_seller() {
  const seller_id = $("#seller").val();
  if (seller_id != 0) {
    ajax_default(
      {
        url: Urls("Tes_produk/get_produk_seller"),
        method: "post",
        data: { seller_id: $("#seller").val() },
      },
      function (e, xhr) {
        var list = ``;
        var num = 0;
        for (let x in e.data) {
          list += `<option value="${e.data[x].id}">${
            e.data[x].name
          } (Rp ${numberFormat(e.data[x].price)})</option>`;
          num++;
        }
        var list_produk_seller = `<option value="0">Pilih Produk Seller (${num} Produk)</option>`;
        list_produk_seller += list;
        $("#produk_seller").html(list_produk_seller);
      },
      function (status, errMsg) {
        frown_alert(errMsg.error_msg);
      }
    );
  } else {
    var list_produk_seller = `<option value="0">Pilih Produk Seller (0 Produk)</option>`;
    $("#produk_seller").html(list_produk_seller);
  }
}
